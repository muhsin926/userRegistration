import express from "express";
import cors from "cors";
import serv from "./config/config.js";
import {
  register,
  getById,
  removeAccount,
  update,
} from "./controller/registration-controller.js";
const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());

app.use(router);

router
  .route("/user-details")
  .post(register)
  .get(getById)
  .patch(update)
  .delete(removeAccount);

try {
  serv();
  app.listen(7000, () => console.log("server running on " + 7000));
} catch (error) {
  console.log(error);
}
