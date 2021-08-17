import { Router } from 'express';
import ThingService from '../services/ThingService.js';

export default Router()
  .get('/', (req, res, next) => {
    ThingService.getAllTheThing()
      .then(things => res.send(things))
      .catch(next)
    ;
  })
;
