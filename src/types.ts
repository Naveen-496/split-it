

export type Expense = {
    id: number;
    name: string;
    categoryId: number;
    amount: number;
    createdDate: string;
    updatedDate: string;
    type: string;
}

export type ExpenseCategory = {
    id: number;
    name: string;
    type: string;
    imageUrl: string;
};

export type User = {
    id: number;
    username: string;
    mobile: string;
    imageUrl: string;
}