// import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";

// import { TabsContext } from "~/components/tabs/Tabs";

// export type TabListStore = {};

// export const TabList = component$(() => {
//   const context = useContext(TabsContext);

//   const store = useStore<TabListStore>({}, { deep: true });

//   useTask$(() => {
//     context.TabList = store;
//   });

//   return (
//     <ul role="tablist">
//       <Slot />
//     </ul>
//   );
// });
