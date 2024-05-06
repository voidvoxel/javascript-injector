# `javascript-injector`

[![Known Vulnerabilities](https://snyk.io/test/github/voidvoxel/javascript-injector/badge.svg)](https://snyk.io/test/github/voidvoxel/javascript-injector)

Inject headers, footers, and wrappers into JavaScript source code.

## Installation

```sh
npm i javascript-injector
```

## Importing

### Module

```js
import JavaScriptInjector from "javascript-injector";
```

### CommonJS

```js
const JavaScriptInjector = require("javascript-injector");
```

## Usage

```js
const undecorated = `console.log("undecorated");`;


function decorator (callback) {
    console.log("before");

    callback();

    console.log("after");
}


const injector = new JavaScriptInjector();

injector.addDecorator(decorator);

const decorated = injector.inject(undecorated);

const f = new Function(decorated);

f();
```
