import errorCreator from "../lib/errorCreator.js";
import { UserModel } from "../models/user.model.js";

export async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const { _id } = await UserModel.create({ email, password });

    const data = { uid: _id, email };

    res.status(200).json({
      code: 200,
      message: "User successful created",
      data,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(errorCreator("User already exists", 401));
    } else {
      console.log("DB error:", err.message);
      next(errorCreator("Database error", 500));
    }
  }
}
