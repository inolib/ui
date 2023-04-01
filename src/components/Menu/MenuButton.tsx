import { $, component$, Slot, useContext, useOn, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import { collapseQrl, contextId, expandQrl, focusQrl, moveFocusQrl } from "~/components/Menu/Menu";
import type { Reference } from "~/types";

type MenuButtonProps = {
  readonly styles?: string;
};

export type MenuButtonStore = {
  expanded: boolean;
  readonly ref: Reference;
};

export const MenuButton = component$<MenuButtonProps>(({ styles }) => {
  const context = useContext(contextId);

  const store = useStore<MenuButtonStore>(
    {
      expanded: false,
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
          await moveFocusQrl(context, event.code !== "ArrowUp" ? "first" : "last");
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
          await moveFocusQrl(context, "first");
        }
      }
    })
  );

  useTask$(() => {
    context.MenuButton = store;
    context.Menu.focusable = store.ref;
  });

  return (
    <button
      aria-controls={context.MenuItemList?.id}
      aria-expanded={store.expanded}
      aria-haspopup="menu"
      class={styles}
      preventdefault:click
      preventdefault:keydown
      preventdefault:keyup
      ref={store.ref}
      tabIndex={store.ref === context.Menu.focusable ? 0 : -1}
      type="button"
    >
      <Slot />
    </button>
  );
});
