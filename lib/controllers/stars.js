import { Router } from 'express';
import Star from '../models/Star.js';

export default Router()
  .post('/', (req, res, next) => {
    Star.create(req.body)
      .then(star => res.send(star))
      .catch(next)
    ;
  })
;
