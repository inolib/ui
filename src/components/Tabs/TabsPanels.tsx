import { component$, Slot } from "@builder.io/qwik";

export const TabsPanels = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
