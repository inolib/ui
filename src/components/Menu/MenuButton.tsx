import { $, component$, Slot, useContext, useOn, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type { Reference } from "~/types";
import { collapseQrl, contextId, expandQrl, focusQrl, moveFocusQrl } from "~/components/Menu/Menu";

type MenuButtonProps = {
  readonly styles?: string;
};

export type MenuButtonStore = {
  expanded: boolean;
  readonly ref: Reference;
  slot: string;
};

export const MenuButton = component$<MenuButtonProps>(({ styles }) => {
  const context = useContext(contextId);
  // const ref = useSignal<HTMLElement>();

  const store = useStore<MenuButtonStore>(
    {
      expanded: false,
      ref: useSignal<HTMLElement>(),
      slot: "",
    },
    { deep: true }
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Space": {
          await expandQrl(context);
          await moveFocusQrl(context, "first:selected");
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
      ref={store.ref}
      role="menu"
      tabIndex={store.ref === context.Menu.focusable ? 0 : -1}
      type="button"
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </button>
  );
});
