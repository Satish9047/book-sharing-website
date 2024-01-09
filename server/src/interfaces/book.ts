export interface IAddBook {
    bookName: string,
    description: string,
    author: string,
    user: number,
    category: string,
    keyword: string,
    pdfPath: string,
    imgPath: string,
}

export interface IFileDetails {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export interface IBookFile {
    pdfFile: IFileDetails[];
    imgFile: IFileDetails[];
}


export interface IQueryBook {
    name?: string;
    search?: string;
    category?: string;
    author?: string;
    keyword?: string;
}

export interface IQueryBookDb {
    book_name?: string,
    author_name?: string,
    keyword?: string,
    category_name?: string
}

export interface IPage {
    skip: number;
    take: number;
}