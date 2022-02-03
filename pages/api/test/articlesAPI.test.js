jest.useFakeTimers();
const express = require('express');
const getAllArticles = require('../articlesAPI/getAllArticles.js');

const request = require('supertest');
// jest.useFakeTimers();

const app = express();
// app.use('/api/articlesAPI/getAllArticles', getAllArticles);

describe('testing articles api', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  // afterEach(() => {
  //   jest.done();
  // })

  it('GET /api/articlesAPI/getAllArticles - success', async (done) => {
    const { body } = await request(app).get('/api/articlesAPI/getAllArticles').end(done);
    expect(body).toBeCalledWith(expect.objectContaining({
      id: expect.any(Number),
      url: expect.any(String),
      user_id: expect.any(Number),
      title: expect.any(String)
    }))

    // expect.extend({

    // })
  })
})