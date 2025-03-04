import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { paginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    }); 
  }

  async findAll(paginationDto:paginationDto) {
    const page = Number(paginationDto.page ?? 1);
    const limit = Number(paginationDto.limit ?? 10);

    const totalPages= await this.product.count({where:{avalible:true}});
    const lastPages= Math.ceil(totalPages/limit);

  return {
    data: await this.product.findMany({
      skip: (page -1) *limit,
      take:limit,
      where:{avalible:true}
  
    }),
    meta:{
      total: totalPages,
      page: page,
      lastPages: lastPages,
    }
  };
  
  }

 async findOne(id: number) {
    
    const product= await this.product.findFirst({
      where:{id:id, avalible: true}
    });
    if(!product){
     throw new NotFoundException(`product with id ${id} not found`) 
    }
    return product;
  }

  async update(id:number, updateProductDto: UpdateProductDto) {
    const{id:__, ...data } = updateProductDto;

    await this.findOne(id);
    if (Object.keys(updateProductDto).length === 0) {
      throw new BadRequestException('No hay datos para actualizar');
  }
    return this.product.update({
      where:{id:id},
      data: data,
    });
    
  }

  async remove(id: number) {
    await this.findOne(id)

    const Product= await this.product.update({
      where:{ id},
      data:{
        avalible:false
      }
    })
    return Product;
  }
}
