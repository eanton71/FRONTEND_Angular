import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products: Product[] = [];
  productForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['']
    })
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe(res => this.products = res);
  }


  add(): void {

    const { name, price, description } = this.productForm.getRawValue();

    this.productForm.reset();

    this.productService.addNewProduct(name, price, description).subscribe(result => {

      if (result) {
        this.getProducts();
      }
    })

  }

  deleteProduct(index: number): void {
    this.productService.deleteProduct(this.products[index]._id).subscribe(result => {
      if (result) {
        this.getProducts();
      }
    })
  }
  updateProduct(index: number): void {

    console.log("src/app/product-list/product-list.component.ts, update product ", index)
    const { name, price, description } = this.productForm.getRawValue();
    this.productService.updateProduct(this.products[index]._id, name, price, description).subscribe(result => {
      /*
      implementar mensaje que indique se que actuzalizo la inforamcion
      if (result) {
        this.getProducts();
      }*/
    })
  }

}
