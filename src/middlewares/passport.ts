import {PassportStatic} from "passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "../models/User";
import keys from "../config/keys";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

export const passportMiddleware = (passport: PassportStatic) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select("email id");
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (e) {
      console.log(e);
    }
  }));
};
