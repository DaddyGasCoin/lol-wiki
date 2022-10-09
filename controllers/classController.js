const Class = require('../models/class')
const Champion = require('../models/champions')

// Display list of all classs.
exports.class_list = (req, res) => {
   Class.find({})
      .sort('name')
      .exec(function (err, class_names) {
         if (err) {
            return next(err)
         }
         //Successful, so render
         res.render("class_list", { title: "Class Names", class_names: class_names });
      })
};

// Display detail page for a specific class.
exports.class_detail = (req, res, next) => {
   (async () => {
      const name = await Class.findById(req.params.id)
      Champion.find({ class: name }, 'name')
         .exec(function (err, names) {
            if (err) return next(err)
            res.render('class_details', { title: `${name.name} Class`, Details: names })
         })
   })();


};

// Display class create form on GET.
exports.class_create_get = (req, res) => {
   res.send("NOT IMPLEMENTED: class create GET");
};

// Handle class create on POST.
exports.class_create_post = (req, res) => {
   res.send("NOT IMPLEMENTED: class create POST");
};

// Display class delete form on GET.
exports.class_delete_get = (req, res) => {
   res.send("NOT IMPLEMENTED: class delete GET");
};

// Handle class delete on POST.
exports.class_delete_post = (req, res) => {
   res.send("NOT IMPLEMENTED: class delete POST");
};

// Display class update form on GET.
exports.class_update_get = (req, res) => {
   res.send("NOT IMPLEMENTED: class update GET");
};

// Handle class update on POST.
exports.class_update_post = (req, res) => {
   res.send("NOT IMPLEMENTED: class update POST");
};
