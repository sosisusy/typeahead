import Typeahead from "./modules/Typeahead";
declare global {
    interface Window {
        Typeahead: Function;
    }
}
export default Typeahead;
