# ng-component-loader

AngularJs component loader for Webpack

# Example

### Component

```html
<!-- ./src/components/pageHeader.ng -->
<template>
    <h1>My component {{ name }}</h1>
</template>

<style>
    h1 {
        color: blue;
    }
</style>

<script>

    module.exports = ['pageHeader', {
        // ...
        controller: ($scope) => {
            'ngInject';

            $scope.name = 'AngularJs';
        }
    }];

</script>
```

### Using
```js
// .src/app.js
var pageHeader = require('./component.ng');

angular.module('app', []).component.apply(this, pageHeader);

```
```html
<!-- Page Header -->
<page-header></page-header>
```

