import { component$, Slot, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";

import { contextId } from "~/components/Tabs/Tabs";
import type { Reference } from "~/types";

type TabsPanelProps = {
  readonly id: string;
  readonly styles?: string;
};

export type TabsPanelStore = {
  readonly ref: Reference;
};

export const TabsPanel = component$<TabsPanelProps>(({ id, styles }) => {
  const context = useContext(contextId);

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

  return (
    <>
      {context.TabsTab?.find((tab) => tab.selected)?.controls === id ? (
        <div class={styles} id={id} ref={store.ref} role="tabpanel">
          <Slot />
        </div>
      ) : null}
    </>
  );
});
