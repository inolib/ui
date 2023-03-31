import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOn,
  useSignal,
  useStore,
  type QRL,
} from "@builder.io/qwik";

import { type MenuButtonStore } from "~/components/Menu/MenuButton";
import { type MenuItemStore } from "~/components/Menu/MenuItem";
import { type MenuItemListStore } from "~/components/Menu/MenuItemList";
import { useTab } from "~/hooks/useTab";
import { Reference } from "~/types";

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
  const element = ref.value;

  if (element !== undefined) {
    context.Menu.focusable = ref;
    element.focus();
  }
});

export const moveFocusQrl = $(async (context: MenuContext, to: string) => {
  const predicate = (to: string) => {
    switch (to) {
      case "first:selected":
      case "last:selected": {
        //return (item: MenuItemStore) => item.selected;
        return (item: MenuItemStore) => false;
      }

      case "next":
      case "previous": {
        return (item: MenuItemStore) => item.ref === context.Menu.focusable;
      }
    }

    return () => false;
  };

  if (context.MenuItem !== undefined) {
    switch (to) {
      case "first": {
        if (context.MenuItem.length > 0) {
          await focusQrl(context, context.MenuItem[0].ref);
        }
        break;
      }

      case "first:selected": {
        const item = context.MenuItem.find(predicate(to));

        if (item !== undefined) {
          await focusQrl(context, item.ref);
        } else {
          await moveFocusQrl(context, "first");
        }

        break;
      }

      case "last": {
        if (context.MenuItem.length > 0) {
          await focusQrl(context, context.MenuItem[context.MenuItem.length - 1].ref);
        }
        break;
      }

      case "last:selected": {
        const item = context.MenuItem.findLast(predicate(to));

        if (item !== undefined) {
          await focusQrl(context, item.ref);
        } else {
          await moveFocusQrl(context, "last");
        }

        break;
      }

      case "next": {
        const index = context.MenuItem.findIndex(predicate(to));

        if (index > -1 && index < context.MenuItem.length - 1) {
          await focusQrl(context, context.MenuItem[index + 1].ref);
        }

        break;
      }

      case "previous": {
        const index = context.MenuItem.findLastIndex(predicate(to));

        if (index > 0) {
          await focusQrl(context, context.MenuItem[index - 1].ref);
        }

        break;
      }
    }
  }
});

export type MenuContext = {
  Menu: MenuStore;
  MenuButton?: MenuButtonStore;
  MenuItemList?: MenuItemListStore;
  MenuItem?: MenuItemStore[];
};

type MenuProps = {
  readonly styles?: string;
};

type MenuStore = {
  focusable: Reference;
};

export const contextId = createContextId<MenuContext>("inolib/ui/contexts/Menu");

export const Menu = component$<MenuProps>(({ styles }) => {
  const store = useStore<MenuStore>(
    {
      focusable: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  const context: MenuContext = {
    Menu: store,
  };

  useContextProvider(contextId, context);

  useTab(store.focusable);

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
    <div class={styles} preventdefault:click preventdefault:keydown>
      <Slot />
    </div>
  );
});
