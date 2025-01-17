import { Injectable } from '@nestjs/common';
import { Historico } from './historico.model';
import { InjectModel } from '@nestjs/sequelize';
import { Operation } from './operation.enum';

@Injectable()
export class HistoricoService {
    constructor(@InjectModel(Historico) private historicoModel: typeof Historico) {}

    async createHistorico(idPlano: number, idProduto: number, operation: Operation): Promise<void> {
        this.historicoModel.create({idPlano, idProduto, operation})
    }
}
