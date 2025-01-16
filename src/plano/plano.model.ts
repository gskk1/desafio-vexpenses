import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Plano extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nome: string;
}
