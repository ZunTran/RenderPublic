import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from 'typeorm';
import { Product } from "./entities/product.entity";
import { ProductVariant } from "./entities/productVariant.entity";
import { ProductImage } from "./entities/productImage.entity";
import { Review } from "./entities/review.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
        // @InjectRepository(ProductVariant) private productVariantRepo: Repository<ProductVariant>,
        // @InjectRepository(Review) private reviewRepo: Repository<Review>,
    )
    {}

    
    //Do Category này mình đã quy ước để admin tạo nên create thẳng luôn khỏi iduser
    async createCategory(categoryData: Partial<Category>) { 
        const newCategory = this.categoryRepo.create(categoryData);
        return this.categoryRepo.save(newCategory);
    }
    

    async findAllProducts() {
        return this.productRepo.find({ relations: ['category', 'variants', 'images'] });
    }

    async findAllCategories(category:string) {
        return this.categoryRepo.find();
    }

    //Bổ sung mấy cái hàm dưới đây.... nhớ validate đầu vô nếu có
    //Làm mấy cái hàm tìm theo cate, theo tên ,.... ưu tiên xài find findOne,   
    // hàm nào phức tạp/ Many to Many thì xài Query Builder nha
    

}