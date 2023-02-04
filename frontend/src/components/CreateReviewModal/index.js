import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import CreateReviewForm from "./CreateReviewForm";
import './CreateReviewForm.css'

export default function CreateReviewFormModal(){
    const [ showModal, setShowModal ] = useState(false)

    return (
        <>
            <button id="post_review_btn" onClick={()=>setShowModal(true)}>
                Post Your Review
            </button>
            {showModal && (
                <Modal onClose={()=>setShowModal(false)}>
                    <CreateReviewForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
