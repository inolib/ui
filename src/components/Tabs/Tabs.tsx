import { component$, Slot, createContextId, useStore, useContextProvider } from "@builder.io/qwik";
import { type TabsPanels } from "~/components/tabs/TabsPanels";
import { type TabsPanel } from "~/components/tabs/TabsPanel";
import { type TabsItem } from "~/components/tabs/TabsItem";
import { type TabsListItem } from "~/components/tabs/TabsListItem";

export const TabsContext = createContextId<Contexts>("inolib/ui/contexts/Tabs");

type Contexts = {
  Tabs: TabsStore;
};

type TabsStore = {
  tabs: {
    attributes: {
      id?: string;
      hidden: boolean;
      "aria-expanded": boolean;
      panelId: number;
    }[];
  };
};

export const Tabs = component$(() => {
  const context = {
    Tabs: useStore<TabsStore>(
      {
        tabs: {
          attributes: [],
        },
      },
      { deep: true }
    ),
  };
  useContextProvider(TabsContext, context);

  return (
    <ul>
      <Slot />
    </ul>
  );
});
