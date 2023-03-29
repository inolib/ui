import { $, component$, Slot, useContext, useOn, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { MenuContext } from "~/components/menu/Menu";
import { useComposite } from "~/hooks/useComposite";

type Props = {
  styles?: string;
};

export const MenuItemList = component$<Props>(({ styles }) => {
  const store = useContext(MenuContext);
  const id = nanoid();

  const { moveFocus$ } = useComposite(store);

  useOn(
    "keyup",
    $(async (e) => {
      const event = e as KeyboardEvent;

      switch (event.code) {
        case "ArrowDown": {
          await moveFocus$("next");
          break;
        }

        case "ArrowUp": {
          await moveFocus$("previous");
          break;
        }

        case "End": {
          await moveFocus$("last");
          break;
        }

        case "Home": {
          await moveFocus$("first");
          break;
        }
      }
    })
  );

  useTask$(() => {
    store.controls = id;
  });

  return (
    <ul hidden={!store.expanded} id={id} {...(styles !== undefined ? { class: styles } : {})}>
      <Slot />
    </ul>
  );
});
