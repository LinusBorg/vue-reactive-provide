# vue-reactive-provide

<p align="center">

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/LinusBorg/vue-reactive-provide)
[![CircleCI branch](https://img.shields.io/circleci/project/github/LinusBorg/vue-reactive-provide/develop.svg?style=flat-square)](https://circleci.com/gh/LinusBorg/vue-reactive-provide/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/LinusBorg/vue-reactive-provide/badge.svg?branch=develop&style=flat-square)](https://coveralls.io/github/LinusBorg/vue-reactive-provide?branch=develop)
[![npm](https://img.shields.io/npm/v/vue-reactive-provide.svg?style=flat-square)](https://www.npmjs.com/package/vue-reactive-provide)

</p>

## What this is and what it does

This library is a Vue plugin and mixin that wraps Vue's own [`provide`](https://vuejs.org/v2/api/#provide-inject) API and makes the object that is provided to children reactive.

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
import ReactiveProvide from 'vue-reactive-provide'

// not necessary when used as a mixin, see below for details
Vue.use(ReactiveProvide)

// overwrite the option's name:
Vue.use(ReactiveProvide, {
  name: 'reactiveProvide', // default value
})
```

## Basic Usage

You can use this library in two ways:

- through an option defined in a component (requires installation as a plugin with `Vue.use()` as described above)
- as a mixin (`Vue.use()` not required)

### A. Options config

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
    numItems() {
      return this.items.length
    }
  }
}
```

### B. Mixin

```javascript
import { ReactiveProvideMixin } from 'vue-reactive-provide'
export default {
  name: 'Parent',

  mixins: [
    ReactiveProvideMixin({
      name: 'nameOfInject',
      include: ['items', 'filteredItems'],
    })
  ],
  data() {
    return {
      items [ /* .... */ ]
    }
  },
  computed: {
    numItems() {
      return this.items.length
    }
  }
}
```

### Using it in the Child:

```javascript
export default {
  name: 'Child',
  inject: ['nameOfInject'],
  /**
   * {
   *   items: [ ...],
   *   numItems: [ ...],
   * }
   */
}
```

### Why Is that better than the native `provide` option?

While Vue's native `provide` implemention is very useful on its own, if you're like me you quickly found that the lack of reactivity limits it in many situations.

While we an provide a reactive object as a property on the provided object quite easily, this doesn't work for a reactive property containing a string, for example:

```
data: () => ({
  items: ['item 1', 'item 2],
  message: 'A reactive message'
})
provide() {
  return {
    items: this.items, // changes to the array will be reactive in the consuming component
    message: this.message // this will not be reactive
  }
}
```

We could pass down `$data`, but the we possibly pass down more than we want. And we also can't pass down computed props in a reactive way, either.

This small lib aims to fix these problems. You just tell it which properties of your component you want to provide to its children, and they will be put on a _reactive_ object for you.

## Options

| Option          | Required | Type (Default)           | Description                                                                                                                          |
| --------------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| name            | yes      | `string` (`undefined`)   | The name under which to `provide` the object                                                                                         |
| include         | no       | `string[]` (`false`)     | An array of strings, each a property name of the component                                                                           |
| props           | no       | `boolean` (`false`)      | Provide all `$props` properties on the object.                                                                                       |
| attrs           | no       | `boolean` (`false`)      | Works like the `props` option, but for \$attrs                                                                                       |
| listeners       | no       | `boolean` (`false`)      | Works like the `props` option, but for \$listeners                                                                                   |
| nameForComputed | no       | `string|false` (`false`) | Name for the computed prop that this plugin adds to the component. When no set, the `name` will be used.                             |
| inheritAs       | no       | `string|false` (`false`) | When set with a string: inherit the injection with name `name` from a parent component as `string`. See 'Advanced Usage' for details |

## Advanced Usage

### Passing down all...

- Props:

```javascript
reactiveProvide: {
  name: 'nameOfInject',
  props: true,
}
```

```javascript
inject: ['nameOfInject'],
// {
//   "prop1": <value>
//   "prop3": <value>
//   "prop2": <value>
//   "propX": <value>
// }
```

- Attributes:

```javascript
reactiveProvide: {
  name: 'nameOfInject',
  attrs: true,
}
```

- Props:

```javascript
reactiveProvide: {
  name: 'nameOfInject',
  listeners: true,
}
```

### Using the computed property

- With scoped slots:

The object that is `provide`d to the children is also available as a computed prop of the same name in the component that defined it.

This works great with scoped slots:

```html
<script>
export default {
  reactiveProvide: {
    name: 'nameOfInject',
    include: ['message', 'items']
  },
  computed: {
    // a computed property with the name 'nameOfInject' is automatically added
  }
}
</script>
<template>
  <div>
    <!-- This slot will receive `items` and `message` as props -->
    <slot v-bind="nameOfInject">
  </div>
</template>
```

### Inheriting an injection from the parent

When building a complicated tree of components, you may find yourself in a situation where you want to essentially pass an injection from the parent further down to the children, but also add or overwrite something. This option makes it possible.

```javascript
// defined in Parent.vue
data: () => ({
  static: 'this doesnt get changed',
  message: 'the original message'
}),
reactiveProvide: {
  name: 'nameOfInject',
  include: ['message', 'items']
},
```

```javascript
// Middleman.vue
data: () => ({
  message: 'a better message',
  plus: 'something else'
}),
reactiveProvide: {
  name: 'nameOfInject',
  include: ['message', 'plus'],
  inheritAs: 'injectFromParent'
},
```

Your `Middleman.vue`, you will now have two props (the computed one, `this.nameOfInject` and the originall injected one, `this.injectFromParent`) and the object that's provided to the children will look like this:

```javascript
{
  static: 'this doesnt get changed',
  message: 'a better message',
  plus: 'something else'
}
```

# Working on this

The following instructions are only relevant to people working on this repository:

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

# for watch mode:
yarn run test:unit:w
```
