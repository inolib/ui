"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const useComposite = (store) => {
  const _store = {
    focusable: store.focusable
  };
  const focus$ = /* @__PURE__ */ qwik.inlinedQrl(async (ref, from = "next") => {
    const [_store2, store2] = qwik.useLexicalScope();
    const whenDisabled = async (from2) => {
      switch (from2) {
        case "first":
        case "next":
          await moveFocus$("next");
          break;
        case "last":
        case "previous":
          await moveFocus$("previous");
          break;
        case "first:checked":
        case "first:pressed":
        case "first:selected":
        case "next:checked":
        case "next:pressed":
        case "next:selected":
          await moveFocus$(from2.replace("first", "next"));
          break;
        case "last:checked":
        case "last:pressed":
        case "last:selected":
        case "previous:checked":
        case "previous:pressed":
        case "previous:selected":
          await moveFocus$(from2.replace("last", "previous"));
          break;
      }
    };
    const element = ref.value;
    _store2.focusable = ref;
    switch (element == null ? void 0 : element.tagName) {
      case "BUTTON":
      case "FIELDSET":
      case "INPUT":
      case "OPTGROUP":
      case "OPTION":
      case "SELECT":
      case "TEXTAREA":
        if (element.disabled) {
          await whenDisabled(from);
          return;
        }
        break;
      default:
        if ((element == null ? void 0 : element.ariaDisabled) === "true") {
          await whenDisabled(from);
          return;
        }
        break;
    }
    store2.focusable = _store2.focusable;
    element == null ? void 0 : element.focus();
  }, "useComposite_focus_Ee0OrnQbGKQ", [
    _store,
    store
  ]);
  const moveFocus$ = /* @__PURE__ */ qwik.inlinedQrl(async (to) => {
    const [_store2, focus$2, store2] = qwik.useLexicalScope();
    const predicate = (to2) => {
      switch (to2) {
        case "first:checked":
        case "last:checked":
        case "next:checked":
        case "previous:checked":
          return (ref) => {
            const element = ref.value;
            if (element.tagName === "INPUT") {
              if (element.type === "checkbox" || element.type === "radio")
                return element.checked;
            }
            return element.ariaChecked === "true";
          };
        case "first:pressed":
        case "last:pressed":
        case "next:pressed":
        case "previous:pressed":
          return (ref) => {
            var _a;
            return ((_a = ref.value) == null ? void 0 : _a.ariaPressed) === "true";
          };
        case "first:selected":
        case "last:selected":
        case "next:selected":
        case "previous:selected":
          return (ref) => {
            var _a;
            return ((_a = ref.value) == null ? void 0 : _a.ariaSelected) === "true";
          };
      }
      return () => false;
    };
    switch (to) {
      case "first":
        await focus$2(store2.navigables[0], to);
        break;
      case "first:checked":
      case "first:pressed":
      case "first:selected":
        await focus$2(store2.navigables.find(predicate(to)) ?? store2.navigables[0], to);
        break;
      case "last":
        await focus$2(store2.navigables[store2.navigables.length - 1], to);
        break;
      case "last:checked":
      case "last:pressed":
      case "last:selected":
        await focus$2(store2.navigables.findLast(predicate(to)) ?? store2.navigables[store2.navigables.length - 1], to);
        break;
      case "next": {
        const index = store2.navigables.indexOf(_store2.focusable);
        if (0 <= index && index <= store2.navigables.length - 2)
          await focus$2(store2.navigables[index + 1], to);
        break;
      }
      case "next:checked":
      case "next:pressed":
      case "next:selected": {
        const navigables = store2.navigables.slice(store2.navigables.indexOf(_store2.focusable) + 1);
        const index = navigables.findIndex(predicate(to));
        if (index >= 0)
          await focus$2(navigables[index], to);
        break;
      }
      case "previous": {
        const index = store2.navigables.lastIndexOf(_store2.focusable);
        if (index >= 1)
          await focus$2(store2.navigables[index - 1], to);
        break;
      }
      case "previous:checked":
      case "previous:pressed":
      case "previous:selected": {
        const navigables = store2.navigables.slice(0, store2.navigables.lastIndexOf(_store2.focusable));
        const index = navigables.findLastIndex(predicate(to));
        if (index >= 0)
          await focus$2(navigables[index], to);
        break;
      }
    }
  }, "useComposite_moveFocus_DjWeyU2pe0k", [
    _store,
    focus$,
    store
  ]);
  return {
    focus$,
    moveFocus$
  };
};
const useExpandable = (store) => {
  const collapse$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [store2] = qwik.useLexicalScope();
    store2.expanded = false;
  }, "useExpandable_collapse_qlwpus32Wbw", [
    store
  ]);
  const expand$ = /* @__PURE__ */ qwik.inlinedQrl(() => {
    const [store2] = qwik.useLexicalScope();
    store2.expanded = true;
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
    activated: [],
    controls: "",
    disabled: props.disabled ?? false,
    focusable: qwik.useSignal(),
    expanded: false,
    multiple: props.multiple ?? false,
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
  qwik._jsxBranch();
  const ref = qwik.useSignal();
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
  qwik.useOn("click", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2, store2] = qwik.useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await expandable2.collapse$();
        await composite2.focus$(store2.trigger);
      } else {
        await expandable2.expand$();
        await composite2.moveFocus$("first:selected");
      }
    }
  }, "SelectButton_component_useOn_1_A2Ce00dP0do", [
    composite,
    expandable,
    store
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [ref2, store2] = qwik.useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "SelectButton_component_useTask_Qagm8oBaZds", [
    ref,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("button", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-controls": qwik._fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-expanded": qwik._fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    "aria-haspopup": "listbox",
    disabled: qwik._fnSignal((p0) => p0.disabled, [
      store
    ], "p0.disabled"),
    role: "combobox",
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1"),
    type: "button"
  }, !store.multiple ? store.activated.length === 1 && store.activated[0].value !== void 0 ? store.activated[0].value.innerHTML : /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "KI_0") : /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "KI_1"), 0, "KI_2");
}, "SelectButton_component_0lJYuR2b1bo"));
const useToggle = () => {
  const toggle$ = /* @__PURE__ */ qwik.inlinedQrl((ref, state) => {
    const element = ref.value;
    if (element !== void 0)
      switch (state) {
        case "checked":
          if (element.tagName === "INPUT") {
            const input = element;
            if (element.type === "checkbox" || element.type === "radio") {
              input.checked = !element.checked;
              break;
            }
          }
          element.ariaChecked = element.ariaChecked === "true" ? "false" : "true";
          break;
        case "pressed":
          element.ariaPressed = element.ariaPressed === "true" ? "false" : "true";
          break;
        case "selected":
          element.ariaSelected = element.ariaSelected === "true" ? "false" : "true";
          break;
      }
  }, "useToggle_toggle_M1OaZpua2wY");
  return {
    toggle$
  };
};
const SelectOption = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const ref = qwik.useSignal();
  const store = qwik.useContext(SelectContext);
  const composite = useComposite(store);
  const toggle = useToggle();
  const doToggle$ = /* @__PURE__ */ qwik.inlinedQrl(async () => {
    var _a;
    const [composite2, ref2, store2, toggle2] = qwik.useLexicalScope();
    if (!store2.multiple && store2.activated.length === 1 && store2.activated[0] !== ref2) {
      await toggle2.toggle$(store2.activated[0], "selected");
      store2.activated.pop();
    }
    await toggle2.toggle$(ref2, "selected");
    if (((_a = ref2.value) == null ? void 0 : _a.ariaSelected) === "true")
      store2.activated.push(ref2);
    else {
      const index = store2.activated.indexOf(ref2);
      if (index >= 0)
        store2.activated.splice(index, 1);
    }
    await composite2.focus$(ref2);
  }, "SelectOption_component_doToggle_auCS0ZPb0lc", [
    composite,
    ref,
    store,
    toggle
  ]);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [doToggle$2] = qwik.useLexicalScope();
    switch (e.code) {
      case "Space":
        await doToggle$2();
        break;
    }
  }, "SelectOption_component_useOn_2ejR4NRQfN4", [
    doToggle$
  ]));
  qwik.useOn("click", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [doToggle$2] = qwik.useLexicalScope();
    if (e.detail > 0)
      await doToggle$2();
  }, "SelectOption_component_useOn_1_W08hsflEaBM", [
    doToggle$
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [props2, ref2, store2] = qwik.useLexicalScope();
    if (props2.selected ?? false)
      store2.activated.push(ref2);
    store2.navigables.push(ref2);
  }, "SelectOption_component_useTask_ED8lQx5Hen0", [
    props,
    ref,
    store
  ]));
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [props2, ref2] = qwik.useLexicalScope();
    if (props2.selected ?? false) {
      const element = ref2.value;
      if (element !== void 0)
        element.ariaSelected = "true";
    }
  }, "SelectOption_component_useVisibleTask_S3MauFqBNk0", [
    props,
    ref
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ qwik._jsxQ("li", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-disabled": qwik._fnSignal((p0) => p0.disabled ?? false, [
      props
    ], "p0.disabled??false"),
    role: "option",
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "0t_0"), 0, "0t_1");
}, "SelectOption_component_oNCGC8p0Mn4"));
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
const SelectOptionList = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik._jsxBranch();
  const id = nanoid();
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
      case "End":
        await composite2.moveFocus$("last");
        break;
      case "Home":
        await composite2.moveFocus$("first");
        break;
    }
  }, "SelectOptionList_component_useOn_Bce0X6C0wk4", [
    composite
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [id2, store2] = qwik.useLexicalScope();
    store2.controls = id2;
  }, "SelectOptionList_component_useTask_r7g0i0jeDiI", [
    id,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxC(jsxRuntime.Fragment, {
    children: store.expanded ? /* @__PURE__ */ qwik._jsxQ("ul", {
      id,
      ...props.styles !== void 0 ? {
        class: props.styles
      } : {}
    }, {
      "aria-multiselectable": qwik._fnSignal((p0) => p0.multiple, [
        store
      ], "p0.multiple"),
      role: "listbox"
    }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "Gy_0"), 0, "Gy_1") : null
  }, 1, "Gy_2");
}, "SelectOptionList_component_JZ5mpGpHNWU"));
exports.Select = Select;
exports.SelectButton = SelectButton;
exports.SelectOption = SelectOption;
exports.SelectOptionList = SelectOptionList;
