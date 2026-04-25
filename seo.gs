// app/products/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const p = await getProduct(params.slug);
  return {
    title: `${p.name} | Real Korean Cosmetic BD`,
    description: p.meta_desc,
    openGraph: { images: [p.images[0]] },
  };
}

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  brand: { "@type": "Brand", name: product.brand.name },
  offers: { "@type": "Offer", priceCurrency: "BDT", price: product.price_bdt }
};
