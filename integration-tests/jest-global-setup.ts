export default async () => {
  process.env.MYSQL_HOST = "127.0.0.1";
  process.env.MYSQL_USER = "user";
  process.env.MYSQL_PASSWORD = "password";
  process.env.MYSQL_DATABASE = "story_keep";
  process.env.MYSQL_PORT = "3307";
};
