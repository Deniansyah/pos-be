const response = require("./response")

const filter = (data, searchable, sortable, countModel, res, cb) => {
  data.limit = parseInt(data.limit) || 5;
  data.page = parseInt(data.page) || 1;
  data.searchBy = (searchable.includes(data.searchBy) && data.searchBy) || "name";
  data.search = data.search || "";
  data.sortBy = (sortable.includes(data.sortBy) && data.sortBy) || "createdAt";
  data.sortStockBy = (sortable.includes(data.sortStockBy) && data.sortStockBy) || "date";
  data.sort = data.sort || "ASC";
  data.role = parseInt(data.role, 10) || null;
  data.type = parseInt(data.type, 10) || null;
  data.cInitCol = (searchable.includes(data.cInitCol) && data.cInitCol) || "p";   // change initial coloum ex: p = product, u = users, s = stock
  data.cInitSort = (searchable.includes(data.cInitSort) && data.cInitSort) || "s";


  const params = {
    limit: data.limit,
    offset: (data.page - 1) * data.limit,
    searchBy: data.searchBy,
    search: data.search,
    sortBy: data.sortBy,
    sortStockBy: data.sortStockBy,
    sort: data.sort,
    role: data.role,
    type: data.type,
    cInitSort: data.cInitSort,
    cInitCol: data.cInitCol,
  };

  const pageInfo = {
    page: data.page,
  };

  countModel(params, (error, results) => {
    if (error) {
      return response(res, 500);
    }

    pageInfo.totalData = results.rows[0].totalData;
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / data.limit);
    pageInfo.nextPage = data.page < pageInfo.totalPage ? data.page + 1 : null;
    pageInfo.prevPage = data.page > 1 ? data.page - 1 : null;
    cb(params, pageInfo);
  });
}

module.exports = filter