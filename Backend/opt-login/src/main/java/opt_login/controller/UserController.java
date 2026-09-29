package opt_login.controller;

import jakarta.validation.Valid;
import opt_login.dto.OtpResponse;
import opt_login.dto.RegisterRequest;
import opt_login.dto.UserResponse;
import opt_login.entity.User;
import opt_login.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody RegisterRequest request) {

        return userService.registerUser(
                request.getEmail(),
                request.getFirstName(),
                request.getLastName()
        );
    }

    @GetMapping("/recognize")
    public UserResponse recognizeUser(@RequestParam String email) {

        User user = userService.findUserByEmail(email);

        if (user == null) {
            return null;
        }

        return new UserResponse(
                user.getId1(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }

    @PostMapping("/verify-otp")
    public OtpResponse verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        return userService.verifyOtp(email, otp);
    }
}