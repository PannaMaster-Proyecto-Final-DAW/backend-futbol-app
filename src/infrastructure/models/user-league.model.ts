import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { UserLeagueMembershipModel } from './user-league-membership.model.js';

@Table({
  tableName: 'user_leagues',
  timestamps: true,
})
export class UserLeagueModel extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  declare inviteCode: string;

  @HasMany(() => UserLeagueMembershipModel)
  declare members: UserLeagueMembershipModel[];
}

export default UserLeagueModel;
