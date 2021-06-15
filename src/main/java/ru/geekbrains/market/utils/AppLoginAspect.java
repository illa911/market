package ru.geekbrains.market.utils;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
public class AppLoginAspect {

    public long orderTime;
    public long productTime;
    public long userTime;

//    Вариант с общей мапой пока не доделал

//    public static Map<String, Long> service = new  HashMap<>();


//    @Around("execution(* ru.geekbrains.market.services.*.*(..))")
//    public Object methodProfilingService1(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
//        Long begin = System.currentTimeMillis();
//        Object out = proceedingJoinPoint.proceed();
//        Long end = System.currentTimeMillis();
//        Long duration = end - begin;
//        String serviceName = proceedingJoinPoint.getSignature().getDeclaringType().getSimpleName();
//        serviceTime(serviceName, duration);
//        return out;
//    }



    @Around("execution(* ru.geekbrains.market.services.OrderService.*(..))")
    public Object methodProfilingOrder(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long begin = System.currentTimeMillis();
        Object out = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();
        long duration = end - begin;
        System.out.println((MethodSignature) proceedingJoinPoint.getSignature() + " duration: " + (orderTime + duration));
        return out;
    }

    @Around("execution(* ru.geekbrains.market.services.ProductService.*(..))")
    public Object methodProfilingProduct(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long begin = System.currentTimeMillis();
        Object out = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();
        long duration = end - begin;
        System.out.println((MethodSignature) proceedingJoinPoint.getSignature() + " duration: " + (productTime + duration));
        return out;
    }

    @Around("execution(* ru.geekbrains.market.services.UserService.*(..))")
    public Object methodProfilingUser(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long begin = System.currentTimeMillis();
        Object out = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();
        long duration = end - begin;
        System.out.println((MethodSignature) proceedingJoinPoint.getSignature() + " duration: " + (userTime + duration));
        return out;
    }

//    private void serviceTime (String serviceName, Long duration) {
//        Long currentDur = service.get(serviceName) + duration;
//        service.put(serviceName, currentDur);
//        System.out.println(service);
//    }

}
