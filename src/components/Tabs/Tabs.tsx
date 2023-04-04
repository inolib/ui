import { $, component$, Slot, createContextId, useStore, useContextProvider } from "@builder.io/qwik";
import type { Reference } from "~/types";
import { useFocus } from "~/hooks/useFocus";
import { useTab } from "~/hooks/useTab";
import { TabsItemStore } from "~/components/tabs/TabsItem";
import { TabsListItemStore } from "~/components/tabs/TabsListItem";
import { TabsPanelStore } from "~/components/tabs/TabsPanel";

export const focusQrl = $((context: Contexts, ref: Reference) => {
  context.Focus.focusable = ref;
  context.Focus.focused = ref;
});

export const moveFocusQrl = $(async (context: Contexts, to: string) => {
  const predicate = (to: string) => {
    switch (to) {
      // case "first:selected":
      // case "last:selected": {
      //   return (item: TabsItemStore) => item.selected;
      // }

      case "next":
      case "previous": {
        return (item: TabsItemStore) => item.ref === context.Focus.focusable;
      }
    }

    return () => false;
  };

  if (context.TabsItem !== undefined) {
    switch (to) {
      case "first": {
        if (context.TabsItem.length > 0) {
          await focusQrl(context, context.TabsItem[0].ref);
        }
        break;
      }

      // case "first:selected": {
      //   const item = context.TabsItem.find(predicate(to));

      //   if (item !== undefined) {
      //     await focusQrl(context, item.ref);
      //   } else {
      //     await moveFocusQrl(context, "first");
      //   }

      //   break;
      // }

      case "last": {
        if (context.TabsItem.length > 0) {
          await focusQrl(context, context.TabsItem[context.TabsItem.length - 1].ref);
        }
        break;
      }

      // case "last:selected": {
      //   const item = context.TabsItem.findLast(predicate(to));

      //   if (item !== undefined) {
      //     await focusQrl(context, item.ref);
      //   } else {
      //     await moveFocusQrl(context, "last");
      //   }

      //   break;
      // }

      case "next": {
        const index = context.TabsItem.findIndex(predicate(to));

        if (index > -1 && index < context.TabsItem.length - 1) {
          await focusQrl(context, context.TabsItem[index + 1].ref);
        }

        break;
      }

      case "previous": {
        const index = context.TabsItem.findLastIndex(predicate(to));

        if (index > 0) {
          await focusQrl(context, context.TabsItem[index - 1].ref);
        }

        break;
      }
    }
  }
});

type Contexts = {
  Tabs: TabsStore;
  TabsListItem?: TabsListItemStore;
  TabsItem?: TabsItemStore[];
  TabsPanel?: TabsPanelStore[];
  Focus: FocusStore;
};

type FocusStore = {
  focusable?: Reference;
  focused?: Reference;
};

export type TabAttributes = {
  tabId?: string;
  panelId: string;
  hidden: boolean;
  "aria-selected": boolean;
};

type TabsStore = {
  tabs: {
    attributes: TabAttributes[];
  };
};

export const TabsContext = createContextId<Contexts>("inolib/ui/contexts/Tabs");

export const Tabs = component$(() => {
  const store = useStore<FocusStore>({}, { deep: true });

  const context: Contexts = {
    Tabs: useStore<TabsStore>(
      {
        tabs: {
          attributes: [],
        },
      },
      { deep: true }
    ),
    Focus: store,
  };

  useContextProvider(TabsContext, context);

  useFocus(store);
  useTab();

  return (
    <div preventdefault:keydown preventdefault:keyup>
      <Slot />
    </div>
  );
});
