package opt_login.controller;

import jakarta.validation.Valid;
import opt_login.entity.Checkout;
import opt_login.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:5173")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping
    public Checkout saveCheckout(@Valid @RequestBody Checkout checkout) {
        return checkoutService.saveCheckout(checkout);
    }
}