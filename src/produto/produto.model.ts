import { AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Historico } from 'src/historico/historico.model';
import { Plano } from 'src/plano/plano.model';
import { ProdutosPlano } from 'src/produtos-plano/produtos-plano.model';

@Table
export class Produto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => Plano, () => ProdutosPlano)
  planos: Plano[];

  @HasMany(() => Historico)
  historico: Historico[]
}
