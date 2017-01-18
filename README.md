# ng-component-loader
Component Loader for Angular 1.x.x

# Example

### Component

```html
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

var head = require('./component.ng');

angular.module('app', []).component('head', head);

```
