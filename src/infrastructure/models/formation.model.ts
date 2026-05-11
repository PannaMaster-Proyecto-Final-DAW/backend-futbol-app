import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

// Goalkeeper
const GK_POSITIONS = ['GK'] as const;
// Defenders
const DEFENDER_POSITIONS = ['LB', 'RB', 'CB'] as const;
// Midfielders
const MIDFIELDER_POSITIONS = ['LM', 'RM', 'CM', 'CDM', 'CAM'] as const;
// Forwards
const FORWARD_POSITIONS = ['LW', 'RW', 'CF', 'ST'] as const;

@Table({
  tableName: 'formations',
  timestamps: true,
})
export class FormationModel extends Model {
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

  // Goalkeeper — safely uses ENUM ('GK') as it's a single value
  @Column({
    type: DataType.ENUM(...GK_POSITIONS),
    allowNull: false,
    defaultValue: 'GK',
  })
  declare goalkeeper: string;

  // Use ARRAY(STRING) instead of ARRAY(ENUM) for migration compatibility
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare defenders: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare midfielders: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare forwards: string[];
}

export default FormationModel;
