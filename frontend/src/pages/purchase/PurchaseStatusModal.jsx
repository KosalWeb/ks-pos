import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import {useFindById} from "../../hooks/useFindById"
import {useCollection} from "../../hooks/useCollection"
import toast from 'react-hot-toast'
function PurchaseStatusModal({open, onClose, editId}) {
    const [purchaseStatus, setPurchaseStatus] = useState("")
    const {data, isLoading} = useFindById("purchase", editId)
    const {update, isLoading: isUpdating } = useCollection("purchase/updatePurchaseStatus")


    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await update({ purchaseStatus }, editId)
        if(res){
            closeModal()
            toast.success("Update purchase status successfully!")
        }
    }

    function closeModal(){
        onClose()
        setPurchaseStatus("")
    }

    useEffect(() => {
        if(data && isLoading == false){
            setPurchaseStatus(data?.purchaseStatus)
        }
    },[data, isLoading])

  return (
    <>
        <Modal open={open} onClose={closeModal} title="Update Purchase Status">
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='block'>Status</label>
                        <select required className="select w-full select-bordered" value={purchaseStatus} onChange={(e) => setPurchaseStatus(e.target.value)}>
                                <option value="" disabled>Select Purchase Status</option>
                                <option value="received">Received</option>
                                <option value="pending">Pending</option>
                                <option value="ordered">Ordered</option>
                                <option value="cancel">Cancel</option>
                        </select>
                    </div>
                    <button disabled={isUpdating} type='submit' className='btn btn-neutral w-full'>
                        រក្សាទុក
                    </button>
                </form>
        </Modal>    
    </>
  )
}

export default PurchaseStatusModal