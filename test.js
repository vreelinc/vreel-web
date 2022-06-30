const data = [
  {
    params: ["a", "b"],
    args: [5, 6],
    body: `
      console.log("a+b",a+b);
    `,
  },
  {
    params: ["a", "b"],
    args: [5, 6],
    body: `
      console.log("a-b",a-b);
    `,
  },
  {
    params: ["a", "b"],
    args: [5, 6],
    body: `
      console.log("a*b",a*b);
    `,
  },
  {
    params: ["a", "b"],
    args: [5, 6],
    body: `
      console.log("a/b",a/b);
    `,
  },
];

const func = data.forEach((element) => {
  const Func = new Function(...element.params, element.body);
  return Func(...element.args);
});

console.log(func);
