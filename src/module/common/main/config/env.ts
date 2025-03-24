import * as dotenv from "dotenv";
dotenv.config();

const envVariables = {
  NODE_ENV:
    "Ambiente da aplicação. Valores suportados = development | staging | production",
  PORT: "Porta que a api irá utilizar",
  MYSQL_HOST: "Host do banco de dados Mysql",
  MYSQL_USER: "Usuário do banco de dados Mysql",
  MYSQL_PASSWORD: "Senha do banco de dados Mysql",
  MYSQL_DATABASE: "Nome do database do banco de dados Mysql",
  MYSQL_PORT: "Porta do banco de dados Mysql",
  JWT_SECRET: "Chave privada para os tokens JWT",
  GOOGLE_AUTH_CLIENT_ID: "Client ID oara google auth",
  GOOGLE_AUTH_CLIENT_SECRET: "Client secret oara google auth",
  R2_STORAGE_ACCESS_KEY_ID: "ID Chave de acesso para storage Cloudfare R2",
  R2_STORAGE_SECRET_ACCESS_KEY:
    "Chave secreta de acesso para storage Cloudfare R2",
};

const envsMapper: { [key in keyof typeof envVariables]: string } = {} as {
  [key in keyof typeof envVariables]: string;
};

Object.keys(envVariables).map((key) => {
  if (!process.env[key]?.length) {
    throw new Error(`Expected env variable "${key}" not founded`);
  }
  envsMapper[key as keyof typeof envVariables] = process.env[key]!;
});

export const env = Object.freeze(envsMapper);
