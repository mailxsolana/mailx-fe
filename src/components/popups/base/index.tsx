import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as C from "./style"

const Popup = (...props: any) => {

    const closeModal = () => {
        if (props[0].hide) {
            if (props[0].isredux !== false)
                dispatch(props[0].hide())
            else
                props[0].hide()
        }
    }

    const dispatch = useDispatch()

    if (props[0].show) {

        return (
            <C.Popup>
                <C.Overlay onClick={closeModal}></C.Overlay>
                <C.Dialog >
                    {props[0].header !== false && (
                        <C.DialogHeader>
                            <C.DialogTitle>
                                {props[0].icon && (
                                    <C.DialogTitleIcon> {props[0].icon} </C.DialogTitleIcon>
                                )}
                                <C.DialogTitleText>
                                    {props[0].title ? props[0].title : ""}
                                </C.DialogTitleText>
                            </C.DialogTitle>
                            <C.DialogClose onClick={closeModal}>&times;</C.DialogClose>
                        </C.DialogHeader>
                    )}

                    <C.DialogBody>
                        {props[0].children}
                    </C.DialogBody>
                </C.Dialog>
            </C.Popup>
        )
    } else {
        return <></>
    }
}

export default Popup