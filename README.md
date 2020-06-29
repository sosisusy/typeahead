# Typeahead

### 소개
typeahead는 텍스트 입력 인풋의 타이핑 도우미입니다.   
타입스크립트로 작성이 되었지만 빌드된 js파일을 임포트해서 사용할 수도 있습니다.

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
<link rel="stylesheet" href="your/path/dist/typeahead.min.css">
<script src="your/path/dist/typeahead.min.js">
```
#### typescript
```typescript
import Typeahead from "so-typeahead"
```

### 예제
```typescript
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
```typescript
{
    // 인풋 대상 지정
    target: string | HTMLInputElement,
    // 검색 할 영역
    list?: Array<string> | Array<object>,
    // 검색 할 영역 fetch
    lazy?: string,
    // 검색 영역이 오브젝트 배열로 이루어졌을 경우 검색할 대상에 해당하는 속성을 지정
    key?: string,
    // 검색된 리스트 갯수가 searchLine이내로 들어올 경우 화면에 표시
    searchLimit?: Number,

    //// 힌트 설정 ////
    // 인풋창에 힌트표시 여부
    hint?: boolean,
    // 힌트 색상
    hintColor?: string,

    //// 아이템 스타일 지정 ////
    // 아이템 글자 색상
    itemColor?: string,
    // 아이템 배경 색상
    itemBackgroundColor?: string,
    // 아이템 마우스 오버 글자 색상
    itemHoverColor?: string
    // 아이템 마우스 오버 배경 색상
    itemHoverBackgroundColor?: string

    //// 사용자정의 클래스 추가 ////
    // 루트 컨테이너에 클래스 추가
    addRootClass?: Array<string>,
    // 검색 목록 컨테이너에 클래스 추가
    addListClass?: Array<string>,
    // 검색된 목록 아이템에 클래스 추가
    addItemClass?: Array<string>,

    //// 사용자 정의 이벤트 ////
    /**
     * 검색된 리스트가 있을 경우 호출
     * @param {Array<any>} 검색된 값
     */
    onSearch?: Function,
    /**
     * 검색된 아이템 선택 시 호출
     * @param {string | object} 선택된 값
     */
    onSelect?: Function,
}
```