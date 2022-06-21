

export const add = (text) => {
    return {
        type: "ADD",
        payload: text
    }
}

export const addReview = (text) => {
    return {
        type: "ADD_REVIEW",
        payload: text
    }
}

export const addCount = (text) => {
    return {
        type: "ADD_COUNT",
        payload: text
    }
}