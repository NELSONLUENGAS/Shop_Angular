import { connect } from "mongoose";
import { loadDataBase } from './Services/loadDataBase';
import { loadCountries } from './Services/loadCountries';

connect('mongodb+srv://nelsonluengas:Hola12345@cluster0.e3vxs.mongodb.net/ecommerce_udemy')
    .then((db) => {
        console.log('Db is redy...', db.connection.name);
        loadDataBase();
        loadCountries();
    })
    .catch((error) => {
        console.log(error);
    });