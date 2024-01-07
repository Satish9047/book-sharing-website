import multer, { FileFilterCallback, Multer } from "multer";
import { Request } from "express";

const pdfStorage = multer.diskStorage({
    destination: "public/uploads/pdf",
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, "pdf_" + Date.now() + "-" + Math.round(Math.random() * 1E9));
    }
});

const imgStorage = multer.diskStorage({
    destination: "public/uploads/img",
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, "img_" + Date.now() + "-" + Math.round(Math.random() * 1E9));
    }
});

const pdfFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const imgFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const uploadPdf: Multer = multer({ storage: pdfStorage, fileFilter: pdfFilter });
export const uploadImg: Multer = multer({ storage: imgStorage, fileFilter: imgFilter });
