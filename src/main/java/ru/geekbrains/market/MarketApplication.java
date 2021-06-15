package ru.geekbrains.market;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.PropertySource;
import ru.geekbrains.market.configs.AopConfig;

@SpringBootApplication
@PropertySource("classpath:app.properties")
public class MarketApplication {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AopConfig.class);
		SpringApplication.run(MarketApplication.class, args);
		context.close();
	}

}
