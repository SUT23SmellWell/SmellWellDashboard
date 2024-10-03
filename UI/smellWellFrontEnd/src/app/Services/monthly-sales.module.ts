import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlySalesComponent } from './monthly-sales.component';

@NgModule({
  declarations: [MonthlySalesComponent],
  imports: [CommonModule],
  exports: [MonthlySalesComponent]
})
export class MonthlySalesModule { }