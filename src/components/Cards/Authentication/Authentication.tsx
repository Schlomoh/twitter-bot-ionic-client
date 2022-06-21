import {
    IonButton,
    IonButtons,
    IonContent,
    IonModal,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
} from "@ionic/react";
import { link, shieldCheckmarkOutline, shieldOutline } from "ionicons/icons";
import { useState } from "react";

import {
    useGetIsAuthenticatedQuery,
    useGetAuthLinkQuery,
} from "../../../store/fetching";
import { LoadingButton } from "../../LoadingButton";
import "./Authentication.css";

const ModalContent = ({ dismissModal }: { dismissModal: () => void }) => {
    const { data, isLoading: authLinkLoading } = useGetAuthLinkQuery();

    function authButtonClick() {
        window.open(data?.url, "_blank");
        dismissModal();
    }

    return (
        <>
            <IonHeader className="modalHeader" translucent>
                <IonToolbar>
                    <IonTitle>Authentication Link</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={dismissModal}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="centerContainer">
                    <IonIcon icon={link} color="medium" />
                    <LoadingButton
                        loading={authLinkLoading}
                        onInactiveClick={authButtonClick}
                        active={!data}
                        activeText="No Link"
                        inactiveText="Open Link"
                    />
                </div>
            </IonContent>
        </>
    );
};

const Authentication = () => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const dismissModal = () => setShowModal(false);
    const { data: isAuthenticated } = useGetIsAuthenticatedQuery();

    return (
        <>
            <IonButton
                onClick={openModal}
                fill="clear"
                disabled={!!isAuthenticated}
            >
                <IonIcon
                    icon={
                        isAuthenticated ? shieldCheckmarkOutline : shieldOutline
                    }
                />
            </IonButton>
            <IonModal
                isOpen={showModal}
                initialBreakpoint={0.5}
                breakpoints={[0, 0.5, 0.75]}
                onDidDismiss={dismissModal}
            >
                <ModalContent dismissModal={dismissModal} />
            </IonModal>
        </>
    );
};

export default Authentication;
