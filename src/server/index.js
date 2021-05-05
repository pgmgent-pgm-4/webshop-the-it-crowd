
/**
 * Our main application
 */

 import Express from 'express';
 import bodyParser from 'body-parser';
 import dotenv from 'dotenv';
 import Logger from './api/lib/Logger.js'
 import authenticateEndpoints from './api/model/auth/index.js'
 import apiRoutes from './api/routes/index.js'
 import middleware from './api/middleware/index.js';
 
 // create a new express application
 const app = Express();
 
 // init dotenv
 dotenv.config();
 
 // use middleware - add json body parser
 app.use(bodyParser.json());

 // add middleware and registerEndpoints
 app.use('/api', ...middleware, ...apiRoutes);
 app.use('/auth', authenticateEndpoints);

 /**
  * Start listening on a port
  */
 app.listen(process.env.PORT, () => {
   Logger.stressedInfo(`Server started on port ${process.env.PORT}`);
 })