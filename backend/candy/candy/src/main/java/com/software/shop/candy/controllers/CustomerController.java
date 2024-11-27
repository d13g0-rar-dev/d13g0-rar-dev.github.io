package com.software.shop.candy.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import com.software.shop.candy.services.CustomerService;
import com.software.shop.candy.models.Customer;


@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        try {
            customerService.registerCustomer(customer);
            return new ResponseEntity<>("Customer registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error registering customer", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
