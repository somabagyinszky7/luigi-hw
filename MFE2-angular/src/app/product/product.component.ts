import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductCollection } from "../../assets/products";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: any;
  paramsSubscription: any;
  productId: any;
  products: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.products = ProductCollection;
      this.product = this.products.filter((p: any) => p.id === this.productId)[0];
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
}
}
