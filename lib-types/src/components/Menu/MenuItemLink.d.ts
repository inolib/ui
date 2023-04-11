import type { Reference } from "~/types";
type MenuItemLinkProps = {
    readonly href: string;
    readonly styles?: string;
};
export type MenuItemLinkStore = {
    readonly ref: Reference;
    readonly selected: boolean;
};
export declare const MenuItemLink: import("@builder.io/qwik").Component<MenuItemLinkProps>;
export {};
//# sourceMappingURL=MenuItemLink.d.ts.map