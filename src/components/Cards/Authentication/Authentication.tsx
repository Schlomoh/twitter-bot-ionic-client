import {
    IonButton,
    IonButtons,
    IonCardContent,
    IonContent,
    IonModal,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
} from "@ionic/react";
import { link } from "ionicons/icons";
import { useState } from "react";

import {
    useGetAuthLinkQuery,
    useGetIsAuthenticatedQuery,
} from "../../../store/fetching";
import { BaseCard } from "../../BaseCard";
import { LoadingButton } from "../../LoadingButton";
import "./Authentication.css";

const ModalContent = ({ dismissModal }: { dismissModal: () => void }) => {
    const { data: linkResponse, isLoading: authLinkLoading } =
        useGetAuthLinkQuery();

    function authButtonClick() {
        if (linkResponse) {
            console.log(linkResponse);
            console.log(linkResponse["url"]);
            window.open(linkResponse.url, "_blank");
            dismissModal();
        }
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
                        active={!linkResponse}
                        activeText="No Link"
                        inactiveText="Open Link"
                    />
                </div>
            </IonContent>
        </>
    );
};

const Content = () => {
    const [showModal, setShowModal] = useState(false);
    const { data: statusData, isLoading: authenticatedLoading } =
        useGetIsAuthenticatedQuery();

    const openModal = () => setShowModal(true);
    const dismissModal = () => setShowModal(false);

    return (
        <>
            <LoadingButton
                onActiveClick={openModal}
                activeText="Show authentication link"
                inactiveText="Authenticated"
                loading={authenticatedLoading}
                active={!statusData?.isAuthenticated} //swithed so the colors match when authenticated
                disabledOnInactive
            />
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

const Authentication = () => {
    return (
        <BaseCard title="Authentication" subtitle="Login stuff">
            <IonCardContent>
                <Content />
            </IonCardContent>
        </BaseCard>
    );
};

export default Authentication;
