import { component$, Slot, useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { contextId } from "./Tabs";
import type { Reference } from "../../types";

export type TabsPanelProps = {
  readonly id: string;
  readonly styles?: string | undefined;
};

export type TabsPanelStore = {
  readonly id: string;
  readonly ref: Reference;
};

export const TabsPanel = component$<TabsPanelProps>(({ id, styles }) => {
  const context = useContext(contextId);

  const store = useStore<TabsPanelStore>(
    {
      id: nanoid(),
      ref: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  useTask$(() => {
    if (context.TabsPanel === undefined) {
      context.TabsPanel = [];
    }

    context.TabsPanel.push({
      props: { id },
      store,
    });
  });

  return (
    <>
      {context.TabsTab?.find((tab) => tab.selected)?.controls === store.id ? (
        <div class={styles} id={store.id} ref={store.ref} role="tabpanel">
          <Slot />
        </div>
      ) : null}
    </>
  );
});
