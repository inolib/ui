import { createContextId, componentQrl, inlinedQrl, useStore, useSignal, useContextProvider, useOn, useLexicalScope, useVisibleTaskQrl, _jsxQ, _fnSignal, _jsxC, Slot, useContext, useTaskQrl, _jsxBranch } from "@builder.io/qwik";
import { Fragment } from "@builder.io/qwik/jsx-runtime";
const collapseQrl = /* @__PURE__ */ inlinedQrl((context) => {
  if (context.SelectButton !== void 0)
    context.SelectButton.expanded = false;
}, "collapseQrl_0ZHAUowNJnQ");
const expandQrl = /* @__PURE__ */ inlinedQrl((context) => {
  if (context.SelectButton !== void 0)
    context.SelectButton.expanded = true;
}, "expandQrl_C4DHivpaOXA");
const focusQrl = /* @__PURE__ */ inlinedQrl((context, ref) => {
  const element = ref.value;
  if (element !== void 0) {
    context.Select.focusable = ref;
    element.focus();
  }
}, "focusQrl_u6pvDtU0gts");
const moveFocusQrl = /* @__PURE__ */ inlinedQrl(async (context, to) => {
  const predicate = (to2) => {
    switch (to2) {
      case "first:selected":
      case "last:selected":
        return (option) => option.selected;
      case "next":
      case "previous":
        return (option) => option.ref === context.Select.focusable;
    }
    return () => false;
  };
  if (context.SelectOption !== void 0) {
    const _SelectOption = context.SelectOption.filter((option) => !option.disabled);
    switch (to) {
      case "first":
        if (_SelectOption.length > 0)
          await focusQrl(context, _SelectOption[0].ref);
        break;
      case "first:selected": {
        const option = _SelectOption.find(predicate(to));
        if (option !== void 0)
          await focusQrl(context, option.ref);
        else
          await moveFocusQrl(context, "first");
        break;
      }
      case "last":
        if (_SelectOption.length > 0)
          await focusQrl(context, _SelectOption[_SelectOption.length - 1].ref);
        break;
      case "last:selected": {
        const option = _SelectOption.findLast(predicate(to));
        if (option !== void 0)
          await focusQrl(context, option.ref);
        else
          await moveFocusQrl(context, "last");
        break;
      }
      case "next": {
        const index = _SelectOption.findIndex(predicate(to));
        if (index > -1 && index < _SelectOption.length - 1)
          await focusQrl(context, _SelectOption[index + 1].ref);
        break;
      }
      case "previous": {
        const index = _SelectOption.findLastIndex(predicate(to));
        if (index > 0)
          await focusQrl(context, _SelectOption[index - 1].ref);
        break;
      }
    }
  }
}, "moveFocusQrl_ElruCJYXHAY");
const contextId = createContextId("inolib/ui/contexts/Select");
const Select = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const store = useStore({
    disabled: props.disabled ?? false,
    focusable: useSignal(),
    multiple: props.multiple ?? false,
    readonly: props.readonly ?? false,
    value: props.multiple ?? false ? [] : void 0
  }, {
    deep: true
  });
  const context = {
    Select: store
  };
  useContextProvider(contextId, context);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "Escape":
        if (context2.SelectButton !== void 0) {
          await collapseQrl(context2);
          await focusQrl(context2, context2.SelectButton.ref);
        }
        break;
    }
  }, "Select_component_useOn_JCkfa0Luxik", [
    context
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(async ({ track }) => {
    const [props2, store2] = useLexicalScope();
    store2.stringified = track(() => JSON.stringify(store2.value));
    if (props2.onChange$ !== void 0)
      await props2.onChange$(store2.stringified);
  }, "Select_component_useVisibleTask_bLDa0iKgmzQ", [
    props,
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:keydown": true,
    "preventdefault:keyup": true
  }, [
    /* @__PURE__ */ _jsxC(Slot, null, 3, "RL_0"),
    props.name !== void 0 ? /* @__PURE__ */ _jsxQ("input", null, {
      name: _fnSignal((p0) => p0.name, [
        props
      ], "p0.name"),
      required: _fnSignal((p0) => p0.required ?? false, [
        props
      ], "p0.required??false"),
      type: "hidden",
      value: _fnSignal((p0) => p0.stringified, [
        store
      ], "p0.stringified")
    }, null, 3, "RL_1") : null
  ], 1, "RL_2");
}, "Select_component_QBRHe7vamhc"));
const tabbableElements = [
  "a[href]:not(disabled):not(hidden):not([tabindex='-1'])",
  "area[href]:not(disabled):not(hidden):not([tabindex='-1'])",
  "audio[controls]:not(disabled):not(hidden):not([tabindex='-1'])",
  "button:not(disabled):not(hidden):not([tabindex='-1'])",
  "form:not(disabled):not(hidden):not([tabindex='-1'])",
  "iframe:not(disabled):not(hidden):not([tabindex='-1'])",
  "input:not([type='hidden']):not(disabled):not(hidden):not([tabindex='-1'])",
  "object:not(disabled):not(hidden):not([tabindex='-1'])",
  "select:not(disabled):not(hidden):not([tabindex='-1'])",
  "summary:not(disabled):not(hidden):not([tabindex='-1'])",
  "textarea:not(disabled):not(hidden):not([tabindex='-1'])",
  "video[controls]:not(disabled):not(hidden):not([tabindex='-1'])",
  "[contenteditable]:not(disabled):not(hidden):not([tabindex='-1'])",
  "[tabindex]:not(disabled):not(hidden):not([tabindex='-1'])"
].join(",");
const tabQrl = /* @__PURE__ */ inlinedQrl((ref, to) => {
  const elements = Array.from(document.querySelectorAll(tabbableElements));
  const index = elements.findIndex((element) => element === ref.value);
  switch (to) {
    case "next":
      if (index > -1 && index < elements.length - 1)
        elements[index + 1].focus();
      break;
    case "previous":
      if (index > 0)
        elements[index - 1].focus();
      break;
  }
}, "tabQrl_MTUIT5ZHJ9E");
const useTab = (ref) => {
  useOn("keydown", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [ref2] = useLexicalScope();
    switch (e.code) {
      case "Tab":
        await tabQrl(ref2, !e.shiftKey ? "next" : "previous");
        break;
    }
  }, "useTab_useOn_U50H3qhJ3vM", [
    ref
  ]));
};
const SelectButton = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const context = useContext(contextId);
  const store = useStore({
    expanded: false,
    ref: useSignal(),
    slot: ""
  }, {
    deep: true
  });
  useTab(store.ref);
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case "Space":
        await expandQrl(context2);
        await moveFocusQrl(context2, e.code !== "ArrowUp" ? "first:selected" : "last:selected");
        break;
    }
  }, "SelectButton_component_useOn_J2f0RNFCGaY", [
    context
  ]));
  useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2, store2] = useLexicalScope();
    if (e.detail > 0 && e.button === 0) {
      if (store2.expanded) {
        await collapseQrl(context2);
        await focusQrl(context2, store2.ref);
      } else {
        await expandQrl(context2);
        await moveFocusQrl(context2, "first:selected");
      }
    }
  }, "SelectButton_component_useOn_1_hIKTR8pZiuA", [
    context,
    store
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.SelectButton = store2;
    context2.Select.focusable = store2.ref;
  }, "SelectButton_component_useTask_iQ8mMjduSMc", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [store2] = useLexicalScope();
    if (store2.ref.value !== void 0)
      store2.slot = store2.ref.value.innerHTML;
  }, "SelectButton_component_useVisibleTask_63Nr88LIjIU", [
    store
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("button", {
    ref: store.ref
  }, {
    "aria-controls": _fnSignal((p0) => {
      var _a;
      return (_a = p0.SelectOptionList) == null ? void 0 : _a.id;
    }, [
      context
    ], "p0.SelectOptionList?.id"),
    "aria-expanded": _fnSignal((p0) => p0.expanded, [
      store
    ], "p0.expanded"),
    "aria-haspopup": "listbox",
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    disabled: _fnSignal((p0) => p0.Select.disabled, [
      context
    ], "p0.Select.disabled"),
    "preventdefault:click": true,
    "preventdefault:keydown": true,
    "preventdefault:keyup": true,
    role: "combobox",
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Select.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Select.focusable?0:-1"),
    type: "button"
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "1K_0"), 1, "1K_1");
}, "SelectButton_component_C7xPWe0sXuc"));
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
const SelectOption = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const toggleQrl = /* @__PURE__ */ inlinedQrl(async (context2, store2, selected) => {
    if (!context2.Select.multiple && context2.SelectOption !== void 0 && selected !== false) {
      const optionStore = context2.SelectOption.find((store3) => store3.selected);
      if (optionStore !== void 0 && optionStore.ref !== store2.ref)
        optionStore.selected = false;
    }
    store2.selected = selected ?? !store2.selected;
    if (context2.SelectButton !== void 0) {
      if (context2.Select.multiple) {
        if (store2.value !== void 0) {
          const _value = context2.Select.value;
          if (store2.selected)
            _value.push(store2.value);
          else {
            const index = _value.indexOf(store2.value);
            if (index > -1)
              _value.splice(index, 1);
          }
        }
      } else if (context2.SelectButton.ref.value !== void 0) {
        if (store2.selected && store2.ref.value !== void 0) {
          context2.Select.value = store2.value;
          context2.SelectButton.ref.value.innerHTML = store2.ref.value.innerHTML;
        } else if (selected !== false) {
          context2.Select.value = void 0;
          context2.SelectButton.ref.value.innerHTML = context2.SelectButton.slot;
        }
      }
    }
    await focusQrl(context2, store2.ref);
  }, "SelectOption_component_toggleQrl_8Tjf5js480s");
  const context = useContext(contextId);
  const store = useStore({
    disabled: context.Select.disabled || (props.disabled ?? false),
    id: nanoid(),
    ref: useSignal(),
    selected: props.selected ?? false,
    value: props.value
  }, {
    deep: true
  });
  if (!store.disabled && !context.Select.readonly) {
    useTab(store.ref);
    useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
      const [context2, store2, toggleQrl2] = useLexicalScope();
      switch (e.code) {
        case "Space":
          await toggleQrl2(context2, store2);
          break;
      }
    }, "SelectOption_component_useOn_fj0i20VX0WE", [
      context,
      store,
      toggleQrl
    ]));
    useOn("click", /* @__PURE__ */ inlinedQrl(async (e) => {
      const [context2, store2, toggleQrl2] = useLexicalScope();
      if (e.detail > 0 && e.button === 0)
        await toggleQrl2(context2, store2);
    }, "SelectOption_component_useOn_1_r1vTCEHIAo4", [
      context,
      store,
      toggleQrl
    ]));
  }
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    if (context2.SelectOption === void 0)
      context2.SelectOption = [];
    context2.SelectOption.push(store2);
  }, "SelectOption_component_useTask_qs3MfPOjssg", [
    context,
    store
  ]));
  useVisibleTaskQrl(/* @__PURE__ */ inlinedQrl(async () => {
    const [context2, store2, toggleQrl2] = useLexicalScope();
    if (store2.selected)
      await toggleQrl2(context2, store2, true);
  }, "SelectOption_component_useVisibleTask_Xdqx5MugkDw", [
    context,
    store,
    toggleQrl
  ]), {
    strategy: "document-ready"
  });
  return /* @__PURE__ */ _jsxQ("li", {
    ref: store.ref
  }, {
    "aria-disabled": _fnSignal((p0) => p0.disabled, [
      store
    ], "p0.disabled"),
    "aria-selected": _fnSignal((p0) => p0.selected, [
      store
    ], "p0.selected"),
    class: _fnSignal((p0) => p0.styles, [
      props
    ], "p0.styles"),
    "preventdefault:click": true,
    "preventdefault:keydown": true,
    "preventdefault:keyup": true,
    role: "option",
    tabIndex: _fnSignal((p0, p1) => p1.ref === p0.Select.focusable ? 0 : -1, [
      context,
      store
    ], "p1.ref===p0.Select.focusable?0:-1")
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "y0_0"), 1, "y0_1");
}, "SelectOption_component_PZZAaBvCHTE"));
const SelectOptionList = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  var _a;
  _jsxBranch();
  const context = useContext(contextId);
  const store = useStore({
    id: nanoid()
  }, {
    deep: true
  });
  useOn("keydown", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "ArrowDown":
        await moveFocusQrl(context2, "next");
        break;
      case "ArrowUp":
        await moveFocusQrl(context2, "previous");
        break;
    }
  }, "SelectOptionList_component_useOn_0zTLuQ0Vick", [
    context
  ]));
  useOn("keyup", /* @__PURE__ */ inlinedQrl(async (e) => {
    const [context2] = useLexicalScope();
    switch (e.code) {
      case "End":
        await moveFocusQrl(context2, "last");
        break;
      case "Home":
        await moveFocusQrl(context2, "first");
        break;
    }
  }, "SelectOptionList_component_useOn_1_uxli1PMhhxk", [
    context
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [context2, store2] = useLexicalScope();
    context2.SelectOptionList = store2;
  }, "SelectOptionList_component_useTask_ERfUJHtatuM", [
    context,
    store
  ]));
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: ((_a = context.SelectButton) == null ? void 0 : _a.expanded) ? /* @__PURE__ */ _jsxQ("ul", null, {
      "aria-multiselectable": _fnSignal((p0) => p0.Select.multiple, [
        context
      ], "p0.Select.multiple"),
      class: _fnSignal((p0) => p0.styles, [
        props
      ], "p0.styles"),
      id: _fnSignal((p0) => p0.id, [
        store
      ], "p0.id"),
      "preventdefault:keydown": true,
      "preventdefault:keyup": true,
      role: "listbox"
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "fX_0"), 1, "fX_1") : null
  }, 1, "fX_2");
}, "SelectOptionList_component_CHVZUgIgK04"));
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
  }, "Menu_component_useOn_uucZCtXaOrY", [
    composite,
    expandable,
    store
  ]));
  return /* @__PURE__ */ _jsxQ("div", {
    ...props.styles !== void 0 ? {
      class: props.styles
    } : {}
  }, null, /* @__PURE__ */ _jsxC(Slot, null, 3, "0h_0"), 0, "0h_1");
}, "Menu_component_ajITlLzP8ME"));
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
  }, "MenuButton_component_useOn_Urbui26fgt0", [
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
  }, "MenuButton_component_useOn_1_mtvEl1M3CQ8", [
    composite,
    expandable,
    ref,
    store
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.focusable = ref2;
    store2.trigger = ref2;
  }, "MenuButton_component_useTask_qgqfJoVJoPY", [
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
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "0j_0"), 0, "0j_1");
}, "MenuButton_component_jSOt8NlQDyM"));
const MenuItem = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const ref = useSignal();
  const store = useContext(MenuContext);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [ref2, store2] = useLexicalScope();
    store2.navigables.push(ref2);
  }, "MenuItem_component_useTask_7wlbCoLolQk", [
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
  }, /* @__PURE__ */ _jsxC(Slot, null, 3, "Ee_0"), 0, "Ee_1");
}, "MenuItem_component_1tjJRtjunY4"));
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
  }, "MenuItemList_component_useOn_LXDyoUt0yX8", [
    composite
  ]));
  useTaskQrl(/* @__PURE__ */ inlinedQrl(() => {
    const [id2, store2] = useLexicalScope();
    store2.controls = id2;
  }, "MenuItemList_component_useTask_D5sYXCMYK8Y", [
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
    }, /* @__PURE__ */ _jsxC(Slot, null, 3, "jU_0"), 1, "jU_1") : null
  }, 1, "jU_2");
}, "MenuItemList_component_8TBrf4I70wg"));
export {
  Menu,
  MenuButton,
  MenuItem,
  MenuItemList,
  Select,
  SelectButton,
  SelectOption,
  SelectOptionList
};
