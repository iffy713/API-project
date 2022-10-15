import React, { useContext, useEffect, useRef, useState } from "react"
import ReactDOM from "react"
import './Modal.css'

const ModalContext = React.createContext()


export function ModalProvider( { children }){
    const modalRef = useRef()
    const [ value, setValue ] = useState()

    useEffect(()=>{
        setValue(modalRef.current)
    }, [])

    return (
        <div>
            <ModalContext.Provider value={value}>
                { children }
            </ModalContext.Provider>
            <div ref={modalRef}>

            </div>
        </div>
    )
}

export function Modal ({ onClose, children }) {
    const modalNode = useContext(ModalContext)
    if (!modalNode) return null

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}>
            </div>
            <div id="modal-content">
                { children }
            </div>
        </div>,
        modalNode
    )
}
