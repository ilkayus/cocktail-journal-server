const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema(
  {
    drinkID: { type: String },
    isAlcoholic: { type: String },
    category: { type: String },
    cocktailName: { type: String },
    image: { type: String },
    imagePreview: { type: String },
    imageSource: { type: String },
    glass: { type: String },
    ingredients: { type: [String] },
    ingMeasure: { type: [String] },
    tags: { type: String },
    instructions: { type: String },
    drinkAlternate: { type: String },
    strVideo: { type: String },
    strIBA: { type: String },
    strImageAttribution: { type: String },
    strCreativeCommonsConfirmed: { type: String },
    timesfavorite: { type: Number, default: 0 },
    timesCommented: { type: Number, default: 0 },
    favorites: { type: [String] },
    comments: { type: [String] },
    dateModified: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cocktail = mongoose.model("Cocktail", cocktailSchema);
module.exports = Cocktail;
