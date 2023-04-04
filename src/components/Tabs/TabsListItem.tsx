import { $, component$, Slot, useContext, useOn, useStore, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";
import { moveFocusQrl } from "~/components/tabs/Tabs";
import { TabsContext } from "~/components/tabs/Tabs";

type TabsListItemProps = {
  readonly styles?: string;
};

export type TabsListItemStore = {
  readonly id: string;
};

export const TabsListItem = component$<TabsListItemProps>(({ styles }) => {
  const context = useContext(TabsContext);
  const store = useStore<TabsListItemStore>(
    {
      id: nanoid(),
    },
    { deep: true }
  );

  useOn(
    "keydown",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowLeft": {
          await moveFocusQrl(context, "previous");
          break;
        }

        case "ArrowRight": {
          await moveFocusQrl(context, "next");
          break;
        }
      }
    })
  );

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "End": {
          await moveFocusQrl(context, "last");
          break;
        }

        case "Home": {
          await moveFocusQrl(context, "first");
          break;
        }
      }
    })
  );

  useTask$(() => {
    context.TabsListItem = store;
  });

  return (
    <>
      <ul class={styles} id={store.id} preventdefault:keydown preventdefault:keyup role="tablist">
        <Slot />
      </ul>
    </>
  );
});
