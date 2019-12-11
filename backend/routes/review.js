const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middlewares/auth");

router.use("/", authMiddleware);
router.get("/", (req, res, next) => {
  const {
    decoded: { id: userID },
    query: { id: content_id }
  } = req;
  
  const respond = data => {
    const myData = data;

    const result = myData.map(data => {
      const index = data.liked_users_id.findIndex(element => element === userID);
      return {...data, is_my_like: index === -1 ? false : true};
    })

    res.json({
      success: true,
      message: "found the content",
      data: result
    });
  };

  Review.findAllByContentID(content_id).then(respond);
});

router.use("/register", authMiddleware);
router.post("/register", (req, res, next) => {
  const {
    body: { reviewData },
    decoded: { id, name, email },
    query: { id: contentID }
  } = req;
  const respond = () => {
    res.json({
      success: true,
      message: "리뷰가 등록 되었습니다."
    });
  };

  Review.create(id, name, email, contentID, reviewData).then(respond);
});

router.use("/delete", authMiddleware);
router.delete("/delete", (req, res, next) => {
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
  
  Review.findOneByIDAndUpdateLikedUsers(reviewID, id).then(respond);
});

router.use("/like/undo", authMiddleware);
router.put("/like/undo", (req, res, next) => {
  const {
    decoded: { id },
    query: { id: reviewID }
  } = req;
});

module.exports = router;
