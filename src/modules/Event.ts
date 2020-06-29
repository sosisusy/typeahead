import { Configure } from "./Interface"
import { ClassNameList, AttributeList } from "./Config"
import Utils from "./Utils"
import _ from "lodash"


// 리스트 아이템 기본 스타일
const applyListItemStyle = (item: HTMLElement, configure: Configure) => {
    item.classList.remove("hover")
    item.style.color = configure.itemColor as string
    item.style.backgroundColor = configure.itemBackgroundColor as string
}

// 리스트 아이템 전체에 기본 스타일 적용
export const applyAllListItemStyle = (configure: Configure) => {
    const listContainer = configure.listContainer as HTMLElement,
        itemList = listContainer.querySelectorAll(`.${ClassNameList.item}`)
    _.map(itemList, (item: HTMLElement) => applyListItemStyle(item, configure))
}

// 리스트 아이템 마우스오버 스타일 적용
export const applyListItemHoverStyle = (item: HTMLElement, configure: Configure) => {
    const hintElement = configure.hintElement as HTMLElement,
        target = configure.inputElement || configure.target as HTMLInputElement

    item.classList.add("hover")
    item.style.color = configure.itemHoverColor as string
    item.style.backgroundColor = configure.itemHoverBackgroundColor as string

    // 힌트 기록
    let itemString = item.getAttribute(AttributeList.itemValue) as string
    hintElement.innerHTML = Utils.replaceString(itemString, target.value)
}

// 리스트 아이템 추가
export const appendListItem = (type: string, value: any, configure: Configure) => {
    const addClass = configure.addItemClass as Array<string>,
        findKey = configure.key as string

    const listContainer = configure.listContainer as HTMLElement,
        item = document.createElement("div")

    // 클래스 설정
    item.classList.add(ClassNameList.item)
    if (addClass) _.map(addClass, (customClass) => item.classList.add(customClass))

    // 스타일 설정
    applyListItemStyle(item, configure)


    // 아이템 값 설정
    switch (type) {
        case "string":
            item.innerHTML = value
            item.setAttribute(AttributeList.itemValue, value)
            break
        case "object":
            if (!value[findKey]) return

            item.innerHTML = value[findKey]
            item.setAttribute(AttributeList.itemValue, value[findKey])
            break
        default:
            return
    }

    const handleMouseLeave = () => {
        applyListItemStyle(item, configure)
    }

    const handleMouseOver = () => {
        applyAllListItemStyle(configure)
        applyListItemHoverStyle(item, configure)
    }

    item.addEventListener("mouseleave", handleMouseLeave)
    item.addEventListener("mouseover", handleMouseOver)
    item.addEventListener("click", () => selectListItem(value, configure))
    listContainer.appendChild(item)
}

// 리스트 컨테이너 숨김
export const hideListContainer = (configure: Configure) => {
    const listContainer = configure.listContainer as HTMLElement,
        hintELement = configure.hintElement as HTMLElement
    listContainer.classList.remove("show")
    hintELement.innerHTML = ""
}

// 찾은 데이터 표시
export const showSearchData = (findList: Array<any>, configure: Configure) => {
    const listContainer = configure.listContainer as HTMLElement

    listContainer.classList.add("show")
    listContainer.innerHTML = ""

    // 기본 아이템 스타일로 추가
    _.map(findList, item => appendListItem(typeof findList[0], item, configure))
}

// 검색된 아이템 선택
export const selectListItem = (item: any, configure: Configure): boolean => {
    const target = configure.target as HTMLInputElement,
        targetClone = configure.inputElement as HTMLInputElement,
        findKey = configure.key as string

    if (!item) return false

    switch (typeof item) {
        case "string":
            target.value = item
            if (targetClone) targetClone.value = item
            break
        case "object":
            target.value = item[findKey] as string
            if (targetClone) targetClone.value = item[findKey] as string
            break
    }

    // hideListContainer(configure)

    // 사용자 정의 함수 호출
    if (configure.onSelect) configure.onSelect(item)

    return true
}