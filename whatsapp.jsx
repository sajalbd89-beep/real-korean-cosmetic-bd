const sendWhatsApp = (phone) => {
  const message = `Your order has been confirmed! Thank you ❤️`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return fetch(url);
};
