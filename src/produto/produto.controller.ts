import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.model';

@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get('')
    async getPlanos():Promise<Produto[]> {
    return this.produtoService.getProdutos();
    }

    @Get(':id')
    async getPlanosById(@Param('id') id: number):Promise<Produto> {
    return this.produtoService.getProdutosById(id);
    }

    @Post()
    async create(@Body() body: { name: string, description: string}): Promise<Produto> {
        return this.produtoService.createProduto(body.name, body.description);
    }
    
    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<{ message: string }> {
        await this.produtoService.deleteProdutosById(id);
    return { message: 'User deleted successfully' };
    }
    
}
