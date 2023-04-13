import { $, component$, createContextId, Slot, useContextProvider, useStore } from "@builder.io/qwik";

import type { TabsPanelProps, TabsPanelStore } from "./TabsPanel";
import type { TabsTabStore } from "./TabsTab";
import { useFocus } from "../../hooks/useFocus";
import { useTab } from "../../hooks/useTab";
import type { Reference } from "../../types";

export const focusQrl = $((context: TabsContext, ref: Reference, moveFocus = true) => {
  context.Tabs.focusable = ref;

  if (moveFocus) {
    context.Tabs.focused = ref;
  }
});

export const moveFocusQrl = $(async (context: TabsContext, to: string) => {
  const predicate = (tab: TabsTabStore) => tab.ref === context.Tabs.focusable;

  if (context.TabsTab !== undefined) {
    switch (to) {
      case "first": {
        if (context.TabsTab.length > 0) {
          await focusQrl(context, context.TabsTab[0].ref);
        }
        break;
      }

      case "last": {
        if (context.TabsTab.length > 0) {
          await focusQrl(context, context.TabsTab[context.TabsTab.length - 1].ref);
        }
        break;
      }

      case "next": {
        const index = context.TabsTab.findIndex(predicate);

        if (index > -1 && index < context.TabsTab.length - 1) {
          await focusQrl(context, context.TabsTab[index + 1].ref);
        }

        break;
      }

      case "previous": {
        const index = context.TabsTab.findLastIndex(predicate);

        if (index > 0) {
          await focusQrl(context, context.TabsTab[index - 1].ref);
        }

        break;
      }
    }
  }
});

export type TabsContext = {
  Tabs: TabsStore;
  TabsTab?: TabsTabStore[];
  TabsPanel?: {
    props: TabsPanelProps;
    store: TabsPanelStore;
  }[];
};

type TabsProps = {
  readonly styles?: string;
};

type TabsStore = {
  focusable?: Reference;
  focused?: Reference;
};

export const contextId = createContextId<TabsContext>("inolib/ui/contexts/Tabs");

export const Tabs = component$<TabsProps>(({ styles }) => {
  const store = useStore<TabsStore>({}, { deep: true });

  const context: TabsContext = {
    Tabs: store,
  };

  useContextProvider(contextId, context);

  useFocus(store);
  useTab();

  return (
    <div class={styles} preventdefault:keydown preventdefault:keyup>
      <Slot />
    </div>
  );
});
