import { faker } from "@faker-js/faker";
import { config } from "dotenv";
config();
import {
  mongoConnect,
  mongoDisconnect,
  mongoListener,
} from "../config/db.connect.js";
import { UserModel } from "../models/user.model.js";
import { ProductModel } from "../models/product.model.js";

mongoListener();
await mongoConnect();
console.log("\u001B[33mPlease wait...\u001B[39m");

const generateProducts = async (num) => {
  // get all users ID from Database
  const users = await UserModel.find().distinct("_id");
  const usersArray = users.toString().split(",");

  // return random user ID
  function getUserId() {
    const index = Math.floor(Math.random() * usersArray.length);
    return usersArray[index];
  }

  const products = [];
  for (let i = 0; i < num; i++) {
    const category = faker.commerce.department();
    const isbn = faker.commerce.isbn({ variant: 10, separator: "" });
    const price = faker.commerce.price({ dec: 0, symbol: "€" });
    const title = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const productMaterial = faker.commerce.productMaterial();
    const owner = getUserId();

    products.push({
      category,
      isbn,
      price,
      title,
      description,
      productMaterial,
      owner,
    });
  }

  return products;
};

// seed command example: npm run seed <number_of_products>,
const products = await generateProducts(process.argv[2]);

ProductModel.insertMany(products)
  .then((docs) =>
    console.log(
      `\n\u001B[92m${docs.length} products have been inserted into the database.\u001B[39m\n`
    )
  )
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoDisconnect();
  });
