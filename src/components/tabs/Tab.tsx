// import { $, component$, Slot, useOn, useSignal, useContext, useTask$ } from "@builder.io/qwik";
// import { useComposite } from "~/hooks/useComposite";
// import { useToggle } from "~/hooks/useToggle";
// import { TabsContext } from "~/components/tabs/Tabs";

// type TabProps = {
//   readonly controls: string;
//   readonly expanded?: boolean;
// };

// export type TabStore = {
//   controls: string;
//   expanded: boolean;
// };

// export const Tab = component$<TabProps>(({ controls, expanded = false }) => {
//   const context = useContext(TabsContext);

//   const store = useStore<TabStore>(
//     {
//       controls,
//       expanded,
//     },
//     { deep: true }
//   );

//   const expand$ = $((panelId: string) => {
//     // TODO
//   });

//   useOn(
//     "click",
//     $(async (e) => {
//       const event = e as MouseEvent;

//       if (event.detail > 0 && event.button === 0) {
//         await toggle$(ref, "pressed");
//       }
//     })
//   );

//   useOn(
//     "keyup",
//     $(async (e) => {
//       const event = e as KeyboardEvent;

//       switch (event.code) {
//         case "Enter":
//         case "Space": {
//           await expand$(/* panelId */);
//           break;
//         }
//       }
//     })
//   );

//   useTask$(() => {
//     context.Tab.push(store);
//   });

//   return (
//     <li aria-controls={store.controls} aria-expanded={store.expanded} role="tab">
//       <Slot />
//     </li>
//   );
// });
