import pool from '../utils/pool.js';

export default class Star {
  id;
  userId;
  thingId;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.thingId = row.thing_id;
    this.createdAt = row.created_at;
  }

  static async create({ userId, thingId }) {
    const { rows } = await pool.query(`
      INSERT INTO stars (user_id, thing_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [userId, thingId]);

    return new Star(rows[0]);
  }

  static async readBy(key, by = 'id', one = true) {
    const { rows } = await pool.query(`
      SELECT * FROM stars 
      WHERE ${by} = $1;
    `, [key]);

    if (!rows[0]) return one ? null : [];
    return one ? new Star(rows[0]) : rows.map(row => new Star(row));
  }

  static async readAll() {
    const { rows } = await pool.query(`
      SELECT * FROM stars;
    `);

    return rows.map(row => new Star(row));
  }

  static async deleteBy(key, by = 'id', one = true) {
    const { rows } = await pool.query(`
      DELETE FROM stars
      WHERE ${by} = $1
      RETURNING *;
    `, [key]);
    
    if (!rows[0]) return null;
    return one ? new Star(rows[0]) : rows.map(row => new Star(row));
  }

  static async deleteBy2(key1, key2, by1 = 'user_id', by2 = 'thing_id') {
    const { rows } = await pool.query(`
      DELETE FROM stars
      WHERE ${by1} = $1
        AND ${by2} = $2
      RETURNING *;
    `, [key1, key2]);

    return rows[0] ? new Star(rows[0]) : null;
  }

}
