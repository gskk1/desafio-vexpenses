import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plano } from './plano.model';
import { Produto } from 'src/produto/produto.model';
import { ProdutosPlano } from 'src/produtos-plano/produtos-plano.model';
import { HistoricoService } from 'src/historico/historico.service';
import { Operation } from 'src/historico/operation.enum';
import { Historico } from 'src/historico/historico.model';

@Injectable()
export class PlanoService {
  constructor(
    @InjectModel(Plano) private planoModel: typeof Plano,
    @InjectModel(ProdutosPlano) private ProdutosPlanoModel: typeof ProdutosPlano,
    private historicoService: HistoricoService,
  ) {}

  async createPlano(nome: string, produtos: Produto[]): Promise<Plano> {
    const plano = await this.planoModel.create({ nome });
    for (const produto of produtos) {
      await this.ProdutosPlanoModel.create({
        idPlano: plano.id,
        idProduto: produto.id,
      });

      await this.historicoService.createHistorico(
        plano.id,
        produto.id,
        Operation.ADD
      );
    }

    return plano;
  }

  async getPlanos(): Promise<Plano[]> {
    return this.planoModel.findAll();
  }

  async getPlanoById(id: number): Promise<Plano> {
    return this.planoModel.findOne({
      where: { id },
      include: [
        {
          model: Produto,
          through: { attributes: [] },
        },
        {
          model: Historico
        },
      ],
    });
  }

  async addProduto(idPlano: number, idsProduto: number[]): Promise<Plano> {
    const plano = await this.planoModel.findByPk(idPlano);
    if (!plano) {
      throw new NotFoundException('Plano não encontrado');
    }
    for (const id of idsProduto) {
      await this.ProdutosPlanoModel.findOrCreate({
        where: {
          idPlano: idPlano,
          idProduto: id,
        },
      });

      await this.historicoService.createHistorico(
        plano.id,
        id,
        Operation.ADD
      );
    }

    return plano;
  }

  async deletePlanosById(id: number): Promise<void> {
    const res = await this.planoModel.destroy({ where: { id } });
  }

  async removeProduto(idPlano: number, idProduto: number): Promise<void> {
    const plano = await this.planoModel.findByPk(idPlano);
    if (!plano) {
      throw new NotFoundException('Plano não encontrado');
    }

    const produto = await this.ProdutosPlanoModel.findByPk(idProduto);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    const resultado = await this.ProdutosPlanoModel.destroy({
      where: {
        idPlano: idPlano,
        idProduto: idProduto,
      },
    });

    if (resultado === 0) {
      throw new NotFoundException('Associação entre o plano e o produto não encontrada');
    }
    await this.historicoService.createHistorico(
      plano.id,
      produto.id,
      Operation.REMOVE
    );
  }
}
