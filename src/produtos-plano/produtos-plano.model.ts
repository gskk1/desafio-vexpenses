import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class ProdutosPlano extends Model {
  @PrimaryKey 
  @AutoIncrement
  @Column
  id: number;

  @Column
  idProduto: number;

  @Column
  idPlano: number;

  @Column
  status: number;
}
