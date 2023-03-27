"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const useComposite = (store) => {
  const focus$ = /* @__PURE__ */ qwik.inlinedQrl((ref) => {
    var _a;
    const [store2] = qwik.useLexicalScope();
    store2.focusable = ref;
    (_a = ref.value) == null ? void 0 : _a.focus();
  }, "useComposite_focus_Ee0OrnQbGKQ", [
    store
  ]);
  const moveFocus$ = /* @__PURE__ */ qwik.inlinedQrl(async (to) => {
    const [focus$2, store2] = qwik.useLexicalScope();
    const predicate = (to2) => {
      switch (to2) {
        case "first:checked":
        case "last:checked":
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
          return (ref) => {
            var _a;
            return ((_a = ref.value) == null ? void 0 : _a.ariaPressed) === "true";
          };
        case "first:selected":
        case "last:selected":
          return (ref) => {
            var _a;
            return ((_a = ref.value) == null ? void 0 : _a.ariaSelected) === "true";
          };
      }
      return () => false;
    };
    switch (to) {
      case "first":
        await focus$2(store2.navigables[0]);
        break;
      case "first:checked":
      case "first:pressed":
      case "first:selected":
        await focus$2(store2.navigables.find(predicate(to)) ?? store2.navigables[0]);
        break;
      case "last":
        await focus$2(store2.navigables[store2.navigables.length - 1]);
        break;
      case "last:checked":
      case "last:pressed":
      case "last:selected":
        await focus$2(store2.navigables.findLast(predicate(to)) ?? store2.navigables[store2.navigables.length - 1]);
        break;
      case "next": {
        const index = store2.navigables.indexOf(store2.focusable);
        if (0 <= index && index <= store2.navigables.length - 2)
          await focus$2(store2.navigables[index + 1]);
        break;
      }
      case "previous": {
        const index = store2.navigables.lastIndexOf(store2.focusable);
        if (index >= 1)
          await focus$2(store2.navigables[index - 1]);
        break;
      }
    }
  }, "useComposite_moveFocus_DjWeyU2pe0k", [
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
    readonly: props.readonly ?? false,
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
  }, null, [
    /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "nS_0"),
    props.name !== void 0 ? store.activated.map((option) => typeof option.value === "string" ? /* @__PURE__ */ qwik._jsxQ("input", {
      value: `${option.value}`
    }, {
      name: qwik._fnSignal((p0) => `${p0.name}${p0.multiple ?? false ? "[]" : ""}`, [
        props
      ], '`${p0.name}${p0.multiple??false?"[]":""}`'),
      type: "hidden"
    }, null, 3, option.id) : Object.entries(option.value).map((kv) => /* @__PURE__ */ qwik._jsxQ("input", {
      name: `${props.name}${props.multiple ?? false ? "[]" : ""}[${kv[0]}]`,
      value: `${kv[1]}`
    }, {
      type: "hidden"
    }, null, 3, option.id))) : null
  ], 0, "nS_1");
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
    const [composite2, expandable2, ref2, store2] = qwik.useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await expandable2.collapse$();
        await composite2.focus$(ref2);
      } else {
        await expandable2.expand$();
        await composite2.moveFocus$("first:selected");
      }
    }
  }, "SelectButton_component_useOn_1_A2Ce00dP0do", [
    composite,
    expandable,
    ref,
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
  }, !store.multiple ? store.activated.length === 1 && store.activated[0].ref.value !== void 0 ? store.activated[0].ref.value.innerHTML : /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "KI_0") : /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "KI_1"), 0, "KI_2");
}, "SelectButton_component_0lJYuR2b1bo"));
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
  const id = nanoid();
  const ref = qwik.useSignal();
  const store = qwik.useContext(SelectContext);
  const composite = useComposite(store);
  const toggle = useToggle();
  const _disabled = store.disabled || (props.disabled ?? false);
  if (!_disabled && !store.readonly) {
    const doToggle$ = /* @__PURE__ */ qwik.inlinedQrl(async () => {
      var _a;
      const [composite2, id2, props2, ref2, store2, toggle2] = qwik.useLexicalScope();
      if (!store2.multiple && store2.activated.length === 1 && store2.activated[0].ref !== ref2) {
        await toggle2.toggle$(store2.activated[0].ref, "selected");
        store2.activated.pop();
      }
      await toggle2.toggle$(ref2, "selected");
      if (((_a = ref2.value) == null ? void 0 : _a.ariaSelected) === "true")
        store2.activated.push({
          id: id2,
          ref: ref2,
          value: props2.value ?? ""
        });
      else {
        const index = store2.activated.findIndex((option) => option.ref === ref2);
        if (index >= 0)
          store2.activated.splice(index, 1);
      }
      await composite2.focus$(ref2);
    }, "SelectOption_component_doToggle_auCS0ZPb0lc", [
      composite,
      id,
      props,
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
  }
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [_disabled2, ref2, store2] = qwik.useLexicalScope();
    if (!_disabled2)
      store2.navigables.push(ref2);
  }, "SelectOption_component_useTask_ED8lQx5Hen0", [
    _disabled,
    ref,
    store
  ]));
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [id2, props2, ref2, store2] = qwik.useLexicalScope();
    if (props2.selected ?? false) {
      const element = ref2.value;
      if (element !== void 0)
        element.ariaSelected = "true";
      store2.activated.push({
        id: id2,
        ref: ref2,
        value: props2.value ?? ""
      });
    }
  }, "SelectOption_component_useVisibleTask_S3MauFqBNk0", [
    id,
    props,
    ref,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ qwik._jsxQ("li", {
    "aria-disabled": _disabled,
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    role: "option",
    tabIndex: qwik._fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "0t_0"), 0, "0t_1");
}, "SelectOption_component_oNCGC8p0Mn4"));
const SelectOptionList = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
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
  return /* @__PURE__ */ qwik._jsxQ("ul", {
    id,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-multiselectable": qwik._fnSignal((p0) => p0.multiple, [
      store
    ], "p0.multiple"),
    hidden: qwik._fnSignal((p0) => !p0.expanded, [
      store
    ], "!p0.expanded"),
    role: "listbox"
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "Gy_0"), 0, "Gy_1");
}, "SelectOptionList_component_JZ5mpGpHNWU"));
const MenuContext = qwik.createContextId("inolib/ui/contexts/Menu");
const Menu = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  const store = qwik.useStore({
    expanded: false,
    focusable: qwik.useSignal(),
    navigables: [],
    trigger: qwik.useSignal()
  }, {
    deep: true
  });
  const expandable = useExpandable(store);
  const composite = useComposite(store);
  qwik.useContextProvider(MenuContext, store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2, store2] = qwik.useLexicalScope();
    switch (e.code) {
      case "Escape":
        await expandable2.collapse$();
        await composite2.focus$(store2.trigger);
        break;
    }
  }, "Menu_component_useOn_uErTZyUXYRA", [
    composite,
    expandable,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    role: "menu"
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "LN_0"), 1, "LN_1");
}, "Menu_component_3Ne0Ocgg3ZU"));
const MenuButton = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  const ref = qwik.useSignal();
  const store = qwik.useContext(MenuContext);
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  qwik.useOn("keyup", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2] = qwik.useLexicalScope();
    switch (e.code) {
      case "Space":
        await expandable2.expand$();
        await composite2.moveFocus$("first:selected");
        break;
    }
  }, "MenuButton_component_useOn_a9lEB9IDVlE", [
    composite,
    expandable
  ]));
  qwik.useOn("click", /* @__PURE__ */ qwik.inlinedQrl(async (e) => {
    const [composite2, expandable2, ref2, store2] = qwik.useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await expandable2.collapse$();
        await composite2.focus$(ref2);
      } else {
        await expandable2.expand$();
        await composite2.moveFocus$("first:selected");
      }
    }
  }, "MenuButton_component_useOn_1_AKXmYfuUmis", [
    composite,
    expandable,
    ref,
    store
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [ref2, store2] = qwik.useLexicalScope();
    store2.trigger = ref2;
  }, "MenuButton_component_useTask_W0ZJt39DFc8", [
    ref,
    store
  ]));
  return /* @__PURE__ */ qwik._jsxQ("button", {
    ref
  }, null, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "RP_0"), 1, "RP_1");
}, "MenuButton_component_M9yWhyAuPBM"));
const MenuItem = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  return /* @__PURE__ */ qwik._jsxQ("li", null, null, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "OT_0"), 1, "OT_1");
}, "MenuItem_component_nC7Gp0YL3CE"));
const MenuItemList = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  const store = qwik.useContext(MenuContext);
  return /* @__PURE__ */ qwik._jsxQ("ul", null, {
    hidden: qwik._fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded")
  }, /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "cH_0"), 1, "cH_1");
}, "MenuItemList_component_FjnHFZUe04w"));
exports.Menu = Menu;
exports.MenuButton = MenuButton;
exports.MenuItem = MenuItem;
exports.MenuItemList = MenuItemList;
exports.Select = Select;
exports.SelectButton = SelectButton;
exports.SelectOption = SelectOption;
exports.SelectOptionList = SelectOptionList;
