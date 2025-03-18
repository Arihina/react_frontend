export const TRANSACTION_ADD = 'TRANSACTION_ADD';
export const TRANSACTION_ADD_ALL = 'TRANSACTION_ADD_ALL';
export const TRANSACTION_DELETE = 'TRANSACTION_DELETE';
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE';


export function transactionAdd(_id, amount, date, type, category, description) {
    return { type: TRANSACTION_ADD, _id, amount, date, type, category, description };
}

export function transactionAddAll(transaction_list) {
    return { type: TRANSACTION_ADD_ALL, transaction_list };
}

export function transactionDelete(_id) {
    return { type: TRANSACTION_DELETE, _id };
}

export function transactionUpdate(_id, amount, date, type, category, description) {
    return { type: TRANSACTION_UPDATE, _id, amount, date, type, category, description };
}