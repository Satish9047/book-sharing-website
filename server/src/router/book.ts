import { Router } from "express";
import * as bookController from "../controller/book";

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/book", bookController.addBookHandler);
bookRouter.post("/book-update", bookController.updateBookHandler);
bookRouter.post("/book/:id", bookController.deleteBookHandler);

export default bookRouter;