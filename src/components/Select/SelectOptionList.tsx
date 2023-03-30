import { $, component$, Slot, useContext, useOn, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { contextId, moveFocusQrl } from "~/components/Select/Select";

type SelectOptionListProps = {
  readonly styles?: string;
};

export type SelectOptionListStore = {
  readonly id: string;
};

export const SelectOptionList = component$<SelectOptionListProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<SelectOptionListStore>(
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
    context.SelectOptionList = store;
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
