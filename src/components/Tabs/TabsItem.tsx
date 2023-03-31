import { $, component$, Slot, useOn, useContext, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { TabsContext } from "./Tabs";

type ToggleFunction = (selectedIndex: number) => void;

type TabsItemProps = {
  panelId: number;
  selected?: boolean;
};

export const TabsItem = component$<TabsItemProps>(({ panelId, selected = false }) => {
  const id = nanoid();

  const context = useContext(TabsContext);

  const toggle$ = $<ToggleFunction>((selectedIndex) => {
    context.Tabs.tabs.attributes.forEach((tab: any, index: any) => {
      tab.hidden = index === selectedIndex ? false : true;
      tab["aria-expanded"] = index === selectedIndex ? true : false;
    });
  });

  useTask$(() => {
    context.Tabs.tabs.attributes.push({
      id: id,
      panelId: panelId,
      hidden: !selected,
      "aria-expanded": selected,
    });
  });

  return (
    <li>
      <button
        onClick$={async () => {
          const index = context.Tabs.tabs.attributes.findIndex((element) => element.id === id);
          await toggle$(index);
        }}
      >
        <Slot />
      </button>
    </li>
  );
});
