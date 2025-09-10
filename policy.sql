-- check if a row exists
Exists(
    select 1
    from extended_family
    where extended_family.shoe_size = 10
    and extended_family.fave_color = "red"
)

-- policy for reps to only insert their sales
create policy "reps_can_only_insert_their_sales"
on public.sales_deals
for insert
to authenticated
with check(
    -- (id in jwt = id in inserted row)
    auth.uid() = user_id
    -- (id in jwt exists in user_profiles) + (account_type = sales_rep)
    and exists(
        select 1 
        from user_profiles
        where user_profiles.id = auth.uid()
        and user_profiles.account_type = 'sales_rep'
    )
)

-- policy for admins to insert anybody sales
create policy "admins_can_insert_anybodys_sales"
on public.sales_deals
for insert
to authenticated
with check(
    exists(
        select 1 
        from user_profiles
        where user_profiles.id = auth.uid()
        and user_profiles.account_type = 'admin'
    )
)