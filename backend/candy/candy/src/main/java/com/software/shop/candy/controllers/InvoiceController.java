package com.software.shop.candy.controllers;

import com.software.shop.candy.models.Invoice;
import com.software.shop.candy.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoice")
@CrossOrigin("*")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/calculate")
    public ResponseEntity<Double> calculateInvoice(@RequestParam Integer cartId) {
        try {
            double total = invoiceService.calculateInvoiceTotal(cartId);
            return ResponseEntity.ok(total);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
