var express = require('express');
var router = express.Router();
var con = require('../connection_pool');
var path = require('path');
var file_path = "";
var document_name="";

var multer = require('multer'); //for saving files on server 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('./public')+'/documents/')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        file_path = "/documents/"+file.fieldname+'_'+Date.now()+ext;
        document_name = file.fieldname+'_'+Date.now()+ext;
        cb(null, file.fieldname+'_'+Date.now()+ext);
    }
});
var upload = multer({ storage: storage, dest: 'documents/' });


router.post('/', function(req, res, next) {
  
  let user_id = 1;
  console.log(req.body);
  if(Array.isArray(req.body.task_name)){
  for(var i=0;i<req.body.task_name.length;i++){
  con.query('INSERT INTO tasks(name,description,additional_information,franchisor_id) VALUES(?,?,?,?)',[
    req.body.task_name[i],
    req.body.task_description[i],
    req.body.addl_info[i],
    franchisor_id = user_id
  ],function(err,result){
    if(err) throw err;
    
  });
  }
} else {
  con.query('INSERT INTO tasks(name,description,additional_information,franchisor_id) VALUES(?,?,?,?)',[
    req.body.task_name,
    req.body.task_description,
    req.body.addl_info,
    franchisor_id = user_id
  ],function(err,result){
    if(err) throw err;
    
  });
}

res.redirect('/tasks'); 
});

router.get('/',function(req,res,next){
  res.render('tasksCopy',{title:"Add Tasks"});
});

//if the lead has uploaded a document then the lead_tasks row exists and it's status can be set to completed. 
//If the franschisor wants to complete it without the document then a new lead_tasks row will be created, 
//with it's status set to completed.

router.get('/:task_id/:lead_id',function(req, res){
  con.query('SELECT * FROM lead_tasks WHERE lead_id=? AND task_id=?',[req.params.lead_id,req.params.task_id],function(err,result){
    if(err) throw err;
    if(result.length>0){
      con.query('UPDATE lead_tasks SET status="completed" WHERE task_id=? AND lead_id=?',[req.params.task_id,req.params.lead_id],function(err, result){
        if(err) throw err;
        console.log(result);
        res.redirect('/leads/'+req.params.lead_id);
      });
    } else{
      con.query('INSERT INTO lead_tasks (lead_id,task_id,status) VALUES(?,?,?)',[req.params.lead_id,req.params.task_id,"completed"],function(err,result){
        if(err) throw err;
        console.log(result);
        res.redirect('/leads/'+req.params.lead_id);
      });
    }
  }); 
});

router.post('/add-document/:lead_id/:task_id',upload.single('document'),function(req,res){
  console.log("I am here");
  lead_id = req.params.lead_id;
  task_id = req.params.task_id;
  console.log(file_path);

  con.query('SELECT * FROM lead_tasks WHERE lead_id=? AND task_id=?',[lead_id,task_id],function(err,result){
    if(err) throw err;
    if(result.length>0){
      con.query('UPDATE lead_tasks SET document=?,document_name=? WHERE lead_id=? AND task_id=?',[file_path,document_name,lead_id,task_id],function(err,result){
        if(err) throw err;
        console.log(result);
        res.redirect('/leads/tasks/'+lead_id);
      });
    } else{
      con.query('INSERT INTO lead_tasks(lead_id,task_id,document,document_name) VALUES(?,?,?,?)',[lead_id,task_id,file_path,document_name],function(err,result){
        if(err) throw err;
        console.log(result);
        res.redirect('/leads/tasks/'+lead_id);
      });
    }
  });
  
});


module.exports = router;
