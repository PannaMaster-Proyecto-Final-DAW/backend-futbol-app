import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { UserLeagueModel } from './user-league.model.js';

@Table({
  tableName: 'user_league_memberships',
  timestamps: true,
})
export class UserLeagueMembershipModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => UserModel)
  declare user: UserModel;

  @ForeignKey(() => UserLeagueModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userLeagueId: string;

  @BelongsTo(() => UserLeagueModel)
  declare league: any;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare score: number;
}

export default UserLeagueMembershipModel;
