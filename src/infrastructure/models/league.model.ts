import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
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

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare countryId: string; // Holding the ID instead of the full object, as discussed in refactoring

  @Column({
    type: DataType.ENUM(...Object.values(LeagueCategory)),
    allowNull: false,
  })
  declare category: LeagueCategory;
}

export default LeagueModel;
