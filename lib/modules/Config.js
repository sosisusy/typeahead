"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeList = exports.ClassNameList = exports.DEFAULT_CONFIGURE = void 0;
// 기본 값
exports.DEFAULT_CONFIGURE = {
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
};
// 클래스 이름 리스트
exports.ClassNameList = {
    root: "so-typeahead-root",
    list: "so-typeahead-list",
    content: "so-typeahead-input-content",
    item: "so-typeahead-item",
    hint: "so-typeahead-hint",
    input: "so-typeahead-input",
};
// 노드 속성 리스트
exports.AttributeList = {
    privateKey: "data-index",
    itemValue: "data-value",
};
//# sourceMappingURL=Config.js.map