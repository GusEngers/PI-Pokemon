//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
require('dotenv').config();
const { conn } = require('./src/db.js');

conn
  .authenticate()
  .then(() => {
    console.log('Database conected!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

process.env.NODE_ENV === 'dev' ?
  conn.sync({ force: true }).then(() => {
    server.listen(process.env.PORT, () => {
      console.log(process.env.NODE_ENV, 'mode')
      console.log(`%s listening at ${process.env.PORT}`);
    });
  }) :
  conn.sync().then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`%s listening at ${process.env.PORT}`);
    });
  })
