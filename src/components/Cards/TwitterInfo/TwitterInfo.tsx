import { ReactElement } from "react";
import {
    IonIcon,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
} from "@ionic/react";
import { heart, link, people } from "ionicons/icons";

import { BaseCard } from "../../BaseCard";

interface OverviewSectionProps {
    total: number;
    today: number;
    name: string;
    icon: ReactElement<any>;
}

const OverviewSection = ({
    total,
    today,
    name,
    icon,
}: OverviewSectionProps) => {
    return (
        <>
            <IonItemDivider>
                <IonLabel>{name}</IonLabel>
            </IonItemDivider>
            <IonItem lines="none">
                <div style={{ paddingRight: "20px" }}>{icon}</div>
                <IonLabel>
                    <h3>
                        <IonText color={"medium"}>Total: </IonText>
                        <strong>{total}</strong>
                    </h3>
                    <h3>
                        <IonText color={"medium"}>Today: </IonText>
                        <strong>{today}</strong>
                    </h3>
                </IonLabel>
            </IonItem>
        </>
    );
};

const TwitterInfo = () => {
    return (
        <BaseCard title="Twitter Info" subtitle="Twitter user metrics">
            <IonList>
                <IonItemGroup>
                    <OverviewSection
                        name="Referal link clicks"
                        icon={<IonIcon size="large" icon={link} />}
                        today={12}
                        total={0}
                    />
                    <OverviewSection
                        name="Followers"
                        icon={<IonIcon size="large" icon={people} />}
                        today={30}
                        total={0}
                    />
                    <OverviewSection
                        name="Likes"
                        icon={<IonIcon size="large" icon={heart} />}
                        today={132}
                        total={0}
                    />
                </IonItemGroup>
            </IonList>
        </BaseCard>
    );
};

export default TwitterInfo;
