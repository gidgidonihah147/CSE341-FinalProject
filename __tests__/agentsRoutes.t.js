//import request from 'supertest';
//import express from 'express';
//import router from '../routes/agents';

//const app = require("../server");
//const mongoose = require("mongoose");
const request = require("supertest");
const express = require('express');
const router = require('../routes/agents')

const app = new express();
app.use('/', router);

describe('Good Home Routes', function () {

    test('responds to /', async () => {
        const res = await request(app).get('/');
        expect(res.header['content-type']).toBe('application/json');
        expect(res.statusCode).toBe(200);
    });

    test('responds to /{ID}', async () => {
        const res = await request(app).get('/634a24adb946b5a572a8c09e');
        expect(res.header['content-type']).toBe('application/json');
        expect(res.statusCode).toBe(200);
    });

});