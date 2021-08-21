---
title: 'Create React App v2 살펴보기'
date: 2018-10-21T13:16:26Z
tags: ['React', 'Create React App']
slug: 'overview-create-react-app-v2'
template: post
draft: false
---

![](./cra.png?raw=true)
2018년 10월 1일 Create React App이 2.0으로 업데이트 되었습니다. 이번 2.0에서는 정말 멋지고 편리한 기능이 많이 추가되었습니다.

## Create React App v2의 새로운 기능들과 변경점들

일단 무엇이 바뀌었고 어떤 기능이 있는지 나열해봅시다.

- 이제 Sass와 CSS Modules을 별도의 Webpack 설정 없이 바로 적용하여 사용할 수 있습니다.
- 지난 2018년 8월 말에 정말 오랜만에 Babel이 7으로 돌아왔습니다. 이제 CRA에서도 [Babel 7](https://babeljs.io/blog/2018/08/27/7.0.0)로 업데이트됩니다.
- Babel 7이 적용됨에 따라 [`<React.Fragment>`를 `<>`로도 사용](https://babeljs.io/blog/2018/08/27/7.0.0#jsx-fragment-support)할 수 있습니다!
- [Webpack 4](https://github.com/webpack/webpack/releases/tag/v4.0.0), [Jest 23](https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing.html)로도 업데이트 되었습니다. Webpack 버전은 2018년 10월 17일 현재 설치해보니 4.19.1이군요.
- PostCSS의 플러그인 중 하나인 [`postcss-preset-env`의 Stage 3 문법](https://preset-env.cssdb.org/features#stage-3)을 사용할 수 있습니다.
- SVG를 리액트 컴포넌트와 같이 불러와서 사용할 수 있습니다. `<ExampleSVGComponent />` 이런 식으로 불러오게 할 수 있습니다.
- Yarn의 Plug'n'Play 기능을 실험적으로 지원합니다. 패키지 매니저를 통해 설치되는 각종 패키지들이 저장되는 `node_modules` 폴더를 없애는 기능입니다. 아직까지는 실험 단계입니다.
- [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware)를 이용한 [프록시 설정](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)을 지원합니다.
- 최신 버전의 Node로 작성된 패키지를 사용했을 때 빌드가 되지 않는 문제가 해결됩니다. 대표적으로 `query-string`가 그랬습니다.
- 기존에는 기본 설정되어 있던 서비스 워커가 이제 기본적으로 비활성화됩니다. 필요할 때만 따로 켜주어야 하는데 방법은 어렵지 않습니다.
- 이제 `sw-precache` 가 아닌 [Workbox](https://developers.google.com/web/tools/workbox/) 라이브러리 기반의 서비스 워커가 적용됩니다. Workbox는 오프라인 상태를 지원하는 PWA를 쉽게 만들 수 있도록 도와주는 라이브러리입니다.
- 생성된 프로젝트가 `Initial commit from Create React App`라는 초기 커밋과 함께 Git 저장소로 기본 생성됩니다.
- 빌드할 때 PropTypes의 정의가 [자동으로 없어진 채로 빌드](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md#proptypes-definitions-are-now-removed-in-production)됩니다.
- Node 6를 [더 이상 지원하지 않습니다](https://github.com/facebook/create-react-app/pull/4383). Node 6의 공식 지원 기간도 이미 끝난 지 오래니까요.
- 이제 더 이상 [IE를 기본 지원하지 않습니다.](https://github.com/facebook/create-react-app/pull/5090) IE를 지원하기 위해서 [수동으로 지원](https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill)해야 합니다.
- CRA로 프로젝트를 생성하고 처음 표시되는 화면이 바뀌었습니다.

그 외의 수많은 변경점과 새로운 기능들, 그리고 버그 수정 내역은 [여기](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md#detailed-changelog)서 확인할 수 있습니다.

이제 하나하나 살펴보겠습니다.

## Create React App 프로젝트 생성하기

Create React App으로 프로젝트를 생성하는 방법은 동일합니다.

```sh
# npx
$ npx create-react-app my-app
# npm
$ npm init react-app my-app
# yarn
$ yarn create react-app my-app
```

이후 생성한 폴더로 이동하고 npm 사용자는 `npm start`, yarn 사용자는 `yarn start`로 실행합니다.

```sh
$ cd my-app
# npm
$ npm start
# yarn
$ yarn start
```

## Sass 적용하기

`node-sass`를 설치하고

```sh
# npm
$ npm install node-sass
# yarn
$ yarn add node-sass
```

`scss`나 `sass` 파일째로 import하면 끝입니다. 정말 간편해졌습니다.

```js
import 'style.scss';
// or
import 'style.sass';
```

만약에 `node-sass`가 설치되지 않았다면 컴파일 시 다음과 같은 메시지도 띄워줍니다.

```sh
To import Sass files, you first need to install node-sass.
Run `npm install node-sass` or `yarn add node-sass` inside your workspace.
```

## CSS Modules 적용하기

CSS Modules를 이용하면 스타일 정의를 객체처럼 사용할 수 있습니다. 또한, 클래스 이름이 중복된다 하더라도 CSS 규칙이 중복 적용되지 않습니다.  
예를 들어서, 버튼 컴포넌트에 색깔을 적용한다고 합시다. CSS Modules을 적용하기 위해서는 파일을 `.module.css`로 저장해주시면 됩니다. 여기서는 `Button.module.css`를 만들어 보겠습니다.

#### src/Button.module.css

```css
.alert {
  background-color: #c0392b;
  color: white;
}
```

그리고 `App.css`에서 버튼의 기본 스타일과 또 다른 `.alert` 규칙을 만들어봅시다. 여기서의 `.alert`는 새빨간 `red`로 적용해보겠습니다.

#### src/App.css

```css
.App {
  text-align: center;
}

.btn {
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.alert {
  background-color: red;
  color: white;
}
```

그리고 적용합니다. `Button.module.css`를 `import styles from './Button.module.css'`와 같이 불러와서 `className`에 `styles.alert`와 같이 적용할 수 있습니다.

#### src/App.js

```js
import React, { Component } from 'react';
import styles from './Button.module.css';
import './src/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button className={'btn ' + styles.alert}>Alert Button</button>
      </div>
    );
  }
}

export default App;
```

`styles.alert`가 쓰여진 부분은 실제 렌더링되었을 때, `Button_alert__2CHwN`와 같이 뒤에 랜덤 해쉬값이 같이 들어간 이름으로 렌더링되기 때문에 클래스 이름이 중복되지 않습니다.

```html
<button class="btn Button_alert__2CHwN">Alert Button</button>
```

![](./css_modules_example.png?raw=true)
_이런 식으로 적용됩니다._

## `<React.Fragment>`를 더 간단하게 사용하기

한 컴포넌트에서 두 개 이상의 요소를 렌더링할 때는 `<div>`로 감싸는 방법도 있지만 더 깔끔한 방법으로 [`<React.Fragment>`](https://reactjs.org/docs/fragments.html)를 이용합니다.  
이 `<React.Fragment>`를 이제 `<>`만 입력해서 사용할 수 있습니다.

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <button className="btn">Button</button>
        <button className="btn">Button</button>
        <button className="btn">Button</button>
      </>
    );
  }
}

export default App;
```

## `postcss-preset-env` Stage 3 문법

PostCSS의 플러그인 중 하나인 [`postcss-preset-env`의 Stage 3 문법](https://preset-env.cssdb.org/features#stage-3)을 사용할 수 있게 되었습니다.  
혹시 몰라서 Stage 2 이하의 문법을 적용해보았지만 컴파일이 되지 않았습니다.

## SVG를 리액트 컴포넌트처럼 사용하기

예전에는 SVG 파일을 이미지로 취급해서 사용할 수 있었습니다.

```js
import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  render() {
    return <img src={logo} className="App-logo" alt="logo" />;
  }
}

export default App;
```

이제는 SVG 파일을 리액트 컴포넌트로 불러올 수 있습니다.

```js
import { ReactComponent as Logo } from './logo.svg';
```

다음과 같이 사용할 수 있습니다.

```js
import React, { Component } from 'react';
import { ReactComponent as Logo } from './logo.svg';

class App extends Component {
  render() {
    return <Logo />;
  }
}

export default App;
```

## `http-proxy-middleware`를 이용한 프록시 설정

이제 `http-proxy-middleware`을 이용하여 다양한 옵션으로 프록시 설정을 할 수 있게 되었습니다.  
Express 서버를 5000 포트에 열어놨다고 가정하고 진행하겠습니다. 먼저 `http-proxy-middleware`를 설치해줍니다.

```sh
# npm
$ npm install http-proxy-middleware
# yarn
$ yarn add http-proxy-middleware
```

그리고 `src/setupProxy.js`를 새로 만든 뒤, 다음과 같이 코드를 입력합니다.

#### src/setupProxy.js

```js
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};
```

저장을 하고 다시 `npm start`로 개발 서버를 열어주면 프록시가 자동으로 적용됩니다. `axios`와 같은 도구로 HTTP 요청을 보낼 수도 있습니다.  
예를 들어서, React를 4000 포트에, Express 서버를 5000 포트에 열어서 돌리고 있다면 `http://localhost:4000/api`에 접속함으로 Express 서버에 접속할 수 있습니다.  
이러한 프록시 설정은 개발 중에 발생할 수 있는 CORS 문제를 어느 정도 회피할 수 있다는 장점이 있습니다.  
여기서는 간단하게 설정해봤지만 이외에도 다양한 옵션을 사용할 수 있습니다. 이 옵션들은 [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware) GitHub에서 확인할 수 있습니다.

## 서비스 워커 사용하기

이제 서비스 워커가 기본적으로 비활성화됩니다. 서비스 워커를 사용하기 위해서는 `src/index.js` 파일에서 맨 아래에 있는 다음 코드에서 `unregister`를 `register`로만 수정하면 됩니다.

```js
serviceWorker.unregister();
```

다음과 같이 수정합니다.

```js
serviceWorker.register();
```

## Git 저장소 기본 생성

이제 Create React App으로 프로젝트를 생성했을 때 `.git` 파일이 함께 생성됩니다. 프로젝트 폴더가 Git 저장소로 기본 세팅되는 것입니다. `git log`를 치면 커밋 내역을 확인할 수 있습니다.

```sh
$ git log
commit f3f6b5463eeb0f9c29cb4d3ab57cd922d99c5318 (HEAD -> master)
Author: Puterism <puterism.k@gmail.com>
Date:   Sun Oct 14 04:11:54 2018 +0000

    Initial commit from Create React App
```

## 수동으로 IE 지원하기

이제 Internet Explorer를 더 이상 지원하지 않습니다. IE를 지원하기 위해서는 `react-app-polyfill` 패키지를 불러와야 합니다.
`react-app-polyfill`를 설치하고

```sh
# npm
$ npm install react-app-polyfill
# yarn
$ yarn add react-app-polyfill
```

Internet Explorer 9까지 지원하기 위해서는

```js
import 'react-app-polyfill/ie9';
```

Internet Explorer 11까지만 지원하려면

```js
import 'react-app-polyfill/ie11';
```

위와 같이 import하면 됩니다. `react-app-polyfill/ie9`를 import했다면 IE10, IE11까지 Polyfill됩니다.

## 기존 CRA 프로젝트에서 v2로 업그레이드하고 싶다면?

`package.json` 파일을 열고, `"react-script"`부분을 "2.0.3"으로 수정한 뒤, npm 사용자는 `npm install` yarn 사용자는 `yarn`을 실행하면 됩니다.

## 개인적인 소감

Create React App이 v2로 업데이트되면서 더 편리해졌지만 프로젝트를 세팅할 때 편리하고 다양한 기능을 더 많이 제공하고 있는 건 여전히 Vue CLI가 앞서고 있다고 생각합니다.
심지어 Vue CLI는 브라우저로 프로젝트를 생성할 수 있는 GUI 기능까지 제공합니다! 처음 Vue를 접하는 사람에게는 편리한 기능임에 틀림없어 보입니다.  
![](./vue-ui-new-project.png)
_프로젝트 생성하는데 GUI라니..._

Vue는 이런 식으로 생태계를 확장시키기 위해서 다양하게 노력하고 있습니다. CRA도 마찬가지로 처음 React를 접하는 사람들에게도 어려움 없이 이용할 수 있는 친근한 UX가 필요하지 않을까 생각됩니다.

그래도 이번에는 정말 좋은 기능들이 많이 업데이트되었습니다. 앞으로도 더 많은 발전이 이루어졌으면 좋겠습니다.

## 참고 자료

[Create React App: User Guide](https://facebook.github.io/create-react-app/)  
[Create React App 2.0: Babel 7, Sass, and More](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html)  
[Scotch.io: https://scotch.io/tutorials/whats-new-in-create-react-app-2](https://scotch.io/tutorials/whats-new-in-create-react-app-2)  
[velog.io @velopert: Create-react-app V2 릴리즈! 무슨 변경 사항이 있을까?](https://velog.io/@velopert/create-react-app-v2)
