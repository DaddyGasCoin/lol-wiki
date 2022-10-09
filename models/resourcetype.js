var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ResourcetypeSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for this resource instance URL.
ResourcetypeSchema.virtual("url").get(function () {
    return "/resource/" + this._id;
});

// Export model.
module.exports = mongoose.model("Resourcetype", ResourcetypeSchema);