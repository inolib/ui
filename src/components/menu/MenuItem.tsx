import { component$, Slot } from "@builder.io/qwik";

export const MenuItem = component$(() => {
  return (
    <li>
      <Slot />
    </li>
  );
});
