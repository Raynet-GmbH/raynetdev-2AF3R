import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  show(message: string, options: { classname: string } = { classname: '' }) {
    console.log(`[Toast] ${message}`);
    // Bir üçüncü parti kütüphane ya da Angular Material Snackbar kullanılabilir
  }
}
