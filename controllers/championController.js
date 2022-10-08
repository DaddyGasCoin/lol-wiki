
const Champion = require('../models/champions')


// Display list of all champions.
exports.champion_list = (req, res) => {
    res.send("NOT IMPLEMENTED: champion list");
};

// Display detail page for a specific champion.
exports.champion_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: champion detail: ${req.params.id}`);
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
