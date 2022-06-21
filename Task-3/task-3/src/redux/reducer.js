import axios from 'axios';

let result = [];

axios.get("https://fakestoreapi.com/products")
.then(res => {
    result = res.data;
    console.log(res.data)
}
)
.catch(err => {
    console.log(err);
}
)


const initialState = {
    count:11,
    reviews:[],
    bag : result,
}

console.log(initialState.bag)

export const reducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                bag: [...state.bag, action.payload]
                
            }
        case "ADD_COUNT":
            return {
                ...state,
                count: state.count + action.payload
            }
        case "ADD_REVIEW":
            return {
                ...state,
                reviews: [...state.reviews, action.payload]
            }
        default:
            return state;
    }
}
