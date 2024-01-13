export interface IBook {
    book_id: number;
    book_name: string;
    author_name: string;
}

export interface IState {
    "By Book Name": boolean;
    "by Author Name": boolean;
    "by Keyword": boolean;
    "by Category": boolean;
}