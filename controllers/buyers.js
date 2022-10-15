const mongodb = require('../database/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('Buyers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBuyer = async (req, res) => {
  try {
    const buyer = {
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Birthday: req.body.Birthday,
      Age: req.body.Age
    };
    const response = await mongodb.getDb().db().collection('Buyers').insertOne(buyer);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the expense.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAll,
    createBuyer
};