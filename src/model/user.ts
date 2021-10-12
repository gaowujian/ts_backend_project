import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";
class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

//如果你希望 Sequelize 根据你的模型定义自动创建表(或根据需要进行修改),你可以使用sync方法,
// 注意:如果表已经存在,使用`force:true`将删除该表
sequelize
  .sync({ force: true })
  .then(() =>
    User.create({
      username: "zhangsan",
      password: "123456",
      email: "zhangsan@qq.com",
    })
  )
  .then((result: User) => {
    console.log(result.toJSON());
  });

export { User };
