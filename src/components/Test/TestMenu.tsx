// import { component$, createContextId, Slot, useContextProvider, useStore } from "@builder.io/qwik";
// import { type TestMenuItem } from "~/components/Test/TestMenuItem";
// import { type TestMenuButton } from "~/components/Test/TestMenuButton";

// export const TestContext = createContextId<Contexts>("inolib/ui/contexts/Test");

// type Contexts = {
//   TestMenu: TestStore;
// };

// type TestStore = {
//   hidden: boolean;
//   expended: boolean;
// };

// export const TestMenu = component$(() => {
//   const context = {
//     TestMenu: useStore<TestStore>(
//       {
//         hidden: true,
//         expended: false,
//       },
//       { deep: true }
//     ),
//   };
//   useContextProvider(TestContext, context);
//   return (
//     <div>
//       <Slot />
//     </div>
//   );
// });
