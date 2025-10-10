const tap = require('tap');
const supertest = require('supertest');
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const app = require('../src/app');
const server = supertest(app);

let auctionId, dealerId, carId;
const mockDealer = { name: 'John Dealer', email: `dealer${Date.now()}@test.com`, phone: '1234567890' };
let token = '';

tap.before(async () => {
    await connectDB();

    // Drop all collections before running tests
    const { collections } = mongoose.connection;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// -------------------- ADMIN AUTH TEST CASES --------------------

tap.test('POST /api/v1/admin/register - success', async (t) => {
    const res = await server.post('/api/v1/admin/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'Admin123!'
        });
    t.equal(res.status, 201, 'Admin registered successfully');
    t.end();
});

tap.test('POST /api/v1/admin/login - success', async (t) => {
    const res = await server.post('/api/v1/admin/login')
        .set('Authorization', `Bearer ${token}`)
        .send({
            email: 'admin@test.com',
            password: 'Admin123!'
        });
    t.equal(res.status, 200, 'Login successful');
    t.ok(res.body.token, 'Token returned');
    token = res.body.token;
    t.end();
});


//-------------------- CAR TEST CASES --------------------

tap.test('POST /api/v1/car - create car success', async (t) => {
    const res = await server
        .post('/api/v1/car')
        .set('Authorization', `Bearer ${token}`)
        .send({ make: 'Toyota', model: 'Camry', year: 2023 });
    t.equal(res.status, 201, 'Car created successfully');
    carId = res.body.car._id;
    t.end();
});

tap.test('GET /api/v1/car - fetch all cars', async (t) => {
    const res = await server
        .get('/api/v1/car')
        .set('Authorization', `Bearer ${token}`);
    t.equal(res.status, 200, 'Fetched all cars successfully');
    t.ok(Array.isArray(res.body.cars), 'Cars list is array');
    t.end();
});

// -------------------- AUCTION TEST CASES --------------------

tap.test('POST /api/v1/auction - create auction success', async (t) => {
    const res = await server.post('/api/v1/auction/createAuction')
        .set('Authorization', `Bearer ${token}`)
        .send({ carInfo: carId, basePrice: 50000 });
    t.equal(res.status, 201, 'Auction created successfully');
    t.equal(res.body.message, 'Auction created');
    auctionId = res.body.auction._id;
    t.end();
});


tap.test('Patch /api/v1/auction/status/:auctionId - Update auction status active', async (t) => {
    const res = await server.patch(`/api/v1/auction/status/${auctionId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'active' });
    t.equal(res.status, 200, 'Auction status updated');
    t.equal(res.body.message, 'Auction status updated');
    t.end();
});

// -------------------- DEALER + BID TEST CASES --------------------
tap.test('POST /api/v1/dealers - create dealer', async (t) => {
    const res = await server.post('/api/v1/dealers')
        .set('Authorization', `Bearer ${token}`)
        .send(mockDealer);
    t.equal(res.status, 201, 'Dealer created successfully');
    dealerId = res.body.data?._id || res.body.dealer?._id;
    t.end();
});

tap.test('POST /api/v1/bid/:auctionId/placeBid - fail missing amount', async (t) => {
    const res = await server.post(`/api/v1/bid/${auctionId}/placeBid`)
        .set('Authorization', `Bearer ${token}`)
        .send({ dealerId });
    t.equal(res.status, 400, 'Missing amount and dealerId');
    t.same(res.body, { message: 'amount and dealerId are required' });
    t.end();
});

tap.test('POST /api/v1/bid/:auctionId/placeBid - fail bid lower than base price', async (t) => {
    const res = await server.post(`/api/v1/bid/${auctionId}/placeBid`)
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 100, dealerId });
    t.equal(res.status, 400, 'Bid lower than base price not allowed');
    t.same(res.body, { message: 'Bid amount must be higher than base price' });
    t.end();
});

tap.test('POST /api/v1/bid/:auctionId/placeBid - success place bid', async (t) => {
    const res = await server.post(`/api/v1/bid/${auctionId}/placeBid`)
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 60000, dealerId });
    t.equal(res.status, 201, 'Bid placed successfully');
    t.equal(res.body.message, 'Bid placed');
    bidId = res.body.bid._id;
    t.end();
});

tap.test('GET /api/v1/bid/:auctionId/bids - get all bids', async (t) => {
    const res = await server.get(`/api/v1/bid/${auctionId}/bids`)
        .set('Authorization', `Bearer ${token}`);
    t.equal(res.status, 200, 'Fetched all bids');
    t.ok(Array.isArray(res.body.bids), 'Bids should be array');
    t.end();
});

// -------------------- AUCTION WINNER TEST CASE --------------------

tap.test('PATCH /api/v1/auction/status/:auctionId- end auction and set winner', async (t) => {
    const res = await server.patch(`/api/v1/auction/status/${auctionId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'ended' });
    t.equal(res.status, 200, 'Auction status updated');
    t.equal(res.body.message, 'Auction status updated');
    t.end();
});

tap.test('GET /api/v1/auction/:id/winner - get auction winner', async (t) => {
    const res = await server.get(`/api/v1/auction/${auctionId}/winner`)
        .set('Authorization', `Bearer ${token}`);
    t.equal(res.status, 200, 'Fetched auction winner successfully');
    t.equal(res.body.message, 'Auction winner');
    t.ok(res.body.winner, 'Winner details returned');
    t.end();
});

tap.teardown(async () => {
    await mongoose.disconnect();
});
