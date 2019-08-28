var mongoose = require('mongoose');
require("dotenv").config();
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'school-management';      // REPLACE WITH YOUR DB NAME
mongoose.set('useCreateIndex', true);
class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        // This is for to work in env
        const uri = `mongodb+srv://${process.env.db_name}:${process.env.db_password}@cluster0-1fivm.mongodb.net/school-management?retryWrites=true&w=majority`;
        mongoose.connect(uri, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.log(err)
                console.error('Database connection error')
            })
        // This is for to work in dev mode
        // mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
        //     .then(() => {
        //         console.log('Database connection successful');
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         console.error('Database connection error')
        //     });
    }
}
module.exports = new Database()