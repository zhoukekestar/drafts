function hello(person: string) {
  console.log('hi' + person);
}

interface Person {
  firstName: string;
  lastName: string;
}


function hello2(person: Person) {
  console.log(`hello ${person.firstName} ${person.lastName}`);

  person.
}

hello('world');

hello([1, 2, 3]);

hello2({ firstName: 'zkk', lastName: 'abc'});

hello2({ firstName: [1, 2]});
