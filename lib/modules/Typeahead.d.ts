import "~/sass/Typeahead.scss";
interface Configure {
    target?: string | HTMLInputElement;
    list?: Array<string> | Array<object>;
    key?: string;
    hint?: boolean;
    hintColor?: string;
    searchLimit?: Number;
    itemColot?: string;
    itemBackgroundColor?: string;
    itemHoverColor?: string;
    itemHoverBackgroundColor?: string;
    addRootClass?: Array<string>;
    addListClass?: Array<string>;
    addItemClass?: Array<string>;
    onSearch?: Function | null;
    onEqual?: Function | null;
}
export default function (configure: Configure): void;
export {};
