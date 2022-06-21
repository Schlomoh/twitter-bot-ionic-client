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
import { BaseCard } from "../../BaseCard";
import Controls from "./Controls";



const Automation = () => {
   

    return (
        <BaseCard
            title="Automation"
            subtitle="Bot settings and data"
        >
            <>
                <Controls />
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
