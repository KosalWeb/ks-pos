import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useFindById } from '../../hooks/useFindById'
import { useAddPaymentSale } from '../../hooks/useAddPaymentSale'
import toast from 'react-hot-toast'
function SalePaymentModal({open, onClose, editId}) {
  const [paidAmount, setPaidAmount] = useState(1)
  const [changeAmount, setChangeAmount] = useState(0)
  const {addPayment,isLoading: isUpdating} = useAddPaymentSale()
  const {data, isLoading} = useFindById("sale/find", editId)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await addPayment(editId, {paidAmount})
    if(res){
        toast.success("Update payment status successfully!")
        closeModal()
    }
  }

  function closeModal(){
     onClose()
     setPaidAmount(0)
  }

 useEffect(() => {
        if(data && isLoading == false){
            const amount = Math.max(0, Number(data?.paidAmount) + paidAmount - Number(data?.totalCost))
            if(!isNaN(amount)){
                setChangeAmount(amount)
            }
        }
 },[data, isLoading, paidAmount, changeAmount])


  return (
    <Modal open={open} onClose={closeModal} title="Update Payment Status">
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='block'>Paid Amount</label>
                         <input onChange={(e) => setPaidAmount( Number(e.target.value) )} value={paidAmount} type="number" className='input w-full validator' required placeholder='Enter paid amount' min={1} />
                         <p className="validator-hint">Paid amount must be greater than 0</p>
                    </div>
                    <div className='mb-3 space-x-2'>
                                <button type='button' onClick={() => setPaidAmount(data?.dueAmount * 1)} className='btn  btn-sm btn-ghost border border-gray-300 text-gray-700'>
                                  <span>Due Amount : </span> 
                                  <span className='text-red-600 font-semibold'>
                                    { isLoading ? ( <span className="loading loading-spinner loading-xs"></span> ) : data?.dueAmount }៛
                                  </span> 
                                </button>
                                <button type='button' className='btn btn-sm cursor-text border border-gray-300 text-gray-700'>
                                  <span>Change Amount : </span> 
                                  <span className='text-red-600 font-semibold'>
                                    { isLoading ? ( <span className="loading loading-spinner loading-xs"></span> ) : changeAmount }៛
                                  </span> 
                                </button>
                    </div>
                    <button type='submit' disabled={isUpdating} className='btn btn-neutral w-full'>
                        រក្សាទុក
                    </button>
                </form>
        </Modal>
  )
}

export default SalePaymentModal