import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Plano } from 'src/plano/plano.model';
import { Produto } from 'src/produto/produto.model';

@Table
export class ProdutosPlano extends Model {
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
}
