const Class = require('../models/class')
const Champion = require('../models/champions')
const { body, validationResult } = require("express-validator");


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
      Champion.find({ class: name }, 'name key')
         .exec(function (err, names) {
            if (err) return next(err)
            res.render('class_details', { title: `${name.name} Class`, Details: names })
         })
   })();


};

// Display class create form on GET.
exports.class_create_get = (req, res) => {
   // res.send("NOT IMPLEMENTED: class create GET");
   res.render('class_form', { title: 'Create Class' })

};

// Handle resource create on POST.
exports.class_create_post = [
   // Validate and sanitize the name field.
   body("name", "Class name required").trim().isLength({ min: 1 }).escape(),

   // Process request after validation and sanitization.
   (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      // Create a genre object with escaped and trimmed data.
      const classname = new Class({ name: req.body.name });

      if (!errors.isEmpty()) {
         // There are errors. Render the form again with sanitized values/error messages.
         res.render("class_form", {
            title: "Create Class",
            errors: errors.array(),
         });
         return;
      } else {
         // Data from form is valid.
         // Check if class with same name already exists.
         Class.findOne({ name: req.body.name }).exec((err, found_class) => {
            if (err) {
               return next(err);
            }

            if (found_class) {
               // class exists, redirect to its detail page.
               res.redirect(found_class.url);
            } else {
               classname.save((err) => {
                  if (err) {
                     return next(err);
                  }
                  // Resoource saved. class to resource detail page.
                  res.redirect(classname.url);
               });
            }
         });
      }
   },
];

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
