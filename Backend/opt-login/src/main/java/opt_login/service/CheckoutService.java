package opt_login.service;

import opt_login.entity.Checkout;
import opt_login.repository.CheckoutRepository;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {

    private final CheckoutRepository checkoutRepository;

    public CheckoutService(CheckoutRepository checkoutRepository) {
        this.checkoutRepository = checkoutRepository;
    }

    public Checkout saveCheckout(Checkout checkout) {
        return checkoutRepository.save(checkout);
    }
}