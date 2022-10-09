
const Champion = require('../models/champions')


// Display list of all champions.
exports.champion_list = (req, res, next) => {
   Champion.find({}, "name key")
      .sort({ name: 1 })
      .exec(function (err, champ_names) {
         if (err) {
            return next(err);
         }
         // console.log(champ_names)
         //Successful, so render
         res.render("champ_list", { title: "Champion Names", champ_names: champ_names });
      });
};

// Display detail page for a specific champion.
exports.champion_detail = (req, res, next) => {
   Champion.findById(req.params.id)
      .populate('class')
      .populate('resourcetype')
      .exec(function (err, details) {
         if (err) {
            return next(err)
         }
         res.render("champ_detail", { title: "Champion Detail", Details: details })
      })
};

// Display champion create form on GET.
exports.champion_create_get = (req, res) => {
   res.send("NOT IMPLEMENTED: champion create GET");
};

// Handle champion create on POST.
exports.champion_create_post = (req, res) => {
   res.send("NOT IMPLEMENTED: champion create POST");
};

// Display champion delete form on GET.
exports.champion_delete_get = (req, res) => {
   res.send("NOT IMPLEMENTED: champion delete GET");
};

// Handle champion delete on POST.
exports.champion_delete_post = (req, res) => {
   res.send("NOT IMPLEMENTED: champion delete POST");
};

// Display champion update form on GET.
exports.champion_update_get = (req, res) => {
   res.send("NOT IMPLEMENTED: champion update GET");
};

// Handle champion update on POST.
exports.champion_update_post = (req, res) => {
   res.send("NOT IMPLEMENTED: champion update POST");
};
