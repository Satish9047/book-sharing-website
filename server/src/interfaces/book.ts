export interface IAddBook {
    bookName: string,
    author: string,
    description: string,
    pdfPath: File,
    imgPath: File
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

