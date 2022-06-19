const { protect} = require("../middleware/authMiddleware");
const {addCriminal} =require("../controllers/criminalControllers");
const router =require("express").Router();

// router.route("/").get(protect, allUsers);


router.post("/create",protect,addCriminal);



module.exports = router;