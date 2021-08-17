import data from '../../data/data.js';
import Thing from '../models/Thing.js';
import Star from '../models/Star.js';

export default class ThingService {

  static async uploadData() {
    return await Promise.all(data.map(thing => Thing.create(thing)));
  }

  static async getAllTheThing() {
    // get each thing and append the amount of stars it's gotten
    return await Thing.readAll()
      .then(things => {
        return Promise.all(things.map(thing => {
          return Star.readBy(thing.id, 'thing_id', false)
            .then(stars => ({ ...thing, stars: stars.map(star => star.userId) }))
          ;
        }));
      })
    ;
  }

}
