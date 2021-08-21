---
title: 'Optional Chaining `?.`'
date: 2021-06-17
tags: ['JavaScript']
slug: 'optional-chaining'
template: post
draft: false
---

자바스크립트에서는 객체 안의 속성값이 존재하지 않는 상황이 종종 있다. 예를 들면 다음과 같다.

```tsx
const obj = {
	property1: {
		flag: true,
		value: 10,
	},
};

if (obj.property2.value) {} // TypeError: Cannot read property 'value' of undefined
```

`undefined`의 속성값에 접근하려고 하다보니 아예 TypeError가 발생한다. 그래서 다음과 같이 순차적으로 속성의 존재 유무를 확인해야 하는 코드를 많이 작성해야 했다.

```tsx
if (obj.property2 && obj.property2.value) {} // 먼저 `obj.property2`가 존재하는지 확인
```

하지만 ES2020에 추가된 Optional Chaining 문법을 이용하면 이 조건식을 줄일 수 있으며, 보다 안전하게 속성값에 접근할 수 있다.

```tsx
if (obj.property2?.value) {}
```

만약 `?.`의 왼쪽에 작성된 객체(평가 대상)가 nullish이면, 즉시 평가를 멈추고 `undefined`를 반환한다. `?.`를 통해 Error로 인해 스크립트 실행이 멈추지 않는 안전한 코드를 작성할 수 있다.

`?.`은 연산자가 아니라 함수나 대괄호와 함께 동작하는 문법이다.

`?.`는 배열이나 함수에서도 다음과 같이 사용할 수 있다.

```tsx
const arr = null;
console.log(arr[0]); // TypeError: Cannot read property '0' of null
console.log(arr?.[0]); // undefined
```

```tsx
const func = null;
func(); // TypeError: func is not a function
func?.(); // undefined
```

```tsx
const arr = new Set();
arr.push(); // TypeError: arr.push is not a function
arr.push?.(); // undefined
```

```tsx
let html = document.querySelector('.my-element').innerHTML; // TypeError: Cannot read property 'innerHTML' of null
let html = document.querySelector('.my-element')?.innerHTML; // undefined
```

하지만 Optional Chaining을 남용할 경우, 에러가 발생하지 않기 때문에 잘못 작성된 코드를 디버깅하기 어려워질 수 있다. 따라서 존재하지 않아도 괜찮은 대상에만 사용해야 한다.