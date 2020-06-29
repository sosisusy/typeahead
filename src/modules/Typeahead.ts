import _ from "lodash"
import Utils from "./Utils"
import { SettingConfigure, Configure } from "./Interface"
import { DEFAULT_CONFIGURE, ClassNameList, AttributeList } from "./Config"
import * as Event from "./Event"
import "~/sass/Typeahead.scss"

let primaryIndex = 0

// init
function initialize(defaultConfigure: SettingConfigure, configure: SettingConfigure): Configure {
    let mergeConfigure = { ...defaultConfigure, ...configure } as Configure

    mergeConfigure.target = Utils.findElement(mergeConfigure.target as HTMLInputElement | string)

    // 대상 없으면 에러
    if (!mergeConfigure.target) throw new Error("target not found")

    // 데이터 url로 가져오기
    if (mergeConfigure.lazy) {
        Utils.getListData(mergeConfigure.lazy).then(res => mergeConfigure.list = res)
    }

    // 검색 영역 없으면 에러
    if (!mergeConfigure.list) throw new Error("search area not found")

    // 도우미 컨테이너 생성
    makeTypeheadContainer(mergeConfigure)

    // element 셀렉터 기록
    mergeConfigure.rootSelector = `.${ClassNameList.root}[${AttributeList.privateKey}="${primaryIndex}"]`
    mergeConfigure.listSelector = `${mergeConfigure.rootSelector} .${ClassNameList.list}`
    mergeConfigure.hintSelector = `${mergeConfigure.rootSelector} .${ClassNameList.hint}`
    mergeConfigure.inputSelector = `${mergeConfigure.rootSelector} .${ClassNameList.input}`

    // element 기록
    mergeConfigure.rootContainer = document.querySelector(mergeConfigure.rootSelector) as HTMLElement
    mergeConfigure.listContainer = document.querySelector(mergeConfigure.listSelector) as HTMLElement
    mergeConfigure.hintElement = document.querySelector(mergeConfigure.hintSelector) as HTMLElement
    mergeConfigure.inputElement = document.querySelector(mergeConfigure.inputSelector) as HTMLInputElement


    primaryIndex++
    return mergeConfigure
}

// 타이핑 도우미 컨테이너 생성
function makeTypeheadContainer(configure: SettingConfigure) {
    const target = configure.target as HTMLInputElement,
        targetParent = target.parentNode as HTMLElement,
        targetStyle = window.getComputedStyle(target),
        targetFontSize = Utils.getStyleValue(targetStyle, "font-size"),
        targetFontFamily = Utils.getStyleValue(targetStyle, "font-family"),
        targetFontWeight = Utils.getStyleValue(targetStyle, "font-weight"),
        targetPadding = Utils.getStyleValue(targetStyle, "padding"),
        targetBorder = Utils.getStyleValue(targetStyle, "border"),
        { width: targetWdith } = target.getBoundingClientRect()

    const addClassList = {
        root: configure.addRootClass as Array<string>,
        list: configure.addListClass as Array<string>,
    }

    const rootContainer = document.createElement("div"),
        listContainer = document.createElement("div"),
        content = document.createElement("div"),
        hintElement = document.createElement("span"),
        inputElement = target.cloneNode() as HTMLInputElement


    // 노드 추가
    targetParent.appendChild(rootContainer)
    rootContainer.appendChild(content)
    content.appendChild(listContainer)
    content.appendChild(target)
    content.appendChild(hintElement)

    // 힌트 표시여부
    if (configure.hint) {
        target.style.color = "transparent"
        target.placeholder = ""
        content.appendChild(inputElement)
    } else {
        hintElement.style.display = "none"
    }

    // root container
    rootContainer.classList.add(ClassNameList.root)
    if (addClassList.root) _.map(addClassList.root, (customClass) => rootContainer.classList.add(customClass))
    rootContainer.setAttribute(AttributeList.privateKey, primaryIndex.toString())
    rootContainer.style.width = targetWdith + "px"

    // content
    content.classList.add(ClassNameList.content)

    // list container
    listContainer.classList.add(ClassNameList.list)
    if (addClassList.list) _.map(addClassList.list, (customClass) => listContainer.classList.add(customClass))

    // hint element
    hintElement.classList.add(ClassNameList.hint)
    hintElement.style.color = configure.hintColor as string
    hintElement.style.fontSize = targetFontSize
    hintElement.style.fontFamily = targetFontFamily
    hintElement.style.fontWeight = targetFontWeight
    hintElement.style.padding = targetPadding
    hintElement.style.border = targetBorder
    hintElement.style.borderColor = "transparent"
    hintElement.addEventListener("click", () => target.select())

    // input element
    inputElement.removeAttribute("id")
    inputElement.classList.add(ClassNameList.input)
    inputElement.style.borderColor = "transparent"
    inputElement.style.backgroundColor = "transparent"
}

