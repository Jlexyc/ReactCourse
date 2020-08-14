import { v4 as uuidv4 } from 'uuid';

export const goods = [
    {
        id: uuidv4(),
        title: "Milk",
        weight: "1.5",
        description: "For kids",
        counter: false,
        value: 'notImportant'
    },
    {
        id: uuidv4(),
        title: "Meat",
        weight: "4",
        description: "Friends meeting",
        counter: false,
        value: 'notImportant'
    },
    {
        id: uuidv4(),
        title: "Eggs",
        weight: "0.5",
        description: "Breakfast",
        counter: false,
        value: 'notImportant'
    },
    {
        id: uuidv4(),
        title: "Butter",
        weight: "0.5",
        description: "Sandwich",
        counter: false,
        value: 'notImportant'
    },
    {
        id: uuidv4(),
        title: "Ham",
        weight: "1",
        description: "Sandwich",
        counter: false,
        value: 'notImportant'
    },
];

export const downDropList = [
    {
        id: 1,
        name: 'Important',
        label: 'important',
    },
    {
        id: 2,
        name: 'Not Important',
        label: 'notImportant',
    }
]