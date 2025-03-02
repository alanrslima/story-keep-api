// import { CryptoAdapter } from "../../../infra/cryptography/crypto-adapter";
// import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";
// import { PermissionMysqlRepository } from "../../../infra/repositories/mysql/permission-mysql-repository";
// import { env, Middleware } from "../../../../common";

// export const authMiddlewareFactory = (): Middleware => {
//   const cryptoAdapter = new CryptoAdapter(env.jwtSecret);
//   const permissionMysqlRepository = new PermissionMysqlRepository();
//   return new AuthMiddleware(
//     cryptoAdapter,

//     permissionMysqlRepository
//   );
// };
