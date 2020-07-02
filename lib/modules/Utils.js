"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Config_1 = require("./Config");
var axios_1 = __importDefault(require("axios"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    // element 찾아서 리턴
    Utils.prototype.findElement = function (target) {
        if (!target)
            throw new Error("target not found");
        if (typeof target === "object" && target.nodeType == 1)
            return target;
        return document.querySelector(target);
    };
    // 루트 element 리턴
    Utils.prototype.findRootElement = function (target) {
        var limit = 100;
        var find = function (ele, cnt) {
            if (!ele || cnt >= limit)
                return null;
            if (ele.className.indexOf(Config_1.ClassNameList.root) !== -1)
                return ele;
            return find(ele.parentNode, ++cnt);
        };
        return find(target, 1);
    };
    // 검색 영역에서 대상 텍스트에 해당하는 아이템 리스트 반환
    Utils.prototype.findStringItem = function (list, value) {
        return lodash_1.default.filter(list, function (item) { return item.toLowerCase().indexOf(value) === 0; });
    };
    // 검색 영역에서 대상 오브젝트에 해당하는 아이템 리스트 반환
    Utils.prototype.findObjectItem = function (list, value, key) {
        return lodash_1.default.filter(list, function (item) { return item[key].toLowerCase().indexOf(value) === 0; });
    };
    // 현재 선택되어있는 리스트 아이템 인덱스 반환
    Utils.prototype.findHoverListItemIndex = function (collection, target) {
        var idx = null;
        lodash_1.default.map(collection, function (item, index) {
            if (item === target)
                idx = index;
        });
        return idx;
    };
    // 스타일 값 반환
    Utils.prototype.getStyleValue = function (styleProperties, styleAttribute) {
        return styleProperties.getPropertyValue(styleAttribute);
    };
    // 리스트 데이터 가져오기
    Utils.prototype.getListData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(url)
                            .then(function (res) {
                            return res.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 문자열 교체
    Utils.prototype.replaceString = function (value, replace) {
        return replace + value.substr(replace.length, value.length);
    };
    return Utils;
}());
exports.default = new Utils;
//# sourceMappingURL=Utils.js.map