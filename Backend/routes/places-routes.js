const express = require("express");
const router = express.Router();

const placesControllers = require("../controllers/places-controller");
const { check } = require("express-validator");

router.get("/:pid", placesControllers.getPlaceById);

router.post("/", [check("title").not().isEmpty(), check("description").isLength({ min: 5 }), check("address").not().isEmpty()], placesControllers.createPlace);

router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
