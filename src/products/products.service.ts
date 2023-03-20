import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = Product.create({
      name: createProductDto.name,
      price: createProductDto.price,
      quantity: createProductDto.quantity
    });
    const product = await Product.save(newProduct);
    return product
  };



  async findProducts() {
    const products = await Product.find();
    return products
  }



  async findOneProduct(productId: number) {
    const product = await Product.findOneBy({ id: productId });
    return product
  }



  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await Product.findOneBy({ id });
    if (product !== null) {
      if (updateProductDto.name) product.name = updateProductDto.name
      if (updateProductDto.price) product.price = updateProductDto.price
      if (updateProductDto.quantity) product.quantity = updateProductDto.quantity

      return await product.save();
    }
    return null;
  }



  async removeProduct(productId: number): Promise<Product | null> {
    const product = await Product.findOneBy({ id: productId });
    if (product !== null) {
      await product.remove()
    }
    return product
  }
}
