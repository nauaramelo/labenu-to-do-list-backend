import express, { Request, Response} from "express";
import { AddressInfo } from "net";
import { userRouter } from "./router/UserRouter";
import { taskRouter } from "./router/TaskRouter";

const app = express();

app.use(express.json());

app.use("/user", userRouter)
app.use("/task", taskRouter)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
}); 