import { type MenuButtonStore } from "~/components/Menu/MenuButton";
import { type MenuItemLinkStore } from "~/components/Menu/MenuItemLink";
import { type MenuItemsStore } from "~/components/Menu/MenuItems";
import type { Reference } from "~/types";
export declare const collapseQrl: import("@builder.io/qwik").QRL<(context: MenuContext) => void>;
export declare const expandQrl: import("@builder.io/qwik").QRL<(context: MenuContext) => void>;
export declare const focusQrl: import("@builder.io/qwik").QRL<(context: MenuContext, ref: Reference) => void>;
export declare const moveFocusQrl: import("@builder.io/qwik").QRL<(context: MenuContext, to: string) => Promise<void>>;
export type MenuContext = {
    Menu: MenuStore;
    MenuButton?: MenuButtonStore;
    MenuItemLink?: MenuItemLinkStore[];
    MenuItems?: MenuItemsStore;
};
type MenuProps = {
    readonly styles?: string;
};
type MenuStore = {
    focusable?: Reference;
    focused?: Reference;
};
export declare const contextId: import("@builder.io/qwik").ContextId<MenuContext>;
export declare const Menu: import("@builder.io/qwik").Component<MenuProps>;
export {};
//# sourceMappingURL=Menu.d.ts.map