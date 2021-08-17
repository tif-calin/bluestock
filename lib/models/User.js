import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class User {
  id;
  username;
  passwordHash;
  dateCreated;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.dateCreated = row.date_created;
  }

  static async create({ username, passwordHash }) {
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2)
      RETURNING *;
    `, [username, passwordHash]);

    return new User(rows[0]);
  }

  static async readBy(key, by = 'id', one = true) {
    const { rows } = await pool.query(`
      SELECT * FROM users 
      WHERE ${by} = $1;
    `, [key]);

    if (!rows[0]) return null;
    return one ? new User(rows[0]) : rows.map(row => new User(row));
  }

  static async readAll() {
    const { rows } = await pool.query(`
      SELECT * FROM users;
    `);

    return rows.map(row => new User(row));
  }

  static async deleteBy(key, by = 'id', one = true) {
    const { rows } = await pool.query(`
      DELETE FROM users
      WHERE ${by} = $1
      RETURNING *;
    `, [key]);
    
    if (!rows[0]) return null;
    return one ? new User(rows[0]) : rows.map(row => new User(row));
  }

  authToken() {
    return jwt.sign(
      { ...this },
      process.env.APP_SECRET,
      { expiresIn: '24h' }
    );
  }
}
