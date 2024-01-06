import multer from "multer";


const pdfStorage = multer.diskStorage({
    destination: "public/uploads/pdf",
    filename: (req, file, cb) => {
        cb(null, "pdf_" + Date.now() + "-" + Math.round(Math.random() * 1E9));
    }
});

const imgStorage = multer.diskStorage({
    destination: "public/uploads/img",
    filename: (req, file, cb) => {
        cb(null, "img_" + Date.now() + "-" + Math.round(Math.random() * 1E9));
    }
});

const pdfFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PDF files are allowed."), false);
    }
};


const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only image files are allowed."), false);
    }
};

export const uploadPdf = multer({ storage: pdfStorage, fileFilter: pdfFilter });
export const uploadImg = multer({ storage: imgStorage, fileFilter: imageFilter });
