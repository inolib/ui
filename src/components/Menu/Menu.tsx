import { $, component$, createContextId, Slot, useContextProvider, useOn, useStore } from "@builder.io/qwik";

import { type MenuButtonStore } from "./MenuButton";
import { type MenuItemLinkStore } from "./MenuItemLink";
import { type MenuItemsStore } from "./MenuItems";
import { useFocus } from "../../hooks/useFocus";
import { useTab } from "../../hooks/useTab";
import type { Reference } from "../../types";

export const collapseQrl = $((context: MenuContext) => {
  if (context.MenuButton !== undefined) {
    context.MenuButton.expanded = false;
  }
});

export const expandQrl = $((context: MenuContext) => {
  if (context.MenuButton !== undefined) {
    context.MenuButton.expanded = true;
  }
});

export const focusQrl = $((context: MenuContext, ref: Reference) => {
  context.Menu.focusable = ref;
  context.Menu.focused = ref;
});

export const moveFocusQrl = $(async (context: MenuContext, to: string) => {
  const predicate = (to: string) => {
    switch (to) {
      case "first:selected":
      case "last:selected": {
        return (item: MenuItemLinkStore) => item.selected;
      }

      case "next":
      case "previous": {
        return (item: MenuItemLinkStore) => item.ref === context.Menu.focusable;
      }
    }

    return () => false;
  };

  if (context.MenuItemLink !== undefined) {
    switch (to) {
      case "first": {
        if (context.MenuItemLink.length > 0) {
          await focusQrl(context, context.MenuItemLink[0].ref);
        }
        break;
      }

      case "first:selected": {
        const item = context.MenuItemLink.find(predicate(to));

        if (item !== undefined) {
          await focusQrl(context, item.ref);
        } else {
          await moveFocusQrl(context, "first");
        }

        break;
      }

      case "last": {
        if (context.MenuItemLink.length > 0) {
          await focusQrl(context, context.MenuItemLink[context.MenuItemLink.length - 1].ref);
        }
        break;
      }

      case "last:selected": {
        const item = context.MenuItemLink.findLast(predicate(to));

        if (item !== undefined) {
          await focusQrl(context, item.ref);
        } else {
          await moveFocusQrl(context, "last");
        }

        break;
      }

      case "next": {
        const index = context.MenuItemLink.findIndex(predicate(to));

        if (index > -1 && index < context.MenuItemLink.length - 1) {
          await focusQrl(context, context.MenuItemLink[index + 1].ref);
        }

        break;
      }

      case "previous": {
        const index = context.MenuItemLink.findLastIndex(predicate(to));

        if (index > 0) {
          await focusQrl(context, context.MenuItemLink[index - 1].ref);
        }

        break;
      }
    }
  }
});

export type MenuContext = {
  Menu: MenuStore;
  MenuButton?: MenuButtonStore;
  MenuItemLink?: MenuItemLinkStore[];
  MenuItems?: MenuItemsStore;
};

type MenuProps = {
  readonly styles?: string;
};

type MenuStore = {
  focusable?: Reference;
  focused?: Reference;
};

export const contextId = createContextId<MenuContext>("inolib/ui/contexts/Menu");

export const Menu = component$<MenuProps>(({ styles }) => {
  const store = useStore<MenuStore>({}, { deep: true });

  const context: MenuContext = {
    Menu: store,
  };

  useContextProvider(contextId, context);

  useFocus(store);
  useTab();

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "Escape": {
          if (context.MenuButton !== undefined) {
            await collapseQrl(context);
            await focusQrl(context, context.MenuButton.ref);
          }
          break;
        }
      }
    })
  );

  return (
    <div class={styles} preventdefault:keydown preventdefault:keyup>
      <Slot />
    </div>
  );
});
