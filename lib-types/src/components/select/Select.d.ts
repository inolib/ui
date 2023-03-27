import { type Signal } from "@builder.io/qwik";
import { type Composite } from "~/hooks/useComposite";
import { type Expandable } from "~/hooks/useExpandable";
type Props = {
    disabled?: boolean;
    multiple?: boolean;
    name?: string;
    readonly?: boolean;
    required?: boolean;
    styles?: string;
    value?: unknown;
};
type Ref = Signal<HTMLElement | undefined>;
type Store = Composite & Expandable & {
    activated: Array<Ref>;
    controls: string;
    disabled: boolean;
    multiple: boolean;
    trigger: Ref;
};
export declare const SelectContext: import("@builder.io/qwik").ContextId<Store>;
export declare const Select: import("@builder.io/qwik").Component<Props>;
export {};
//# sourceMappingURL=Select.d.ts.map