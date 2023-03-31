import { type QRL } from "@builder.io/qwik";
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
export declare const collapseQrl: QRL<(context: SelectContext) => void>;
export declare const expandQrl: QRL<(context: SelectContext) => void>;
export declare const focusQrl: QRL<(context: SelectContext, ref: Reference) => void>;
export declare const moveFocusQrl: QRL<(context: SelectContext, to: string) => Promise<void>>;
export declare const contextId: import("@builder.io/qwik").ContextId<SelectContext>;
export declare const Select: import("@builder.io/qwik").Component<SelectProps>;
export {};
//# sourceMappingURL=Select.d.ts.map