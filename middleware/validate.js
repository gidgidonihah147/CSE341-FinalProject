const validator = require('../helpers/validate');

const saveBuyer = (req, res, next) => {
  const validationRule = {
    First_Name: 'required|string',
    Last_Name: 'required|string',
    Email: 'required|string',
    Phone: 'required|string',
    Birthday: 'required|string',
    Age: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBuyer
};