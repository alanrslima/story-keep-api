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
  R2_STORAGE_ACCESS_KEY_ID: "ID Chave de acesso para storage Cloudfare R2",
  R2_STORAGE_SECRET_ACCESS_KEY:
    "Chave secreta de acesso para storage Cloudfare R2",
  STRIPE_SECRET_KEY: "Chave secreta Stripe",
  READ_MEDIA_EXPIRES_IN:
    "Tempo em segundos para expiração de leitura de uma midia privada",
  STRIPE_ENDPOINT_SECRET: "Secret para endpoint webhook Stripe",
  GOOGLE_CLIENT_ID: "ID de cliente do Google Auth",
  GOOGLE_CLIENT_SECRET: "Secret ID do Google Auth",
  OPEN_ID_WEB_REDIRECT_URI: "Uri de redirecionamento open id web",
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
