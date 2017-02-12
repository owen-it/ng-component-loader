> Note: Working on it...

# ng-component-loader

AngularJs component loader for Webpack


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

