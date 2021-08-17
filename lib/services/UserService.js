/*
import pool from '../utils/pool';
import data from '../../data/data.js';
*/

import User from '../models/User.js';

export default class UserService {

  static async signUp(user) {
    return await User.create({
      passwordHash: user.password,
      ...user
    });
  }

}
