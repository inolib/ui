import type { JSON, Reference } from "~/types";
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
export declare const SelectOption: import("@builder.io/qwik").Component<SelectOptionProps>;
export {};
//# sourceMappingURL=SelectOption.d.ts.map