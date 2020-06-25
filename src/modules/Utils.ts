import _ from "lodash"

class Utils {
    // element 찾아서 리턴
    findElement(target: HTMLInputElement | string): HTMLInputElement {
        if (!target) throw new Error("target not found")

        if (typeof target === "object" && target.nodeType == 1) return target
        return document.querySelector(target as string) as HTMLInputElement
    }

    // 검색 영역에서 대상 텍스트에 해당하는 아이템 리스트 반환
    findStringItem(list: Array<string>, value: string): Array<string> {
        return _.filter(list, (item) => item.toLowerCase().indexOf(value) !== -1)
    }

    // 검색 영역에서 대상 오브젝트에 해당하는 아이템 리스트 반환
    findObjectItem(list: Array<any>, value: string, key: string): Array<any> {
        return _.filter(list, (item) => item[key].toLowerCase().indexOf(value) !== -1)
    }

    // 스타일 값 반환
    getStyleValue(styleProperties: CSSStyleDeclaration, styleAttribute: string): string {
        return styleProperties.getPropertyValue(styleAttribute)
    }
}

export default new Utils