const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const bodyParser = require("body-parser");
const sesion = require("express-session");

const {url} = require("./config/database");

mongoose.connect(url, { useNewUrlParser: true });

//require("./config/passport")(app, passport);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set('views engine', 'ejs');

app.use(morgan('dev'));
//app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(sesion({
    secret: "probandonode",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);

app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
    console.log("puerto server", app.get('port'));
});

