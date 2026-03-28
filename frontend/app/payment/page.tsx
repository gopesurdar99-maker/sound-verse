"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { createOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

const paymentOptions = [
  { id: "UPI", title: "UPI", description: "Pay using any UPI app" },
  { id: "Card", title: "Credit or Debit Card", description: "Secure card payment" },
  { id: "NetBanking", title: "Net Banking", description: "Pay directly from your bank" },
  { id: "COD", title: "Cash on Delivery", description: "Pay when your order arrives" },
];

function generatePaymentReference(method: string) {
  const random = Math.floor(100000 + Math.random() * 900000);
  if (method === "UPI") return `UPI-SV-${random}`;
  if (method === "Card") return `CARD-SV-${random}`;
  if (method === "NetBanking") return `BANK-SV-${random}`;
  return `COD-SV-${random}`;
}

export default function PaymentPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = useCartStore((s) => s.items);
  const shippingAddress = useCartStore((s) => s.shippingAddress);
  const selectedPaymentMethod = useCartStore((s) => s.selectedPaymentMethod);
  const setSelectedPaymentMethod = useCartStore((s) => s.setSelectedPaymentMethod);
  const clearCart = useCartStore((s) => s.clearCart);

  const [billingName, setBillingName] = useState(shippingAddress?.fullName || "");
  const [upiId, setUpiId] = useState("");
  const [cardName, setCardName] = useState(shippingAddress?.fullName || "");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("SBI");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const shipping = cartItems.length > 0 ? 199 : 0;
  const total = subtotal + shipping;

  const validatePayment = () => {
    if (!billingName.trim()) {
      alert("Please enter billing name.");
      return false;
    }

    if (selectedPaymentMethod === "UPI") {
      if (!upiId.trim() || !upiId.includes("@")) {
        alert("Please enter a valid UPI ID.");
        return false;
      }
    }

    if (selectedPaymentMethod === "Card") {
      const cleanCard = cardNumber.replace(/\s/g, "");
      if (!cardName.trim()) {
        alert("Please enter card holder name.");
        return false;
      }
      if (cleanCard.length < 12) {
        alert("Please enter a valid card number.");
        return false;
      }
      if (!cardExpiry.trim()) {
        alert("Please enter card expiry.");
        return false;
      }
      if (cardCvv.trim().length < 3) {
        alert("Please enter a valid CVV.");
        return false;
      }
    }

    if (selectedPaymentMethod === "NetBanking") {
      if (!selectedBank) {
        alert("Please select a bank.");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    if (!shippingAddress) {
      alert("Please complete your delivery address first.");
      router.push("/checkout");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      router.push("/products");
      return;
    }

    if (!validatePayment()) return;

    try {
      setIsProcessing(true);

      await new Promise((resolve) => setTimeout(resolve, 1600));

      const paymentReference = generatePaymentReference(selectedPaymentMethod);

      const order = await createOrder(token, {
        billing_name: billingName,
        customer_name: shippingAddress.fullName,
        customer_email: shippingAddress.email,
        customer_phone: shippingAddress.phone,
        address_line_1: shippingAddress.addressLine1,
        address_line_2: shippingAddress.addressLine2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        items: cartItems,
        subtotal,
        shipping,
        total_amount: total,
        payment_method: selectedPaymentMethod,
        payment_reference: paymentReference,
      });

      clearCart();
      router.push(`/order-success?orderCode=${order.order_code}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing the order.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <main>
        <Navbar />
        <section className="container-width py-20">
          <h1 className="text-4xl font-semibold text-white">Login Required</h1>
          <p className="mt-4 text-zinc-400">
            Please login to continue to payment.
          </p>
          <Link
            href="/login"
            className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
          >
            Go to Login
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  if (!shippingAddress) {
    return (
      <main>
        <Navbar />
        <section className="container-width py-20">
          <h1 className="text-4xl font-semibold text-white">Payment</h1>
          <p className="mt-4 text-zinc-400">
            Please complete your address before selecting payment.
          </p>
          <Link
            href="/checkout"
            className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
          >
            Go to Checkout
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Payment
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
              Choose payment method
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Select a payment option and complete your order.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass rounded-[28px] p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white">Payment method</h2>

              <div className="mt-6 space-y-4">
                {paymentOptions.map((option) => {
                  const active = selectedPaymentMethod === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(option.id)}
                      className={`w-full rounded-[24px] border p-5 text-left transition ${
                        active
                          ? "border-blue-400/40 bg-blue-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-1 h-5 w-5 rounded-full border ${
                            active
                              ? "border-blue-400 bg-blue-400"
                              : "border-zinc-500 bg-transparent"
                          }`}
                        />
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {option.title}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-medium text-white">Billing details</h3>

                <div className="mt-4">
                  <label className="mb-2 block text-sm text-zinc-400">
                    Billing Name
                  </label>
                  <input
                    type="text"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter billing name"
                  />
                </div>

                {selectedPaymentMethod === "UPI" && (
                  <div className="mt-4">
                    <label className="mb-2 block text-sm text-zinc-400">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                      placeholder="example@upi"
                    />
                  </div>
                )}

                {selectedPaymentMethod === "Card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm text-zinc-400">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                        placeholder="Name on card"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-400">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-zinc-400">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "NetBanking" && (
                  <div className="mt-4">
                    <label className="mb-2 block text-sm text-zinc-400">
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    >
                      <option value="SBI">State Bank of India</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="Axis">Axis Bank</option>
                    </select>
                  </div>
                )}

                {selectedPaymentMethod === "COD" && (
                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                    Cash on Delivery selected. Payment will be collected when the
                    order arrives.
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-medium text-white">Deliver to</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {shippingAddress.fullName}
                  <br />
                  {shippingAddress.phone}
                  <br />
                  {shippingAddress.email}
                  <br />
                  {shippingAddress.addressLine1}
                  {shippingAddress.addressLine2 ? `, ${shippingAddress.addressLine2}` : ""}
                  <br />
                  {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                </p>

                <Link
                  href="/checkout"
                  className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-cyan-300"
                >
                  Change address →
                </Link>
              </div>
            </div>

            <div className="glass h-fit rounded-[28px] p-6">
              <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

              <div className="mt-6 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-zinc-300">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-sm">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Items</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-zinc-400">
                  <span>Delivery</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-semibold text-white">
                  <span>Order Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="btn-primary mt-6 w-full rounded-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isProcessing ? "Processing Payment..." : "Use this payment method"}
              </button>

              <Link
                href="/checkout"
                className="btn-secondary mt-3 block rounded-full px-6 py-3 text-center text-sm font-medium"
              >
                Back to Checkout
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
