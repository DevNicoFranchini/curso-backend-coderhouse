const randomNums = (cant) => {
  let arrayNums = [];

  for (let i = 0; i < cant; i++) {
    const randNum = Math.round(Math.random() * 10);
    const findArray = arrayNums.find((element) => element.num == randNum);

    if (findArray != undefined) {
      findArray.i++;
    } else {
      arrayNums.push({ num: randNum, i: 1 });
    }
  }
  return arrayNums;
};

process.on("message", (test) => {
  const { order, cant } = test;

  const message = JSON.stringify(test);

  if (order === "start") {
    const response = randomNums(cant);
    process.send(response);
    process.exit();
  }
});
