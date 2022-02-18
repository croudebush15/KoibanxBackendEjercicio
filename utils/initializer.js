const User = require('../models/user')
const Store = require('../models/store')
const fs = require('fs');
const logger = require('../utils/logger')

exports.init = async function () {
    if (!await User.countDocuments({"username": "test@koibanx.com"})) {
        createTestUser();
    }    

    if (!await Store.estimatedDocumentCount()) {
        //Seeder function
        createTestStores();
    }
   
}

async function createTestUser(){
    let user = new User();
    user.username = "test@koibanx.com";
    user.password = "test123";
    await User.create(user);
    logger.info("Test User created");
}

async function createTestStores(){
    const Stores = JSON.parse(
        fs.readFileSync('./utils/stores.json')
    );
    await Store.create(Stores);
    logger.info("Store data seeded.");
}
