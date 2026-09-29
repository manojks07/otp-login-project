package opt_login.dto;

public class OtpResponse {

    private boolean success;
    private String message;
    private String firstName;

    public OtpResponse() {
    }

    public OtpResponse(boolean success, String message, String firstName) {
        this.success = success;
        this.message = message;
        this.firstName = firstName;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getFirstName() {
        return firstName;
    }
}