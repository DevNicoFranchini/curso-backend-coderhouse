// Scope global
var variableGlobal = "Global";

const miFuncion = () => {
  console.log(variableGlobal);
};
miFuncion();
console.log(variableGlobal);

// Scope local
const otraFuncion = () => {
  let variableLocal = "Local";
  console.log(variableLocal);
};

// console.log(variableLocal);
otraFuncion();
