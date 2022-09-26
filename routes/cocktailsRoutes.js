const express = require("express");
const cocktailController = require("../controllers/cocktailsController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const actionController = require("../controllers/actionController");

const router = express.Router();
/* GET home page. */
router.route("/").get(authController.hasUser, cocktailController.getTrio);
router
  .route("/search/:type/:category/:ingredients")
  .get(authController.hasUser, cocktailController.getSearchResults);
router
  .route("/favorites")
  .get(authController.hasUser, cocktailController.getUserFavorites);
router
  .route("/comments/:id")
  .get(authController.hasUser, cocktailController.getCocktailComments);
router
  .route("/:category/:searchText")
  .get(authController.hasUser, cocktailController.getByName);
router
  .route("/addfavs/:id")
  .patch(
    authController.hasUser,
    actionController.addFavs,
    userController.addFavs
  );
router
  .route("/removefavs/:id")
  .patch(
    authController.hasUser,
    actionController.removeFavs,
    userController.removeFavs
  );
router
  .route("/addcomment/:id")
  .post(
    authController.hasUser,
    actionController.addComment,
    userController.addComment
  );
router
  .route("/removecomment/:id")
  .post(
    authController.hasUser,
    actionController.removeComment,
    userController.removeComment
  );
module.exports = router;
