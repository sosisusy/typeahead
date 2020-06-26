declare class Utils {
    findElement(target: HTMLInputElement | string): HTMLInputElement;
    findRootElement(target: HTMLElement): HTMLElement | null;
    findStringItem(list: Array<string>, value: string): Array<string>;
    findObjectItem(list: Array<any>, value: string, key: string): Array<any>;
    findHoverListItemIndex(collection: HTMLCollection, target: HTMLElement): number | null;
    getStyleValue(styleProperties: CSSStyleDeclaration, styleAttribute: string): string;
    replaceString(value: string, replace: string): string;
}
declare const _default: Utils;
export default _default;
