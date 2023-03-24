import { type Composite } from "~/hooks/useComposite";
import { type Expandable } from "~/hooks/useExpandable";
type Props = {
    isDisabled?: boolean;
    isMultiple?: boolean;
    name?: string;
    styles?: string;
    value?: unknown;
};
type Store = Composite & Expandable & {
    isDisabled: boolean;
    isMultiple: boolean;
};
export declare const SelectContext: import("@builder.io/qwik").ContextId<Store>;
export declare const Select: import("@builder.io/qwik").Component<Props>;
export {};
//# sourceMappingURL=Select.d.ts.map