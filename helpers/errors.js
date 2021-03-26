const errors = {
  queryError: (res, msg) => {
    res.status(404).json({
      status: 404,
      res_time: Date(),
      msg,
    });
  },
  serverError: (res, msg) => {
    res.status(500).json({
      status: 500,
      res_time: Date(),
      msg,
    });
  },
  response: (res, data) => {
    res.status(200).json({
      status: 200,
      res_time: Date(),
      data,
    });
  },
};
module.exports = errors;
