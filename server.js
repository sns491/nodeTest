var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('person',['person']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get("/person",function(req,res){
	console.log("get request for person");
	

	db.person.find(function(err,docs){
		console.log(docs); 
		res.json(docs);
	});

	
});

app.post("/person",function(req,res){
	console.log(req.body);
	db.person.insert(req.body,function(err,doc){
		res.json(doc);
	});
	
});


app.delete("/person/:id",function(req,res){
	var id = req.params.id;
	console.log("inside server id to be deleted "+id);
	db.person.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});


app.get("/person/:id",function(req,res){
	var id=req.params.id;
	console.log("inside server js id object retrieved "+id);
	db.person.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put("/person/:id",function(req,res){
	var id = req.params.id;
	console.log("inside server js for update name",req.body.name);
	/*db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},

		function(err,doc){
			res,json(doc);
		}
	});*/
	db.person.update({_id:mongojs.ObjectId(id) }, {
	    $set: {
	        name:req.body.name,
			number:req.body.number
	    },
	},
	function(err,doc){
		console.log("updated doc "+doc);
		res.json(doc);
	});
	
});

app.listen(3000);
console.log("server running on 3000");