export default function (configure: Configure) {

    // 사용될 값
    const CONFIGURE = initialize(DEFAULT_CONFIGURE, configure)

    // 
    const rootContainer = CONFIGURE.rootContainer as HTMLElement,
        listContainer = CONFIGURE.listContainer as HTMLElement,
        hintElement = CONFIGURE.hintElement as HTMLInputElement,
        target = CONFIGURE.inputElement as HTMLInputElement || CONFIGURE.target as HTMLInputElement

    let targetValue = "",
        hoverItemIndex = -1,
        findList = [] as Array<string> | Array<object>

    // 텍스트 입력 핸들
    const handleSearch = (e: Event) => {
        const searchList = CONFIGURE.list as Array<string> | Array<object>
        let findKey = CONFIGURE.key as string,
            searchLimit = CONFIGURE.searchLimit as Number

        // 클론 인풋에 값복사
        if (CONFIGURE.inputElement) CONFIGURE.inputElement.value = target.value
        hintElement.innerHTML = ""

        targetValue = target.value.toLowerCase()

        switch (typeof searchList[0]) {
            case "string":
                findList = Utils.findStringItem(searchList as Array<string>, targetValue)
                break
            case "object":
                findList = Utils.findObjectItem(searchList as Array<object>, targetValue, findKey)
                break
            default:
                return
        }

        // 사용자 정의 함수 호출
        if (CONFIGURE.onSearch) CONFIGURE.onSearch(findList)

        // 검색 허용 갯수 초과시, 검색된 내용 없을 시
        if (findList.length > searchLimit || findList.length == 0) {
            Event.hideListContainer(CONFIGURE)
            return
        }

        // 검색된 데이터 표시
        Event.showSearchData(findList, CONFIGURE)

        // 힌트 기록
        let itemString = (listContainer as HTMLElement).children[0].getAttribute(AttributeList.itemValue) as string
        hintElement.innerHTML = Utils.replaceString(itemString, target.value)
    }

    // keydown 핸들러
    const handleKeyDown = (e: KeyboardEvent) => {
        const listChildren = listContainer.children,
            hoverListItem = listContainer.querySelector(`.${ClassNameList.item}.hover`) as HTMLElement

        let hoverItemIndex = Utils.findHoverListItemIndex(listChildren, hoverListItem) ?? -1

        switch (e.key) {
            case "ArrowUp":
                e.preventDefault()
                hoverItemIndex -= 1
                break
            case "ArrowDown":
                e.preventDefault()
                hoverItemIndex += 1
                break
            case "Enter":
                e.preventDefault()
                if (findList[hoverItemIndex]) {
                    target.blur()
                }
                break
        }

        if (hoverItemIndex < 0 || hoverItemIndex >= findList.length) return

        let hoverItem = listChildren[hoverItemIndex] as HTMLElement

        // 검색 리스트 리렌더링
        Event.applyAllListItemStyle(CONFIGURE)
        Event.applyListItemHoverStyle(hoverItem, CONFIGURE)

        // 힌트 기록
        let itemString = hoverItem.getAttribute(AttributeList.itemValue) as string
        hintElement.innerHTML = Utils.replaceString(itemString, target.value)

        return false
    }

    // 포커스 아웃
    const handleBlur = () => {
        const listChildren = listContainer.children,
            hoverListItem = listContainer.querySelector(`.${ClassNameList.item}.hover`) as HTMLElement

        hoverItemIndex = Utils.findHoverListItemIndex(listChildren, hoverListItem) ?? -1
        Event.selectListItem(findList[hoverItemIndex], CONFIGURE)
        Event.hideListContainer(CONFIGURE)
    }

    // 인풋 이벤트 등록
    target.addEventListener("focus", handleSearch)
    target.addEventListener("input", handleSearch)
    target.addEventListener("keydown", handleKeyDown)
    target.addEventListener("blur", handleBlur)
}