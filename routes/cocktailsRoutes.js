const express = require("express");
const cocktailController = require("../controllers/cocktailsController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const actionController = require("../controllers/actionController");

const router = express.Router();
/* GET home page. */
router.route("/").get(authController.hasUser, cocktailController.getTrio);
router
  .route("/:category/:searchText")
  .get(authController.hasUser, cocktailController.getByName);
router
  .route("/search/:type/:category/:ingredients")
  .get(authController.hasUser, cocktailController.getSearchResults);

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
  .route("/addcomment")
  .patch(
    authController.hasUser,
    actionController.addComment,
    userController.addComment
  );
router
  .route("/removecomment")
  .patch(
    authController.hasUser,
    actionController.removeComment,
    userController.removeComment
  );
module.exports = router;
