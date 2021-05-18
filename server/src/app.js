
/**
 * Our main application
 */

 import Express from 'express';
 import bodyParser from 'body-parser';
 import dotenv from 'dotenv';

 /**
  * Custom modules
  */
 import Logger from './utils/Logger.js';
 import auth from "./middleware/passport.middleware.js";
 import apiRoutes from './api/routes/index.js';
 
 // create a new express application
 const app = Express();
 
 // init dotenv
 dotenv.config();
 
 // use middleware - add json body parser
 app.use(bodyParser.json());

 // add middleware and registerEndpoints
 app.use('/api', ...apiRoutes);
 app.use('/auth', auth);


 /**
  * Start listening on a port
  */
 app.listen(process.env.PORT, () => {
   Logger.stressedInfo(`Server started on port ${process.env.PORT}`);
 })