var mongoose = require('mongoose');
require("dotenv").config();
const server = '127.0.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'school-management';      // REPLACE WITH YOUR DB NAME
mongoose.set('useCreateIndex', true);
class Database {
    constructor() {
        this._connect()
    }

    _connect() {
            const uri = "mongodb+srv://school:school@123@cluster0-1fivm.mongodb.net/school-management?retryWrites=true&w=majority";
            mongoose.connect(uri, { useNewUrlParser: true })
                .then(() => {
                    console.log('Database connection successful');
                })
                .catch(err => {
                    console.log(err)
                    console.error('Database connection error')
                })
        // const MongoClient = require('mongodb').MongoClient;
        // const client = new MongoClient(uri, { useNewUrlParser: true })
        // client.connect().then(() => {
        //     console.log('Database connection successful')
        // }).catch(err => {
        //     console.error('Database connection error')
        // })
    }
}
module.exports = new Database()