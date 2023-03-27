import { $, component$, Slot, useContext, useOn, useTask$ } from "@builder.io/qwik";
import { nanoid } from "nanoid";

import { SelectContext } from "~/components/select/Select";
import { useComposite } from "~/hooks/useComposite";

type Props = {
  styles?: string;
};

export const SelectOptionList = component$<Props>(({ styles }) => {
  const id = nanoid();

  const store = useContext(SelectContext);

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
    <ul
      aria-multiselectable={store.multiple}
      hidden={!store.expanded}
      id={id}
      role="listbox"
      {...(styles !== undefined ? { class: styles } : {})}
    >
      <Slot />
    </ul>

    // <>
    //   {store.expanded ? (
    //     <ul
    //       aria-multiselectable={store.multiple}
    //       id={id}
    //       role="listbox"
    //       {...(styles !== undefined ? { class: styles } : {})}
    //     >
    //       <Slot />
    //     </ul>
    //   ) : null}
    // </>
  );
});
