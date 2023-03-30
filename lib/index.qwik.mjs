import { inlinedQrl, useLexicalScope, createContextId, componentQrl, useStore, useSignal, useContextProvider, useOn, _jsxQ, _jsxC, Slot, _fnSignal, _jsxBranch, useContext, useTaskQrl, useVisibleTaskQrl, _IMMUTABLE } from "@builder.io/qwik";
import { Fragment } from "@builder.io/qwik/jsx-runtime";
const useComposite = (store) => {
  const focus$ = /* @__PURE__ */ inlinedQrl((ref) => {
    var _a;
    const [store2] = useLexicalScope();
    store2.focusable = ref;
    (_a = ref.value) == null ? void 0 : _a.focus();
  }, "useComposite_focus_Ee0OrnQbGKQ", [
    store
  ]);
  const moveFocus$ = /* @__PURE__ */ inlinedQrl(async (to) => {
    const [focus$2, store2] = useLexicalScope();
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
  const collapse$ = /* @__PURE__ */ inlinedQrl(() => {
    const [store2] = useLexicalScope();
    store2.expanded = false;
  }, "useExpandable_collapse_qlwpus32Wbw", [
    store
  ]);
  const expand$ = /* @__PURE__ */ inlinedQrl(() => {
    const [store2] = useLexicalScope();
    store2.expanded = true;
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
    activated: [],
    controls: "",
    disabled: props.disabled ?? false,
    focusable: useSignal(),
    expanded: false,
    multiple: props.multiple ?? false,
    navigables: [],
    readonly: props.readonly ?? false,
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
  }, null, [
    /* @__PURE__ */ _jsxC(Slot, null, 3, "nS_0"),
    props.name !== void 0 ? store.activated.map((option) => typeof option.value === "string" ? /* @__PURE__ */ _jsxQ("input", {
      value: `${option.value}`
    }, {
      name: _fnSignal((p0) => `${p0.name}${p0.multiple ?? false ? "[]" : ""}`, [
        props
      ], '`${p0.name}${p0.multiple??false?"[]":""}`'),
      type: "hidden"
    }, null, 3, option.id) : Object.entries(option.value).map((kv) => /* @__PURE__ */ _jsxQ("input", {
      name: `${props.name}${props.multiple ?? false ? "[]" : ""}[${kv[0]}]`,
      value: `${kv[1]}`
    }, {
      type: "hidden"
    }, null, 3, option.id))) : null
  ], 0, "nS_1");
}, "Select_component_mQAMYP6o6YY"));
const SelectButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  _jsxBranch();
  const ref = useSignal();
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
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, expandable2, ref2, store2] = useLexicalScope();
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
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "SelectButton_component_useTask_Qagm8oBaZds", [
    ref,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("button", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-controls": _fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-expanded": _fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    "aria-haspopup": "listbox",
    disabled: _fnSignal((p0) => p0.disabled, [
      store
    ], "p0.disabled"),
    role: "combobox",
    tabIndex: _fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1"),
    type: "button"
  }, !store.multiple ? store.activated.length === 1 && store.activated[0].ref.value !== void 0 ? store.activated[0].ref.value.innerHTML : /* @__PURE__ */ _jsxC(Slot, null, 3, "KI_0") : /* @__PURE__ */ _jsxC(Slot, null, 3, "KI_1"), 0, "KI_2");
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
  const toggle$ = /* @__PURE__ */ inlinedQrl((ref, state) => {
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
const SelectOption = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const id = nanoid();
  const ref = useSignal();
  const store = useContext(SelectContext);
  const composite = useComposite(store);
  const toggle = useToggle();
  const _disabled = store.disabled || (props.disabled ?? false);
  if (!_disabled && !store.readonly) {
    const doToggle$ = /* @__PURE__ */ inlinedQrl(async () => {
      var _a;
      const [composite2, id2, props2, ref2, store2, toggle2] = useLexicalScope();
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
    useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
      const [doToggle$2] = useLexicalScope();
      switch (e.code) {
        case "Space":
          await doToggle$2();
          break;
      }
    }, "SelectOption_component_useOn_2ejR4NRQfN4", [
      doToggle$
    ]));
    useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
      const [doToggle$2] = useLexicalScope();
      if (e.detail > 0)
        await doToggle$2();
    }, "SelectOption_component_useOn_1_W08hsflEaBM", [
      doToggle$
    ]));
  }
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [_disabled2, ref2, store2] = useLexicalScope();
    if (!_disabled2)
      store2.navigables.push(ref2);
  }, "SelectOption_component_useTask_ED8lQx5Hen0", [
    _disabled,
    ref,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [id2, props2, ref2, store2] = useLexicalScope();
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
  return /* @__PURE__ */ _jsxQ("li", {
    "aria-disabled": _disabled,
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    role: "option",
    tabIndex: _fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0t_0"), 0, "0t_1");
}, "SelectOption_component_oNCGC8p0Mn4"));
const SelectOptionList = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const id = nanoid();
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
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [id2, store2] = useLexicalScope();
    store2.controls = id2;
  }, "SelectOptionList_component_useTask_r7g0i0jeDiI", [
    id,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("ul", {
    id,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-multiselectable": _fnSignal((p0) => p0.multiple, [
      store
    ], "p0.multiple"),
    hidden: _fnSignal((p0) => !p0.expanded, [
      store
    ], "!p0.expanded"),
    role: "listbox"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "Gy_0"), 0, "Gy_1");
}, "SelectOptionList_component_JZ5mpGpHNWU"));
const MenuContext = createContextId("inolib/ui/contexts/Menu");
const Menu = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const store = useStore({
    activated: [],
    controls: "",
    expanded: false,
    focusable: useSignal(),
    navigables: [],
    trigger: useSignal()
  }, {
    deep: true
  });
  const expandable = useExpandable(store);
  const composite = useComposite(store);
  useContextProvider(MenuContext, store);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, expandable2, store2] = useLexicalScope();
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
  return /* @__PURE__ */ _jsxQ("div", {
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, null, /* @__PURE__ */ _jsxC(Slot, null, 3, "LN_0"), 0, "LN_1");
}, "Menu_component_3Ne0Ocgg3ZU"));
const MenuButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const ref = useSignal();
  const store = useContext(MenuContext);
  const composite = useComposite(store);
  const expandable = useExpandable(store);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, expandable2] = useLexicalScope();
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
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [composite2, expandable2, ref2, store2] = useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await expandable2.collapse$();
        await composite2.focus$(ref2);
      } else {
        await expandable2.expand$();
        await composite2.moveFocus$("first");
      }
    }
  }, "MenuButton_component_useOn_1_AKXmYfuUmis", [
    composite,
    expandable,
    ref,
    store
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "MenuButton_component_useTask_W0ZJt39DFc8", [
    ref,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("button", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    "aria-controls": _fnSignal((p0) => p0.controls, [
      store
    ], "p0.controls"),
    "aria-expanded": _fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    role: "menu",
    tabIndex: _fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1"),
    type: "button"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "RP_0"), 0, "RP_1");
}, "MenuButton_component_M9yWhyAuPBM"));
const MenuItem = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const ref = useSignal();
  const store = useContext(MenuContext);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.navigables.push(ref2);
  }, "MenuItem_component_useTask_99AKyf6RgVI", [
    ref,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("li", {
    ref,
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, {
    role: "item",
    tabIndex: _fnSignal((p0, p1) => p1.focusable === p0 ? 0 : -1, [
      ref,
      store
    ], "p1.focusable===p0?0:-1")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "OT_0"), 0, "OT_1");
}, "MenuItem_component_nC7Gp0YL3CE"));
const MenuItemList = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  _jsxBranch();
  const store = useContext(MenuContext);
  const id = nanoid();
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
      case "End":
        await composite2.moveFocus$("last");
        break;
      case "Home":
        await composite2.moveFocus$("first");
        break;
    }
  }, "MenuItemList_component_useOn_soOmOrpOoWU", [
    composite
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [id2, store2] = useLexicalScope();
    store2.controls = id2;
  }, "MenuItemList_component_useTask_YWtAMzGK5Eo", [
    id,
    store
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: store.expanded ? /* @__PURE__ */ _jsxQ("ul", {
      id
    }, {
      class: _fnSignal((p0) => p0.styles, [
        props
      ], "p0.styles")
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "cH_0"), 1, "cH_1") : null
  }, 1, "cH_2");
}, "MenuItemList_component_FjnHFZUe04w"));
const TabsContext = createContextId("inolib/ui/contexts/Tabs");
const Tabs = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  useSignal();
  const store = useStore({
    panels: [],
    focusable: useSignal(),
    navigables: [],
    trigger: useSignal()
  }, {
    deep: true
  });
  useContextProvider(TabsContext, store);
  return /* @__PURE__ */ _jsxQ("div", null, null, /* @__PURE__ */ _jsxC(Slot, null, 3, "LW_0"), 1, "LW_1");
}, "Tabs_component_aST30a5hXcI"));
/* @__PURE__ */ _jsxC(Tabs, {
  children: [
    /* @__PURE__ */ _jsxC(TabsItemList, {
      children: [
        /* @__PURE__ */ _jsxC(TabsItem, null, 3, "LW_2"),
        /* @__PURE__ */ _jsxC(TabsItem, null, 3, "LW_3"),
        /* @__PURE__ */ _jsxC(TabsItem, null, 3, "LW_4")
      ]
    }, 1, "LW_5"),
    /* @__PURE__ */ _jsxC(TabsPanels, {
      children: [
        /* @__PURE__ */ _jsxC(TabPanel, {
          expanded: true,
          [_IMMUTABLE]: {
            expanded: _IMMUTABLE
          }
        }, 3, "LW_6"),
        /* @__PURE__ */ _jsxC(TabPanel, null, 3, "LW_7"),
        /* @__PURE__ */ _jsxC(TabPanel, null, 3, "LW_8"),
        /* @__PURE__ */ _jsxC(TabPanel, null, 3, "LW_9")
      ]
    }, 1, "LW_10")
  ]
}, 1, "LW_11");
const TabsItem$1 = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  const ref = useSignal();
  useContext(TabsContext);
  const toggle = useToggle();
  const expand$ = /* @__PURE__ */ inlinedQrl((panelId1) => {
  }, "TabsItem_component_expand_ZN8JQVylyJQ");
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [ref2, toggle2] = useLexicalScope();
    if (e.detail > 0 && e.button === 0)
      await toggle2.toggle$(ref2, "pressed");
  }, "TabsItem_component_useOn_hPqRPRhMDKE", [
    ref,
    toggle
  ]));
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [expand$2] = useLexicalScope();
    switch (e.code) {
      case "Enter":
      case "Space":
        await expand$2();
        break;
    }
  }, "TabsItem_component_useOn_1_8mH57K3JtJA", [
    expand$
  ]));
  return /* @__PURE__ */ _jsxQ("li", {
    "aria-controls": panelId
  }, {
    role: "tab"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "mh_0"), 1, "mh_1");
}, "TabsItem_component_KQ3MPf1wnJY"));
const TabsItemList$1 = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  useContext(TabsContext);
  return /* @__PURE__ */ _jsxQ("ul", null, {
    role: "tablist"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0P_0"), 1, "0P_1");
}, "TabsItemList_component_aU60tPZJuYo"));
export {
  Menu,
  MenuButton,
  MenuItem,
  MenuItemList,
  Select,
  SelectButton,
  SelectOption,
  SelectOptionList,
  Tabs,
  TabsItem$1 as TabsItem,
  TabsItemList$1 as TabsItemList
};
