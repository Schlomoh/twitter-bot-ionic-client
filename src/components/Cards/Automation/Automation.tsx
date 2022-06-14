import {
    IonAccordion,
    IonAccordionGroup,
    IonBadge,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
} from "@ionic/react";
import { useGetIsAuthenticatedQuery } from "../../../store/fetching";
import { useTSelector } from "../../../store/store";

import { BaseCard } from "../../BaseCard";
import Controls from "./Controls";
import HashtagSettings from "./HastagSettings";
import LimitSettings from "./LimitSettings";

const SettingsSection = () => (
    <>
        <IonListHeader>
            <IonLabel>Settings</IonLabel>
        </IonListHeader>
        <IonGrid>
            <IonRow>
                <IonCol sizeXs="6">
                    <HashtagSettings />
                </IonCol>
                <IonCol sizeXs="6">
                    <LimitSettings />
                </IonCol>
            </IonRow>
        </IonGrid>
    </>
);

const Automation = () => {
    const { data } = useGetIsAuthenticatedQuery();
    const isAuthed = data?.isAuthenticated;
    const badgeContent = isAuthed
        ? { color: "success", text: "Authenticated" }
        : { color: "danger", text: "Not Authenticated" };

    const runningBadge = <IonBadge color="warning">Not running</IonBadge>;
    const authedBadge = (
        <IonBadge color={badgeContent.color}>{badgeContent.text}</IonBadge>
    );

    return (
        <BaseCard
            title="Automation"
            subtitle="Bot settings and data"
            badges={[runningBadge, authedBadge]}
        >
            <>
                <Controls />
                <SettingsSection />
                <IonListHeader>
                    <IonLabel>Data</IonLabel>
                </IonListHeader>
                <IonAccordionGroup>
                    <IonAccordion value="Session data">
                        <IonItem slot="header">
                            <IonLabel>Session data</IonLabel>
                        </IonItem>
                        <IonList slot="content">
                            <IonItem>
                                <IonLabel>Text</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Text</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Text</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonAccordion>
                    <IonAccordion value="All-time data">
                        <IonItem slot="header">
                            <IonLabel>All-time data</IonLabel>
                        </IonItem>
                        <IonList slot="content">
                            <IonItem>
                                <IonLabel>Text</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Text</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Text</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonAccordion>
                </IonAccordionGroup>
            </>
        </BaseCard>
    );
};

export default Automation;
