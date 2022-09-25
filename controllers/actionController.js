const mongoose = require("mongoose");
const Cocktail = require("../models/cocktailModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addFavs = catchAsync(async (req, res, next) => {
  //  console.log(req.body, req.user, req.params);
  await Cocktail.findByIdAndUpdate(req.params.id, {
    $inc: { timesfavorite: 1 },
    $addToSet: { favorites: req.user._id },
  });
  next();
  // res.status(200).json({
  //   status: "success",
  //   message: "Added to favorites successfully",
  // });
});
exports.removeFavs = catchAsync(async (req, res, next) => {
  // console.log("reemovv", req.body, req.user, req.params);
  await Cocktail.findByIdAndUpdate(req.params.id, {
    $inc: { timesfavorite: -1 },
    $pull: { favorites: req.user._id },
  });
  next();
  // res.status(200).json({
  //   status: "success",
  //   message: "Removed from favorites successfully",
  // });
});
exports.addComment = () => {};
exports.removeComment = () => {};
