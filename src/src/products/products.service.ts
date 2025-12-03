import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: '1', name: 'Product 1', price: 1000, description: 'Description 1' },
    { id: '2', name: 'Product 2', price: 2000, description: 'Description 2' },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: String(this.products.length + 1),
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description || '',
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateProductDto: Partial<CreateProductDto>) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return null;
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

  remove(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return null;
    }
    return this.products.splice(productIndex, 1)[0];
  }
}
