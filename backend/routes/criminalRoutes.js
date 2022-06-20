const { protect} = require("../middleware/authMiddleware");
const {addCriminal , findCriminal} =require("../controllers/criminalControllers");
const router =require("express").Router();
// router.route("/").get(protect, allUsers);


router.post("/create",protect,addCriminal);

// public accces of criminal profile 
router.get("/criminal_profile/:id",findCriminal);


module.exports = router;