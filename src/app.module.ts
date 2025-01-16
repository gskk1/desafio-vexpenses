import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanoController } from './plano/plano.controller';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';
import { PlanoService } from './plano/plano.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plano } from './plano/plano.model';
import { Produto } from './produto/produto.model';
import { ProdutosPlano } from './produtos-plano/produtos-plano.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './db.sqlite',
      models: [Plano, Produto, ProdutosPlano],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Plano, Produto, ProdutosPlano]),
  ],
  controllers: [AppController, PlanoController, ProdutoController],
  providers: [AppService, ProdutoService, PlanoService],
})

export class AppModule {}
