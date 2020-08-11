import { v4 as uuidv4 } from "uuid";

 const goods = [
  {
    id: uuidv4(),
    title: "Milk",
    weight: "1.5",
    description: "For kids",
    selected: false,
    edit: false,
  },
  {
    id: uuidv4(),
    title: "Meat",
    weight: "4",
    description: "Friends meeting",
    selected: false,
    edit: false,
  },
  {
    id: uuidv4(),
    title: "Eggs",
    weight: "0.5",
    description: "Breakfast",
    selected: false,
    edit: false,
  },
  {
    id: uuidv4(),
    title: "Butter",
    weight: "0.5",
    description: "Sandwich",
    selected: false,
    edit: false,
  },
  {
    id: uuidv4(),
    title: "Ham",
    weight: "1",
    description: "Sandwich",
    selected: false,
    edit: false,
  },
];
 export default goods;
