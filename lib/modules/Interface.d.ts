export interface SettingConfigure {
    target: string | HTMLInputElement;
    list?: Array<string> | Array<object>;
    key?: string;
    lazy?: string;
    searchLimit?: Number;
    hint?: boolean;
    hintColor?: string;
    itemColor?: string;
    itemBackgroundColor?: string;
    itemHoverColor?: string;
    itemHoverBackgroundColor?: string;
    addRootClass?: Array<string>;
    addListClass?: Array<string>;
    addItemClass?: Array<string>;
    /**
     * 검색된 리스트가 있을 경우 호출
     * @param {Array<any>} 검색된 값
     */
    onSearch?: Function;
    /**
     * 검색된 아이템 선택 시 호출
     * @param {string | object} 선택된 값
     */
    onSelect?: Function;
}
export interface Configure extends SettingConfigure {
    rootSelector?: string;
    listSelector?: string;
    hintSelector?: string;
    inputSelector?: string;
    rootContainer?: HTMLElement;
    listContainer?: HTMLElement;
    hintElement?: HTMLElement;
    inputElement?: HTMLInputElement;
}
