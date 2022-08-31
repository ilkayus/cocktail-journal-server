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
  if (req.params.searchText.indexOf("+"))
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

exports.getSearchResults = async (req, res, next) => {
  console.log(req.params);
  let query = [];
  if (req.params.type !== "undefined") {
    query.push({
      $match: { isAlcoholic: req.params.type },
    });
    console.log(query);
  }
  if (req.params.category !== "undefined") {
    if (req.params.category.indexOf("+"))
      req.params.category = req.params.category.replace("+", "/");
    query.push({
      $match: { category: req.params.category },
    });
    console.log(query);
  }
  if (req.params.ingredients !== "undefined") {
    const ings = req.params.ingredients.split(",");
    ings.forEach((item) => {
      query.push({
        $match: { ingredients: item },
      });
    });
    console.log(query);
  }
  const cocks = await Cocktail.aggregate(query);
  const cocksIDs = cocks.map((el) => el.drinkID);
  console.log(cocksIDs);
  res.status(200).json({
    status: "success",
    results: cocks.length,
    data: { cocks },
  });
};
