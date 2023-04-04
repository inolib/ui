import { $, component$, Slot, useContext, useStore, useTask$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";
import { TabsContext, TabAttributes } from "~/components/tabs/Tabs";
import type { Reference } from "~/types";

type ToggleFunction = (selectedIndex: number) => void;

type TabsItemProps = {
  panelId: string;
  selected?: boolean;
  styles?: string;
};

export type TabsItemStore = {
  controls?: string | undefined;
  readonly ref: Reference;
  selected: boolean;
  tabIndex?: number;
};

export const TabsItem = component$<TabsItemProps>(({ panelId, selected = false, styles }) => {
  const id = nanoid();

  const context = useContext(TabsContext);

  const store = useStore<TabsItemStore>(
    {
      controls: panelId,
      ref: useSignal<HTMLElement>(),
      selected,
    },
    { deep: true }
  );

  const toggle$ = $<ToggleFunction>((selectedIndex) => {
    context.Tabs.tabs.attributes.forEach((tab, index) => {
      tab.hidden = index !== selectedIndex;
      tab["aria-selected"] = index === selectedIndex;
    });
  });

  useTask$(() => {
    context.Tabs.tabs.attributes.push({
      tabId: id,
      panelId: panelId,
      hidden: !selected,
      "aria-selected": selected,
    });

    if (context.TabsItem === undefined) {
      context.TabsItem = [];
    }
    context.TabsItem.push(store);

    if (selected) {
      context.Focus.focusable = store.ref;
    }
  });

  useVisibleTask$(
    ({ track }) => {
      const _Tabs = track(context.Tabs);
      const tab = _Tabs.tabs.attributes.find((tab) => tab.tabId === id);

      if (tab !== undefined) {
        store.selected = tab["aria-selected"];
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
        ref={store.ref}
        onClick$={async () => {
          const index = context.Tabs.tabs.attributes.findIndex((tab) => tab.tabId === id);
          await toggle$(index);
        }}
        role="tab"
        tabIndex={store.ref === context.Focus.focusable ? 0 : -1}
      >
        <Slot />
      </button>
    </li>
  );
});
