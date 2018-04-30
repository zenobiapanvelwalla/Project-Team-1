var express = require('express');
var router = express.Router();
var con = require('../connection_pool');
var path = require('path');

var multer = require('multer'); //for saving files on server 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('./public')+'/documents/')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, file.fieldname+'_'+Date.now());
    }
});
var upload = multer({ storage: storage, dest: 'documents/' });


router.post('/:lead_id/:task_id',upload.single('document'),function(req,res){
  console.log("I am here");
  lead_id = req.params.lead_id;
  task_id = req.params.task_id;
  let path = "/documents/" + req.file.filename;
  console.log(path);
  res.send("saved");


});



module.exports = router;
