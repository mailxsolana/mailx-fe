import React from "react";
import * as C from "./style";

const EmptyMailContent = () => {

    return (
        <C.EmptyMailContent>
            <img src="/emptymail.svg" alt="empty" />

            <C.Title>
                Click on a message to view <br/>
                the mail content
            </C.Title>
        </C.EmptyMailContent>
    )

}

export default EmptyMailContent