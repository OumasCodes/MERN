const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://dev1:dev1dev1@cluster0.38dez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("products");
    const result = await db.collection("products").insertOne(newProduct);
    res.send(result);
  } catch (error) {
    res.json({ message: "Could not create product", error: error.message });
  } finally {
    await client.close();
    res.json({ message: "Product created", data: newProduct });
  }
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("products");
    const result = await db.collection("products").find().toArray();
    res.send(result);
  } catch (error) {
    res.json({ message: "Could not get products", error: error.message });
  } finally {
    await client.close();
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
