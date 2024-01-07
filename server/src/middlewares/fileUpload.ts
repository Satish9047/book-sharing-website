import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const generateFilename = (prefix: string) => {
    return `${prefix}_${Date.now()}-${Math.round(Math.random() * 1E9)}`;
};

const getFileType = (fileName: string) => {
    const ext = path.extname(fileName);
    if (ext === ".pdf") {
        return "pdf";
    } else {
        return "img";
    }
};

const customStorage = (destination: string) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {

            const ext = path.extname(file.originalname);
            if (ext === ".pdf") {
                cb(null, path.join(destination, "pdf"));
            } else {
                cb(null, path.join(destination, "img"));
            }
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {

            const fileType = getFileType(file.originalname);
            const ext = path.extname(file.originalname);
            cb(null, generateFilename(fileType) + ext);
        },
    });
};

const customFilter = (fileType: string) => {
    return (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (file.mimetype.startsWith(fileType)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
};


export const filesUpload = multer({
    storage: customStorage("public/uploads"),
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "pdfFile") {
            customFilter("application/pdf")(req, file, cb);
        } else if (file.fieldname === "imgFile") {
            customFilter("image/")(req, file, cb);
        } else {
            cb(null, false);
        }
    },
}).fields([{ name: "pdfFile", maxCount: 1 }, { name: "imgFile", maxCount: 1 }]);



