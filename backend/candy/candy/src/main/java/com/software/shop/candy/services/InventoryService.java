package com.software.shop.candy.services;

import com.software.shop.candy.models.Cart;
import com.software.shop.candy.models.Inventory;
import com.software.shop.candy.models.Product;
import com.software.shop.candy.repositories.CartRepository;
import com.software.shop.candy.repositories.InventoryRepository;
import com.software.shop.candy.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private CartRepository cartRepository;

    public void updateInventory(Integer productId, Integer cartId) throws Exception {
        Product product = productRepository.findById(productId).orElse(null);
        Inventory inventory = inventoryRepository.findById(productId).orElse(null);
        Cart cart = cartRepository.findById(cartId).orElse(null);

        if(product == null || inventory == null || cart == null) {
            throw new Exception("Product, inventory or cart not found");
        }

        if (cart.getStatus() == Boolean.TRUE) {
            int quantityTemp = inventory.getQuantityReal() - product.getQuantity();
            if (quantityTemp < 0) {
                throw new Exception("Inventory not available for product "+ product.getName());
            }
        }else {
            inventory.setQuantityReal(inventory.getQuantityTemp());
        }

        inventoryRepository.save(inventory);
    }
}
