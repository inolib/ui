"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const useComposite = (store) => {
  const focus$ = /* @__PURE__ */ qwik.inlinedQrl((ref) => {
    var _a;
    const [store2] = qwik.useLexicalScope();
    (_a = ref.value) == null ? void 0 : _a.focus();
    store2.focusable = ref;
  }, "useComposite_focus_Ee0OrnQbGKQ", [
    store
  ]);
  const moveFocus$ = /* @__PURE__ */ qwik.inlinedQrl(async (to) => {
    const [focus$2, store2] = qwik.useLexicalScope();
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
  const toggle$ = /* @__PURE__ */ qwik.inlinedQrl((ref) => {
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
  const collapse$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [store2] = qwik.useLexicalScope();
    store2.isExpanded = false;
  }, "useExpandable_collapse_qlwpus32Wbw", [
    store
  ]);
  const expand$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [store2] = qwik.useLexicalScope();
    store2.isExpanded = true;
  }, "useExpandable_expand_E943Ry6sAUU", [
    store
  ]);
  return {
    collapse$,
    expand$
  };
};
const SelectContext = qwik.createContextId("inolib/ui/contexts/Select");
const Select = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const store = qwik.useStore({
    focusable: qwik.useSignal(),
    isDisabled: props.isDisabled ?? false,
    isExpanded: false,
    isMultiple: props.isMultiple ?? false,
    navigables: [],
    trigger: qwik.useSignal()
  }, {
    deep: true
  });
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  qwik.useContextProvider(SelectContext, store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2, store2] = qwik.useLexicalScope();
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
  return /* @__PURE__ */ qwik._jsxQ("div", {
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, null, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "nS_0"), 0, "nS_1");
}, "Select_component_mQAMYP6o6YY"));
const SelectButton = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const ref = qwik.useSignal();
  const _store = {
    useOn: {
      mouseup: false
    }
  };
  const store = qwik.useContext(SelectContext);
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2] = qwik.useLexicalScope();
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
  qwik.useOn("mousedown", /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [_store2] = qwik.useLexicalScope();
    _store2.useOn.mouseup = true;
  }, "SelectButton_component_useOn_1_A2Ce00dP0do", [
    _store
  ]));
  qwik.useOn("mouseup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [_store2, composite2, expandable2, store2] = qwik.useLexicalScope();
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
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [ref2, store2] = qwik.useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "SelectButton_component_useVisibleTask_Gs8o0ZBbw68", [
    ref,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ qwik._jsxQ("button", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-expanded": qwik._fnSignal((p0) => p0.isExpanded, [
      store
    ], "p0.isExpanded"),
    disabled: qwik._fnSignal((p0) => p0.isDisabled, [
      store
    ], "p0.isDisabled"),
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1"),
    type: "button"
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "KI_0"), 0, "KI_1");
}, "SelectButton_component_0lJYuR2b1bo"));
const SelectOption = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  var _a;
  const ref = qwik.useSignal();
  const store = qwik.useContext(SelectContext);
  const composite = useComposite(store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, ref2] = qwik.useLexicalScope();
    switch (e.code) {
      case "Space":
        await composite2.toggle$(ref2);
        break;
    }
  }, "SelectOption_component_useOn_2ejR4NRQfN4", [
    composite,
    ref
  ]));
  qwik.useOn("mouseup", /* @__PURE__ */ qwik.inlinedQrl(async () => {
    const [composite2, ref2] = qwik.useLexicalScope();
    await composite2.focus$(ref2);
    await composite2.toggle$(ref2);
  }, "SelectOption_component_useOn_1_W08hsflEaBM", [
    composite,
    ref
  ]));
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [ref2, store2] = qwik.useLexicalScope();
    store2.navigables.push(ref2);
  }, "SelectOption_component_useVisibleTask_S3MauFqBNk0", [
    ref,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ qwik._jsxQ("li", {
    ...!(props.isDisabled ?? false) ? {
      "aria-selected": ((_a = ref.value) == null ? void 0 : _a.ariaSelected) === "true"
    } : {},
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-disabled": qwik._fnSignal((p0) => p0.isDisabled ?? false, [
      props
    ], "p0.isDisabled??false"),
    role: "option",
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "0t_0"), 0, "0t_1");
}, "SelectOption_component_oNCGC8p0Mn4"));
const SelectOptionList = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik._jsxBranch();
  const store = qwik.useContext(SelectContext);
  const composite = useComposite(store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2] = qwik.useLexicalScope();
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
  return /* @__PURE__ */ qwik._jsxC(jsxRuntime.Fragment, {
    children: store.isExpanded ? /* @__PURE__ */ qwik._jsxQ("ul", {
      ...props.styles !== void 0 ? {
        class: props.styles
      } : {}
    }, {
      "aria-multiselectable": qwik._fnSignal((p0) => p0.isMultiple, [
        store
      ], "p0.isMultiple"),
      role: "listbox"
    }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "Gy_0"), 0, "Gy_1") : null
  }, 1, "Gy_2");
}, "SelectOptionList_component_JZ5mpGpHNWU"));
exports.Select = Select;
exports.SelectButton = SelectButton;
exports.SelectOption = SelectOption;
exports.SelectOptionList = SelectOptionList;
