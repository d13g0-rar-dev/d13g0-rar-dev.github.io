package com.software.shop.candy;

import org.springframework.boot.SpringApplication;

public class TestCandyApplication {

	public static void main(String[] args) {
		SpringApplication.from(CandyApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
