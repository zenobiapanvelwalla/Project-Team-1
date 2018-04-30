var express = require('express');
var router = express.Router();
var con = require('../connection_pool');

/* GET home page. */
router.post('/', function(req, res, next) {
  let user_id = 1;
  console.log(req.body);
  con.query('INSERT INTO leads(first_name,last_name,address,city,state,zip_code,email,phone_number,best_time_to_call,current_occupation,net_worth,assets,partners,interested,background,user_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [
      req.body.first_name,
      req.body.last_name,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      req.body.email,
      req.body.phone_number,
      req.body.best_time_to_call,
      req.body.current_occupation,
      req.body.net_worth,
      req.body.assets,
      req.body.partners,
      req.body.interested,
      req.body.background.toString(),
      user_id
  ],function(err,lead,fields){
    if(err) throw err;
    res.send(lead);
  });
});

router.get('/',function(req,res,next){
  //user_id = req.session.user_id;
  user_id = 1;
  con.query('SELECT * FROM leads WHERE user_id=?',[user_id],function(err,leads){
    if(err) throw err;
    res.render('leadsList',{title:"Home",leads:leads});
  });

  //res.render('leadsList',{title:"Home",leads:leads});
  
});

router.get('/:lead_id',function(req,res){
  //user_id = req.session.user_id;
  user_id = 1;

  con.query('SELECT * from leads WHERE id=? AND user_id=?',[req.params.lead_id,user_id],function(err,lead){
    if(err) throw err;
    //SELECT tasks.id,tasks.name,tasks.description,tasks.additional_information,tasks.franchisor_id,lead_tasks.lead_id,lead_tasks.task_id,lead_tasks.status,lead_tasks.document FROM tasks LEFT JOIN lead_tasks ON tasks.id=lead_tasks.task_id WHERE tasks.franchisor_id=?
    con.query('SELECT * FROM tasks WHERE franchisor_id',[user_id],function(err,tasks){
      if(err) throw err;
      //console.log(tasks);
      con.query('SELECT * FROM lead_tasks WHERE lead_id=?',[req.params.lead_id],function(err,ltasks){
        if(err) throw err;
        console.log(ltasks);
        res.render('leadDetails',{title:"Lead Details",lead:lead[0],tasks: tasks,ltasks:ltasks});
      });
     

    });
    
  });
  
});

//get the lead's tasks. 
router.get('/tasks/:lead_id',function(req,res){
  //user_id = req.session.user_id;
  user_id = 1;

  con.query('SELECT * from leads WHERE id=? AND user_id=?',[req.params.lead_id,user_id],function(err,lead){
    if(err) throw err;
    //SELECT tasks.id,tasks.name,tasks.description,tasks.additional_information,tasks.franchisor_id,lead_tasks.lead_id,lead_tasks.task_id,lead_tasks.status,lead_tasks.document FROM tasks LEFT JOIN lead_tasks ON tasks.id=lead_tasks.task_id WHERE tasks.franchisor_id=?
    con.query('SELECT * FROM tasks WHERE franchisor_id',[user_id],function(err,tasks){
      if(err) throw err;
      //console.log(tasks);
      con.query('SELECT * FROM lead_tasks WHERE lead_id=?',[req.params.lead_id],function(err,ltasks){
        if(err) throw err;
        console.log(ltasks);
        res.render('leadsTasks',{title:"Lead Tasks",lead:lead[0],tasks: tasks,ltasks:ltasks});
      });
     

    });
  });

});

module.exports = router;
