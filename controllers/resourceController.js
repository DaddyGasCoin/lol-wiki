const Resource = require('../models/resourcetype')
const Champion = require('../models/champions')

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
   // res.send(`NOT IMPLEMENTED: resource detail: ${req.params.id}`);
   (async () => {
      const name = await Resource.findById(req.params.id)
      Champion.find({ resourcetype: name }, 'name key')
         .exec(function (err, names) {
            if (err) return next(err)
            res.render('resource_details', { title: `${name.name} Resource Type`, Details: names })
         })
   })();
};

// Display resource create form on GET.
exports.resource_create_get = (req, res) => {
   res.send("NOT IMPLEMENTED: resource create GET");
};

// Handle resource create on POST.
exports.resource_create_post = (req, res) => {
   res.send("NOT IMPLEMENTED: resource create POST");
};

// Display resource delete form on GET.
exports.resource_delete_get = (req, res) => {
   res.send("NOT IMPLEMENTED: resource delete GET");
};

// Handle resource delete on POST.
exports.resource_delete_post = (req, res) => {
   res.send("NOT IMPLEMENTED: resource delete POST");
};

// Display resource update form on GET.
exports.resource_update_get = (req, res) => {
   res.send("NOT IMPLEMENTED: resource update GET");
};

// Handle resource update on POST.
exports.resource_update_post = (req, res) => {
   res.send("NOT IMPLEMENTED: resource update POST");
};
