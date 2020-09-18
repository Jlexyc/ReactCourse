export const changeForm = (changeForm) => {
    return {
        type: 'changeForm',
        payload: changeForm
    }
};

export const clearForm = () => {
    return {
        type: 'clearForm',
    }
}