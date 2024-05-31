const productModel = require("../model/productModel");

// C=Create
exports.createProduct = async (req, res) => {
  try {
    let reqBody = req.body;
    let createdProduct = await productModel.create(reqBody);
    res.status(200).json({ status: "success", data: createdProduct });
    // console.log(createdProduct)
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};

// R=Read
exports.readProduct = async (req, res) => {
  try {
    let data = await productModel.aggregate([
      {
        $project: {
          ProductName: 1,
          ProductCode: 1,
          Img: 1,
          UnitPrice: 1,
          Qty: 1,
          TotalPrice: 1,
          CreatedDate: 1,
        },
      },
    ]);
    // console.log("Read data:", data);
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    // console.error("Read error:", error);
    res.status(200).json({ status: "fail", error: error });
  }
};

// R=Read by ID
exports.readProductById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await productModel.findById(id)

    if (!data) {
      return res.status(404).json({ status: "fail", message: "Product not found" });
    }

    // console.log("Read data:", data);
    res.status(200).json({ status: "success", data: data});
  } catch (error) {
    // console.error("Read error:", error);
    res.status(200).json({ status: "fail", error: error.message });
  }
};

// U=Update
exports.updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    let reqBody = req.body;
    let updateProduct = await productModel.updateOne(Query, reqBody);
    res.status(200).json({ status: "success", data: updateProduct });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};

// D=Delete

exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    let delProduct = await productModel.deleteOne(Query);
    res.status(200).json({ status: "success", data: delProduct });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};
