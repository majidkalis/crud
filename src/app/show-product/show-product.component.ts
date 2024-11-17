import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ServiceService } from '../services/service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent implements OnInit {
  products: any[]= [];
  displayedColumns: string[] = ['position', 'name', 'description', 'category', 'actions'];

  constructor(private service: ServiceService, private router : Router, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.showRecord();
  }

  // showRecord() {
  //   this.service.getProduct('productId')
  //     .pipe(
  //       tap(product => console.log('Fetched products:', product)),
  //       catchError(error => {
  //         console.error('Error fetching products:', error);
  //         return throwError(() => new Error('Error fetching products'));
  //       })
  //     )
  //     .subscribe(
  //       products => {
  //         this.products = products;
  //       },
  //       error => {
  //         // Handle the error
  //         console.error('Error:', error.message);
  //       }
  //     );
  // }

  showRecord() {
    this.service.getAllproducts().subscribe((data : any) => {
      this.products = data
    })
  }
  

  onEdit(id: any) {
      console.log(id);
      this.router.navigate([`/addProduct/${id}`]);
  }

  onDelete(id: any) {
    this.service.deleteProduct(id).subscribe((response) => {
      console.log("Product deleted successfully!", response);
    });
    this.showRecord();
  }

  toggleForm() {
    const dialogRef= this.dialog.open(AddProductComponent, {  width: '80%',
     maxWidth: '500px',
 

   })
  //  dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   // Do something after dialog is closed if needed.
  // });
   
  }
  

}
