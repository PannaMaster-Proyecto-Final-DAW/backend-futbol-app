import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TeamModel } from './team.model.js';
import { CountryModel } from './country.model.js';

@Table({
  tableName: 'players',
  timestamps: true,
})
export class PlayerModel extends Model {
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
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare position: string[];

  @ForeignKey(() => TeamModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare teamId: string;

  @BelongsTo(() => TeamModel)
  declare team: TeamModel;

  @ForeignKey(() => CountryModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare countryId: string;

  @BelongsTo(() => CountryModel)
  declare country: CountryModel;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare pictureUrl: string;
}

export default PlayerModel;
