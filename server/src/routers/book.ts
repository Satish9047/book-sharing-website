import { Router } from "express";
import * as bookController from "../controllers/book";
import { filesUpload } from "../middlewares/fileUpload";
import { queryBookMiddlware } from "../middlewares/book";

const bookRouter = Router();

//bookRouter handlers
bookRouter.get("/", bookController.getBooks);
bookRouter.get("/user", bookController.getBookByUser);
bookRouter.get("/getby", queryBookMiddlware, bookController.getSearchedBook);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.post("/addbook", filesUpload, bookController.addBookHandler);
bookRouter.put("/updatebook/:id", bookController.updateBookHandler);
bookRouter.delete("/:id", bookController.deleteBookHandler);
bookRouter.get("/download/:id", bookController.downloadBookHandler);
bookRouter.get("/image/:bookId", bookController.getImageHandler);

export default bookRouter;




// bookRouter.get("/page", bookController.getPageHandler);