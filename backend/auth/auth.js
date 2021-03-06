const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../api/models/users");
const bcrypt = require("bcryptjs");
const JWTstrategy = require("passport-jwt").Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Create Passport Middleware to handle user registration
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User Not Found", code: 400 });
        }

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          return done(null, false, { message: "Invalid Password", code: 400 });
        }

        return done(null, user, {
          message: "Logged In Successfully",
          code: 200,
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    function (jwt_payload, done) {
      UserModel.findById(jwt_payload.id, function (err, user) {
        if (err) {
          return done(err, false, { message: "error occured", code: 400 });
        }
        if (user) {
          return done(null, user, {
            message: "Token authenticated",
            code: 200,
          });
        } else {
          return done(null, false, {
            message: "Invalid Token or User does not exist",
            code: 400,
          });
        }
      });
    }
  )
);

module.exports = passport;
// TODO create auth for register?? maybe not
