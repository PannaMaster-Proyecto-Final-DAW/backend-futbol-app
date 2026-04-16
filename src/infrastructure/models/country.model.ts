import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

@Table({
  tableName: 'countries',
  timestamps: true,
})
export class CountryModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'pictureUrl',
  })
  declare pictureUrl: string;

  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2, 3]],
    },
  })
  declare tierMale: number;

  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2, 3]],
    },
  })
  declare tierFemale: number;
}

export default CountryModel;