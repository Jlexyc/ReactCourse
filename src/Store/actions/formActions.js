

export const updateForm = (updatedForm) => {
    return {
        type: 'updateForm',
        payload: updatedForm
    }
};

export const clearForm = () => {
    return {
        type: 'clearForm',
    }
}
