
const Resource = require('../models/resourcetype')

// Display list of all resources.
exports.resource_list = (req, res) => {
    res.send("NOT IMPLEMENTED: resource list");
};

// Display detail page for a specific resource.
exports.resource_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: resource detail: ${req.params.id}`);
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
