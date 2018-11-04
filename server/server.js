
//npm modules
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
//other settings
let userDb = 'newvue'

//database
const mongoDbUrl = 'mongodb://127.0.0.1/';

function dbName() {
  return mongoDbUrl + userDb;
}

const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  title: String,
  type: String,
  role: String
})
const assetSchema = new mongoose.Schema({
  owner: ObjectId,
  name: String,
  features: {
    type: Map,
    of: Mixed
  }
}, { strict: false })
const User = mongoose.model('users', userSchema)
const Asset = mongoose.model('assets', assetSchema)

//connection
mongoose.connect(dbName(), { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, ' Mongo Connection Error'));


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'username' },
  (username, password, done) => {
    User.findOne({ 'username': username })
      .then(target => {
        if (!target) {
          return done(null, false, { message: JSON.parse('{"loggedin": false, "reason": "Invalid user" }') });
        }
        if (!bcrypt.compareSync(password, target.password)) {
          return done(null, false, { message: JSON.parse('{"loggedin": false, "reason": "Invalid credentials" }') });
        }
        return done(null, target);
      })
      .catch(error => done(error));
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findOne({ "_id": id })
    .then(target => done(null, target))
    .catch(error => done(error, false))
});

// create the server
const app = express();
const secretsquirrel = uuid();
console.log("server secret is " + secretsquirrel)
// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: secretsquirrel,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
  next();
});

//start a session
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info && typeof (info.message) !== "object") { return res.send({ loggedin: false, reason: info.message }) }
    if (info && typeof (info.message) == "object") { return res.send(info.message) }
    if (err) { return next(err); }
    if (!user) { return res.send({ loggedin: false, reason: 403 }) }
    req.login(user, (err) => {
      if (err) { return next(err); }
      if (req.isAuthenticated()) {
        res.send({ loggedin: true, user: { firstname: user.firstname, lastname: user.lastname, title: user.title, role: user.role } })
      } else {
        res.send({ loggedin: false, reason: "Not logged in" })
      }
    })
  })(req, res, next);
})

//terminate session
app.route('/logout')
  .get(function (req, res) {
    req.logout();
    res.send({ "loggedin": false });
  })
  .post(function (req, res) {
    req.logout();
    res.send({ "loggedin": false });
  })

app.route('/assets/:userid')
  .get(function (req, res) {
    Asset.find({ 'owner': req.params.userid })
      .then(result => {
        res.json(result)
      })
      .catch(error => done(error));
  })
  .post(function (req, res) {
    let data = req.body ? req.body : { name: '', features: {} }
    if (!data.features) {
      data.features = {}
    }
    //check for valid user then insert
    User.findOne({ _id: req.params.userid }).then(owner => {
      if (owner) {
        newasset = new Asset({ owner: owner._id, name: data.name, features: data.features })
        newasset.save()
        res.send(newasset)
      } else {
        res.sendStatus(403)
      }
    })
  })

//users
app.route('/user')
  .get(function (req, res) {
    User.find({})
      .then(result => {
        res.json(result)
      })
      .catch(error => done(error));
  })
  .post(function (req, res) {
    let data = req.body
    let salt = bcrypt.genSaltSync(10);
    if (data.username.length <= 0) {
      res.sendStatus(403)
    }
    else {
      User.findOne({ 'username': data.username })
      .then(target => {
        if (!target) {
          if (data.password.length < 8)
            return res.send({ error: 'password length' })
          bcrypt.hash(data.password, salt, null, function (err, hash) {
            newuser = new User({
              username: data.username,
              password: hash,
              firstname: data.firstname ? data.firstname : '',
              lastname: data.lastname ? data.lastname : '',
              title: data.title ? data.title : '',
              type: data.type ? data.type : '',
              role: data.role ? data.role : ''
            })
            newuser.save()
            res.send(newuser)
          })
        }
        else {
          res.sendStatus(403)
        }
      })
    }



  })

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Server listening on :3000')
})