import { config } from "dotenv";
config();
import express from "express";
import { userRouter } from "./routes/user.route.js";
import { mongoConnect, mongoListener } from "./config/db.connect.js";

mongoListener();
await mongoConnect();

const app = express();
app.use(express.json());

// Endpoints
app.use("/user", userRouter);

// 404-Page
app.all("*", (req, res, next) => {
  res.status(404).json({
    error: {
      code: 404,
      message: "Page not found",
    },
  });
});

// ErrorHandler
app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    error: {
      code: err.code || 500,
      message: err.message || "Server Error",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
