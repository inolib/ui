import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useOn,
  useStore,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";

import { type SelectButtonStore } from "~/components/Select/SelectButton";
import { type SelectLabelStore } from "~/components/Select/SelectLabel";
import { type SelectOptionStore } from "~/components/Select/SelectOption";
import { type SelectOptionListStore } from "~/components/Select/SelectOptionList";
import { useFocus } from "~/hooks/useFocus";
import { useTab } from "~/hooks/useTab";
import type { JSON, Reference } from "~/types";

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
  context.Select.focusable = ref;
  context.Select.focused = ref;
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

export type SelectContext = {
  Select: SelectStore;
  SelectButton?: SelectButtonStore;
  SelectLabel?: SelectLabelStore;
  SelectOption?: SelectOptionStore[];
  SelectOptionList?: SelectOptionListStore;
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
  focusable?: Reference;
  focused?: Reference;
  value: {
    raw: JSON | undefined;
    stringified?: string | undefined;
  };
};

export const contextId = createContextId<SelectContext>("inolib/ui/contexts/Select");

export const Select = component$<SelectProps>(
  ({ disabled = false, multiple = false, name, onChange$, readonly = false, required = false, styles }) => {
    const store = useStore<SelectStore>(
      {
        disabled,
        multiple,
        readonly,
        value: {
          raw: multiple ? [] : undefined,
        },
      },
      { deep: true }
    );

    const context: SelectContext = {
      Select: store,
    };

    useContextProvider(contextId, context);

    useFocus(store);
    useTab();

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
        store.value.stringified = track(() => JSON.stringify(store.value.raw));

        if (onChange$ !== undefined) {
          await onChange$(store.value.stringified);
        }
      },
      { strategy: "document-ready" }
    );

    return (
      <div class={styles} preventdefault:keydown preventdefault:keyup>
        <Slot />
        {name !== undefined ? (
          <input name={name} required={required} type="hidden" value={store.value.stringified} />
        ) : null}
      </div>
    );
  }
);
