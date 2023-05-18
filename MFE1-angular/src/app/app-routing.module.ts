import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  { path: 'product/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
