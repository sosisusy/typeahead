import Typeahead from "./modules/Typeahead";

declare global {
    interface Window {
        Typeahead: Function
    }
}

window.Typeahead = Typeahead
export default Typeahead