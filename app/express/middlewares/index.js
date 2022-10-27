const extractPaginationInfo = (req, resp, next) => {
  req.paginationInfo = {
    pageNo: Number(req.query.pageNo) || 1,
    chunkSize: Number(req.query.chunkSize) || 10,
  };

  delete req.query.pageNo;
  delete req.query.chunkSize;

  next();
};

module.exports = {
  extractPaginationInfo,
};
