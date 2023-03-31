import { component$, Slot, useContext, useStore } from "@builder.io/qwik";
import { TabsContext } from "./Tabs";

type TabsPanelProps = {
  id: number;
};

export const TabsPanel = component$<TabsPanelProps>(({ id }) => {
  const context = useContext(TabsContext);
  const index = context.Tabs.tabs.attributes.findIndex((element) => element.panelId === id);

  return (
    <div
      hidden={context.Tabs.tabs.attributes[index].hidden}
      aria-expanded={context.Tabs.tabs.attributes[index]["aria-expanded"]}
    >
      <Slot />
    </div>
  );
});
