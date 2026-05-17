import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'daily_challenges',
  timestamps: true,
})
export class DailyChallengeModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: string;

  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare gameId: string;

  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare modeId: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  declare challengeData: any;
}

export default DailyChallengeModel;
