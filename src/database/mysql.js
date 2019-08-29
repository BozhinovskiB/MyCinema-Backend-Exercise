import mysql from 'mysql';
import mysqlConfigs from '../../config/mysql';
import models from '../migrations/createTables';

const dbConfig = mysqlConfigs['dev'];
const { usersCreateModel, postsCreateModel } = models;
const con = mysql.createConnection(dbConfig);


// "host": "****.*****.us-east-1.rds.amazonaws.com",
// "database": "************",
// "user": "********",
// "password": "********",
// "port": 3306,
// "connectTimeout": 30000,
// "reconnect": true,
// "data_source_provider": "rds",
// "type":"mysql"

con.connect(() => {
  console.log('db connection is on');

});

export default { con };