import type { Reference } from "~/types";
type SelectButtonProps = {
    readonly styles?: string;
};
export type SelectButtonStore = {
    expanded: boolean;
    readonly ref: Reference;
    slot: string;
};
export declare const SelectButton: import("@builder.io/qwik").Component<SelectButtonProps>;
export {};
//# sourceMappingURL=SelectButton.d.ts.map