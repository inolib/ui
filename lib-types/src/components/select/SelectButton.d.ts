import type { Reference } from "~/types";
type SelectButtonProps = {
    readonly styles?: string;
};
export type SelectButtonStore = {
    controls?: string;
    expanded: boolean;
    readonly id: string;
    readonly ref: Reference;
    slot?: string;
};
export declare const SelectButton: import("@builder.io/qwik").Component<SelectButtonProps>;
export {};
//# sourceMappingURL=SelectButton.d.ts.map