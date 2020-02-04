const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middlewares/auth");

router.get("/", (req, res, next) => {
  const {
    query: { id: content_id }
  } = req;
  
  const respond = data => {
    res.json({
      success: true,
      message: "found the content",
      data
    });
  };

  Review.findAllByContentID(content_id).then(respond);
});

router.use("/", authMiddleware);
router.post("/:id", (req, res, next) => {
  const {
    body: { reviewData },
    decoded: { id, name, email },
    params: { id: contentID }
  } = req;
  const respond = () => {
    res.json({
      success: true,
      message: "리뷰가 등록 되었습니다."
    });
  };

  Review.create(id, name, email, contentID, reviewData).then(respond);
});

router.use("/", authMiddleware);
router.delete("/", (req, res, next) => {
  const { id } = req.query;

  const respond = () => {
    res.json({
      success: true,
      message: "삭제 되었습니다."
    });
  };

  Review.deleteOneByID(id).then(respond);
});

router.use("/like", authMiddleware);
router.put("/like", (req, res, next) => {
  const {
    decoded: { id },
    query: { id: reviewID }
  } = req;

  const respond = () => {
    res.json({
      success: true,
      message: "liked"
    });
  };
  
  Review.findOneByIDAndUpdateLikedUsers(reviewID, id, true).then(respond);
});

router.use("/like/undo", authMiddleware);
router.put("/like/undo", (req, res, next) => {
  const {
    decoded: { id },
    query: { id: reviewID }
  } = req;

  const respond = () => {
    res.json({
      success: true,
      message: "unliked"
    });
  };

  Review.findOneByIDAndUpdateLikedUsers(reviewID, id).then(respond);
});

module.exports = router;
