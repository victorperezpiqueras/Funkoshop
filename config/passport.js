const passport = require('passport'); /* Loading basic passport module */
const passportJWT = require("passport-jwt"); /* JWT passport integration */
const JWTStrategy = passportJWT.Strategy; /* encrypt the token */
const ExtractJWT = passportJWT.ExtractJwt; /* extract the token */
const LocalStrategy = require('passport-local').Strategy; /* Local Strategy to manage user information */
const secretKey = 'your_jwt_secret'; /* Private key to encrypt JWT */
const bcrypt = require('bcryptjs'); /* Load bcrypt */
const User = require('../model/user'); /* Loads the user */

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) { /* Authentification function --> Called when signin */
        return User.findOne({ email: email }) /* Check if email is in the database */
            .then(user => {
                if (!user) { /* If user not exist ->error */
                    return cb({ errors: { email: { message: 'Email not found' } } }, false);
                }
                if (!bcrypt.compareSync(password, user.password)) { /* If user exists - checks the password */
                    return cb({ errors: { password: { message: 'Incorrect password' } } }, false);
                }
                return cb(null, user); /* If all OK (null=OK) I do the callback */
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), /* Extracts the token */
    secretOrKey: secretKey
},
    function (jwtPayload, cb) { /* JWT manipulation --> pass the token between server and client */
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => cb(err));
    }
));


module.exports.secretKey = secretKey;