var obs = require('./../src/ObservablePO.js');

var item = {
    'obj1' : {
        'name' : 'asdf',
        'myArr' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
};

var observableItem = new obs.ObservablePO(item, [function() { console.log('changed'); }]);

for(key in observableItem) {
    console.log('ObservablePOInst#' + key);
}

console.log('asdf asdf');
console.log('> ', observableItem.getObj1());

observableItem.getObj1().setName('Hugo');
observableItem.getObj1().getMyArr().set(2, 'muha!');

console.log('[' + (item.obj1.name == 'Hugo' ? 'OK' : 'FAILED' ) + '] Original value changed after setting value by ObservablePO');
console.log('[' + (item.obj1.myArr[2] == 'muha!' ? 'OK' : 'FAILED' ) + '] Original value in array changed after setting value by ObservablePO');