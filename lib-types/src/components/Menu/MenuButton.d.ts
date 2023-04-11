import type { Reference } from "~/types";
type MenuButtonProps = {
    readonly styles?: string;
};
export type MenuButtonStore = {
    controls?: string | undefined;
    expanded: boolean;
    readonly ref: Reference;
};
export declare const MenuButton: import("@builder.io/qwik").Component<MenuButtonProps>;
export {};
//# sourceMappingURL=MenuButton.d.ts.map