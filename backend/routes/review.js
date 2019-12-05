const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", (req, res, next) => {
  const { id: content_id } = req.query
  const respond = (data) => {
    res.json({
      success: true,
      message: "found the content",
      data
    });
  }

  Review.findAllByContentID(content_id)
  .then(respond);
});

router.post("/register", (req, res, next) => {
  const { id, name, email, contentID, reviewData } = req.body;

  const respond = () => {
    res.json({
      success: true,
      message: "리뷰가 등록 되었습니다."
    });
  };
  
  Review.create(id, name, email, contentID, reviewData)
  .then(respond)
});

router.delete("/delete", (req, res, next) => {
  const { id } = req.query;

  const respond = () => {
    res.json({
      success: true,
      message: "삭제 되었습니다.",
    });
  }

  Review.deleteOneByID(id)
  .then(respond)
});

router.post("/like", (req, res, next) => {
  
});

router.post("/like/undo", (req, res, next) => {

});

module.exports = router;