const initialState = {
    username: '',
    token: '',
    error: null,
    form: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth':
            return {
                ...state,
                token: action.subtype === 'success' ? action.token : null,
                username: action.subtype === 'success' ? action.username : null,
                loading: action.subtype === 'loading',
                error: action.subtype === 'failed' ? action.error : null
            }
        case 'updateForm':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.fields
                }
            }
        default:
            return state
    }
}

export default reducer