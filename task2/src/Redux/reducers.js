
const initial = []

export const AddReducer = (state = initial, {type, payload}) => {
    switch (type) {
        case 'ADD_ITEM':
            return [
                ...state,
                {
                    initial : payload
                }
            ]

        default:
            return state;
    }
}