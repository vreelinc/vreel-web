const Data = [
  {
    id: 1,
    image: "/assets/images/vLinks1.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 2,
    image: "/assets/images/vLinks2.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 3,
    image: "/assets/images/honey.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 4,
    image: "/assets/images/man.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 5,
    image: "/assets/images/man.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 6,
    image: "/assets/images/sceneray.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 7,
    image: "/assets/images/vLinks1.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 8,
    image: "/assets/images/vLinks2.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 9,
    image: "/assets/images/honey.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 10,
    image: "/assets/images/man.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 11,
    image: "/assets/images/man.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
  {
    id: 12,
    image: "/assets/images/sceneray.svg",
    text: "Dow Inks PCR Supply Deal With Avangard Innovative",
  },
];

const Links = [];
const size = 6;
Data.forEach((item) => {
  if (!Links.length || Links[Links.length - 1].length === size) {
    Links.push([]);
  }
  Links[Links.length - 1].push(item);
});
Links.map((item, index) => item.map((obj) => console.log(obj)));
