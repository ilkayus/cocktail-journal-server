const express = require("express");
const cocktailController = require("../controllers/cocktailsController");

const router = express.Router();
/* GET home page. */
router.route("/").get(cocktailController.getTrio);
router.route("/:category/:searchText").get(cocktailController.getByName);

module.exports = router;
