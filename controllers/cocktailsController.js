const mongoose = require("mongoose");
const Cocktail = require("../models/cocktailModel");

exports.getTrio = async (req, res, next) => {
  const cocks = await Cocktail.aggregate([{ $sample: { size: 6 } }]);
  const cocksIDs = cocks.map((el) => el.drinkID);
  console.log(cocksIDs);
  res.status(200).json({
    status: "success",
    results: cocks.length,
    data: { cocks },
  });
};

exports.getByName = async (req, res, next) => {
  if (req.params.searchText.includes("-"))
    req.params.searchText = req.params.searchText.replace("+", "/");
  const cocks = await Cocktail.find({
    [req.params.category]: { $regex: req.params.searchText, $options: "i" },
  });
  const cocksIDs = cocks.map((el) => el.drinkID);
  console.log(cocksIDs);
  res.status(200).json({
    status: "success",
    results: cocks.length,
    data: { cocks },
  });
};
