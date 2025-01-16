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
    return this.planoService.getPlanosById(id);
    }

    @Post()
    async createPlano(@Body() body: { name: string, listaProdutos: Produto[]}): Promise<Plano> {
      return this.planoService.createPlano(body.name, body.listaProdutos);
    }

    @Post(':plano_id/:produto')
    async addProduto(@Param('plano_id') planoId: number, @Body() body:{ productId: number}): Promise<Plano> {
      return this.planoService.addProduto(planoId, body.productId);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<{ message: string }> {
    await this.planoService.deletePlanosById(id);
    return { message: 'User deleted successfully' };
    }


}
