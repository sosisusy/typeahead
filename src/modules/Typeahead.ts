import _ from "lodash"
import Utils from "./Utils"
import "~/sass/Typeahead.scss"

interface Configure {
    // 인풋 대상 지정
    target?: string | HTMLInputElement,
    // 검색 할 영역
    list?: Array<string> | Array<object>,
    // 검색 영역이 오브젝트 배열로 이루어졌을 경우 검색할 대상에 해당하는 속성을 지정
    key?: string,
    // 인풋창에 힌트표시 여부
    hint?: boolean,
    // 힌트 색상
    hintColor?: string,
    // 검색된 리스트 갯수가 searchLine이내로 들어올 경우 화면에 표시
    searchLimit?: Number,
    // 아이템 글자 색상
    itemColot?: string,
    // 아이템 배경 색상
    itemBackgroundColor?: string,
    // 아이템 마우스 오버 글자 색상
    itemHoverColor?: string
    // 아이템 마우스 오버 배경 색상
    itemHoverBackgroundColor?: string

    //// 사용자정의 클래스 추가 ////
    // 루트 컨테이너에 클래스 추가
    addRootClass?: Array<string>,
    // 검색 목록 컨테이너에 클래스 추가
    addListClass?: Array<string>,
    // 검색된 목록 아이템에 클래스 추가
    addItemClass?: Array<string>,

    //// 사용자 정의 리스너 ////
    // 사용자 정의 검색
    onSearch?: Function | null,
    // 검색 리스트 중 타겟의 값과 같은 값이 있을 경우 호출
    onEqual?: Function | null,
}

// 기본 값
const DEFAULT_CONFIGURE: Configure = {
    target: undefined,
    list: [],
    key: "",
    hint: false,
    hintColor: "#ececec",
    searchLimit: 6,
    itemColot: "#333",
    itemBackgroundColor: "white",
    itemHoverColor: "#8eadf3",
    itemHoverBackgroundColor: "inherit",
    addRootClass: [],
    addListClass: [],
    addItemClass: [],
    onSearch: null,
    onEqual: null,
}

// 클래스 이름 리스트
const ClassNameList = {
    root: "so-typeahead-root",
    list: "so-typeahead-list",
    item: "so-typeahead-item",
    hint: "so-typeahead-hint",
}

// init
function initialize(defaultConfigure: Configure, configure: Configure): Configure {
    let mergeConfigure = { ...defaultConfigure, ...configure }

    mergeConfigure.target = Utils.findElement(mergeConfigure.target as HTMLInputElement | string)

    // 대상 없으면 에러
    if (!mergeConfigure.target) throw new Error("target not found")

    // 도우미 컨테이너 생성
    makeTypeheadContainer(mergeConfigure)

    return mergeConfigure
}

// 타이핑 도우미 컨테이너 생성
function makeTypeheadContainer(configure: Configure) {
    const target = configure.target as HTMLInputElement,
        targetParent = target.parentNode as HTMLElement,
        targetStyle = window.getComputedStyle(target),
        targetFontSize = Utils.getStyleValue(targetStyle, "font-size"),
        targetFontFamily = Utils.getStyleValue(targetStyle, "font-family"),
        targetFontWeight = Utils.getStyleValue(targetStyle, "font-weight")

    const addClassList = {
        root: (configure.addRootClass as Array<string>).join(" "),
        list: (configure.addListClass as Array<string>).join(" "),
    }

    const rootContainer = document.createElement("div"),
        listContainer = document.createElement("div"),
        hintElement = document.createElement("span")


    // 노드 추가
    targetParent.appendChild(rootContainer)
    rootContainer.appendChild(listContainer)
    rootContainer.appendChild(hintElement)
    rootContainer.appendChild(target)

    // root container
    rootContainer.classList.add(ClassNameList.root)
    if (addClassList.root) rootContainer.classList.add(addClassList.root)

    // list container
    listContainer.classList.add(ClassNameList.list)
    if (addClassList.list) listContainer.classList.add(addClassList.list)

    // hint element
    hintElement.classList.add(ClassNameList.hint)
    hintElement.style.color = configure.hintColor as string
    hintElement.style.fontSize = targetFontSize
    hintElement.style.fontFamily = targetFontFamily
    hintElement.style.fontWeight = targetFontWeight

}
// 오브젝트형 리스트 아이템 추가
function appendListItem(type: string, value: any, configure: Configure) {
    const addClass = (configure.addItemClass as Array<string>).join(" "),
        findKey = configure.key as string

    const listContainer = document.querySelector(`.${ClassNameList.list}`) as HTMLElement,
        item = document.createElement("div")

    item.classList.add(ClassNameList.item)
    if (addClass) item.classList.add(addClass)

    switch (type) {
        case "string":
            item.innerHTML = value
            break
        case "object":
            if (findKey) item.innerHTML = value[findKey]
            break
        default:
            return
    }

    listContainer.appendChild(item)
}

// 찾은 데이터 표시
function showSearchData(findList: Array<any>, configure: Configure) {
    const listContainer = document.querySelector(`.${ClassNameList.list}`) as HTMLElement

    listContainer.classList.add("show")
    listContainer.innerHTML = ""

    _.map(findList, item => appendListItem(typeof findList[0], item, configure))
}

export default function (configure: Configure) {

    // 사용될 값
    const CONFIGURE = initialize(DEFAULT_CONFIGURE, configure)

    // 텍스트 인풋
    const target = CONFIGURE.target as HTMLInputElement,
        searchList = CONFIGURE.list as Array<string> | Array<object>

    // 텍스트 입력 핸들
    const handleSearch = () => {
        let findList = [],
            findKey = CONFIGURE.key as string,
            searchLimit = CONFIGURE.searchLimit as Number,
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

        // 검색 허용 갯수 초과시, 검색된 내용 없을 시
        if (findList.length > searchLimit || findList.length == 0) {
            handleBlur()
            return
        }

        showSearchData(findList, CONFIGURE)
    }

    const handleBlur = () => {
        const listContainer = document.querySelector(`.${ClassNameList.list}`) as HTMLElement
        listContainer.classList.remove("show")
    }

    target.addEventListener("focus", handleSearch)
    target.addEventListener("input", handleSearch)
    target.addEventListener("blur", handleBlur)
}