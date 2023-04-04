import { type QRL } from "@builder.io/qwik";
import { type SelectButtonStore } from "~/components/Select/SelectButton";
import { type SelectLabelStore } from "~/components/Select/SelectLabel";
import { type SelectOptionStore } from "~/components/Select/SelectOption";
import { type SelectOptionsStore } from "~/components/Select/SelectOptions";
import type { JSON, Reference } from "~/types";
export declare const collapseQrl: QRL<(context: SelectContext) => void>;
export declare const expandQrl: QRL<(context: SelectContext) => void>;
export declare const focusQrl: QRL<(context: SelectContext, ref: Reference) => void>;
export declare const moveFocusQrl: QRL<(context: SelectContext, to: string) => Promise<void>>;
export type SelectContext = {
    Select: SelectStore;
    SelectButton?: SelectButtonStore;
    SelectLabel?: SelectLabelStore;
    SelectOption?: SelectOptionStore[];
    SelectOptions?: SelectOptionsStore;
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
export declare const contextId: import("@builder.io/qwik").ContextId<SelectContext>;
export declare const Select: import("@builder.io/qwik").Component<SelectProps>;
export {};
//# sourceMappingURL=Select.d.ts.map