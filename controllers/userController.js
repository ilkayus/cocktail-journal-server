const mongoose = require("mongoose");
const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addFavs = () =>
  catchAsync(async (req, res, next) => {
    console.log(req.body, req.user, req.params);
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { favorites: req.params.id },
    });
    res.status(200).json({
      status: "success",
      message: "Added to favorites successfully",
    });
  });
exports.removeFavs = () =>
  catchAsync(async (req, res, next) => {
    //   console.log(req.body, req.user, req.params);
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { favorites: req.params.id },
    });
    res.status(200).json({
      status: "success",
      message: "Added to favorites successfully",
    });
  });
exports.addComment = () => {};
exports.removeComment = () => {};
