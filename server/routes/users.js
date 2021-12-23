const router = require("express").Router();
const usersSignup = require("./../controllers/users/signup");
const usersExists = require("./../controllers/users/exists");
const usersLogin = require("./../controllers/users/login");
const usersLogout = require("./../controllers/users/logout");
const usersUserinfo = require("./../controllers/users/userinfo");

router.post("/signup", usersSignup);
router.post("/exists", usersExists);
router.post("/login", usersLogin);
router.get("/logout", usersLogout);
router.get("/userinfo", usersUserinfo.get);
router.patch("/userinfo", usersUserinfo.patch);
router.delete("/userinfo", usersUserinfo.delete);

module.exports = router;
