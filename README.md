> Note: Working on it...

# ng-component-loader

`ng-component-loader` is a loader for Webpack that can transform Angular components into a plain JavaScript module.

## Understanding Components

In AngularJS, a Component is a special kind of directive that uses a simpler configuration which is suitable for a component-based application structure. 

## What is Webpack?

webpack is a tool to build JavaScript modules in your application. To start using `webpack` from its [cli](/api/cli) or [api](/api/node), follow the [Installation instructions](/guides/installation).
webpack simplifies your workflow by quickly constructing a dependency graph of your application and bundling them in the right order. webpack can be configured to customise optimisations to your code, to split vendor/css/js code for production, run a development server that hot-reloads your code without page refresh and many such cool features. Learn more about [why you should use webpack](/guides/why-webpack).

## Understanding Loaders 

Loaders are transformations that are applied on a resource file of your application. They are functions (running in Node.js) that take the source of a resource file as the parameter and return the new source.

## Install

```
npm install --save-dev ng-component-loader 
```

## Usage:

Use the loader either via your webpack config, CLI or inline.

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

### In your application

#### Component

Create your component file.

```html
<!-- ./src/components/page-header.ng -->
<template>
    <h1>My component {{ name }}</h1>
</template>

<style>
    h1 {
        color: #8f8f8f;
    }
</style>

<script>

    module.exports = ['pageHeader', {
        // ...
        controller: ($scope) => {
            $scope.name = 'AngularJs';
        }
    }];

</script>
```

#### Applying component
```js
// .src/app.js

imoprt pageHeader from './components/page-header';

angular.module('app', [])
       .component.apply(angular, pageHeader);

```

```html
<!-- Page Header -->
<page-header></page-header>
```

