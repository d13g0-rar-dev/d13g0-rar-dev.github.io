package com.software.shop.candy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.software.shop.candy.repositories.CustomerRepository;
import com.software.shop.candy.models.Customer;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public void registerCustomer(Customer customer) {
        customerRepository.save(customer);
    }
}
