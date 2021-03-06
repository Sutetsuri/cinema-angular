var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const path = require("path");

var RESERVATIONS_COLLECTION = "reservations";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir =path.join( __dirname , 'dist','cinema-angular');
app.use(express.static(distDir));

/* app.use('/*', function(req,res) {

  res.sendFile(path.join(__dirname,'dist','cinema-angular','index.html'));
  }); */


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test",{ useNewUrlParser:true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// RESERVATIONS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/reservations"
 *    GET: finds all reservations
 *    POST: creates a new reservation
 */

app.get("/api/reservations", function(req, res) {
  db.collection(RESERVATIONS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get reservations.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/reservations", function(req, res) {
  var newReservation = req.body;
  // newReservation.createDate = new Date();

  if (!req.body.movieTitle) {
    handleError(res, "Invalid user input", "Must provide a MovieTitle.", 400);
  } else {
    db.collection(RESERVATIONS_COLLECTION).insertOne(newReservation, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new reservation.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/reservations/:id"
 *    GET: find reservation by id
 *    DELETE: deletes reservation by id
 */

app.get("/api/reservations/:id", function(req, res) {
  db.collection(RESERVATIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get reservation");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.delete("/api/reservations/:id", function(req, res) {
  db.collection(RESERVATIONS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete reservation");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'dist','cinema-angular','index.html'));
});
