const response = require("../helpers/response");
const {
  selectAllProduct,
  insertProduct,
  selectProduct,
  dropProduct,
  changeProduct,
  selectCountAllProduct,
} = require("../models/product.model");
const filter = require("../helpers/filter");
const { cloudinary } = require("../middlewares/upload");
const { login } = require("./auth.controller");

exports.readAllProduct = (req, res) => {
  try {
    const searchable = ["name", "description", "createdAt"];
    const sortable = ["name", "description", "createdAt"];

    filter(
      req.query,
      searchable,
      sortable,
      selectCountAllProduct,
      res,
      (filter, pageInfo) => {
        try {
          selectAllProduct(filter, (error, data) => {
            return res.status(200).json({
              success: true,
              message: "Product Data List",
              pageInfo,
              results: data?.rows,
            });
          });
        } catch (error) {
          return response(res, 500);
        }
      }
    );
  } catch (error) {
    return response(res, 500);
  }
};

exports.createProduct = (req, res) => {
  try {
    const payload = {
      categories_id: req.body.categories_id,
      picture: req.file ? req.file.path : null,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };

    insertProduct(payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Product created success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500)
  }
};

exports.updateProduct = (req, res) => {
  try {
    selectProduct(req.params.id, (error, results) => {
      const data = results.rows[0];
      if (data.picture) {
        const fileName = data?.picture?.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(`upload/${fileName}`);
      }

      const payload = {
        categories_id: req.body.categories_id,
        picture: req.file ? req.file.path : null,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };

      changeProduct(req.params.id, payload, (error, data) => {
        if (error) {
          return response(res, 400, {
            success: false,
            message: "Failed to update!",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Updated detail product",
          results: data.rows[0],
        });
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteProduct = (req, res) => {
  dropProduct(req.params.id, (error) => {
    if (error) {
      return response(res, 500);
    }
    res.status(200).json({
      status: true,
      message: "Delete data product id = " + req.params.id + " success",
    });
  });
};

exports.readProduct = (req, res) => {
  try {
    selectProduct(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Detail product",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.uploadProduct = (req, res) => {
  try {
    selectProduct(req.params.id, (error, results) => {
      const data = results.rows[0];
      if (data.picture) {
        const fileName = data?.picture?.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(`upload/${fileName}`);
      }

      const payload = {
        picture: req.file.path,
      };

      changeProduct(req.params.id, payload, (error) => {
        if (error) {
          return response(res, 400, {
            success: false,
            message: "Failed to upload!",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Product picture successfully updated",
        });
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};
