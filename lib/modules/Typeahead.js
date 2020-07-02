"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Utils_1 = __importDefault(require("./Utils"));
var Config_1 = require("./Config");
var Event = __importStar(require("./Event"));
// import "~/sass/Typeahead.scss"
var primaryIndex = 0;
// init
function initialize(defaultConfigure, configure) {
    var mergeConfigure = __assign(__assign({}, defaultConfigure), configure);
    mergeConfigure.target = Utils_1.default.findElement(mergeConfigure.target);
    // 대상 없으면 에러
    if (!mergeConfigure.target)
        throw new Error("target not found");
    // 데이터 url로 가져오기
    if (mergeConfigure.lazy) {
        Utils_1.default.getListData(mergeConfigure.lazy).then(function (res) { return mergeConfigure.list = res; });
    }
    // 검색 영역 없으면 에러
    if (!mergeConfigure.list)
        throw new Error("search area not found");
    // 도우미 컨테이너 생성
    makeTypeheadContainer(mergeConfigure);
    // element 셀렉터 기록
    mergeConfigure.rootSelector = "." + Config_1.ClassNameList.root + "[" + Config_1.AttributeList.privateKey + "=\"" + primaryIndex + "\"]";
    mergeConfigure.listSelector = mergeConfigure.rootSelector + " ." + Config_1.ClassNameList.list;
    mergeConfigure.hintSelector = mergeConfigure.rootSelector + " ." + Config_1.ClassNameList.hint;
    mergeConfigure.inputSelector = mergeConfigure.rootSelector + " ." + Config_1.ClassNameList.input;
    // element 기록
    mergeConfigure.rootContainer = document.querySelector(mergeConfigure.rootSelector);
    mergeConfigure.listContainer = document.querySelector(mergeConfigure.listSelector);
    mergeConfigure.hintElement = document.querySelector(mergeConfigure.hintSelector);
    mergeConfigure.inputElement = document.querySelector(mergeConfigure.inputSelector);
    primaryIndex++;
    return mergeConfigure;
}
// 타이핑 도우미 컨테이너 생성
function makeTypeheadContainer(configure) {
    var target = configure.target, targetParent = target.parentNode, targetStyle = window.getComputedStyle(target), targetFontSize = Utils_1.default.getStyleValue(targetStyle, "font-size"), targetFontFamily = Utils_1.default.getStyleValue(targetStyle, "font-family"), targetFontWeight = Utils_1.default.getStyleValue(targetStyle, "font-weight"), targetPadding = Utils_1.default.getStyleValue(targetStyle, "padding"), targetBorder = Utils_1.default.getStyleValue(targetStyle, "border"), targetWdith = target.getBoundingClientRect().width;
    var addClassList = {
        root: configure.addRootClass,
        list: configure.addListClass,
    };
    var rootContainer = document.createElement("div"), listContainer = document.createElement("div"), content = document.createElement("div"), hintElement = document.createElement("span"), inputElement = target.cloneNode();
    // 노드 추가
    targetParent.appendChild(rootContainer);
    rootContainer.appendChild(content);
    content.appendChild(listContainer);
    content.appendChild(target);
    content.appendChild(hintElement);
    // 힌트 표시여부
    if (configure.hint) {
        target.style.color = "transparent";
        target.placeholder = "";
        content.appendChild(inputElement);
    }
    else {
        hintElement.style.display = "none";
    }
    // root container
    rootContainer.classList.add(Config_1.ClassNameList.root);
    if (addClassList.root)
        lodash_1.default.map(addClassList.root, function (customClass) { return rootContainer.classList.add(customClass); });
    rootContainer.setAttribute(Config_1.AttributeList.privateKey, primaryIndex.toString());
    rootContainer.style.width = targetWdith + "px";
    // content
    content.classList.add(Config_1.ClassNameList.content);
    // list container
    listContainer.classList.add(Config_1.ClassNameList.list);
    if (addClassList.list)
        lodash_1.default.map(addClassList.list, function (customClass) { return listContainer.classList.add(customClass); });
    // hint element
    hintElement.classList.add(Config_1.ClassNameList.hint);
    hintElement.style.color = configure.hintColor;
    hintElement.style.fontSize = targetFontSize;
    hintElement.style.fontFamily = targetFontFamily;
    hintElement.style.fontWeight = targetFontWeight;
    hintElement.style.padding = targetPadding;
    hintElement.style.border = targetBorder;
    hintElement.style.borderColor = "transparent";
    hintElement.addEventListener("click", function () { return target.select(); });
    // input element
    inputElement.removeAttribute("id");
    inputElement.classList.add(Config_1.ClassNameList.input);
    inputElement.style.borderColor = "transparent";
    inputElement.style.backgroundColor = "transparent";
}
function default_1(configure) {
    // 사용될 값
    var CONFIGURE = initialize(Config_1.DEFAULT_CONFIGURE, configure);
    // 
    var rootContainer = CONFIGURE.rootContainer, listContainer = CONFIGURE.listContainer, hintElement = CONFIGURE.hintElement, target = CONFIGURE.inputElement || CONFIGURE.target;
    var targetValue = "", hoverItemIndex = -1, findList = [];
    // 텍스트 입력 핸들
    var handleSearch = function (e) {
        var searchList = CONFIGURE.list;
        var findKey = CONFIGURE.key, searchLimit = CONFIGURE.searchLimit;
        // 클론 인풋에 값복사
        if (CONFIGURE.inputElement)
            CONFIGURE.inputElement.value = target.value;
        hintElement.innerHTML = "";
        targetValue = target.value.toLowerCase();
        switch (typeof searchList[0]) {
            case "string":
                findList = Utils_1.default.findStringItem(searchList, targetValue);
                break;
            case "object":
                findList = Utils_1.default.findObjectItem(searchList, targetValue, findKey);
                break;
            default:
                return;
        }
        // 사용자 정의 함수 호출
        if (CONFIGURE.onSearch)
            CONFIGURE.onSearch(findList);
        // 검색 허용 갯수 초과시, 검색된 내용 없을 시
        if (findList.length > searchLimit || findList.length == 0) {
            Event.hideListContainer(CONFIGURE);
            return;
        }
        // 검색된 데이터 표시
        Event.showSearchData(findList, CONFIGURE);
        // 힌트 기록
        var itemString = listContainer.children[0].getAttribute(Config_1.AttributeList.itemValue);
        hintElement.innerHTML = Utils_1.default.replaceString(itemString, target.value);
    };
    // keydown 핸들러
    var handleKeyDown = function (e) {
        var _a;
        var listChildren = listContainer.children, hoverListItem = listContainer.querySelector("." + Config_1.ClassNameList.item + ".hover");
        var hoverItemIndex = (_a = Utils_1.default.findHoverListItemIndex(listChildren, hoverListItem)) !== null && _a !== void 0 ? _a : -1;
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                hoverItemIndex -= 1;
                break;
            case "ArrowDown":
                e.preventDefault();
                hoverItemIndex += 1;
                break;
            case "Enter":
                e.preventDefault();
                if (findList[hoverItemIndex]) {
                    target.blur();
                }
                break;
        }
        if (hoverItemIndex < 0 || hoverItemIndex >= findList.length)
            return;
        var hoverItem = listChildren[hoverItemIndex];
        // 검색 리스트 리렌더링
        Event.applyAllListItemStyle(CONFIGURE);
        Event.applyListItemHoverStyle(hoverItem, CONFIGURE);
        // 힌트 기록
        var itemString = hoverItem.getAttribute(Config_1.AttributeList.itemValue);
        hintElement.innerHTML = Utils_1.default.replaceString(itemString, target.value);
        return false;
    };
    // 포커스 아웃
    var handleBlur = function () {
        var _a;
        var listChildren = listContainer.children, hoverListItem = listContainer.querySelector("." + Config_1.ClassNameList.item + ".hover");
        hoverItemIndex = (_a = Utils_1.default.findHoverListItemIndex(listChildren, hoverListItem)) !== null && _a !== void 0 ? _a : -1;
        Event.selectListItem(findList[hoverItemIndex], CONFIGURE);
        Event.hideListContainer(CONFIGURE);
    };
    // 인풋 이벤트 등록
    target.addEventListener("focus", handleSearch);
    target.addEventListener("input", handleSearch);
    target.addEventListener("keydown", handleKeyDown);
    target.addEventListener("blur", handleBlur);
}
exports.default = default_1;
//# sourceMappingURL=Typeahead.js.map