const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app.js'); // Sesuaikan dengan lokasi file app.js


describe('API Testing', () => {
    // Pengujian untuk GET semua item
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.at.least(1);
                done();
            });
    });

    // Pengujian untuk POST membuat item baru
    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3');
                done();
            });
    });

    // Latihan 1: Pengujian DELETE item
    it('should delete an item', (done) => {
        request(app)
            .delete('/api/items/1') // Ubah ID item yang sesuai
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Item deleted successfully');
                done();
            });
    });

    // Latihan 2: Pengujian update item
    it('should update an item', (done) => {
        const updatedItem = { name: 'Updated Item' };
        request(app)
            .put('/api/items/2') // Ubah ID item yang sesuai
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('name', 'Updated Item');
                done();
            });
    });
});
