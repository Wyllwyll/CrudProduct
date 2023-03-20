import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productsService.createProduct(createProductDto);
    return {
      message: "nouveau produit ajouté",
      data: newProduct
    }
  }


  @Get()
  async findAll() {
    const data = await this.productsService.findProducts();
    if (data.length != 0) {
      return {
        message: "liste des produits en stock",
        data: data
      }
    }
    return {
      message: "pas de produits actuellement en stock",
      data: data
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.productsService.findOneProduct(+id);
    if (!data) {
      throw new NotFoundException("l'ID ne correspond à aucun produit")
    };
    return {
      message: "produits:",
      data: data
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    const data = await this.productsService.findOneProduct(+id);
    if (!data) {
      throw new NotFoundException("l'ID ne correspond à aucun produit en stock")
    }
    const result = await this.productsService.updateProduct(data.id, updateProductDto);
    return {
      message: "produit modifié avec succés",
      data: result
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.productsService.findOneProduct(+id)
    if (!data) {
      throw new NotFoundException("L'ID ne correspond à aucun produit en stock")
    }
    const remove = await this.productsService.removeProduct(id)
    return {
      message: "le produit à bien été supprimé",
      data: remove
    }
  }
}
