import {
  $,
  component$,
  Slot,
  useContext,
  useOn,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

import type { JSON, Reference } from "../../types";

import { contextId, focusQrl, type SelectContext } from "./Select";

type SelectOptionProps = {
  readonly disabled?: boolean;
  readonly selected?: boolean;
  readonly styles?: string;
  readonly value?: JSON;
};

export type SelectOptionStore = Pick<Required<SelectOptionProps>, "disabled"> & {
  readonly ref: Reference;
  selected: boolean;
  readonly value: JSON | undefined;
};

export const SelectOption = component$<SelectOptionProps>(({ disabled = false, selected = false, styles, value }) => {
  const toggleQrl = $(async (context: SelectContext, store: SelectOptionStore, selected?: boolean) => {
    if (!context.Select.multiple && selected !== false && context.SelectOption !== undefined) {
      const optionStore = context.SelectOption.find((store: SelectOptionStore) => store.selected);

      if (optionStore !== undefined && optionStore.ref !== store.ref) {
        optionStore.selected = false;
      }
    }

    store.selected = selected ?? !store.selected;

    if (context.SelectButton !== undefined) {
      if (context.Select.multiple) {
        if (store.value !== undefined) {
          const _value = context.Select.value.raw as JSON[];

          if (store.selected) {
            _value.push(store.value);
          } else {
            const index = _value.indexOf(store.value);

            if (index > -1) {
              _value.splice(index, 1);
            }
          }
        }
      } else {
        if (context.SelectButton.ref.value !== undefined) {
          if (store.selected && store.ref.value !== undefined) {
            context.Select.value.raw = store.value;
            context.SelectButton.ref.value.innerHTML = store.ref.value.innerHTML;
          } else if (selected !== false && context.SelectButton.slot !== undefined) {
            context.Select.value.raw = undefined;
            context.SelectButton.ref.value.innerHTML = context.SelectButton.slot;
          }
        }
      }
    }

    await focusQrl(context, store.ref);
  });

  const context = useContext(contextId);

  const store = useStore<SelectOptionStore>(
    {
      disabled: context.Select.disabled || disabled,
      ref: useSignal<HTMLElement>(),
      selected,
      value,
    },
    { deep: true }
  );

  if (!store.disabled && !context.Select.readonly) {
    useOn(
      "keyup",
      $(async (e) => {
        const event = e as KeyboardEvent;

        switch (event.code) {
          case "Space": {
            await toggleQrl(context, store);
            break;
          }
        }
      })
    );

    useOn(
      "click",
      $(async (e) => {
        const event = e as MouseEvent;

        if (event.detail > 0 && event.button === 0) {
          await toggleQrl(context, store);
        }
      })
    );
  }

  useTask$(() => {
    if (context.SelectOption === undefined) {
      context.SelectOption = [];
    }

    context.SelectOption.push(store);
  });

  useVisibleTask$(
    async () => {
      if (store.selected) {
        await toggleQrl(context, store, true);
      }
    },
    { strategy: "document-ready" }
  );

  return (
    <li
      aria-disabled={store.disabled}
      aria-selected={store.selected}
      class={styles}
      preventdefault:click
      preventdefault:keydown
      preventdefault:keyup
      ref={store.ref}
      role="option"
      tabIndex={store.ref === context.Select.focusable ? 0 : -1}
    >
      <Slot />
    </li>
  );
});
