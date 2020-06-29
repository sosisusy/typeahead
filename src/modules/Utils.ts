import _ from "lodash"
import { ClassNameList } from "./Config"
import Axios from "axios"

class Utils {

    // element 찾아서 리턴
    findElement(target: HTMLInputElement | string): HTMLInputElement {
        if (!target) throw new Error("target not found")

        if (typeof target === "object" && target.nodeType == 1) return target
        return document.querySelector(target as string) as HTMLInputElement
    }

    // 루트 element 리턴
    findRootElement(target: HTMLElement): HTMLElement | null {
        let limit = 100
        const find = (ele: HTMLElement, cnt: number): HTMLElement | null => {
            if (!ele || cnt >= limit) return null
            if (ele.className.indexOf(ClassNameList.root) !== -1) return ele
            return find(ele.parentNode as HTMLElement, ++cnt)
        }
        return find(target, 1)
    }

    // 검색 영역에서 대상 텍스트에 해당하는 아이템 리스트 반환
    findStringItem(list: Array<string>, value: string): Array<string> {
        return _.filter(list, (item) => item.toLowerCase().indexOf(value) === 0)
    }

    // 검색 영역에서 대상 오브젝트에 해당하는 아이템 리스트 반환
    findObjectItem(list: Array<any>, value: string, key: string): Array<any> {
        return _.filter(list, (item) => item[key].toLowerCase().indexOf(value) === 0)
    }

    // 현재 선택되어있는 리스트 아이템 인덱스 반환
    findHoverListItemIndex(collection: HTMLCollection, target: HTMLElement): number | null {
        let idx = null
        _.map(collection, (item, index) => {
            if (item === target) idx = index
        })
        return idx
    }

    // 스타일 값 반환
    getStyleValue(styleProperties: CSSStyleDeclaration, styleAttribute: string): string {
        return styleProperties.getPropertyValue(styleAttribute)
    }

    // 리스트 데이터 가져오기
    async getListData(url: string) {
        return await Axios.get(url)
            .then(res => {
                return res.data
            })
    }

    // 문자열 교체
    replaceString(value: string, replace: string): string {
        return replace + value.substr(replace.length, value.length)
    }

}

export default new Utils