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

export async function getInitialState(setSession) {
  try {
    const {data, error} = await supabase.auth.getSession()
    if (error) throw error.message
    setSession(data.session)
  } catch(err) {
    console.log(`An error occured: ${err}`)
  }
}

export async function signUserIn(email, password, navigate, setSession) {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) return error.message
    setSession(data.session)
    navigate('/dashboard')
  } catch(err) {
    console.log(`An error occured: ${err}`)
  }
}