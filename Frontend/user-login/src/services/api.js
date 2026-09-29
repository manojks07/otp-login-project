const API_URL = "https://otp-login-project-production.up.railway.app/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 400) {
      throw {
        type: "validation",
        errors: data,
      };
    }

    if (response.status === 409) {
      throw {
        type: "duplicate",
        message: data.message,
      };
    }

    throw {
      type: "server",
      message: "Something went wrong",
    };
  }

  return data;
};

export const recognizeUser = async (email) => {
  const response = await fetch(
    `${API_URL}/users/recognize?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to recognize user");
  }

  return response.json();
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch(
    `${API_URL}/users/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("OTP verification failed");
  }

  return response.json();
};

export const saveCheckout = async (checkoutData) => {
  const response = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkoutData),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 400) {
      throw {
        type: "validation",
        errors: data,
      };
    }

    throw {
      type: "server",
      message: "Unable to complete checkout",
    };
  }

  return data;
};
