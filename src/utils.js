import { supabase } from "./supabase";

export async function getSalesDeals(setSales) {
  try {
    const { data, error } = await supabase
    .from('sales_deals')
    .select(
      `
      name,
      value.sum()
      `,
    )
    if (error) throw error.message
    setSales(data);
  } catch(err) {
    console.log(`An error occured when fetching deals: ${err}`)
  }
}

export async function getUsers(setUsers) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(
        `
        id,
        name,
        account_type
        `,
      )
    if (error) throw error.message
    setUsers(data);
  } catch(err) {
    console.log(`An error occured when fetching users: ${err}`)
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

export async function signUserIn(email, password) {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      return {success: false, error: error.message}
    }
    return {success: true, data}
  } catch(err) {
    console.log(`An error occured: ${err}`)
    return {success: false, error: 'An unexpected error occured, try again later'}
  }
}

export async function signUserOut() {
  try {
    const {error: signOutError} = await supabase.auth.signOut()
    if (signOutError) return {success: false, error: signOutError.message}
    return {success: true}
  } catch(err) {
    console.log(`An error occured: ${err}`)
    return {success: false, error: 'An unexpected error occured, try again later'}
  }
}

export async function signUserUp(name, email, password, accountType) {
  try {
    const {data, error} = await supabase.auth.signUp({
      email, password,
      options: {
        data: {
          name,
          account_type: accountType
        }
      }
    })
    if (error) return {success: false, error: error.message}
    return {success: true, data}
  } catch(err) {
    console.log('error during sign up: ', err)
    return {success: false, error: 'An unexpected error occured, try again later'}
  }
}