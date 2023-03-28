import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { TabsContext } from "./Tabs";

type Props = {
  expanded?: boolean;
};

export const TabsPanel = component$<Props>(({ expanded = false }) => {
  const id = nanoid();

  const store = useContext(TabsContext);

  useTask$(() => {
    store.panels[id] = {
      id,
      expanded,
    };
  });

  return (
    <div id={id} hidden={!store.panels[id].expanded}>
      <Slot />
    </div>
  );
});
