import { component$, Slot } from "@builder.io/qwik";

export const TabsListItem = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
