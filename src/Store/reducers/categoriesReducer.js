import { downDropList } from '../../Mocks/GoodsMock';

const initialState = {
    downDropList: downDropList
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer