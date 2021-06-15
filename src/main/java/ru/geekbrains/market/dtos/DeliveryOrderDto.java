package ru.geekbrains.market.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class DeliveryOrderDto {
    private Long id;
    private int phone;
    private String address;
}