declare class Utils {
    findElement(target: HTMLInputElement | string): HTMLInputElement;
    findStringItem(list: Array<string>, value: string): Array<string>;
    findObjectItem(list: Array<any>, value: string, key: string): Array<any>;
    getStyleValue(styleProperties: CSSStyleDeclaration, styleAttribute: string): string;
}
declare const _default: Utils;
export default _default;
