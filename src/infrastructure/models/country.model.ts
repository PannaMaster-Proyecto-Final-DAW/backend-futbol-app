import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { LeagueModel } from './league.model.js';

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
  })
  declare name: string;

  @HasMany(() => LeagueModel)
  declare leagues: LeagueModel[];
}

export default CountryModel;
