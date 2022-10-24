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
    await db.collection('Buyers').deleteMany({ first_name: 'Tester' });
    await db.collection('Agents').deleteMany({ First_Name: 'Tester' });
    await db.collection('Closed_Deals').deleteMany({ Home_ID: "test_id" });
    await db.collection('Homes').deleteMany({ Home_ID: "test_id" });
    await connection.close();
});

describe('Test Handlers', () => {
    test('Responds to post /buyers', async () => {
        
        const res = await request.post('/buyers').send({
            first_name: "Tester",
            last_name: "Button",
            email: "emilybutton@gmail.com",
            phone: "1234567899",
            birthday: "02/02/1989",
            age: "34"
        });
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8');
        expect(res.statusCode).toEqual(201);
    });

    test('Responds to post /agents', async () => {
        const res = await request.post('/agents').send({
            Agent_ID: "test_id",
            First_Name: "Tester",
            Last_Name: "Jackson",
            Email: "joseph@fakemail.com",
            Phone: "555-555-4444",
            Date_Hired: "2019-03-07",
            Position: "Agent"
        });
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8');
        expect(res.statusCode).toEqual(201);
    });

    test('Responds to post /closed_deals', async () => {
        const res = await request.post('/closed_deals').send({
            Home_ID: "test_id",
            Buyer_ID: "test_id",
            Address: "any",
            Sold_Price: "any",
            Date_Closed: "any"
        });
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8');
        expect(res.statusCode).toEqual(201);
    });

    test('Responds to post /homes', async () => {
        const res = await request.post('/homes').send({
            Home_ID: "test_id",
            Address: "test",
            Price: "test",
            Agent: "test",
            Date_Posted: "test"
        });
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8');
        expect(res.statusCode).toEqual(201);
    });
});