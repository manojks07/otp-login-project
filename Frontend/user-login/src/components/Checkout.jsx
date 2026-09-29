
import { useState } from "react";
import { recognizeUser, verifyOtp, saveCheckout } from "../services/api";

function Checkout() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    shippingAddress: "",
  });

  const [user, setUser] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Recognize user when email changes
    if (name === "email" && value.includes("@")) {
      try {
        const data = await recognizeUser(value);

        if (data) {
          setUser(data);
          setShowOtp(true);
        } else {
          setUser(null);
          setShowOtp(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setErrors({});

    try {
      await saveCheckout(formData);

      setMessage("Checkout completed successfully!");
    } catch (error) {
      if (error.type === "validation") {
        setErrors(error.errors);
      } else {
        setError("Unable to complete checkout.");
      }
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    try {
      const result = await verifyOtp(formData.email, otp);

      if (result.success) {
        setShowOtp(false);
        setMessage(`Welcome, ${result.firstName}!`);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Unable to verify OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      {/* Checkout Card */}
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>

          <p className="mt-2 text-gray-500">
            Enter your details to complete your order
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleCheckout}>
            {/* Email */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full rounded-lg border px-4 py-3 text-gray-800 outline-none transition focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
                required
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                className={`w-full rounded-lg border px-4 py-3 text-gray-800 outline-none transition focus:ring-2 ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
                required
              />

              {errors.phone && (
                <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Shipping Address
              </label>

              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Enter your complete shipping address"
                rows="4"
                className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-800 outline-none transition focus:ring-2 ${
                  errors.shippingAddress
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }`}
                required
              />

              {errors.shippingAddress && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.shippingAddress}
                </p>
              )}
            </div>

            {/* General Error */}
            {error && !showOtp && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {message}
              </div>
            )}

            {/* Checkout Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Continue Checkout
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtp && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl">✓</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Verify Your Account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                We found an existing account for
              </p>

              <p className="mt-1 font-semibold text-gray-700">{user.email}</p>
            </div>

            {/* OTP Input */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Enter 6-digit OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setOtp(value);
                  setError("");
                }}
                placeholder="Enter OTP"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* OTP Error */}
            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Verify OTP
            </button>

            {/* Skip Login */}
            <button
              type="button"
              onClick={() => {
                setShowOtp(false);
                setError("");
              }}
              className="mt-3 w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Skip Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
