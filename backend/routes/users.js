const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth");

router.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;
  let newUser = null;

  const create = user => {
    if (user) {
      throw new Error("이미 가입한 이메일입니다.");
    } else {
      return User.create(name, email, password);
    }
  };

  const respond = user => {
    res.json({
      success: true,
      message: "회원가입에 성공했습니다."
    });
  };

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    });
  };

  User.findOneByEmail(email)
    .then(create)
    .then(respond)
    .catch(onError);
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const secret = req.app.get("jwt-secret");

  const check = user => {
    if (!user) {
      throw new Error("이메일이 존재하지 않습니다.");
    } else {
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email
            },
            secret,
            {
              expiresIn: "3h"
            },
            (err, token) => {
              if (err) reject(err);
              resolve({ user, token });
            }
          );
        });
        return p;
      } else {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  // respond the token
  const respond = ({ user: { id, name, email}, token}) => {
    res.json({
      success: true,
      id: id,
      name: name,
      email: email,
      jwtToken: token,
      message: "로그인에 성공했습니다.",
    });
  };

  // error occured
  const onError = error => {
    res.status(403).json({
      success: false,
      message: error.message
    });
  };

  // find the user
  User.findOneByEmail(email)
    .then(check)
    .then(respond)
    .catch(onError);
});

router.use("/check", authMiddleware);
router.get("/check", (req, res, next) => {
  res.json({
    success: true,
    info: req.decoded
  });
});

module.exports = router;
