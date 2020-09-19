export const login = (email, password) => (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({
        type: 'auth',
        subtype: 'loading'
    })

    if ( password === 'error' ) {
        setTimeout(() => {
            dispatch({
                type: 'auth',
                subtype: 'failed',
                error: { message: 'Sorry, it\'s a dummy error' },
            })
            reject()
        }, 2000)
        return
    }

    setTimeout(() => {
        dispatch({
            type: 'auth',
            subtype: 'success',
            token: 'DUMMY TOKEN',
            username: email
        })
        resolve()
    }, 2000)


})

export const updateForm = (fields) => {
    return {
        type: 'updateForm',
        fields
    }
}