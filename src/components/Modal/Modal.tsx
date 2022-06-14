import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

interface ModalProps {
    title: string;
    buttonText: string;
    breakpoints?: number[];
    initialBreakpoint?: number;
    fullscreen?: boolean;
    enableScroll?: boolean;
    openCallback?: () => void;
    children: React.ReactElement<any, any>;
}

interface ModalBaseContentProps {
    title: string;
    dismissModal: () => void;
    children: React.ReactElement<any, any>;
}

const ModalBaseContent = ({
    title,
    dismissModal,
    children,
}: ModalBaseContentProps) => {
    return (
        <>
            <IonHeader className="modalHeader" translucent>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={dismissModal}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {children}
        </>
    );
};

const Modal = ({
    title,
    buttonText,
    breakpoints,
    initialBreakpoint,
    fullscreen,
    enableScroll,
    openCallback,
    children,
}: ModalProps) => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        openCallback && openCallback();
        setShowModal(true);
    };
    const dismissModal = () => setShowModal(false);

    breakpoints = fullscreen ? undefined : breakpoints || [0, 0.5, 0.75, 1];
    initialBreakpoint = fullscreen ? undefined : initialBreakpoint || 0.5;

    return (
        <>
            <IonModal
                canDismiss
                isOpen={showModal}
                initialBreakpoint={initialBreakpoint}
                breakpoints={breakpoints}
                onDidDismiss={dismissModal}
            >
                <ModalBaseContent title={title} dismissModal={dismissModal}>
                    <IonContent fullscreen scrollY={enableScroll}>
                        {children}
                    </IonContent>
                </ModalBaseContent>
            </IonModal>
            <IonButton onClick={openModal} expand="block">
                {buttonText}
            </IonButton>
        </>
    );
};

export default Modal;
