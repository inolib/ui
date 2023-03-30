import { component$, Slot, useContext } from "@builder.io/qwik";

import { TabsContext } from "~/components/tabs/Tabs";

export const TabsItemList = component$(() => {
  const store = useContext(TabsContext);

  return (
    <ul role="tablist">
      <Slot />
    </ul>
  );
});
