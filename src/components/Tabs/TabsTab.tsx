import { $, component$, Slot, useContext, useSignal, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";

import { contextId, focusQrl, type TabsContext } from "./Tabs";
import type { Reference } from "../../types";

type TabsTabProps = {
  readonly controls: string;
  readonly selected?: boolean;
  readonly styles?: string;
};

export type TabsTabStore = {
  controls: string;
  readonly ref: Reference;
  selected: boolean;
};

export const selectQrl = $(async (context: TabsContext, store: TabsTabStore, moveFocus = true) => {
  const tab = context.TabsTab?.find((tab) => tab.selected);

  if (tab !== undefined) {
    tab.selected = false;
  }

  store.selected = true;

  await focusQrl(context, store.ref, moveFocus);
});

export const TabsTab = component$<TabsTabProps>(({ controls, selected = false, styles }) => {
  const context = useContext(contextId);

  const store = useStore<TabsTabStore>(
    {
      controls,
      ref: useSignal<HTMLElement>(),
      selected,
    },
    { deep: true }
  );

  useTask$(() => {
    if (context.TabsTab === undefined) {
      context.TabsTab = [];
    }

    context.TabsTab.push(store);
  });

  useVisibleTask$(
    async () => {
      const panel = context.TabsPanel?.find((panel) => panel.props.id === store.controls);

      if (panel !== undefined) {
        store.controls = panel.store.id;
      }

      if (selected) {
        await selectQrl(context, store, false);
      }
    },
    { strategy: "document-ready" }
  );

  return (
    <li>
      <button
        aria-controls={store.controls}
        aria-selected={store.selected}
        class={styles}
        onClick$={async (event) => {
          if (event.button === 0) {
            await selectQrl(context, store);
          }
        }}
        onKeyUp$={async (event) => {
          switch (event.keyCode) {
            case 13: /* Enter */
            case 32: /* Space */ {
              await selectQrl(context, store);
              break;
            }
          }
        }}
        preventdefault:click
        preventdefault:keydown
        preventdefault:keyup
        ref={store.ref}
        role="tab"
        tabIndex={store.ref === context.Tabs.focusable ? 0 : -1}
        type="button"
      >
        <Slot />
      </button>
    </li>
  );
});
