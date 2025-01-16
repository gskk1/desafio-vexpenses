import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { Plano } from './plano.model';
import { Produto } from 'src/produto/produto.model';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Get('')
  async getPlanos():Promise<Plano[]> {
  return this.planoService.getPlanos();
  }

  @Get(':id')
  async getPlanosById(@Param('id') id: number):Promise<Plano> {
    return this.planoService.getPlanoById(id);
  }

  @Post()
  async createPlano(@Body() body: { name: string, listaProdutos: Produto[]}): Promise<Plano> {
    return this.planoService.createPlano(body.name, body.listaProdutos);
  }

  @Post(':id/produtos')
  async addProdutos(@Param('id') idPlano: number, @Body() body: { idsProduto: number[] }): Promise<Plano> {
    return this.planoService.addProduto(idPlano, body.idsProduto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<{ message: string }> {
    await this.planoService.deletePlanosById(id);
    return { message: 'Plano deletado' };
  }

  @Delete(':id/produtos/:idProduto')
  async removeProdutoDoPlano(@Param('id') idPlano: number, @Param('idProduto') idProduto: number ): Promise<void> {
    return this.planoService.removeProduto(idPlano, idProduto);
  }
}

