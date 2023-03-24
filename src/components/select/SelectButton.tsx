import { $, component$, Slot, useContext, useOn, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import { SelectContext } from "~/components/select/Select";
import { useComposite } from "~/hooks/useComposite";
import { useExpandable } from "~/hooks/useExpandable";

type Props = {
  styles?: string;
};

type Store = {
  useOn: {
    mouseup: boolean;
  };
};

export const SelectButton = component$<Props>(({ styles }) => {
  const ref = useSignal<HTMLElement>();

  const _store: Store = {
    useOn: {
      mouseup: false,
    },
  };

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
    "mousedown",
    $(() => {
      _store.useOn.mouseup = true;
    })
  );

  useOn(
    "mouseup",
    $(async (e) => {
      const event = e as MouseEvent;

      if (_store.useOn.mouseup) {
        if (event.button === 0) {
          if (store.isExpanded) {
            await collapse$();
            await focus$(store.trigger);
          } else {
            await expand$();
            await moveFocus$("first:selected");
          }
        }

        _store.useOn.mouseup = false;
      }
    })
  );

  useVisibleTask$(
    () => {
      store.focusable = ref;
      store.trigger = ref;
    },
    { strategy: "document-ready" }
  );

  return (
    <button
      aria-expanded={store.isExpanded}
      disabled={store.isDisabled}
      ref={ref}
      tabIndex={store.focusable === ref ? 0 : -1}
      type="button"
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </button>
  );
});
