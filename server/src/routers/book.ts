import { Router } from "express";
import * as bookController from "../controllers/book";

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/addbook", bookController.addBookHandler);
bookRouter.put("/updatebook/:id", bookController.updateBookHandler);
bookRouter.delete("/book/:id", bookController.deleteBookHandler);

export default bookRouter;