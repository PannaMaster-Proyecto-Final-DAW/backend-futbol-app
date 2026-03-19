import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CountryModel } from './country.model.js';
import { LeagueCategory } from '../../domain/entities/league.entity.js';

@Table({
  tableName: 'leagues', // Plural name for the table
  timestamps: true,
})
export class LeagueModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => CountryModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare countryId: string;

  @BelongsTo(() => CountryModel)
  declare country: CountryModel;

  @Column({
    type: DataType.ENUM(...Object.values(LeagueCategory)),
    allowNull: false,
  })
  declare category: LeagueCategory;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare pictureUrl: string;
}

export default LeagueModel;
