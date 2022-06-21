import { IonBadge, IonCol, IonGrid, IonRow } from "@ionic/react";
import { BaseCard } from "../../BaseCard";
import HashtagSettings from "./HastagSettings";
import LimitsModal from "./LimitsModal";

const LimitSettings = () => {
    const isRunning = false;
    const badge = isRunning ? (
        <IonBadge color="danger" key="running">
            Bot is runnnig! Stop to change settings.
        </IonBadge>
    ) : (
        <IonBadge color="light" key="not running">
            Bot not running. Settings changeable.
        </IonBadge>
    );

    return (
        <BaseCard
            title="Settings"
            subtitle="Set limits intervals and hashtags"
            badges={[badge]}
        >
            <IonGrid>
                <IonRow>
                    <IonCol sizeXs="6">
                        <HashtagSettings />
                    </IonCol>
                    <IonCol sizeXs="6">
                        <LimitsModal />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </BaseCard>
    );
};

export default LimitSettings;
