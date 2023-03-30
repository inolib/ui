import { type Signal } from "@builder.io/qwik";
import { type Composite } from "~/hooks/useComposite";
import { type Expandable } from "~/hooks/useExpandable";
type Props = {
    styles?: string;
    value?: Value;
};
type Ref = Signal<HTMLElement | undefined>;
type Store = Composite & Expandable & {
    activated: Array<{
        id: string;
        ref: Ref;
        value: Value;
    }>;
    controls: string;
    trigger: Ref;
};
export type Value = string | Record<string, boolean | number | string>;
export declare const MenuContext: import("@builder.io/qwik").ContextId<Store>;
export declare const Menu: import("@builder.io/qwik").Component<Props>;
export {};
//# sourceMappingURL=Menu.d.ts.map