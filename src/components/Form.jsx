import { useActionState } from "react"
import {supabase} from '../supabase'
import {useAuth} from '../context/AuthContext'

export default function Form() {

    const {users, session} = useAuth()

    const [error, addNewDeal, isPending] = useActionState(
        async (_, formData) => {

            const name = formData.get('name')
            const value = formData.get('value')
            
            if (parseInt(value) === 0 || !name || !value) {
                return 'Please enter a valid deal to add'
            }

            const userId = users.find(user => user.name === name).id

            const {error: newDealError} = await supabase
                .from('sales_deals')
                .insert({
                    user_id: userId,
                    value: parseInt(value)
                })

            if (newDealError) return newDealError.message

            return null

        }, null
    )

    const generateOptions = () => {
        return users
            .filter(user => user.account_type === 'sales_rep')
            .map(user => (
                <option key={user.id} value={user.name}>
                    {user.name}
                </option>
            ))
    }

    const currentUser = users.find(user => user.id === session?.user?.id )

    const displayAppropriateField = () => {
        return currentUser?.account_type === 'admin' 
        ? (
            <div className="form-field">
                <label htmlFor="name">Name:</label>
                <select 
                    name="name" 
                    id="name"
                    className={error ? 'input-error' : ''}
                    defaultValue={users?.[0]?.name || ''}
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                    disabled={isPending}
                >
                {generateOptions()}
                </select>
            </div>
            )
        : (
            <div className="form-field">
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    name='name' 
                    id='name' 
                    className={error ? 'input-error' : ''}
                    value={currentUser?.name || ''}
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                    disabled={isPending}
                    readOnly
                    aria-readonly='true'
                    aria-label="Sales rep representative name"
                />
            </div>
        )
    }  

    return (
        <div className="dashboard-form-container">
            <h2>Add new deal sale</h2>
            {
            !isPending && error 
            ? <p className='dashboard-form-error-msg' role='alert'>{error}</p> 
            : null
            }
            <form 
                className='dashboard-form' 
                action={addNewDeal} 
                aria-label="Add new sales deal"
                aria-describedby="form-description"
            >

            <div id="form-description" className="sr-only">
                Use this form to add a new sales deal. Select a sales rep and enter
                the amount.
            </div>

            {displayAppropriateField()}

            <div className="form-field">
                <label htmlFor="value">Value:</label>
                <input 
                    type="number" 
                    name='value' 
                    id='value' 
                    className={error ? 'input-error' : ''}
                    min={0} 
                    step={10} 
                    defaultValue={0} 
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-label="Deal amount in dollars"
                    disabled={isPending}
                />
            </div>
            <button 
                type='submit'
                className="submit-btn" 
                disabled={isPending}
                aria-busy={isPending}
            >
                {isPending ? 'Adding deal...' : 'Add deal'}
            </button>
            </form>
        </div>
    )
}