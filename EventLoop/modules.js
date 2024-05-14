// console.log(arguments);
// console.log(require("module").wrapper);

// const calc = require("./moduels/test-module");
// const c = new calc();
// console.log(c.add(1, 2));

// const calc = require("./moduels/test-module");
// console.log(calc.add(1, 2));

const calc = require("./moduels/test-module");
console.log(calc.add(1, 2));
console.log(calc.multiply(1, 2));
console.log(calc.division(1, 2));

const { add, multiply, division } = require("./moduels/test-module");
console.log(add(5, 6));

//caching
require("./moduels/test-module-2")();
require("./moduels/test-module-2")();
require("./moduels/test-module-2")();
