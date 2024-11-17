import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductComponent } from './show-product/show-product.component';

export const routes: Routes = [
    {path : 'addProduct', component : AddProductComponent},
    {path : 'show', component : ShowProductComponent},
    {path : 'addProduct/:id', component : AddProductComponent},
    {path : '**', component : ShowProductComponent}
];
