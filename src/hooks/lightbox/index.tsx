
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import * as L from "./style";

const LightboxContext = React.createContext({
    isOpen: false,
    open: (content: any, title:any) => { },
    close: () => { }
});

const LightboxProvider = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState<any>(null);

    const open = (content: any, title?:string) => {
        setIsOpen(true);
        setContent(content);
        setTitle(title);
    };

    const close = () => {
        setIsOpen(false);
    };

    return (
        <LightboxContext.Provider value={{ isOpen, open, close }}>
            {children}
            <Lightbox content={content} title={title} />
        </LightboxContext.Provider>
    );
};

const Lightbox = ({ content, title }: any) => {
    const { isOpen, close } = useContext(LightboxContext);

    if (!isOpen) {
        return null;
    }

    return (
        <L.Lightbox>
            <L.Overlay className="lightbox-overlay" onClick={close}></L.Overlay>
            <L.Dialog>
                <L.DialogHeader>
                    <L.DialogTitle>
                        <L.DialogTitleText>
                            {title ? title : ""}
                        </L.DialogTitleText>
                    </L.DialogTitle>
                    <L.DialogClose onClick={close}>&times;</L.DialogClose>
                </L.DialogHeader>
                {content}
            </L.Dialog>
        </L.Lightbox>
    );
};

const useLightbox = () => {
    const { open, close } = useContext(LightboxContext);

    const openLightbox = (content: any, title?:string) => {
        open(content, title);
    };

    const closeLightbox = () => {
        close();
    };

    return { openLightbox, closeLightbox };
};

export { LightboxProvider, useLightbox };