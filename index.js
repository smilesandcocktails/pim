require('dotenv').config({silent: true})
var port = process.env.PORT || 3000
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('./config/ppConfig')
var flash = require('connect-flash')
var app = express();
var isLoggedIn = require('./middleware/isLoggedIn')
var path = require('path')
var MongoStore = require('connect-mongo')(session)

var dburi = process.env.MONGO_URI
mongoose.connect(dburi)
mongoose.Promise = global.Promise

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('REALLY CONNECTED THIS TIME');
});

app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({url: process.env.MONGO_URI})
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ejsLayouts);


app.use(function(req, res, next) {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})


var user = require('./routes/userRouter')
app.use('/', user)


var server = app.listen(port, function(){
  console.log('Express is running on port ' + port);
})

module.exports = server;
