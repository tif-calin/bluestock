import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import ThingService from '../lib/services/ThingService.js';

describe('auth routes', () => {

  const user = {
    username: 'test',
    password: 'test',
  };

  beforeEach(() => {
    return setup(pool);
  });

  test('POST user to /auth/signup', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
    ;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'test',
      token: expect.any(String),
      passwordHash: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  test('POST user to /auth/signin', async () => {
    const res = await request.agent(app).post('/api/v1/auth/signup').send(user)
      .then(() => request.agent(app).post('/api/v1/auth/login').send(user))
    ;

    expect(res.status).toBe(200);
  });

});

describe('things routes', () => {

  beforeEach(async () => {
    setup(pool);
    await ThingService.uploadData();
  });

  test('', async () => {
    
  });
});
