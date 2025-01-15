import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanoController } from './plano/plano.controller';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';
import { PlanoService } from './plano/plano.service';

@Module({
  imports: [],
  controllers: [AppController, PlanoController, ProdutoController],
  providers: [AppService, ProdutoService, PlanoService],
})

export class AppModule {}
