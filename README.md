# vue-reactive-provide

<p align="center">

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/LinusBorg/vue-reactive-provide)
[![CircleCI branch](https://img.shields.io/circleci/project/github/LinusBorg/vue-reactive-provide/develop.svg)](https://circleci.com/gh/LinusBorg/vue-reactive-provide/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/LinusBorg/vue-reactive-provide/badge.svg?branch=develop)](https://coveralls.io/github/LinusBorg/vue-reactive-provide?branch=develop)

</p>

## What is `vue-reactive-provide`

It's a Vue plugin and mixin that wraps Vue's own [`provide`](https://vuejs.org/v2/api/#provide-inject) API and makes the object provided to children reactive.

This makes it much easier to pass reactive updates down from the parent component down to the children and grandchildren that consume the provided object via `inject`.

## Installation

```
npm install -D vue-reactive-provide
# or
yarn add -D vue-reactive-provide
```

You can use this library as a pure mixin or use it via an options interface injected with a Plugin.

To Install the Plugin:

```javascript
import Vue from 'vue'
import ReactiveProvide from 'vue-reactive-provide

Vue.use(ReactiveProvide)

// overwrite the option's name:
Vue.use(ReactiveProvide, {
  name: 'reactiveProvide, // default value
})
```

## Basic Usage

### Options config

Provide:

```javascript
// in the parent component
export default {
  name: 'Parent',

  reactiveProvide: {
    name: 'nameOfInject',
    include: ['items', 'filteredItems'],
  }

  data() {
    return {
      items [ /* .... */ ]
    }
  },
  computed: {
    filteredItems() {
      return this.items.length
    }
  }
}
```

Use it in the Child:

```javascript
export default {
  name: 'Child',
  inject: ['nameOfInject'],
  /**
   * {
   *   items: [ ...],
   *   num: [ ...],
   * }
   */
}
```

#### Why Is that useful? I can do something like that with `provide` alone!

### Mixin

## Development

### Compiles and hot-reloads for development

```
yarn run serve
```

### Build for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```

### Tests

This project runs unit tests with jest.

```
yarn run test:unit
```
