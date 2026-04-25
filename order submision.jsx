const submitOrder = async () => {
  const orderData = {
    customer_name: name,
    phone,
    address,
    payment_method: selectedPayment,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };

  const res = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  alert("Order placed successfully!");
};
