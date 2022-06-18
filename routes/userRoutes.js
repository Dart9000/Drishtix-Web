const {registerUser,authUser,}  =  require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router =require("express").Router();

// router.route("/").get(protect, allUsers);
router.post("/register",registerUser);
router.post("/login", authUser);

module.exports = router;