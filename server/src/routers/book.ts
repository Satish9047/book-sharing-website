import { Router } from "express";
import * as bookController from "../controllers/book";
import { filesUpload } from "../middlewares/fileUpload";
import { queryBookMiddlware, queryPageMiddlware } from "../middlewares/book";

const bookRouter = Router();

//bookRouter handlers
bookRouter.get("/", queryPageMiddlware, bookController.getBooks);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.get("/getby", queryBookMiddlware, bookController.getSearchedBook);
bookRouter.post("/addbook", filesUpload, bookController.addBookHandler);
bookRouter.put("/updatebook/:id", bookController.updateBookHandler);
bookRouter.delete("/:id", bookController.deleteBookHandler);
bookRouter.get("/download/:id", bookController.downloadBookHandler);
bookRouter.get("/image/:bookId", bookController.getImageHandler);
// bookRouter.get("/page", bookController.getPageHandler);

export default bookRouter;