import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Plano } from 'src/plano/plano.model';
import { Produto } from 'src/produto/produto.model';
import { Operation } from './operation.enum';

@Table
export class Historico extends Model {
  @PrimaryKey 
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(()=>Produto)
  @Column
  idProduto: number;

  @ForeignKey(()=>Plano)
  @Column({
    onDelete: 'CASCADE'
  })
  idPlano: number;

  @Column
  operation: Operation;

  @BelongsTo(() => Plano)
  plano: Plano;

  @BelongsTo(() => Produto)
  produto: Produto;
}
