var express = require('express');
var router = express.Router();
var con = require('../connection_pool');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('tasks', { title: 'Express' });
// });

router.post('/', function(req, res, next) {
  let user_id = 1;
  console.log(req.body);
  res.write(req.body);
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

module.exports = router;
