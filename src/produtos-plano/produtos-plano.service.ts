import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProdutosPlano } from './produtos-plano.model';

@Injectable()
export class ProdutoService {
    constructor(@InjectModel (ProdutosPlano) private produtosPlanoModel: typeof ProdutosPlano,) {}

    async createProdutoPlano(idPlano: number, idProduto: number, status): Promise<ProdutosPlano> {
        return this.produtosPlanoModel.create({ idPlano, idProduto, status });
    }

    async changeStatus(idPlano, status) : void {
        return this.produtosPlanoModel.update(
            {status: status},
            {where: {idPlano:idPlano}}
        )
    }
}

