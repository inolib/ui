import { $, component$, Slot, useContext, useOn, useSignal, useTask$ } from "@builder.io/qwik";

import { SelectContext } from "~/components/select/Select";
import { useComposite } from "~/hooks/useComposite";
import { useExpandable } from "~/hooks/useExpandable";

type Props = {
  styles?: string;
};

export const SelectButton = component$<Props>(({ styles }) => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(SelectContext);

  const { focus$, moveFocus$ } = useComposite(store);
  const { collapse$, expand$ } = useExpandable(store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowDown":
        case "ArrowUp":
        case "Enter":
        case "Space": {
          await expand$();
          await moveFocus$(event.code !== "ArrowUp" ? "first:selected" : "last:selected");
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
          await collapse$();
          await focus$(ref);
        } else {
          await expand$();
          await moveFocus$("first:selected");
        }
      }
    })
  );

  useTask$(() => {
    store.focusable = ref;
    store.trigger = ref;
  });

  return (
    <button
      aria-controls={store.controls}
      aria-expanded={store.expanded}
      aria-haspopup="listbox"
      disabled={store.disabled}
      ref={ref}
      role="combobox"
      tabIndex={store.focusable === ref ? 0 : -1}
      type="button"
      {...(styles !== undefined ? { class: styles } : {})}
    >
      {!store.multiple ? (
        store.activated.length === 1 && store.activated[0].ref.value !== undefined ? (
          store.activated[0].ref.value.innerHTML
        ) : (
          <Slot />
        )
      ) : (
        <Slot />
      )}
    </button>
  );
});
