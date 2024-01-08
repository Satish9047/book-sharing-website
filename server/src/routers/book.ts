import { Router } from "express";
import * as bookController from "../controllers/book";
import { filesUpload } from "../middlewares/fileUpload";

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/getby", bookController.getSearchedBook);
bookRouter.post("/addbook", filesUpload, bookController.addBookHandler);
bookRouter.put("/updatebook/:id", bookController.updateBookHandler);
bookRouter.delete("/book/:id", bookController.deleteBookHandler);

export default bookRouter;