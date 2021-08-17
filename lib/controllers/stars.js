import { Router } from 'express';
import Star from '../models/Star.js';

export default Router()
  .post('/', (req, res, next) => {
    Star.create(req.body)
      .then(star => res.send(star))
      .catch(next)
    ;
  })

  .delete('/:id', (req, res, next) => {
    Star.deleteBy(req.params.id)
      .then(star => res.send(star))
      .catch(next)
    ;
  })

  .delete('/:thing_id/:user_id', (req, res, next) => {
    Star.deleteBy2(req.params.userId, req.params.thingId)
      .then(star => res.send(star))
      .catch(next)
    ;
  })
;
