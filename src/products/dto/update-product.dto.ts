import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
        @IsNumber()
        @IsPositive()
         id:number;
    
        @IsOptional()
        @IsString()
        public name:string;

        @IsOptional()
        @IsNumber({
            maxDecimalPlaces:4,
        })
        @Min(0)
        @Type(()=> Number)
        public price:number;    
    }

