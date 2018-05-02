let should = require("should");
let request = require("request");
let expect = require("chai").expect;
let util = require("util");
var assert = require('assert');
//let baseURL= "http://127.0.0.1:3002/";

describe("store new task",function(){
    it('Stores New Task', function (done) {
      request.post('http://localhost:3000/tasks',
          { form: { task_name: "test task",task_description:"test description",addl_info:"addl test information" } },
          function (error, response, body) {
              console.log(error);
              let body_parsed = JSON.parse(body);
              console.log(body_parsed);
              assert.equal(50, body_parsed.insertId);
              done();
          });
    });
  });




// describe("Get leads",function(){
//     it("gets all leads",function(done){
//       request.get('http://127.0.0.1:3000/leads',function(error,response,body){
//         console.log(error);
//         let body_parsed = JSON.parse(body);
//         expect(body_parsed.length).to.equal(2);
//         console.log(response);
//         done();
//       });
//     });
//   });

// describe("Get tasks",function(){
//   it("gets all tasks",function(done){
//     request.get('http://127.0.0.1:3000/tasks',function(error,response,body){
//       console.log(error);
//       let body_parsed = JSON.parse(body);
//       expect(body_parsed.length).to.equal(3);
//       console.log(response);
//       done();
//     });
//   });
// });







// describe("store new task",function(){
//     it('Stores New Task', function (done) {
//       request.post('http://localhost:3000/tasks',
//           { form: { name: "test task",description:"test description",additional_information:"addl test information" } },
//           function (error, response, body) {
//               console.log(error);
//               let body_parsed = JSON.parse(body);
//               console.log(body_parsed);
//               assert.equal(47, body_parsed.insertId);
//               done();
//           });
//     });
//   });

// describe("store new users",function(){
//   it('Store New User', function (done) {
//     request.post('http://localhost:3000/users',
//         { form: { first_name: "test",last_name:"test",email:"test@gmail.com",pwd:"123",phone_number:"12345",state:'CA',country:'United States',city:'San Jose',zipcode:'95113',address:"test address",password:'123',company_name:'abc' } },
//         function (error, response, body) {
//             console.log(error);
//             let body_parsed = JSON.parse(body);
//             console.log(body_parsed);
//             assert.equal(8, body_parsed.insertId);
//             done();
//         });
//   });
// });


// describe("Get all users",function(){
//   it("gets all users",function(done){
//     request.get('http://127.0.0.1:3000/users',function(error,response,body){
//       console.log(error);
//       let body_parsed = JSON.parse(body);
//       expect(body_parsed[0]['first_name']).to.equal('Zenobia');
//       console.log(response);
//       done();
//     });
//   });
// });


