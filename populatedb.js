#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

const axios = require('axios')
const { asyncParallelForEach, BACK_OFF_RETRY } = require('async-parallel-foreach')
var Champion = require('./models/champions')
var Class = require('./models/class')
var Resourcetype = require('./models/resourcetype')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function classCreate(name) {
   classdetail = { name: name }
   let classobj = new Class(classdetail);
   classobj.save((err) => {
      if (err) {
         return err
      }
      console.log('created classtype' + classobj)
   });
}

function resourceTypeCreate(name) {
   type = { name: name }
   let resourcetype = new Resourcetype(type)
   resourcetype.save((err) => {
      if (err) {
         return (err);
      }
      console.log('created resourcetype' + resourcetype)
   });
}

function createChampion(name, title, lore, allytips, enemytips, tags, stats, type, info) {
   champ = {
      name: name,
      title: title,
      lore: lore,
      class: tags,
      resourcetype: type,
      allytips: allytips,
      enemytips: enemytips,
      info: info,
      stats: stats,
   }
   let champobj = new Champion(champ)
   champobj.save((err) => {
      if (err) {
         console.log(err)
         return (err);
      }
      console.log('created ' + champobj.name)
   });

}

async function getChampionData(name) {
   try {
      const response = await
         axios.request(`http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion/${name}.json`)
      const type = await getID(response.data.data[name].partype)
      const _class = await getTypesId(response.data.data[name].tags)
      createChampion(
         response.data.data[name].name,
         response.data.data[name].title,
         response.data.data[name].lore,
         response.data.data[name].allytips,
         response.data.data[name].enemytips,
         _class,
         response.data.data[name].stats,
         type,
         response.data.data[name].info
      )
   }
   catch (error) {
      console.error(error);
   }
}

async function getID(name) {
   try {
      //Edge case for belveth,API gives empty string for resource type;default to None
      tar = name
      if (!tar)
         tar = 'None'
      const res = await Resourcetype.find({ name: tar })
      return res[0]
   }
   catch (error) {
      console.log(error)
   }

}

async function getTypesId(types) {
   try {
      let Ids = []
      for (const type of types) {
         const res = await Class.find({ name: type })
         Ids.push(res[0])
      }
      return Ids
   } catch (error) {
      console.log(error)
   }

}

async function getChampNames() {
   try {
      const response =
         await axios.request('http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json');
      return Object.keys(response.data.data)
   } catch (error) {
      console.error(error);
   }
}

async function getTypesAndResources() {
   const resources = new Set()
   const classtypes = new Set()
   try {
      const champs = await getChampNames()
      const parallelLimit = champs.length

      const results = await asyncParallelForEach(champs, parallelLimit, async (champ, index) => {
         const response =
            await axios.request(`http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion/${champ}.json`);
         resources.add(response.data.data[champ].partype)
         for (const type of response.data.data[champ].tags) {
            classtypes.add(type)
         }

      }, {
         times: 10,  // try at most 10 times
         interval: BACK_OFF_RETRY.exponential()
      })
      return [[...resources], [...classtypes]]

   }

   catch (error) {
      console.error(error);
   }

}

async function createTypes(types) {
   try {
      const parallelLimit = types.length
      const results = await asyncParallelForEach(types, parallelLimit, async (type, index) => {
         resourceTypeCreate(type)

      }, {
         times: 10,  // try at most 10 times
         interval: BACK_OFF_RETRY.exponential()
      })
   }

   catch (error) {
      console.error(error);
   }
}

async function createclasses(classes) {
   try {
      const parallelLimit = classes.length
      const results = await asyncParallelForEach(classes, parallelLimit, async (cls, index) => {
         classCreate(cls)
      }, {
         times: 10,  // try at most 10 times
         interval: BACK_OFF_RETRY.exponential()
      })
   }

   catch (error) {
      console.error(error);
   }

}

async function createTypesAndClass() {
   const data = await getTypesAndResources()
   const [resources, classTypes] = data
   createTypes(resources)
   createclasses(classTypes)
}

async function createChampions() {
   const champs = await getChampNames()
   const parallelLimit = champs.length
   const results = await asyncParallelForEach(champs, parallelLimit, async (champ, index) => {
      getChampionData(champ)
   }, {
      times: 10,  // try at most 10 times
      interval: BACK_OFF_RETRY.exponential()
   })

}

//functions below add resourcetypes,classes and champions.They should be run in sequence
createTypesAndClass()
createChampions()

