import { Sequelize } from "sequelize";
const sequelize = new Sequelize("ts_backend_project", "root", "root", {
  host: "db",
  dialect: "mysql",
  logging: false,
});
export { sequelize };
