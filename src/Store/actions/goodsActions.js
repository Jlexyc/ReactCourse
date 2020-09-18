export const addItem = (item) => {
    return {
        type: 'addItem',
        payload: item
    }
};

export const onDelete = (item) => {
    return {
        type: 'onDelete',
        id: item,
    }
}

export const onCounter = (id) => {
    return {
        type: 'onCounter',
        payload: id
    };
};

export const onChange = (newForm) => {
    return {
        type: 'onChange',
        form: newForm
    };
};

export const getId = (itemId) => {
    return {
        type: 'getId',
        id: itemId
    } 
};

export const deletingSelectedItems = () => {
    return {
        type: 'deletingSelectedItems'
    }
};