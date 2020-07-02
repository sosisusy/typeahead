"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectListItem = exports.showSearchData = exports.hideListContainer = exports.appendListItem = exports.applyListItemHoverStyle = exports.applyAllListItemStyle = void 0;
var Config_1 = require("./Config");
var Utils_1 = __importDefault(require("./Utils"));
var lodash_1 = __importDefault(require("lodash"));
// 리스트 아이템 기본 스타일
var applyListItemStyle = function (item, configure) {
    item.classList.remove("hover");
    item.style.color = configure.itemColor;
    item.style.backgroundColor = configure.itemBackgroundColor;
};
// 리스트 아이템 전체에 기본 스타일 적용
exports.applyAllListItemStyle = function (configure) {
    var listContainer = configure.listContainer, itemList = listContainer.querySelectorAll("." + Config_1.ClassNameList.item);
    lodash_1.default.map(itemList, function (item) { return applyListItemStyle(item, configure); });
};
// 리스트 아이템 마우스오버 스타일 적용
exports.applyListItemHoverStyle = function (item, configure) {
    var hintElement = configure.hintElement, target = configure.inputElement || configure.target;
    item.classList.add("hover");
    item.style.color = configure.itemHoverColor;
    item.style.backgroundColor = configure.itemHoverBackgroundColor;
    // 힌트 기록
    var itemString = item.getAttribute(Config_1.AttributeList.itemValue);
    hintElement.innerHTML = Utils_1.default.replaceString(itemString, target.value);
};
// 리스트 아이템 추가
exports.appendListItem = function (type, value, configure) {
    var addClass = configure.addItemClass, findKey = configure.key;
    var listContainer = configure.listContainer, item = document.createElement("div");
    // 클래스 설정
    item.classList.add(Config_1.ClassNameList.item);
    if (addClass)
        lodash_1.default.map(addClass, function (customClass) { return item.classList.add(customClass); });
    // 스타일 설정
    applyListItemStyle(item, configure);
    // 아이템 값 설정
    switch (type) {
        case "string":
            item.innerHTML = value;
            item.setAttribute(Config_1.AttributeList.itemValue, value);
            break;
        case "object":
            if (!value[findKey])
                return;
            item.innerHTML = value[findKey];
            item.setAttribute(Config_1.AttributeList.itemValue, value[findKey]);
            break;
        default:
            return;
    }
    var handleMouseLeave = function () {
        applyListItemStyle(item, configure);
    };
    var handleMouseOver = function () {
        exports.applyAllListItemStyle(configure);
        exports.applyListItemHoverStyle(item, configure);
    };
    item.addEventListener("mouseleave", handleMouseLeave);
    item.addEventListener("mouseover", handleMouseOver);
    item.addEventListener("click", function () { return exports.selectListItem(value, configure); });
    listContainer.appendChild(item);
};
// 리스트 컨테이너 숨김
exports.hideListContainer = function (configure) {
    var listContainer = configure.listContainer, hintELement = configure.hintElement;
    listContainer.classList.remove("show");
    hintELement.innerHTML = "";
};
// 찾은 데이터 표시
exports.showSearchData = function (findList, configure) {
    var listContainer = configure.listContainer;
    listContainer.classList.add("show");
    listContainer.innerHTML = "";
    // 기본 아이템 스타일로 추가
    lodash_1.default.map(findList, function (item) { return exports.appendListItem(typeof findList[0], item, configure); });
};
// 검색된 아이템 선택
exports.selectListItem = function (item, configure) {
    var target = configure.target, targetClone = configure.inputElement, findKey = configure.key;
    if (!item)
        return false;
    switch (typeof item) {
        case "string":
            target.value = item;
            if (targetClone)
                targetClone.value = item;
            break;
        case "object":
            target.value = item[findKey];
            if (targetClone)
                targetClone.value = item[findKey];
            break;
    }
    // hideListContainer(configure)
    // 사용자 정의 함수 호출
    if (configure.onSelect)
        configure.onSelect(item);
    return true;
};
//# sourceMappingURL=Event.js.map