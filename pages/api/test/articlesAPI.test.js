
const express = require('express');
const getAllArticles = require('../articlesAPI/getAllArticles.js');

const request = require('supertest');
// jest.useFakeTimers();

const app = express();
// app.use('/api/articlesAPI/getAllArticles', getAllArticles);

// describe('testing articles api', () => {

//   beforeEach(() => {
//     jest.useFakeTimers();
//   });

  // afterAll(async () => {
  //   await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  // });

  // afterEach(() => {
  //   jest.done();
  // })

  describe("Test the root path", () => {
    test("It should response the GET method", () => {
      return request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  // test('GET /api/articlesAPI/getAllArticles - success', async (done) => {
  //   const { body } = await request(app).get('/api/articlesAPI/getAllArticles');
  //   expect(body).toBeCalledWith(expect.objectContaining({
  //     id: expect.any(Number),
  //     url: expect.any(String),
  //     user_id: expect.any(Number),
  //     title: expect.any(String)
  //   }))

    // expect.extend({

    // })
//   })
// })