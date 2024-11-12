import { PickType } from '@nestjs/swagger';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export class CreateCategoryDto extends PickType(CategoryEntity, [
  'description',
  'category_name',
  'created_at',
]) {}

export class UpdateCategoryDto extends PickType(CategoryEntity, [
  'description',
  'category_name',
  'status',
  'id',
  'created_at',
]) {}
