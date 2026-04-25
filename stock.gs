// Atomic stock decrement on order confirmation
await supabase.rpc('reserve_stock', { p_product_id: id, p_qty: qty });

// Postgres function for race-condition safety:
// UPDATE inventory SET qty_reserved = qty_reserved + p_qty
// WHERE product_id = p_product_id AND (qty_on_hand - qty_reserved) >= p_qty
