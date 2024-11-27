package com.software.shop.candy.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.software.shop.candy.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
