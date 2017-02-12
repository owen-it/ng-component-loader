> Note: Working on it...

# ng-component-loader

AngularJs component loader for Webpack

# Example

### Component

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

### Using
```js
// .src/app.js
var pageHeader = require('./componentd/page-header');

angular.module('app', [])
       .component.apply(angular, pageHeader);

```
```html
<!-- Page Header -->
<page-header></page-header>
```

