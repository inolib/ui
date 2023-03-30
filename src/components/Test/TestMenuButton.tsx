import { $, component$, Slot, useContext, useOn } from "@builder.io/qwik";
import { TestContext } from "./TestMenu";

export const TestMenuButton = component$(() => {
  const context = useContext(TestContext);

  useOn(
    "click",
    $(async (e) => {
      const event = e as MouseEvent;
      if (event.detail > 0 && event.button === 0) {
        context.TestMenu.hidden = !context.TestMenu.hidden;
        context.TestMenu.expended = !context.TestMenu.expended;
      }
    })
  );

  console.log("expended :", context.TestMenu.expended);

  return (
    <button aria-expanded={context.TestMenu.expended}>
      <Slot />
    </button>
  );
});
