export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","sku","price"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.price==='string' && row.price.trim()) row.price=Number(row.price);
    if (!Number.isFinite(row.price)) throw new Error('Expected a numeric metric');
  }
  return {premium:rows.filter(r=>r.price>=50).map(r=>r.sku),promotion:rows.map(r=>({sku:r.sku,price:Math.round(r.price*0.9*100)/100}))};
}
