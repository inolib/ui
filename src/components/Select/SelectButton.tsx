import {
  $,
  component$,
  Slot,
  useContext,
  useOn,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { collapseQrl, contextId, expandQrl, focusQrl, moveFocusQrl } from "~/components/Select/Select";
import type { Reference } from "~/types";

type SelectButtonProps = {
  readonly styles?: string;
};

export type SelectButtonStore = {
  controls?: string;
  expanded: boolean;
  readonly id: string;
  readonly ref: Reference;
  slot?: string;
};

export const SelectButton = component$<SelectButtonProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<SelectButtonStore>(
    {
      expanded: false,
      id: nanoid(),
      ref: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowDown":
        case "ArrowUp":
        case "Enter":
        case "Space": {
          await expandQrl(context);
          await moveFocusQrl(context, event.code !== "ArrowUp" ? "first:selected" : "last:selected");
          break;
        }
      }
    })
  );

  useOn(
    "click",
    $(async (e) => {
      const event = e as MouseEvent;

      if (event.detail > 0 && event.button === 0) {
        if (store.expanded) {
          await collapseQrl(context);
          await focusQrl(context, store.ref);
        } else {
          await expandQrl(context);
          await moveFocusQrl(context, "first:selected");
        }
      }
    })
  );

  useTask$(() => {
    context.SelectButton = store;
    context.Select.focusable = store.ref;
  });

  useVisibleTask$(
    () => {
      if (store.ref.value !== undefined) {
        store.slot = store.ref.value.innerHTML;
      }

      if (context.SelectOptionList !== undefined) {
        store.controls = context.SelectOptionList.id;
      }
    },
    { strategy: "document-ready" }
  );

  return (
    <button
      aria-controls={store.controls}
      aria-expanded={store.expanded}
      aria-haspopup="listbox"
      class={styles}
      disabled={context.Select.disabled}
      id={store.id}
      preventdefault:click
      preventdefault:keydown
      preventdefault:keyup
      ref={store.ref}
      role="combobox"
      tabIndex={store.ref === context.Select.focusable ? 0 : -1}
      type="button"
    >
      <Slot />
    </button>
  );
});
