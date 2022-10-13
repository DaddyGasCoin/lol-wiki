
const Champion = require('../models/champions')
const Class = require('../models/class')
const Resource = require('../models/resourcetype')
const async = require("async");
const { body, validationResult } = require("express-validator");


// Display list of all champions.
exports.champion_list = (req, res, next) => {
   Champion.find({}, "name key")
      .sort({ name: 1 })
      .exec(function (err, champ_names) {
         if (err) {
            return next(err);
         }
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
   async.parallel(
      {
         resources(callback) {
            Resource.find(callback);
         },
         class(callback) {
            Class.find(callback);
         },
      },
      (err, results) => {
         if (err) {
            return next(err);
         }
         res.render("champ_form", {
            title: "Create Champion",
            classes: results.class,
            resources: results.resources,
         });
      }
   );
};

exports.champion_create_post = [
   // Convert the class types to an array.
   (req, res, next) => {
      if (!Array.isArray(req.body.class)) {
         req.body.class =
            typeof req.body.class === "undefined" ? [] : [req.body.class];
      }
      next();
   },

   // Validate and sanitize fields.
   body("name", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("title", "title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("lore", "Lore must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attack", "Attack must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("magic", "Magic must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("defense", "Defense must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("difficulty", "Difficuly must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hp", "HP must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hpperlevel", "HP per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mp", "Mana must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mpperlevel", "Mana per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("movespeed", "Move speed must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("armor", "Armor must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("armorperlevel", "Armor must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mr", "Magic Resist must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mrperlevel", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackrange", "Attack range must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hpregen", "HP regen  must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hpregenperlevel", "Hp regen per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mpregen", "Mana regen must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mpregenperlevel", "Mana regen per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("crit", "Crit must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("critperlevel", "Crit per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackdamage", "Attack damage must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackdamageperlevel", "Attack damage per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackspeed", "Attack speed must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackspeedperlevel", "Attack speed per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("resourcetype", "Resource  must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("class.*").escape(),
   body("allytip.*").escape(),
   body("enemytip.*").escape(),


   // Process request after validation and sanitization.
   (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a champion object with escaped and trimmed data.
      const champion = new Champion({
         name: req.body.name,
         key: req.body.name,
         title: req.body.title,
         lore: req.body.lore,
         class: req.body.class,
         resourcetype: req.body.resourcetype,
         allytips: [req.body.allytip1, req.body.allytip2, req.body.allytip3],
         enemytips: [req.body.enemytip1, req.body.enemytip2, req.body.enemytip3],
         info: {
            attack: req.body.attack,
            defense: req.body.defense,
            magic: req.body.magic,
            difficulty: req.body.difficulty,
         },
         stats: {
            hp: req.body.hp,
            hpperlevel: req.body.hpperlevel,
            mp: req.body.mp,
            mpperlevel: req.body.mpperlevel,
            movespeed: req.body.movespeed,
            armor: req.body.armor,
            armorperlevel: req.body.armor,
            spellblock: req.body.mr,
            spellblockperlevel: req.body.mrperlevel,
            attackrange: req.body.attackrange,
            hpregen: req.body.hpregen,
            hpregenperlevel: req.body.hpregenperlevel,
            mpregen: req.body.mpregen,
            mpregenperlevel: req.body.mpregenperlevel,
            crit: req.body.crit,
            critperlevel: req.body.critperlevel,
            attackdamage: req.body.attackdamage,
            attackdamageperlevel: req.body.attackdamageperlevel,
            attackspeedperlevel: req.body.attackspeedperlevel,
            attackspeed: req.body.attackspeed,
         }
      });

      if (!errors.isEmpty()) {
         // There are errors. Render form again with sanitized values/error messages.
         // Get all class types and resorces for form.
         async.parallel(
            {
               classes(callback) {
                  Class.find(callback);
               },
               resources(callback) {
                  Resource.find(callback);
               },
            },
            (err, results) => {
               if (err) {
                  return next(err);
               }

               // Mark our selected class types as checked.
               for (const Class of results.classes) {
                  if (champion.class.includes(Class._id)) {
                     Class.checked = "true";
                  }
               }
               res.render("champ_form", {
                  title: "Create Champion",
                  classes: results.classes,
                  resources: results.resources,
                  errors: errors.array(),
               });
            }
         );
         return;
      }

      // Data from form is valid. Save champion.
      champion.save((err) => {
         if (err) {
            return next(err);
         }
         // Successful: redirect to new champion.
         res.redirect(champion.url);
      });
   },
];

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
   // res.send("NOT IMPLEMENTED: champion update GET");
   async.parallel(
      {
         champion(callback) {
            Champion.findById(req.params.id)
               .populate("class")
               .populate("resourcetype")
               .exec(callback);
         },
         classes(callback) {
            Class.find(callback);
         },
         resources(callback) {
            Resource.find(callback);
         },
      },
      (err, results) => {
         if (err) {
            return next(err);
         }
         if (results.champion == null) {
            // No results.
            const err = new Error("Champion not found");
            err.status = 404;
            return next(err);
         }
         // Success.
         // Mark our selected class types as checked.
         for (const Class of results.classes) {
            for (const champclass of results.champion.class) {
               if (Class._id.toString() == champclass._id.toString())
                  Class.checked = 'true'
            }
         }
         res.render("champ_form", {
            title: "Update Champion",
            classes: results.classes,
            resources: results.resources,
            champion: results.champion
         });
      }
   );
};

// Handle champion update on POST.
exports.champion_update_post = [
   // Convert the classes to an array
   (req, res, next) => {
      if (!Array.isArray(req.body.class)) {
         req.body.class =
            typeof req.body.class === "undefined" ? [] : [req.body.class];
      }
      next();
   },
   // Validate and sanitize fields.
   body("name", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("title", "title must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("lore", "Lore must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attack", "Attack must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("magic", "Magic must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("defense", "Defense must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("difficulty", "Difficuly must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hp", "HP must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hpperlevel", "HP per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mp", "Mana must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mpperlevel", "Mana per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("movespeed", "Move speed must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("armor", "Armor must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("armorperlevel", "Armor must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mr", "Magic Resist must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mrperlevel", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackrange", "Attack range must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hpregen", "HP regen  must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("hpregenperlevel", "Hp regen per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mpregen", "Mana regen must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("mpregenperlevel", "Mana regen per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("crit", "Crit must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("critperlevel", "Crit per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackdamage", "Attack damage must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackdamageperlevel", "Attack damage per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackspeed", "Attack speed must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("attackspeedperlevel", "Attack speed per level must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("resourcetype", "Resource  must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   body("class.*").escape(),
   body("allytip.*").escape(),
   body("enemytip.*").escape(),

   // Process request after validation and sanitization.
   (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a champion object with escaped/trimmed data and old id.
      const champion = new Champion({
         name: req.body.name,
         key: req.body.name,
         title: req.body.title,
         lore: req.body.lore,
         class: req.body.class,
         resourcetype: req.body.resourcetype,
         allytips: [req.body.allytip1, req.body.allytip2, req.body.allytip3],
         enemytips: [req.body.enemytip1, req.body.enemytip2, req.body.enemytip3],
         info: {
            attack: req.body.attack,
            defense: req.body.defense,
            magic: req.body.magic,
            difficulty: req.body.difficulty,
         },
         stats: {
            hp: req.body.hp,
            hpperlevel: req.body.hpperlevel,
            mp: req.body.mp,
            mpperlevel: req.body.mpperlevel,
            movespeed: req.body.movespeed,
            armor: req.body.armor,
            armorperlevel: req.body.armor,
            spellblock: req.body.mr,
            spellblockperlevel: req.body.mrperlevel,
            attackrange: req.body.attackrange,
            hpregen: req.body.hpregen,
            hpregenperlevel: req.body.hpregenperlevel,
            mpregen: req.body.mpregen,
            mpregenperlevel: req.body.mpregenperlevel,
            crit: req.body.crit,
            critperlevel: req.body.critperlevel,
            attackdamage: req.body.attackdamage,
            attackdamageperlevel: req.body.attackdamageperlevel,
            attackspeedperlevel: req.body.attackspeedperlevel,
            attackspeed: req.body.attackspeed,
         },
         _id: req.params.id, //This is required, or a new ID will be assigned!
      });
      if (!errors.isEmpty()) {
         // There are errors. Render form again with sanitized values/error messages.
         // Get all class and resource types for form.
         async.parallel(
            {
               classes(callback) {
                  Class.find(callback);
               },
               resources(callback) {
                  Resource.find(callback);
               },
            },
            (err, results) => {
               if (err) {
                  return next(err);
               }

               // Mark our selected genres as checked.
               for (const Class of results.classes) {
                  if (champion.class.includes(Class._id)) {
                     Class.checked = "true";
                  }
               }
               res.render("champ_form", {
                  title: "Update Champion",
                  classes: results.classes,
                  resources: results.resources,
                  champion: results.champion,
                  errors: errors.array(),
               });
            }
         );
         return;
      }

      // Data from form is valid. Update the record.
      Champion.findByIdAndUpdate(req.params.id, champion, {}, (err, thechamp) => {
         if (err) {
            return next(err);
         }

         // Successful: redirect to book detail page.
         res.redirect(thechamp.url);
      });
   },
];