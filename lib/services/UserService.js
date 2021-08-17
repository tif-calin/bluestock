/*
import pool from '../utils/pool';
import data from '../../data/data.js';
*/

import User from '../models/User.js';

export default class UserService {

  static async signUp({ username, password }) {
    console.log(username);
    return await User.create({
      passwordHash: password,
      username
    });
  }

  static async authorize({ username, password }) {
    const user = await User.readBy(username, 'username');

    if (!user) throw new Error('Who???');
    if (password !== user.passwordHash) throw new Error('Denied entry');

    return user;
  }

}
