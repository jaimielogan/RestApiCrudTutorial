var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/swords');
var Swords = db.get('swords');

// router.get('/', function(req, res) {
//   res.status(200).json({ message: 'Working!' });
// });

//--------//
// CREATE

router.post('/', function(req, res) {
  Swords.insert(req.body, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(sword);
  });
});

//--------//
// READ //

router.get('/', function(req,res,next){
  Swords.find({}, function(err,swords){
    if(err){
      res.send(err);
    }
    res.status(200).json(swords);
  });
});


//to find one item in json object
// Example id for testing: 57cf3964874b6953036f0d47

//--------//
// Read //

router.get('/:id', function(req,res){
  Swords.findOne({_id: req.params.id}, function(err,sword){
    if(err){
      res.send(err);
    }
    res.status(200).json(sword);
  });
});

// to modify that one item in the json object

//--------//
// Update //

router.put('/:id', function(req,res,next){
  Swords.findAndModify({_id: req.params.id}, req.body, function(err,sword){
    if(err){
      throw err;
    }
    res.json(req.body);
  });
});

// Next is to delete

//--------//
// Delete //

router.delete('/:id', function(req,res,next){
  Swords.remove({_id: req.params.id}, function(err,sword){
    if(err){
      throw err;
    }
    res.status(200).json({message: "Deleted Successfully", body: req.body.name});
  });
});

module.exports = router;
