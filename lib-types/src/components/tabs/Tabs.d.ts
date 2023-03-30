import { type Signal } from "@builder.io/qwik";
import { type Composite } from "~/hooks/useComposite";
type Panel = {
    id: string;
    expanded: boolean;
};
type Store = Composite & {
    panels: {
        [id: string]: Panel;
    };
    trigger: Signal<HTMLElement | undefined>;
};
export declare const TabsContext: import("@builder.io/qwik").ContextId<Store>;
export declare const Tabs: import("@builder.io/qwik").Component<Props>;
export {};
//# sourceMappingURL=Tabs.d.ts.map