var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClassSchema = new Schema({
   name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for this class instance URL.
ClassSchema.virtual("url").get(function () {
   return "/Class/" + this._id;
});

// Export model.
module.exports = mongoose.model("Class", ClassSchema);