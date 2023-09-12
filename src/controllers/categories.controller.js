const response = require("../helpers/response");
const filter = require("../helpers/filter");
const {
  selectAllCategories,
  selectCountAllCategories,
  insertCategories,
  selectCategories,
  dropCategories,
  changeCategories,
} = require("../models/categories.model")

exports.readAllCategories = (req, res) => {
  try {
    const searchable = ["name", "createdAt"];
    const sortable = ["name", "createdAt"];

    filter(
      req.query,
      searchable,
      sortable,
      selectCountAllCategories,
      res,
      (filter, pageInfo) => {
        try {
          selectAllCategories(filter, (error, data) => {
            return res.status(200).json({
              success: true,
              message: "Categories Data List",
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

exports.createCategories = (req, res) => {
  try {
    const payload = {
      name: req.body.name,
    };

    insertCategories(payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Categories created success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateCategories = (req, res) => {
  const payload = {
    name: req.body.name,
  };

  try {
    changeCategories(req.params.id, payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Updated data categories is success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteCategories = (req, res) => {
  try {
    dropCategories(req.params.id, (error) => {
      return res.status(200).json({
        status: true,
        message: "Deleted categories id = " + req.params.id + " success",
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readCategories = (req, res) => {
  try {
    selectCategories(req.params.id, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Show detail categories",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};