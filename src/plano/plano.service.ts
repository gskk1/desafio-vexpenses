import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plano } from './plano.model';
import { Produto } from 'src/produto/produto.model';
import { ProdutosPlano } from 'src/produtos-plano/produtos-plano.model';

@Injectable()
export class PlanoService {
    constructor(@InjectModel (Plano) private planoModel: typeof Plano,
                @InjectModel (ProdutosPlano) private ProdutosPlanoModel: typeof ProdutosPlano,
                @InjectModel (Produto) private ProdutoModel: typeof Produto,) {}

    async createPlano(name: string, listaProdutos: Produto[]): Promise<Plano> {
        listaProdutos.forEach(produto => {

            this.ProdutosPlanoModel.create({produto})
        });

        return this.planoModel.create({ name });
      }

    async getPlanos(): Promise<Plano[]> {
        return this.planoModel.findAll();
      }

    async getPlanosById(id: number): Promise<Plano> {
       
        return this.planoModel.findByPk(id);
      }

    async addProduto(planoId: number, produtoId): Promise<Plano> {

        return this.planoModel.findByPk(planoId);
      }

    async deletePlanosById(id: number): Promise<void> {
        const res = await this.planoModel.destroy({ where: {id}});
      }
}
