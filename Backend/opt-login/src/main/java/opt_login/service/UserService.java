package opt_login.service;

import opt_login.dto.OtpResponse;
import opt_login.entity.User;
import opt_login.exception.DuplicateEmailException;
import opt_login.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String email, String firstName, String lastName) {

        if (userRepository.findByEmail(email).isPresent()) {
            throw new DuplicateEmailException("Email already registered");
        }

        String otp = String.format("%06d", new Random().nextInt(1000000));

        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setOtp(otp);

        return userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public OtpResponse verifyOtp(String email, String otp) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return new OtpResponse(
                    false,
                    "User not found",
                    null
            );
        }

        if (otp == null || !otp.matches("\\d{6}")) {
            return new OtpResponse(
                    false,
                    "OTP must be exactly 6 digits",
                    null
            );
        }

        if (!user.getOtp().equals(otp)) {
            return new OtpResponse(
                    false,
                    "Incorrect OTP",
                    null
            );
        }

        return new OtpResponse(
                true,
                "OTP verified successfully",
                user.getFirstName()
        );
    }
}