import { AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Historico } from 'src/historico/historico.model';
import { Produto } from 'src/produto/produto.model';
import { ProdutosPlano } from 'src/produtos-plano/produtos-plano.model';

@Table
export class Plano extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nome: string;

  @BelongsToMany(() => Produto, () => ProdutosPlano)
  produtos: Produto[];

  @HasMany(() => Historico)
  historico: Historico[]
}
