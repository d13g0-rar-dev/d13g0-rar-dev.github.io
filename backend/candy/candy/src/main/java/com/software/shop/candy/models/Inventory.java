package com.software.shop.candy.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idProduct", nullable = false)
    private Product product;

    private Integer quantityTemp;
    private Integer quantityReal;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantityTemp() {
        return quantityTemp;
    }

    public void setQuantityTemp(Integer quantityTemp) {
        this.quantityTemp = quantityTemp;
    }

    public Integer getQuantityReal() {
        return quantityReal;
    }

    public void setQuantityReal(Integer quantityReal) {
        this.quantityReal = quantityReal;
    }
}
