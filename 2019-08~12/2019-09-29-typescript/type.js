var isDone = false;
// isDone = 1;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
c = 1;
console.log(c);
var someValue = "this is a string";
var strLength = someValue.length;
var strLength2 = someValue.length;
