import { Sequelize } from "sequelize";
const sequelize = new Sequelize("ts_backend_project", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
export { sequelize };
