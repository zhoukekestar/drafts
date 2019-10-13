
let isDone: boolean = false;

isDone = 1;



enum Color { Red, Green, Blue }

let c: Color = Color.Red;


c = 1;
console.log(c);


let someValue: any = "this is a string";

let strLength: number = someValue.length;
let strLength2: number = (<string> someValue).length;
