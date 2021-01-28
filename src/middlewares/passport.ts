import {PassportStatic} from "passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import keys from "../config/keys";
import {User} from "../models/User";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

export const passportMiddleware = (passport: PassportStatic) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await User.model.findByPk(payload.id);
      done(null, user ? user.get({plain: true}) : false);
    } catch (e) {
      console.log(e);
    }
  }));
};
