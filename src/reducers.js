import { combineReducers } from 'redux';

import { TRANSACTION_ADD, TRANSACTION_ADD_ALL, TRANSACTION_DELETE, TRANSACTION_UPDATE } from './actions';


function processing(state = [], action) {
    switch (action.type) {
        case TRANSACTION_ADD:
            return [
                ...state,
                {
                    _id: action._id,
                    amount: action.amount,
                    date: action.date,
                    type: action.type,
                    category: action.category,
                    description: action.description
                }
            ]
        case TRANSACTION_ADD_ALL:
            return [...action.transaction_list]
        case TRANSACTION_DELETE:
            return state.filter(function (transaction) {
                return transaction._id !== action._id;
            })
        case TRANSACTION_UPDATE:
            return state.map(function (transaction) {
                if (transaction._id === action._id) {
                    return {
                        ...transaction,
                        amount: action.amount,
                        date: action.date,
                        type: action.type,
                        category: action.category,
                        description: action.description
                    };
                }
                return transaction
            })
        default:
            return state
    }
}

export default combineReducers({
    transactions: processing
})