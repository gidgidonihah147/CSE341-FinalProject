const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let connection;
let db;

beforeAll(async () => {

    connection = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    db = await connection.db();
});

afterAll(async() => {
    await connection.close()
});


describe('Test Handlers', () => {
    test('responds to /buyers', async () => {
        const res = await request.get('/buyers');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /agents', async () => {
        const res = await request.get('/agents');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /closed_deals', async () => {
        const res = await request.get('/closed_deals');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /homes', async () => {
        const res = await request.get('/homes');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });
})