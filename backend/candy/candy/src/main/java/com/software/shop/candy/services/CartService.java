package com.software.shop.candy.services;

import com.software.shop.candy.models.Cart;
import com.software.shop.candy.models.Product;
import com.software.shop.candy.repositories.CartRepository;
import com.software.shop.candy.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addProductToCart(Integer cartId, Integer productId, int quantity) throws Exception {
        Cart cart = cartRepository.findById(cartId).
                orElseThrow(() -> new Exception("Cart Not Found"));
        Product product = productRepository.findById(productId).
                orElseThrow(() -> new Exception("Product Not Found"));

        if (product.getQuantity() < quantity) {
            throw new Exception("There isn't enough stock for " + product.getName());
        }

        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

    }

    public void removeProductFromCart(Integer cartId, Integer productId) throws Exception {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new Exception("Cart Not Found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Cart No Found"));

        if (cart.getProducts().contains(product)) {
            cart.getProducts().remove(product);
            cartRepository.save(cart);
        } else {
            throw new Exception("Product Not Found in Cart.");
        }
    }
}
