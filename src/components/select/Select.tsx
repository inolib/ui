import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOn,
  useSignal,
  useStore,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";

import { type SelectButtonStore } from "~/components/Select/SelectButton";
import { type SelectOptionStore } from "~/components/Select/SelectOption";
import { type SelectOptionListStore } from "~/components/Select/SelectOptionList";
import type { JSON, Reference } from "~/types";

export type SelectContext = {
  Select: SelectStore;
  SelectButton?: SelectButtonStore;
  SelectOptionList?: SelectOptionListStore;
  SelectOption?: SelectOptionStore[];
};

type SelectProps = {
  readonly disabled?: boolean;
  readonly multiple?: boolean;
  readonly name?: string;
  readonly onChange$?: QRL<(value: string | undefined) => void>;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly styles?: string;
};

type SelectStore = Pick<Required<SelectProps>, "disabled" | "multiple" | "readonly"> & {
  focusable: Reference;
  stringified?: string | undefined;
  value: JSON | undefined;
};

export const collapseQrl = $((context: SelectContext) => {
  if (context.SelectButton !== undefined) {
    context.SelectButton.expanded = false;
  }
});

export const expandQrl = $((context: SelectContext) => {
  if (context.SelectButton !== undefined) {
    context.SelectButton.expanded = true;
  }
});

export const focusQrl = $((context: SelectContext, ref: Reference) => {
  const element = ref.value;

  if (element !== undefined) {
    context.Select.focusable = ref;
    element.focus();
  }
});

export const moveFocusQrl = $(async (context: SelectContext, to: string) => {
  const predicate = (to: string) => {
    switch (to) {
      case "first:selected":
      case "last:selected": {
        return (option: SelectOptionStore) => option.selected;
      }

      case "next":
      case "previous": {
        return (option: SelectOptionStore) => option.ref === context.Select.focusable;
      }
    }

    return () => false;
  };

  if (context.SelectOption !== undefined) {
    const _SelectOption = context.SelectOption.filter((option: SelectOptionStore) => !option.disabled);

    switch (to) {
      case "first": {
        if (_SelectOption.length > 0) {
          await focusQrl(context, _SelectOption[0].ref);
        }
        break;
      }

      case "first:selected": {
        const option = _SelectOption.find(predicate(to));

        if (option !== undefined) {
          await focusQrl(context, option.ref);
        } else {
          await moveFocusQrl(context, "first");
        }

        break;
      }

      case "last": {
        if (_SelectOption.length > 0) {
          await focusQrl(context, _SelectOption[_SelectOption.length - 1].ref);
        }
        break;
      }

      case "last:selected": {
        const option = _SelectOption.findLast(predicate(to));

        if (option !== undefined) {
          await focusQrl(context, option.ref);
        } else {
          await moveFocusQrl(context, "last");
        }

        break;
      }

      case "next": {
        const index = _SelectOption.findIndex(predicate(to));

        if (index > -1 && index < _SelectOption.length - 1) {
          await focusQrl(context, _SelectOption[index + 1].ref);
        }

        break;
      }

      case "previous": {
        const index = _SelectOption.findLastIndex(predicate(to));

        if (index > 0) {
          await focusQrl(context, _SelectOption[index - 1].ref);
        }

        break;
      }
    }
  }
});

export const contextId = createContextId<SelectContext>("inolib/ui/contexts/Select");

export const Select = component$<SelectProps>(
  ({ disabled = false, multiple = false, name, onChange$, readonly = false, required = false, styles }) => {
    const store = useStore<SelectStore>(
      {
        disabled,
        focusable: useSignal<HTMLElement>(),
        multiple,
        readonly,
        value: multiple ? [] : undefined,
      },
      { deep: true }
    );

    const context: SelectContext = {
      Select: store,
    };

    useContextProvider(contextId, context);

    useOn(
      "keyup",
      $(async (e) => {
        const event = e as KeyboardEvent;

        switch (event.code) {
          case "Escape": {
            if (context.SelectButton !== undefined) {
              await collapseQrl(context);
              await focusQrl(context, context.SelectButton.ref);
            }
            break;
          }
        }
      })
    );

    useVisibleTask$(
      async ({ track }) => {
        store.stringified = track(() => JSON.stringify(store.value));

        if (onChange$ !== undefined) {
          await onChange$(store.stringified);
        }
      },
      { strategy: "document-ready" }
    );

    return (
      <div class={styles} preventdefault:keydown preventdefault:keyup>
        <Slot />
        {name !== undefined ? <input name={name} required={required} type="hidden" value={store.stringified} /> : null}
      </div>
    );
  }
);
