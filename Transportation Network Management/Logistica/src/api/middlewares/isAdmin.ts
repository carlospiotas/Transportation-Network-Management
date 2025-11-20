import jwt from 'express-jwt';
import config from '../../../config';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const isAdmin = async (req, res, next) => {
    try {
      const jwt = require('jsonwebtoken');
        var token:string = req.headers.authorization;
        if(token == null){
          return res.sendStatus(401);
      }
        const decode = jwt.verify(token, (new Buffer(config.secret_Key).toString('utf-8') ));
        var data:Date = new Date(decode.exp);

      if (decode['role '] != "admin"  || data.getTime() > Date.now() || decode.iss != config.jwt_Issuer || decode.aud != config.jwt_Audience ) {
        return res.sendStatus(401);
      }
      return next();
    } catch (e) {
      return res.sendStatus(401);
    }
  };
  
  export default isAdmin;


  