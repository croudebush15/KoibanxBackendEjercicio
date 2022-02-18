const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Unit testing the /stores route', function() {
    
    username = "test@koibanx.com";
    password = "test123";
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    it('should return error due to missing Auth header', function(){
        return request(app)
        .get('/api/stores')        
        .then(function(response){
            assert.equal(response.status, 401);
        })
    });

     it('should return OK status on GET', function() {        
        return request(app)
            .get('/api/stores')
            .set('Authorization', auth)
            .then(function(response){
                assert.equal(response.status, 200);
            })
    }); 

    it('should return OK status on POST', function(){  
        return request(app)
            .post('/api/stores')
            .send({name: 'Test Store',
                    cuit: '12345677',
                    concepts: ["Test Concept 1", "Test Concept 2", "Test Concept 3"],
                    currentBalance: 100,
                    active: true,
                    lastSale: '2022-02-16'})
            .set('Authorization', auth)            
            .then(function(response){                 
                assert.equal(response.status, 200)
            });
    });    
});