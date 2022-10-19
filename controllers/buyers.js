const mongodb = require('../database/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAllBuyers = async (req, res, next) => {
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

const getSingleBuyer = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid buyer id to find a buyer.');
      } else {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('Buyers')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      })};
    } catch (err) {
      res.status(500).json({ message: err.message });
    }  
};

const createBuyer = async (req, res) => {
  try {
    const buyer = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      age: req.body.age
    };
    const response = await mongodb.getDb().db().collection('Buyers').insertOne(buyer);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the buyer.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBuyer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid buyer id to find a buyer.');
    } else {
    const userId = new ObjectId(req.params.id);
    const buyer = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      age: req.body.age
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('Buyers')
      .replaceOne({ _id: userId }, buyer);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the buyer.');
    }};
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBuyer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid buyer id to find a buyer.');
    } else {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('Buyers').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the buyer.');
    }};
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAllBuyers,
    getSingleBuyer,
    createBuyer,
    updateBuyer,
    deleteBuyer
};