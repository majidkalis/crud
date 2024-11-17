import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  myForm!: FormGroup;
  editProductId: string | null = null;

  options = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder, private service: ServiceService, private route: ActivatedRoute,  private router : Router) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      descriptions: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.editProductId = this.route.snapshot.paramMap.get('id');
    console.log('idddd', this.editProductId);
    if (this.editProductId) {
      this.service.getProduct(this.editProductId).subscribe((result) => {
        this.myForm.patchValue(result);
      });
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.invalid) {
      return;
    }
    let prod = {
      name: this.myForm.value.name,
      descriptions: this.myForm.value.descriptions,
      category: this.myForm.value.category
    };
    this.myForm.reset();
    this.service.postProduct(prod).subscribe((product: any) => {
      console.log(product);
      window.location.reload()
         });
  }

  updateProduct() {
    if (this.myForm.valid) {
      this.service.editProduct(this.editProductId!, this.myForm.value).subscribe((response) => {
        console.log('Product Updated Successfully', response);
      });
      this.myForm.reset();
      this.editProductId = null;
    } else {
      console.error('product not found');
    }
  }
}
