const express = require("express");
const authController = require("./controllers/authController");
const jwtMiddleware = require("./middlewares/jwtMiddleware");
const bookController = require("./controllers/bookController");
const multerConfig = require("./middlewares/multerMiddleware");

const userController = require("./controllers/userController");

const jwtAdminMiddleware = require("./middlewares/jwtAdminMiddleware");
const jobController = require("./controllers/jobController");
const resumeMulterConfig = require("./middlewares/resumeMulterMiddleware");
const applicationController = require("./controllers/applicationController");
const purchaseController=require("./controllers/purchaseController");

//  create a router
const router = new express.Router();

router.post("/registerUser", authController.registerUser);

router.post("/loginUser", authController.loginUser);

router.post("/googleLogin", authController.googleLoginAPI);

router.post(
  "/addBook",
  jwtMiddleware,
  multerConfig.array("uploadImages"),
  bookController.AddBookController
);

router.get("/getAllBook", jwtMiddleware, bookController.getBookController);

router.get("/getLimitedBooks", bookController.getLimitedBooks);

router.get("/getSingleBook/:id", jwtMiddleware, bookController.getSingleBook);

router.get("/userDetails", jwtMiddleware, userController.getUserDetails);

// update profile
router.patch(
  "/:id/updateProfile",
  jwtMiddleware,
  multerConfig.single("proPic"),
  userController.updateProfile
);

router.get("/getAllUsers", jwtAdminMiddleware, userController.getAllUsers);

router.post("/addJob", jwtAdminMiddleware, jobController.addJob);

router.get("/getAllJobs", jobController.getJobs);

router.delete("/:id/deleteJob", jwtAdminMiddleware, jobController.deleteJob);


router.post('/applyJob',resumeMulterConfig.single('resume'),applicationController.ApplyJob)

router.post('/buyBook',jwtMiddleware,purchaseController.buyBook)

router.post('/getAllApplications',jwtAdminMiddleware,applicationController.getAllApplications)

//  deafulting exporting is
module.exports = router;
