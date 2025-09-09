import { useActionState } from "react"

export default function Form({ sales }) {

    const [error, addNewDeal, isPending] = useActionState(
        async (_, formData) => {
        const name = formData.get('name')
        const value = formData.get('value')
        if (parseInt(value) === 0) {
            return 'No 0 values'
        }
        console.log(name)
        console.log(value)
        return null
        }, null
    )

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

            <div className="form-field">
                <label htmlFor="name">Name:</label>
                <select 
                    name="name" 
                    id="name"
                    className={error ? 'input-error' : ''}
                    defaultValue={sales?.[0]?.name || ''}
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                    disabled={isPending}
                >
                {
                    sales.map(sale => (
                    <option key={sale.name} value={sale.name}>
                        {sale.name}
                    </option>
                    ))
                }
                </select>
            </div>
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