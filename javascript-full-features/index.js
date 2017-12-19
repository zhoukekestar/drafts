
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}

console.log('hi')
var a = new MyClass();
console.log(a);
