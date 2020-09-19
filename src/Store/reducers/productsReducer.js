const initialState = {
    loading: false,
    error: null,
    list: [],
    transactions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getProducts':
            return {
                ...state,
                token: action.subtype === 'success' ? action.token : null,
                loading: action.subtype === 'loading',
                error: action.subtype === 'failed' ? action.error : null,
                list: action.subtype === 'success' ? action.products : [],
                transactions: action.subtype === 'success' ? action.transactions : [],
            }
        default:
            return state
    }
}

export default reducer