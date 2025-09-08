import { supabase } from "./supabase";

export async function getSalesDeals(setSales) {
  const { data, error } = await supabase
  .from('sales_deals')
  .select(
    `
    name,
    value.sum()
    `,
  )
  if (error) {
    console.log(error);
  } else {
    setSales(data);
  }
}