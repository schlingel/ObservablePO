# Observable Plain Object - ObservablePO

Purpose of this project is to provide an easy and small object wrapper which works on objects and arrays alike. This is useful if you don't have access to MVC frameworks like Backbone.js or AngularJS or if you have to refactor an old jQuery application. This way it gets easier to seperate UI logic and model.

## Usage of ObservablePO

The wrapper creates getter and setter functions for all properties. All values which are non-primitive values are returned as ObservablePOs. The change event bubbles to the top-level ObservablePO object.

> var obj1 = {
>   name : 'Hugo',
>   arr : [1, 2, 3, 4]
> };
>
> var observable = new ObservablePO(obj1, [function() { console.log('change event!'); }]);
>
> observable.setName('Alfred');
> observable.getArr().set(1, 123);
> // results to
> // {
> //   name : 'Alfred',
> //   arr : [1, 123, 3, 4]
> // }

Primitive types are:
-  String
-  Numbers
