const {registerUser,authUser,}  =  require("../controllers/userControllers");
const { protect,adminProtect } = require("../middleware/authMiddleware");

const router =require("express").Router();

// router.route("/").get(protect, allUsers);
router.get("/", protect, (req,res)=>{
  res.status(200).json({
    user: req.userData
  });
});

router.post("/register",adminProtect,registerUser);
router.post("/login", authUser);


module.exports = router;
