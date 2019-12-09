const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const Review = new Schema({
  writer_id: Number,
  writer_name: String,
  writer_email: String,
  related_content_id: Number,
  review_data: String,
  liked_users_id: Array,
  deleted: Boolean
});

Review.statics.create = function(writer_id, writer_name, writer_email, related_content_id, review_data) {
  const review = new this({
    writer_id, 
    writer_name, 
    writer_email, 
    related_content_id, 
    review_data,
    liked_users_id: [],
    deleted: false,
  });

  return review.save();
};

Review.statics.findAllByContentID = function(id) {
  return this.find().where('related_content_id').equals(id).exec();
};

Review.statics.deleteOneByID = function(id) {
  return this.deleteOne({
    id
  }).exec();
};

Review.statics.findOneByIDAndUpdateLikedUsers = function(reviewID, id) {
  return this.findOneAndUpdate({ id: reviewID }, { $push: { liked_users_id: id } }).exec();
};

autoIncrement.initialize(mongoose.connection);
Review.plugin(autoIncrement.plugin, {
  model: "Review",
  field: "id",
  startAt: 1
});

module.exports = mongoose.model("Review", Review);