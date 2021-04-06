import {Table, Column, Model, DataType} from "sequelize-typescript";
import {db} from "../db";

@Table({
  modelName: "test",
})
export class Test extends Model<TTestModel, TTestModel> {
  @Column({
    type: DataType.STRING,
  })
  name?: string
}

db.addModels([Test]);

type TTestModel = {
  name: string
}

export class TestContainer extends Test {
  getSomeData() {
    return this.get({plain: true});
  }
}

TestContainer.create({name: "test"}).then(inst => {
  inst.getSomeData();
});


