var express = require('express');
var router = express.Router();


//Checking if mongoose is npm installed
//Requires nmp install mongodb as well
var mongoose = require('mongoose');
//Using database "cfc"; if not creted will create for first time
mongoose.connect('mongodb://localhost/cfc')
var db = mongoose.connection;

//In case not connected
db.on('error', console.error.bind(console, 'connection error: '));


db.once('open', function(callback) {
	//All prints are for debugging
	//Furthermore, we do not know what needs to be inside of db.once and what could be outside of db.once.
	console.log("We are connected");

	//Creating Schema
	var studentSchema = mongoose.Schema({
		name: String
	});

	//Using the schema Student to create model
	var Student = mongoose.model('Student', studentSchema);

	//We don't know what module.exports does
	module.exports = Student;

	//Creating the student Bob
	var bob = new Student({ name: 'Bob'});
	console.log(bob.name); //'Bob'

	//Saving the Student Bob
	bob.save(function (err, bob) {
		if (err) return console.log("We did not save BOB");
		console.log("We saved BOB");
	});

	//Finding all students
	var k = Student.find(function (err, students){
		if (err) return console.log("We did not find anything");
		console.log("We found students");
	});
	console.log(k);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
