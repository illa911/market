package ru.geekbrains.market.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ru.geekbrains.market.models.*;
import ru.geekbrains.market.repositories.OrderRepository;
import ru.geekbrains.market.utils.Cart;

import java.util.List;

@Service
@RequiredArgsConstructor
@Component
public class OrderService {
    private final OrderRepository orderRepository;
    private final Cart cart;

    public List<Order> findAllByUser(User user) {
        return orderRepository.findAllByUser(user);
    }

    public Order createOrderForCurrentUser(User user) {
        Order order = new Order();
        order.setUser(user);
        order.setPrice(cart.getSum());
        order.setItems(cart.getItems());
//        order.setPhone(deliveryOrder.getPhone());
//        order.setAddress(deliveryOrder.getAddress());
        for (OrderItem oi : cart.getItems()) {
            oi.setOrder(order);
        }
        order = orderRepository.save(order);
        cart.clear();
        return order;
    }
}
