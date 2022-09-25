const mongoose = require("mongoose");
const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addFavs = catchAsync(async (req, res, next) => {
  console.log(req.body, req.user, req.params);
  const cockId = mongoose.Types.ObjectId(req.params.id);
  console.log(cockId);
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { favorites: cockId },
  });
  res.status(200).json({
    status: "success",
    message: "Added to favorites successfully",
  });
});
exports.removeFavs = catchAsync(async (req, res, next) => {
  //   console.log(req.body, req.user, req.params);
  const cockId = mongoose.Types.ObjectId(req.params.id);
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { favorites: cockId },
  });
  res.status(200).json({
    status: "success",
    message: "Added to favorites successfully",
  });
});
exports.addComment = () => {};
exports.removeComment = () => {};
