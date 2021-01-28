checkOpposite = (input) => {
  let s = input;
  let split = s.split("");
  let t = [];
  split.forEach((letter, i) => t.push(split[split.length - i - 1]));
  t = t.join("");
  if (t == s) {
    console.log(true);
  } else console.log(false);
};
twoSum = (input, sum) => {
  let intermediate = [];
  let pair = [];
  input.forEach((number) => {
    if (intermediate.length) {
      intermediate.forEach((i) => {
        if (sum - number === i) {
          pair.push([i, number]);
          input = input.filter((value) => value !== i);
        } else {
          intermediate.push(number);
          input.filter((value) => value !== number);
        }
      });
    } else {
      intermediate.push(number);
      input.filter((value) => value !== number);
    }
  });
};
findDuplicate = (array) => {
  const newArray = [...new Set(array)];
  let check = 0;
  for (i = 0; i < array.length; i++) {
    if (array[check] !== newArray[check]) {
      return console.log(array[check]);
    } else check++;
  }
};
findIsomorph = () => {
  const s = "paper";
  const t = "title";
  let firstHalfKeys = [];
  let firstHalf = [];
  let secondHalfKeys = [];
  let secondHalf = [];
  let number = 0;
  let number2 = 0;
  s.split("").map((letter) => {
    let index = firstHalfKeys.indexOf(letter);
    if (index !== -1) {
      firstHalf.push(firstHalfKeys[index + 1]);
    } else {
      firstHalfKeys.push(letter, number);
      firstHalf.push(number);
      number++;
    }
  });
  t.split("").map((letter) => {
    let index = secondHalfKeys.indexOf(letter);
    if (index !== -1) {
      secondHalf.push(secondHalfKeys[index + 1]);
    } else {
      secondHalfKeys.push(letter, number2);
      secondHalf.push(number2);
      number2++;
    }
  });
  firstHalf = firstHalf.join("");
  secondHalf = secondHalf.join("");
  if (firstHalf == secondHalf) console.log(true);
  else console.log(false);
};
