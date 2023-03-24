import { inlinedQrl, useLexicalScope, createContextId, componentQrl, useStore, useSignal, useContextProvider, useOn, _jsxQ, _jsxC, Slot, useContext, useVisibleTaskQrl, _fnSignal, _jsxBranch } from "@builder.io/qwik";
import { Fragment } from "@builder.io/qwik/jsx-runtime";
const useComposite = (store) => {
  const focus$ = /* @__PURE__ */ inlinedQrl((ref) => {
    var _a;
    const [store2] = useLexicalScope();
    (_a = ref.value) == null ? void 0 : _a.focus();
    store2.focusable = ref;
  }, "useComposite_focus_Ee0OrnQbGKQ", [
    store
  ]);
  const moveFocus$ = /* @__PURE__ */ inlinedQrl(async (to) => {
    const [focus$2, store2] = useLexicalScope();
    const isFocusable = (ref) => ref === store2.focusable;
    const isSelected = (ref) => {
      var _a;
      return ((_a = ref.value) == null ? void 0 : _a.ariaSelected) === "true";
    };
    switch (to) {
      case "first":
        await focus$2(store2.navigables[0]);
        break;
      case "first:selected": {
        const ref = store2.navigables.find(isSelected);
        if (ref !== void 0)
          await focus$2(ref);
        else
          await focus$2(store2.navigables[0]);
        break;
      }
      case "last":
        await focus$2(store2.navigables[store2.navigables.length - 1]);
        break;
      case "last:selected": {
        const ref = store2.navigables.findLast(isSelected);
        if (ref !== void 0)
          await focus$2(ref);
        else
          await focus$2(store2.navigables[store2.navigables.length - 1]);
        break;
      }
      case "next": {
        const index = store2.navigables.findIndex(isFocusable);
        if (0 <= index && index <= store2.navigables.length - 2)
          await focus$2(store2.navigables[index + 1]);
        break;
      }
      case "previous": {
        const index = store2.navigables.findLastIndex(isFocusable);
        if (index >= 1)
          await focus$2(store2.navigables[index - 1]);
        break;
      }
    }
  }, "useComposite_moveFocus_DjWeyU2pe0k", [
    focus$,
    store
  ]);
  const toggle$ = /* @__PURE__ */ inlinedQrl((ref) => {
    const element = ref.value;
    if (element !== void 0)
      element.ariaSelected = element.ariaSelected === "true" ? "false" : "true";
  }, "useComposite_toggle_3HS0f2kdVDI");
  return {
    focus$,
    moveFocus$,
    toggle$
  };
};
const useExpandable = (store) => {
  const collapse$ = /* @__PURE__ */ inlinedQrl(() => {
    const [store2] = useLexicalScope();
    store2.isExpanded = false;
  }, "useExpandable_collapse_qlwpus32Wbw", [
    store
  ]);
  const expand$ = /* @__PURE__ */ inlinedQrl(() => {
    const [store2] = useLexicalScope();
    store2.isExpanded = true;
  }, "useExpandable_expand_E943Ry6sAUU", [
    store
  ]);
  return {
    collapse$,
    expand$
  };
};
const SelectContext = createContextId("inolib/ui/contexts/Select");
const Select = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const store = useStore({
    focusable: useSignal(),
    isDisabled: props.isDisabled ?? false,
    isExpanded: false,
    isMultiple: props.isMultiple ?? false,
    navigables: [],
    trigger: useSignal()
  }, {
    deep: true
  });
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  useContextProvider(SelectContext, store);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, expandable2, store2] = useLexicalScope();
    switch (e.code) {
      case "Escape":
        await expandable2.collapse$();
        await composite2.focus$(store2.trigger);
        break;
    }
  }, "Select_component_useOn_0EN8t4iEzQc", [
    composite,
    expandable,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("div", {
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, null, /* @__PURE__ */ _jsxC(Slot, null, 3, "nS_0"), 0, "nS_1");
}, "Select_component_mQAMYP6o6YY"));
const SelectButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const ref = useSignal();
  const _store = {
    useOn: {
      mouseup: false
    }
  };
  const store = useContext(SelectContext);
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, expandable2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case "Space":
        await expandable2.expand$();
        await composite2.moveFocus$(e.code !== "ArrowUp" ? "first:selected" : "last:selected");
        break;
    }
  }, "SelectButton_component_useOn_lAno1fC6fwo", [
    composite,
    expandable
  ]));
  useOn("mousedown", /* @__PURE__ */ inlinedQrl(() => {
    const [_store2] = useLexicalScope();
    _store2.useOn.mouseup = true;
  }, "SelectButton_component_useOn_1_A2Ce00dP0do", [
    _store
  ]));
  useOn("mouseup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [_store2, composite2, expandable2, store2] = useLexicalScope();
    if (_store2.useOn.mouseup) {
      if (e.button === 0) {
        if (store2.isExpanded) {
          await expandable2.collapse$();
          await composite2.focus$(store2.trigger);
        } else {
          await expandable2.expand$();
          await composite2.moveFocus$("first:selected");
        }
      }
      _store2.useOn.mouseup = false;
    }
  }, "SelectButton_component_useOn_2_ww5oeJwbsRA", [
    _store,
    composite,
    expandable,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "SelectButton_component_useVisibleTask_Gs8o0ZBbw68", [
    ref,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("button", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-expanded": _fnSignal((p0) => p0.isExpanded, [
      store
    ], "p0.isExpanded"),
    disabled: _fnSignal((p0) => p0.isDisabled, [
      store
    ], "p0.isDisabled"),
    tabIndex: _fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1"),
    type: "button"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "KI_0"), 0, "KI_1");
}, "SelectButton_component_0lJYuR2b1bo"));
const SelectOption = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  var _a;
  const ref = useSignal();
  const store = useContext(SelectContext);
  const composite = useComposite(store);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, ref2] = useLexicalScope();
    switch (e.code) {
      case "Space":
        await composite2.toggle$(ref2);
        break;
    }
  }, "SelectOption_component_useOn_2ejR4NRQfN4", [
    composite,
    ref
  ]));
  useOn("mouseup", /* @__PURE__ */ inlinedQrl(async () => {
    const [composite2, ref2] = useLexicalScope();
    await composite2.focus$(ref2);
    await composite2.toggle$(ref2);
  }, "SelectOption_component_useOn_1_W08hsflEaBM", [
    composite,
    ref
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.navigables.push(ref2);
  }, "SelectOption_component_useVisibleTask_S3MauFqBNk0", [
    ref,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("li", {
    ...!(props.isDisabled ?? false) ? {
      "aria-selected": ((_a = ref.value) == null ? void 0 : _a.ariaSelected) === "true"
    } : {},
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-disabled": _fnSignal((p0) => p0.isDisabled ?? false, [
      props
    ], "p0.isDisabled??false"),
    role: "option",
    tabIndex: _fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0t_0"), 0, "0t_1");
}, "SelectOption_component_oNCGC8p0Mn4"));
const SelectOptionList = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  _jsxBranch();
  const store = useContext(SelectContext);
  const composite = useComposite(store);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
        await composite2.moveFocus$("next");
        break;
      case "ArrowUp":
        await composite2.moveFocus$("previous");
        break;
    }
  }, "SelectOptionList_component_useOn_Bce0X6C0wk4", [
    composite
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: store.isExpanded ? /* @__PURE__ */ _jsxQ("ul", {
      ...props.styles !== void 0 ? {
        class: props.styles
      } : {}
    }, {
      "aria-multiselectable": _fnSignal((p0) => p0.isMultiple, [
        store
      ], "p0.isMultiple"),
      role: "listbox"
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "Gy_0"), 0, "Gy_1") : null
  }, 1, "Gy_2");
}, "SelectOptionList_component_JZ5mpGpHNWU"));
export {
  Select,
  SelectButton,
  SelectOption,
  SelectOptionList
};
