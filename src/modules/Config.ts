import { SettingConfigure, Configure } from "./Interface"

// 기본 값
export const DEFAULT_CONFIGURE: SettingConfigure = {
    target: "",
    list: [],
    lazy: "",
    key: "",
    hint: false,
    hintColor: "#ddd",
    searchLimit: 6,
    itemColor: "#333",
    itemBackgroundColor: "white",
    itemHoverColor: "#8eadf3",
    itemHoverBackgroundColor: "inherit",
    addRootClass: [],
    addListClass: [],
    addItemClass: [],
    onSearch: undefined,
    onSelect: undefined,
}

// 클래스 이름 리스트
export const ClassNameList = {
    root: "so-typeahead-root",
    list: "so-typeahead-list",
    content: "so-typeahead-input-content",
    item: "so-typeahead-item",
    hint: "so-typeahead-hint",
    input: "so-typeahead-input",
}

// 노드 속성 리스트
export const AttributeList = {
    privateKey: "data-index",
    itemValue: "data-value",
}