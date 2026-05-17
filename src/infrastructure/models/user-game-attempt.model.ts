import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, Index } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { AttemptStatus } from '../../domain/entities/user-game-attempt.entity.js';

@Table({
  tableName: 'user_game_attempts',
  timestamps: true,
})
export class UserGameAttemptModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => UserModel)
  @Index({
    name: 'user_game_attempt_unique_idx',
    unique: true,
  })
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Index({
    name: 'user_game_attempt_unique_idx',
    unique: true,
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: string;

  @Index({
    name: 'user_game_attempt_unique_idx',
    unique: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare gameId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare modeId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare score: number;

  @Column({
    type: DataType.ENUM(...Object.values(AttemptStatus)),
    allowNull: false,
    defaultValue: AttemptStatus.PENDING,
  })
  declare status: AttemptStatus;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  declare history: any;
}

export default UserGameAttemptModel;
