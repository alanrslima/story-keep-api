// import 'reflect-metadata'
// import { env, mysqlDataSource, mysqlDatabase } from "nvg-node-common";

// mysqlDataSource
//   .connect()
//   .then(async () => {
//     mysqlDatabase
//       .connect()
//       .then(async () => {
//         const app = (await import("./config/app")).default;
//         app.listen(env.port, () => {
//           console.log(`Server running at http://localhost:${env.port}`);
//         });
//       })
//       .catch(console.error);
//   })
//   .catch(console.error);

import { env, MysqlDataSource } from "../module/common";

MysqlDataSource.getInstance()
  .initialize()
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.PORT, () => {
      console.log(`Server running at http://localhost:${env.PORT}`);
    });
  })
  .catch(console.error);
