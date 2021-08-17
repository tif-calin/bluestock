import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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
  });

  test('GET to /api/v1/things/', async () => {
    const res = await request(app).get('/api/v1/things/');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Array));
  });

});

describe('stars routes', () => {

  const agent = request.agent(app);

  const login = {
    username: 'test',
    password: 'test',
  };

  beforeAll(() => {
    return setup(pool);
  });

  afterEach(() => {
    return setup(pool);
  });

  test('POST star to /api/v1/stars', async () => {
    const user = await agent.post('/api/v1/auth/signup').send(login)
      .then(() => agent.post('/api/v1/auth/login').send(login))
      .then(res => res.body)
    ;

    const res = await agent.post('/api/v1/stars').send({
      thingId: '1',
      userId: user.id
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      thingId: '1',
      userId: user.id,
      createdAt: expect.any(String)
    });
  });

});
