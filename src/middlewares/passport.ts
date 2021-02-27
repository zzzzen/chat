import {PassportStatic} from "passport";
import {Request} from "express";
import {ExtractJwt, Strategy} from "passport-jwt";
import keys from "../config/keys";
import {IUser, User} from "../models/User";
import {Socket} from "socket.io";
import {MESSAGES, STATUSES} from "../utils/vars";


const strategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}, async (payload, done) => {
  try {
    const user = await User.model.findByPk(payload.id);
    done(null, user ? user.get({plain: true}) : false);
  } catch (e) {
    console.log(e);
  }
});

export const passportAppMiddleware = (passport: PassportStatic) => {
  passport.use(strategy);
};

export const authorize = <T> (socket: Socket, next: (socket: Socket, user: IUser, data: T) => any) => (data: T) => {
  strategy.success = (user) => next(socket, user, data);

  strategy.fail = () => socket.emit("unauthorized", {
    status: STATUSES.UNAUTHORIZED,
    message: MESSAGES.UNAUTHORIZED
  });

  strategy.error = () => socket.emit("unauthorized", {
    status: STATUSES.UNAUTHORIZED,
    message: MESSAGES.UNAUTHORIZED
  });

  strategy.authenticate(socket.request as Request, {});
};
