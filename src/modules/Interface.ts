
// 구성
export interface SettingConfigure {
    // 인풋 대상 지정
    target: string | HTMLInputElement,
    // 검색 할 영역
    list?: Array<string> | Array<object>,
    // 검색 영역이 오브젝트 배열로 이루어졌을 경우 검색할 대상에 해당하는 속성을 지정
    key?: string,
    // 검색 할 영역 fetch
    lazy?: string,
    // 검색된 리스트 갯수가 searchLine이내로 들어올 경우 화면에 표시
    searchLimit?: Number,

    //// 힌트 설정 ////
    // 인풋창에 힌트표시 여부
    hint?: boolean,
    // 힌트 색상
    hintColor?: string,

    //// 아이템 스타일 지정 ////
    // 아이템 글자 색상
    itemColor?: string,
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

    //// 사용자 정의 이벤트 ////
    /**
     * 검색된 리스트가 있을 경우 호출
     * @param {Array<any>} 검색된 값
     */
    onSearch?: Function,
    /**
     * 검색된 아이템 선택 시 호출
     * @param {string | object} 선택된 값
     */
    onSelect?: Function,
}


export interface Configure extends SettingConfigure {
    // selector 기록
    // 루트 컨테이너 셀렉터
    rootSelector?: string,
    // 리스트 컨테이너 셀렉터
    listSelector?: string,
    // 힌트 셀렉터
    hintSelector?: string,
    // 인풋 셀렉터
    inputSelector?: string,

    // element 기록
    // 루트 컨테이너 element
    rootContainer?: HTMLElement,
    // 리스트 컨테이너 element
    listContainer?: HTMLElement,
    // 힌트 element
    hintElement?: HTMLElement,
    // 인풋 element
    inputElement?: HTMLInputElement,
}