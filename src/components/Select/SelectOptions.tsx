import { $, component$, Slot, useContext, useOn, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { contextId, moveFocusQrl } from "~/components/Select/Select";

type SelectOptionsProps = {
  readonly styles?: string;
};

export type SelectOptionsStore = {
  readonly id: string;
};

export const SelectOptions = component$<SelectOptionsProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<SelectOptionsStore>(
    {
      id: nanoid(),
    },
    { deep: true }
  );

  useOn(
    "keydown",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowDown": {
          await moveFocusQrl(context, "next");
          break;
        }

        case "ArrowUp": {
          await moveFocusQrl(context, "previous");
          break;
        }
      }
    })
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "End": {
          await moveFocusQrl(context, "last");
          break;
        }

        case "Home": {
          await moveFocusQrl(context, "first");
          break;
        }
      }
    })
  );

  useTask$(() => {
    context.SelectOptions = store;
  });

  return (
    <>
      {context.SelectButton?.expanded ? (
        <ul
          aria-multiselectable={context.Select.multiple}
          class={styles}
          id={store.id}
          preventdefault:keydown
          preventdefault:keyup
          role="listbox"
        >
          <Slot />
        </ul>
      ) : null}
    </>
  );
});
