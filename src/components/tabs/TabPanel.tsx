// import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
// import { nanoid } from "nanoid";

// import { TabsContext } from "~/components/tabs/Tabs";
// import { TabStore } from "~/components/tabs/Tab";

// type TabPanelStore = {};

// type TabPanelProps = {
//   expanded: boolean;
//   readonly id: string;
// };

// export const TabPanel = component$<TabPanelProps>(({ id }) => {
//   const context = useContext(TabsContext);

//   const store = useStore<TabPanelStore>(
//     {
//       expanded: false,
//       id,
//     },
//     { deep: true }
//   );

//   useTask$(() => {
//     context.TabPanel.push(store);

//     const tabStore = context.Tab.find((tabStore: TabStore) => tabStore.controls === store.id);
//     store.expanded = tabStore.expanded;
//   });

//   return (
//     <div id={store.id} hidden={store.expanded}>
//       <Slot />
//     </div>
//   );
// });
