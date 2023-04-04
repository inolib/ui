// import { component$, Slot, useContext, useStore } from "@builder.io/qwik";
// import { TestContext } from "./TestMenu";

// type TestMenuItemStore = {
//   hidden: boolean;
// };

// type MenuItemProps = {
//   styles?: string;
// };

// export const TestMenuItem = component$<MenuItemProps>(({ styles }) => {
//   const context = useContext(TestContext);

//   console.log("hidden :", context.TestMenu.hidden);

//   return (
//     <li class={styles} hidden={context.TestMenu.hidden}>
//       <Slot />
//     </li>
//   );
// });
