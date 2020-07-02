# Typeahead

### 소개
typeahead는 텍스트 입력 인풋의 타이핑 도우미입니다.   

#### 데모
* [데모페이지](https://sosisusy.github.io/typeahead/)

### 목차
- [설치](#설치)
- [import](#import)
- [예제](#예제)
- [구성](#구성)

### 설치
```typescript
npm i so-typeahead
```

### import
#### HTML
```html
<link rel="stylesheet" href="your/path/node_modules/so-typeahead/dist/typeahead.min.css">
<script src="your/path/node_modules/so-typeahead/dist/typeahead.min.js">
```
#### typescript or javascript
```typescript
import Typeahead from "so-typeahead"
import "so-typeahead/dist/typeahead.css"
```

### 예제
```typescript
import Typeahead from "so-typeahead"
import "so-typeahead/dist/typeahead.css"

Typeahead({
    target: "#example3",                                    // 타겟 설정
    // list: dummyObjectList,                               // 검색 영역 설정
    lazy: "https://jsonplaceholder.typicode.com/photos",    // 검색 영역 설정 (fetch)
    key: "title",                                           // 검색 영역이 오브젝트 배열로 이루어졌다면 키 값 설정
    searchLimit: 20,                                        // 0 < 값 <= limit 범위 안에 포함할 경우에만 리스트 표시
    hint: true,                                             // 인풋 힌트 사용유무
    hintColor: "red",                                       // 힌트 색상 지정
    itemColor: "#89a3e0",                                   // 리스트 아이템 색상 지정
    itemBackgroundColor: "white",                           // 리스트 아이템 배경 색상 지정
    itemHoverColor: "white",                                // 리스트 아이템 마우스 오버 시 색상 지정
    itemHoverBackgroundColor: "#89a3e0",                    // 리스트 아이템 마우스 오버 시 배경 색상 지정
    addItemClass: ["custom-item"],                          // 리스트 아이템 클래스 추가
    addListClass: ["custom-list"],                          // 리스트 컨테이너 클래스 추가
    onSearch: function (items) {                            // 검색 시 호출
        console.log(items)                                  // 검색된 리스트 반환
    },
    onSelect: function (item) {                             // 리스트 아이템 선택 시 호출
        console.log(item)                                   // 선택된 아이템 반환
    },
})
```

### 구성
#### 속성
| 속성 | 타입 | 기본값 | 설명 |
|------|-----|-------|-----|
|target|`string` or `HTMLInputElement`| `required` | 인풋 대상 지정(셀렉터 or element) |
|list|`Array<string>` or `Array<object>`|`[]`|검색 영역 지정|
|lazy|`string`|`""`|검색 영역 지정(fetch)|
|key|`string`|`""`|검색 영역 타입이 `Array<object>`일 경우 검색 조건 키 설정|
|searchLimit|`number`|`10`|검색된 레코드 수가 `searchLimit`이내로 검색된 경우 리스트 힌트 표시|
|hint|`boolean`|`false`|선택된 인풋창에 힌트 표시 여부 설정|
|hintColor|`string`|`#ddd`|힌트 색상 지정|
|itemColor|`string`|`#333`|리스트 아이템 글자 색상 지정|
|itemBackgroundColor|`string`|`white`|리스트 아이템 배경 색상 지정|
|itemHoverColor|`string`|`#8eadf3`|리스트 아이템 선택 시 글자 색상 지정|
|itemHoverBackgroundColor|`string`|`inherit`|리스트 아이템 선택 시 배경 색상 지정|

#### 클래스 추가
| 속성 | 타입 | 기본값 | 설명 |
|------|-----|-------|-----|
|addRootClass|`Array<string>`|`[]`|루트 컨테이너에 클래스 추가|
|addListClass|`Array<string>`|`[]`|리스트 컨테이너에 클래스 추가|
|addItemClass|`Array<string>`|`[]`|리스트 아이템에 클래스 추가|

#### 사용자 정의 메소드
| 속성 | 타입 | 파라미터 | 기본값 | 설명 |
|------|-----|-----|-------|-----|
|onSearch|`Function`|`Array<any>`|`undefined`|검색된 리스트가 있을 경우 호출|
|onSearch|`Function`|`string` or `object`|`undefined`|검색된 아이템 선택 시 호출|
