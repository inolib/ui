import { $, component$, Slot, useContext, useOn, useSignal, useTask$ } from "@builder.io/qwik";

import { MenuContext } from "~/components/menu/Menu";
import { useComposite } from "~/hooks/useComposite";
import { useExpandable } from "~/hooks/useExpandable";

type Props = {
  styles?: string;
};

export const MenuButton = component$<Props>(({ styles }) => {
  const ref = useSignal<HTMLElement>();

  const store = useContext(MenuContext);

  const { focus$, moveFocus$ } = useComposite(store);
  const { collapse$, expand$ } = useExpandable(store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Space": {
          await expand$();
          await moveFocus$("first:selected");
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
          await moveFocus$("first");
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
      ref={ref}
      role="menu"
      tabIndex={store.focusable === ref ? 0 : -1}
      type="button"
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </button>
  );
});
