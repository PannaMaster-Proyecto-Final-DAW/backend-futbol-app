import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { LeagueModel } from './league.model.js';

@Table({
  tableName: 'teams', // Plural name for the table
  timestamps: true,
})
export class TeamModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => LeagueModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare leagueId: string;

  @BelongsTo(() => LeagueModel)
  declare league: LeagueModel;
}

export default TeamModel;
