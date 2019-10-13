function hello(person) {
    console.log('hi' + person);
}
function hello2(person) {
    console.log("hello " + person.firstName + " " + person.lastName);
}
hello('world');
hello([1, 2, 3]);
hello2({ firstName: 'zkk', lastName: 'abc' });
hello2({ firstName: [1, 2] });
