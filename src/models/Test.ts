import {Table, Column, Model, DataType} from "sequelize-typescript";

@Table
export abstract class Test extends Model<TTestModel, TTestModel> {
  @Column({
    type: DataType.STRING,
  })
  name?: string
}

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


