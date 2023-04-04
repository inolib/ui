import { component$, Slot, useContext, useStore, useTask$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { TabsContext, type TabAttributes } from "~/components/tabs/Tabs";
import type { Reference } from "~/types";

type TabsPanelProps = {
  id: string;
};

export type TabsPanelStore = {
  readonly ref: Reference;
  tab?: TabAttributes | undefined;
};

export const TabsPanel = component$<TabsPanelProps>(({ id }) => {
  const context = useContext(TabsContext);

  const store = useStore<TabsPanelStore>(
    {
      ref: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  useTask$(() => {
    if (context.TabsPanel === undefined) {
      context.TabsPanel = [];
    }
    context.TabsPanel.push(store);
  });

  useVisibleTask$(
    () => {
      store.tab = context.Tabs.tabs.attributes.find((tab) => tab.panelId === id);
    },
    { strategy: "document-ready" }
  );

  return (
    <div ref={store.ref} hidden={store.tab !== undefined ? store.tab.hidden : undefined} role="tabpanel">
      <Slot />
    </div>
  );
});
