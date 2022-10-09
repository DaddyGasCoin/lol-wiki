const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChampionSchema = new Schema({
   name: { type: String, required: true },
   key: { type: String, required: true },
   title: { type: String, required: true },
   lore: { type: String },
   class: [{ type: Schema.Types.ObjectId, ref: "Class" }],
   resourcetype: { type: Schema.Types.ObjectId, ref: "Resourcetype" },
   allytips: [String],
   enemytips: [String],
   info: {
      attack: { type: Number, required: true },
      defense: { type: Number, required: true },
      magic: { type: Number, required: true },
      difficulty: { type: Number, required: true },
   },
   stats: {
      hp: { type: Number, min: 1, required: true },
      hpperlevel: { type: Number, required: true },
      mp: { type: Number },
      mpperlevel: {},
      movespeed: { type: Number, min: 1, required: true },
      armor: { type: Number, min: 1, required: true },
      armorperlevel: { type: Number, required: true },
      spellblock: { type: Number, min: 1, required: true },
      spellblockperlevel: { type: Number, required: true },
      attackrange: { type: Number, min: 1, required: true },
      hpregen: { type: Number, min: 1, required: true },
      hpregenperlevel: { type: Number, required: true },
      mpregen: { type: Number, required: true },
      mpregenperlevel: { type: Number, required: true },
      crit: { type: Number, },
      critperlevel: { type: Number, required: true },
      attackdamage: { type: Number, min: 1, required: true },
      attackdamageperlevel: { type: Number, required: true },
      attackspeedperlevel: { type: Number, required: true },
      attackspeed: { type: Number, required: true },
   }

});


// Virtual for champion's URL
ChampionSchema.virtual("url").get(function () {
   return `/champion/${this._id}`;
});

// ChampionSchema.virtual("API_NAME").get(function () {
//    let name = this.name
//    name = name.replaceAll("'", "")
//    name = name.replaceAll(" ", "")
//    name = name.replaceAll(".", "")
//    return name;
// });
// Export model
module.exports = mongoose.model("Champion", ChampionSchema);
