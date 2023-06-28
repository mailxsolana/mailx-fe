import React from "react"
import * as L from "./style"

const ConfirmationLb = ({ icon, content, onAccept, onReject }: any) => {

    return (
        <L.Confirmation>

            <L.ConfirmationIcon>
                <div>
                    {icon}
                </div>
            </L.ConfirmationIcon>

            <L.ConfirmationContent>
                {content}
            </L.ConfirmationContent>

            <L.ConfirmationActions>
               
                <L.ConfirmationAction btnaction="reject"  onClick={onReject}>
                    Reject
                </L.ConfirmationAction>
                <L.ConfirmationAction btnaction="accept" onClick={onAccept}>
                    Accept
                </L.ConfirmationAction>
            </L.ConfirmationActions>

        </L.Confirmation>
    )

}

export default ConfirmationLb