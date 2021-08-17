import pool from '../utils/pool.js';

export default class Thing {
  id;
  thing;
  dateCreated;

  constructor(row) {
    this.id = row.id;
    this.thing = row.thing;
    this.dateCreated = row.date_created;
  }

  static async create({ thing }) {
    const { rows } = await pool.query(`
      INSERT INTO things (thing)
      VALUES ($1)
      RETURNING *;
    `, [thing]);

    return new Thing(rows[0]);
  }

  static async readBy(key, by = 'id', one = true) {
    const { rows } = await pool.query(`
      SELECT * FROM things 
      WHERE ${by} = $1;
    `, [key]);

    if (!rows[0]) return null;
    return one ? new Thing(rows[0]) : rows.map(row => new Thing(row));
  }

  static async readAll() {
    const { rows } = await pool.query(`
      SELECT * FROM things;
    `);

    return rows.map(row => new Thing(row));
  }

  static async updateBy(thing, key, by = 'id') {
    const { rows } = await pool.query(`
      UPDATE things
      SET thing = $1
      WHERE ${by} = $2
      RETURNING *;
    `, [thing, key]);

    return rows.map(row => new Thing(row));
  }

  static async deleteBy(key, by = 'id', one = true) {
    const { rows } = await pool.query(`
      DELETE FROM things
      WHERE ${by} = $1
      RETURNING *;
    `, [key]);
    
    if (!rows[0]) return null;
    return one ? new Thing(rows[0]) : rows.map(row => new Thing(row));
  }

}
