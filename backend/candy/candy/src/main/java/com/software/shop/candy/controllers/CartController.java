package com.software.shop.candy.controllers;

import com.software.shop.candy.models.Cart;
import com.software.shop.candy.services.CartService;
import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/addProduct")
    public ResponseEntity<String> addProductToCart(@RequestParam Integer cartId, @RequestParam Integer productId, @RequestParam Integer quantity) {
        try {
            cartService.addProductToCart(cartId, productId, quantity);
            return ResponseEntity.ok("Product added successfully to cart");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/removeProduct")
    public ResponseEntity<String> removeProductFromCart(@RequestParam Integer cartId, @RequestParam Integer productId) {
        try {
            cartService.removeProductFromCart(cartId, productId);
            return ResponseEntity.ok("Product removed successfully from cart");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
