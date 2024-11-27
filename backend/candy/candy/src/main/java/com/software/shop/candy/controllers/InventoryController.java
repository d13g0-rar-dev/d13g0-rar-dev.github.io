package com.software.shop.candy.controllers;

import com.software.shop.candy.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PutMapping("/update")
    public ResponseEntity<String> updateInventory(@RequestParam Integer productId, @RequestParam Integer cartId) {
        try {
            inventoryService.updateInventory(productId, cartId);
            return ResponseEntity.ok("Inventory updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
