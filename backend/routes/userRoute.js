const express = require('express');
const { registerUser, loginUser, logout, forgotPassword,
     resetPassword, getUserDetails, updatePassword, updateProfile,
      getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userCon');   
const { isAuthedUser, authRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get( isAuthedUser, getUserDetails);
router.route("/password/update").put(isAuthedUser, updatePassword);
router.route("/me/update").put( isAuthedUser, updateProfile);
router.route("/admin/users").get(isAuthedUser, authRoles("admin"), getAllUser);
router.route("/admin/user/:id").get(isAuthedUser, authRoles("admin"), getSingleUser).put(isAuthedUser, authRoles("admin"), updateUserRole).delete(isAuthedUser, authRoles("admin"), deleteUser);


module.exports = router;