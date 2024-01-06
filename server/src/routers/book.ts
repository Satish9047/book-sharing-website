import { Router } from "express";
import * as bookController from "../controllers/book";
import { uploadImg, uploadPdf } from "../middlewares/fileUpload";

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/addbook", uploadPdf.single("pdfFile"), uploadImg.single("imgFile"), bookController.addBookHandler);
bookRouter.put("/updatebook/:id", bookController.updateBookHandler);
bookRouter.delete("/book/:id", bookController.deleteBookHandler);

export default bookRouter;