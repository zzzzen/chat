import {PassportStatic} from "passport";
import {Request} from "express";
import {ExtractJwt, Strategy, VerifyCallback} from "passport-jwt";
import keys from "../config/keys";
import {User} from "../models/User";
import {Socket} from "socket.io";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

const verify: VerifyCallback = async (payload, done) => {
  try {
    const user = await User.model.findByPk(payload.id);
    done(null, user ? user.get({plain: true}) : false);
  } catch (e) {
    console.log(e);
  }
};

export const passportAppMiddleware = (passport: PassportStatic) => {
  passport.use(new Strategy(options, verify));
};

export const passportWebsocketMiddleware = () => {
  const strategy = new Strategy(options, verify);

  return function authorize(socket: Socket, next: any) {
    strategy.success = (user) => {
      socket.handshake.auth = user;
      next();
    };

    strategy.fail = (info: any) => next(new Error(info));

    strategy.error = (error) => next(error);

    strategy.authenticate(socket.request as Request, {});
  };
};
