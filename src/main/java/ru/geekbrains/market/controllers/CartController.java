package ru.geekbrains.market.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.geekbrains.market.dtos.CartDto;
import ru.geekbrains.market.utils.Cart;



@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final Cart cart;

    @GetMapping("/add/{productId}")
    public void addToCart(@PathVariable(name = "productId") Long id) {
        cart.addToCart(id);
    }

    @GetMapping("/decToCartProduct/{productId}")
    public void decToCartProduct(@PathVariable(name = "productId") Long id) {
        cart.decToCartProduct(id);
    }

//    @GetMapping("/deliveryInfo/")
//    public void deliveryInfo(@PathVariable(name = "phone") int phone, @PathVariable(name = "address") String address) {
//        cart.deliveryInfo(phone,address);
//    }

    @GetMapping("/clear")
    public void clearCart() {
        cart.clear();
    }

    @GetMapping
    public CartDto getCart() {
        return new CartDto(cart);
    }
}
