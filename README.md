# ng-component-loader

AngularJs component loader for Webpack

# Example

### Component

```html
<!-- ./src/components/head.ng -->
<template>
    <h1>My component {{ name }}</h1>
</template>

<style>
    h1 {
        color: blue;
    }
</style>

<script>

    module.exports = {
        // ...
        controller: ($scope) => {
            'ngInject';

            $scope.name = 'AngularJs';
        }
    }

</script>
```

### Using
```js
// .src/app.js
var head = require('./component.ng');

angular.module('app', []).component('head', head);

```
