var express = require('express');
var router = express.Router();
const champion_controller = require('../controllers/championController')
const class_controller = require('../controllers/classController')
const resource_controller = require('../controllers/resourceController')


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});


/// CHAMPION ROUTES ///

// GET request for creating champion. NOTE This must come before route for id (i.e. display champion).
router.get("/champion/create", champion_controller.champion_create_get);

// POST request for creating champion. 
router.post("/champion/create", champion_controller.champion_create_post);

// GET request to delete champion.
router.get("/champion/:id/delete", champion_controller.champion_delete_get);

// POST request to delete champion
router.post("/champion/:id/delete", champion_controller.champion_delete_post);

// GET request to update champion
router.get("/champion/:id/update", champion_controller.champion_update_get);

// POST request to update champion.
router.post("/champion/:id/update", champion_controller.champion_update_post);

// GET request for one champion
router.get("/champion/:id", champion_controller.champion_detail);

//GET request for list of all champions
router.get("/champions", champion_controller.champion_list);



/// RESOURCE ROUTES ///

// GET request for creating resource. NOTE This must come before route for id (i.e. display resource).
router.get("/resource/create", resource_controller.resource_create_get);

// POST request for creating resource.
router.post("/resource/create", resource_controller.resource_create_post);

// GET request to delete resource.
router.get("/resource/:id/delete", resource_controller.resource_delete_get);

// POST request to delete resource
router.post("/resource/:id/delete", resource_controller.resource_delete_post);

// GET request to update resource
router.get("/resource/:id/update", resource_controller.resource_update_get);

// POST request to update resource
router.post("/resource/:id/update", resource_controller.resource_update_post);

// GET request for one resource
router.get("/resource/:id", resource_controller.resource_detail);

// GET request for list of all resources
router.get("/resources", resource_controller.resource_list);



/// CLASS  ROUTES ///

// GET request for creating class. NOTE This must come before route for id (i.e. display class).
router.get("/class/create", class_controller.class_create_get);

// POST request for creating class
router.post("/class/create", class_controller.class_create_post);

// GET request to delete class
router.get("/class/:id/delete", class_controller.class_delete_get);

// POST request to delete class
router.post("/class/:id/delete", class_controller.class_delete_post);

// GET request to update class
router.get("/class/:id/update", class_controller.class_update_get);

// POST request to update class
router.post("/class/:id/update", class_controller.class_update_post);

// GET request for one class
router.get("/class/:id", class_controller.class_detail);

// GET request for list of all classes
router.get("/classes", class_controller.class_list);

module.exports = router;
