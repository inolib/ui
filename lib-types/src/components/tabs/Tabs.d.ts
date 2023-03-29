import { type Signal } from "@builder.io/qwik";
import { type Composite } from "~/hooks/useComposite";
import { type Expandable } from "~/hooks/useExpandable";
type Store = Composite & Expandable & {
    trigger: Signal<HTMLElement | undefined>;
};
export declare const TabsContext: import("@builder.io/qwik").ContextId<Store>;
export declare const Tabs: import("@builder.io/qwik").Component<{}>;
export {};
//# sourceMappingURL=Tabs.d.ts.map