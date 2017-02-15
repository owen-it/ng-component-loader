# ng-component-loader [![npm package](https://img.shields.io/npm/v/ng-component-loader.svg)](https://www.npmjs.com/package/ng-component-loader)

`ng-component-loader` is a loader for Webpack that can transform `*.ng` files into [AngularJs Components](https://docs.angularjs.org/guide/component).

## What is Webpack?

webpack is a tool to build JavaScript modules in your application. To start using `webpack` from its [cli](https://webpack.js.org/api/cli) or [api](https://webpack.js.org/api/node), follow the [Installation instructions](https://webpack.js.org/guides/installation).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, run a development server that hot-reloads your code without page refresh and many such cool features. Learn more about [why you should use webpack](https://webpack.js.org/guides/why-webpack).

## Understanding Loaders 

Loaders are transformations that are applied on a resource file of your application. They are functions (running in Node.js) that take the source of a resource file as the parameter and return the new source.
Learn more about [loaders](https://webpack.js.org/concepts/loaders/).

## Install

```
npm install --save-dev ng-component-loader 
```

## Usage

Use the loader either via your Webpack config.

#### Via webpack config (recommended)

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.ng$/,
        use: [ 'ng-component-loader' ]
      }
    ]
  }
}
```

#### Passing parameters: 

```
	{
        test: /\.ng$/, 
        use: ['ng-component-loader?map=false']
    }
```

### Angular Component

In AngularJS, a Component is a special kind of directive that uses a simpler configuration which is suitable for a component-based application structure. 

##### The `*.ng` file

A *.ng file is a custom file format that uses HTML-like syntax to describe a angular component. Each *.ng file consists of three types of top-level language blocks: `<template>`, `<script>` and `<style>`:

```html
<!-- ./src/components/my-component.ng -->
<template>
    <h1>My component {{ $ctrl.description }}</h1>
</template>

<style>
    h1 {
        color: #8f8f8f;
    }
</style>

<script>

    module.exports = {
        controller: () => {
            this.description = 'AngularJs';
        }
    };

</script>
```

ng-component-loader will parse the file, extract each language block, pipe them through other loaders if necessary, and finally assemble them back into a CommonJS module whose module.exports is a ng component options object.

### Language Blocks

#### `<template>`

- Default language: `html`.

- Each `*.ng` file can contain at most one `<template>` block at a time.

- Contents will be extracted as a string and used as the `template` option for the compiled Vue component.

#### `<script>`

- Default language: `js` (ES2015 is supported automatically if `babel-loader` or `buble-loader` is detected).

- Each `*.ng` file can contain at most one `<script>` block at a time.

- The script is executed in a CommonJS like environment (just like a normal `.js` module bundled via Webpack), which means you can `require()` other dependencies. And with ES2015 support, you can also use the `import` and `export` syntax.

```js
    // tag script inside ng file ./src/components/my-component.ng
    exports default {
        controller: () => {
            this.description = 'AngularJs';
        }
    };
```
Registering your component:

```js
import * as angular from 'angular';

import myComponent from './components/my-component.ng';

angular.module('app', []).component('myComponent', myComponent);
```

You can also return an array with the component data. The first item represents the component name and the second component options.

```js
    // tag script inside ng file ./src/components/my-component.ng
    exports default ['myComponent', {
        controller: () => {
            this.description = 'AngularJs';
        }
    }];
```

Registering:

```js
import * as angular from 'angular';

import myComponent from './components/my-component.ng';

angular.module('app', []).component.apply(this, myComponent);

// ES2015
// .component(...myComponent)
```

#### `<style>`
tra
- Default Language: `css`.

- Multiple `<style>` tags are supported in a single `*.vue` file.

- A `<style>` tag can have `scoped` or `module` attributes (see [Scoped CSS](../features/scoped-css.md) and [CSS Modules](../features/css-modules.md)) to help encapsulating the styles to the current component. Multiple `<style>` tags with different encapsulation modes can be mixed in the same component.

- By default, contents will be extracted and dynamically inserted into the document's `<head>` as an actual `<style>` tag using `style-loader`. It's also possible to [configure Webpack so that all styles in all components are extracted into a single CSS file](../configurations/extract-css.md).

#### The component

```html
<my-component></my-component>
```

### Syntax Highlighting

You can treat `*.ng` files as HTML in your editor.

### License

[MIT](http://opensource.org/licenses/MIT)
