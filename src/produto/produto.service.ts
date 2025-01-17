import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from './produto.model';

@Injectable()
export class ProdutoService {
  constructor(@InjectModel(Produto) private produtoModel: typeof Produto) {}

  async createProduto(name: string, description: string): Promise<Produto> {
    if (name == '') {
      throw new NotFoundException('Nome do produto nao pode ser nulo');
    }
    return this.produtoModel.create({ name, description });
  }

  async getProdutos(): Promise<Produto[]> {
    return this.produtoModel.findAll();
  }

  async getProdutosById(id: number): Promise<Produto> {
    return this.produtoModel.findByPk(id);
  }

  async deleteProdutosById(id: number): Promise<void> {
    const res = await this.produtoModel.destroy({ where: { id } });
  }
}
