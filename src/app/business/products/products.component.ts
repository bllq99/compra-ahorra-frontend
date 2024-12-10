import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Producto } from '../../core/models/producto';
import { Carrito } from '../../core/models/carrito';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent implements OnInit {
  productos: Producto[] = [];
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  listCarrito: Carrito[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  agregarProducto(item: Producto) {
    this.cartService.agregar(item);
    console.log("Producto agregado al carrito");
    console.log(item);
    this.listCarrito = this.cartService.getCarrito();
    console.log(this.listCarrito);
  }

  logout(): void {
    this.authService.logout();
  }

  getTotalProductos(): number {
    return this.listCarrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
  }
}
