const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;
let database;

async function getDatabase(){
    const client = await mongoClient.connect('mongodb://localhost');
    database = client.db('library');

    if(!database){
        console.log('Database not connected!');
    }

    return database;

}

module.exports = {
    getDatabase,
    ObjectID

};