import { connect } from "mongoose";
import { loadDataBase } from './Services/loadDataBase';
import { loadCountries } from './Services/loadCountries';

const { DATABASE_CONNECTION } = process.env;
connect(DATABASE_CONNECTION as string)
    .then((db) => {
        loadDataBase();
        loadCountries();
        console.log('Db is redy...', db.connection.name);
    })
    .catch((error) => {
        console.log(error);
    });