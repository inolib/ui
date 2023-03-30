import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOn,
  useSignal,
  useStore,
  type Signal,
} from "@builder.io/qwik";

import { useComposite, type Composite } from "~/hooks/useComposite";
import { useExpandable, type Expandable } from "~/hooks/useExpandable";
import { useToggle } from "~/hooks/useToggle";

type Panel = {
  id: string;
  expanded: boolean;
};

type Store = Composite & {
  panels: { [id: string]: Panel };
  trigger: Signal<HTMLElement | undefined>;
};

export const TabsContext = createContextId<Store>("inolib/ui/contexts/Tabs");

export const Tabs = component$(() => {
  const ref = useSignal<HTMLElement>();
  const store = useStore<Store>(
    {
      panels: [],
      focusable: useSignal<HTMLElement>(),
      navigables: [],
      trigger: useSignal<HTMLElement>(),
    },
    { deep: true }
  );

  const { collapse$ } = useExpandable(store);
  const { focus$ } = useComposite(store);
  const { toggle$ } = useToggle();

  useContextProvider(TabsContext, store);

  return (
    <div>
      <Slot />
    </div>
  );
});

<Tabs>
  <TabsItemList>
    <TabsItem></TabsItem>
    <TabsItem></TabsItem>
    <TabsItem></TabsItem>
  </TabsItemList>
  <TabsPanels>
    <TabPanel expanded={true}></TabPanel>
    <TabPanel></TabPanel>
    <TabPanel></TabPanel>
    <TabPanel></TabPanel>
  </TabsPanels>
</Tabs>;
