'use strict';
const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport')
const rootRoute = require('./routes/rootRoute.js')
const catRoute = require('./routes/catRoute.js')
const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoute.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

app.use(cors())

app.use(express.json)
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('uploads'))

app.use('/', rootRoute);
app.use('/cat', passport.authenticate('jwt' , {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt' , {session: false}), userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
