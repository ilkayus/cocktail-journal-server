const mongoose = require("mongoose");
const Cocktail = require("../models/cocktailModel");
const User = require("../models/userModal");
const Comment = require("../models/commentModel");

// const addUserInfo = (req) => ({
//   $addFields: {
//     isfavorite: { favorites: { $eq: req.user._id } },
//   },
// });

exports.getTrio = async (req, res, next) => {
  let query = [{ $sample: { size: 6 } }];
  // if (req.user) query.push(addUserInfo(req));
  const cocks = await Cocktail.aggregate(query);
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
  }
  // if (req.user) query.push(addUserInfo(req));
  // console.log(req.user, query);
  const cocks = await Cocktail.aggregate(query);
  const cocksIDs = cocks.map((el) => el.drinkID);
  console.log(cocksIDs);
  res.status(200).json({
    status: "success",
    results: cocks.length,
    data: { cocks },
  });
};

exports.getUserFavorites = async (req, res, next) => {
  // console.log(req.user);
  const userCocks = await User.find(
    { _id: req.user._id },
    { _id: 0, favorites: 1 }
  );
  let favs = userCocks[0].favorites;
  const cocks = await Cocktail.find({ _id: { $in: favs } });
  // console.log("cock:", cocks);
  const cocksIDs = cocks.map((el) => el.drinkID);
  console.log(cocksIDs);
  res.status(200).json({
    status: "success",
    results: cocks.length,
    data: { cocks },
  });
};

exports.getCocktailComments = async (req, res, next) => {
  const cockId = mongoose.Types.ObjectId(req.params.id);
  const query = [
    {
      $match: { cocktailId: cockId },
    },
    {
      $sort: { _id: -1 },
    },
  ];
  const coms = await Comment.aggregate(query);
  res.status(200).json({
    status: "success",
    data: { coms },
  });
};
