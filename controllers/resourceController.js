const Resource = require('../models/resourcetype')
const Champion = require('../models/champions')
const { body, validationResult } = require("express-validator");
const async = require("async");

// Display list of all resources.
exports.resource_list = (req, res) => {
   Resource.find({})
      .sort('name')
      .exec(function (err, resource_names) {
         if (err) {
            return next(err)
         }
         //Successful, so render
         res.render("resource_list", { title: "Resource Names", names: resource_names });
      })

};

// Display detail page for a specific resource.
exports.resource_detail = (req, res) => {
   (async () => {
      const name = await Resource.findById(req.params.id)
      Champion.find({ resourcetype: name }, 'name key')
         .exec(function (err, names) {
            if (err) return next(err)
            res.render('resource_details', { title: `${name.name} Resource Type`, Details: names, resource: name })
         })
   })();
};

// Display resource create form on GET.
exports.resource_create_get = (req, res) => {
   res.render('resource_form', { title: 'Create Resource' })
};

// Handle resource create on POST.
exports.resource_create_post = [
   // Validate and sanitize the name field.
   body("name", "Resource name required").trim().isLength({ min: 1 }).escape(),

   // Process request after validation and sanitization.
   (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a genre object with escaped and trimmed data.
      const resource = new Resource({ name: req.body.name });

      if (!errors.isEmpty()) {
         // There are errors. Render the form again with sanitized values/error messages.
         res.render("resource_form", {
            title: "Create Genre",
            errors: errors.array(),
         });
         return;
      } else {
         // Data from form is valid.
         // Check if resource with same name already exists.
         Resource.findOne({ name: req.body.name }).exec((err, found_resource) => {
            if (err) {
               return next(err);
            }

            if (found_resource) {
               // resource exists, redirect to its detail page.
               res.redirect(found_resource.url);
            } else {
               resource.save((err) => {
                  if (err) {
                     return next(err);
                  }
                  // Resoource saved. Redirect to resource detail page.
                  res.redirect(resource.url);
               });
            }
         });
      }
   },
];

// Display resource delete form on GET.
exports.resource_delete_get = (req, res) => {
   // res.send("NOT IMPLEMENTED: resource delete GET");
   async.parallel(
      {
         resource(callback) {
            Resource.findById(req.params.id).exec(callback);
         },
         champions(callback) {
            Champion.find({ resourcetype: req.params.id }).exec(callback);
         },
      },
      (err, results) => {
         if (err) {
            return next(err);
         }
         if (results.resource == null) {
            // No results.
            res.redirect("/resources");
         }
         // Successful, so render.
         res.render("resource_delete", {
            title: "Delete Resource",
            resource: results.resource,
            champions: results.champions
         });
      }
   );
};

// Handle resource delete on POST.
exports.resource_delete_post = (req, res) => {
   // res.send("NOT IMPLEMENTED: resource delete POST");
   async.parallel(
      {
         resource(callback) {
            Resource.findById(req.params.id).exec(callback);
         },

         champions(callback) {
            Champion.find({ resourcetype: req.params.id }).exec(callback);
         },
      },
      (err, results) => {
         if (err) {
            return next(err);
         }
         // Success
         if (results.champions.length > 0) {
            // resource has champions. Render in same way as for GET route.
            res.render("resource_delete", {
               title: "Delete Resource",
               resource: results.resource,
               champions: results.champions
            });
            return;
         }
         // resource has no champions. Delete object and redirect to the list of classes.
         Resource.findByIdAndRemove(req.body.classid, (err) => {
            if (err) {
               return next(err);
            }
            // Success - go to resources list
            res.redirect("/resources");
         });
      }
   );
};

// Display resource update form on GET.
exports.resource_update_get = (req, res) => {
   res.send("NOT IMPLEMENTED: resource update GET");
};

// Handle resource update on POST.
exports.resource_update_post = (req, res) => {
   res.send("NOT IMPLEMENTED: resource update POST");
};
