import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'productos',
})
class Producto extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;  // No es necesario declarar como campo público separado.

  @Column({
    type: DataType.FLOAT()
  })
  declare price: number;  // Lo mismo aquí.

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare disponibilidad: boolean;  // Aquí también.
}

export default Producto;
