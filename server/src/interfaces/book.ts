export interface IAddBook {
    bookName: string,
    author: string,
    description: string,
    pdfPath: string,
    imgPath: string
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

