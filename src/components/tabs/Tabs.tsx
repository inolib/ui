// import {
//   $,
//   component$,
//   createContextId,
//   Slot,
//   useContextProvider,
//   useOn,
//   useSignal,
//   useStore,
//   type Signal,
// } from "@builder.io/qwik";

// import { type TabListStore } from "~/components/tabs/TabList";
// import { type TabStore } from "~/components/tabs/Tab";
// import { type TabPanelsStore } from "~/components/tabs/TabPanels";
// import { type TabPanelStore } from "~/components/tabs/TabPanel";

// type Context = {
//   Tabs: TabsStore;
//   TabList?: TabListStore;
//   Tab?: TabStore[];
//   TabPanels?: TabPanelsStore;
//   TabPanel?: TabPanelStore[];
// };

// type TabsStore = {};

// export const TabsContext = createContextId<TabsStore>("inolib/ui/contexts/Tabs");

// export const Tabs = component$(() => {
//   const context = {
//     Tabs: useStore<TabsStore>(
//       {
//         // TODO
//       },
//       { deep: true }
//     ),
//     TabList: useStore<TabListStore>({}),
//     Tab: [],
//     TabPanels: useStore<TabPanelsStore>({}),
//     TabPanel: [],
//   };

//   // const store = useStore<Store>(
//   //   {
//   //     panels: [],
//   //     focusable: useSignal<HTMLElement>(),
//   //     navigables: [],
//   //     trigger: useSignal<HTMLElement>(),
//   //   },
//   //   { deep: true }
//   // );

//   // const { collapse$ } = useExpandable(store);
//   // const { focus$ } = useComposite(store);
//   // const { toggle$ } = useToggle();

//   useContextProvider(TabsContext, context);

//   return (
//     <div>
//       <Slot />
//     </div>
//   );
// });

// {
//   /* <Tabs>
//   <TabList>
//     <Tab controls="1" expanded={true}></Tab>
//     <Tab controls="2"></Tab>
//     <Tab controls="3"></Tab>
//   </TabList>
//   <TabPanels>
//     <TabPanel id="1"></TabPanel>
//     <TabPanel id="2"></TabPanel>
//     <TabPanel id="3"></TabPanel>
//   </TabPanels>
// </Tabs>;

// <Menu>
//   <MenuButton aria-controls="item" aria-expanded={}></MenuButton>
//   <MenuItem id="item" hidden={}></MenuItem>
// </Menu>; */
// }
