// export const content = {
//    categories: [
//       "All",
//       "Meat",
//       "Vegetarian",
//       "Grill",
//       "Spicy",
//       "Closed"
//    ],
//    sortItems: [
//       {name: 'popularity', type: 'rating', order: 'desc'},
//       {name: 'price ↓', type: 'price', order: 'desc'},
//       {name: 'price ↑', type: 'price', order: 'abc'},
//       {name: 'alphabet', type: 'name', order: 'abc'},
//    ],
//    availableTypes: ['Thin', 'Traditional'],
//    availableSizes: [26, 30, 40],
// }




export const categories: string[] = [
    "All",
    "Meat",
    "Vegetarian",
    "Grill",
    "Spicy",
    "Closed"
]

export const sortItems: {
    name: string, type: string, order: string
}[] = [
    {name: 'popularity', type: 'rating', order: 'desc'},
    {name: 'price ↓', type: 'price', order: 'desc'},
    {name: 'price ↑', type: 'price', order: 'abc'},
    {name: 'alphabet', type: 'name', order: 'abc'},
]

export const availableTypes: string[] = ['Thin', 'Traditional']

export const availableSizes: number[] = [26, 30, 40]