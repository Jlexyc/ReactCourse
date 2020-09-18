const initialState = {
    title: '',
    weight: '',
    description: '',
    value: 'important',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'changeForm':
            return {
                ...state,
                ...action.payload
            }
        case 'clearForm':
        case 'onChange':
            return {
                ...initialState
            }
        default: 
            return state
    }
};

export default reducer