const initialState = {
    title: '',
    weight: '',
    description: '',
    value: 'important',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'updateForm':
            return {
                ...state,
                ...action.payload
            }
        case 'clearForm':
        case 'addItem':
            return {
                ...initialState
            }
        default: 
            return state
    }
};

export default reducer