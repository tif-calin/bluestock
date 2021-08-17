import pool from '../utils/pool';
import data from '../../data/data.js';
import Thing from '../models/Thing.js';
import Star from '../models/Star';

export default class ThingService {

  static async uploadData() {
    return await pool.query('DROP TABLE IF EXISTS things;')
      .then(() => pool.query(`
        CREATE TABLE things (
          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          thing JSON NOT NULL,
          date_created TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `))
      .then(() => data.map(thing => Thing.create(thing)))
    ;
  }

  static async getAllTheThing() {
    // get each thing and append the amount of stars it's gotten
    return await Thing.readAll()
      .then(things => {
        return Promise.all(things.map(thing => {
          Star.readBy(thing.id, 'user_id', false)
            .then(stars => ({ ...thing, stars: stars.length }))
          ;
        }));
      })
    ;
  }

}
