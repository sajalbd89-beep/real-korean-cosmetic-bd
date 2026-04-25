<div class="max-w-4xl mx-auto p-6">
  <h2 class="text-2xl font-bold mb-6">Secure Checkout</h2>

  <!-- Address -->
  <input class="w-full p-3 border rounded mb-4" placeholder="Full Name" />
  <input class="w-full p-3 border rounded mb-4" placeholder="Phone Number" />
  <textarea class="w-full p-3 border rounded mb-4" placeholder="Delivery Address"></textarea>

  <!-- Payment -->
  <h3 class="font-semibold mb-2">Select Payment Method</h3>

  <div class="space-y-3">
    <label class="flex items-center gap-3 border p-3 rounded cursor-pointer">
      <input type="radio" name="payment" value="bkash" />
      <span>bKash</span>
    </label>

    <label class="flex items-center gap-3 border p-3 rounded cursor-pointer">
      <input type="radio" name="payment" value="nagad" />
      <span>Nagad</span>
    </label>

    <label class="flex items-center gap-3 border p-3 rounded cursor-pointer">
      <input type="radio" name="payment" value="cod" />
      <span>Cash on Delivery</span>
    </label>
  </div>

  <button class="mt-6 w-full bg-black text-white py-3 rounded">
    Place Order
  </button>
</div>
