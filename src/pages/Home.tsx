import {
    IonBadge,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

import {
    Authentication,
    Automation,
    LimitSettings,
    ManualTweet,
    Refresher,
    TwitterInfo,
} from "../components";
import { useGetIsAuthenticatedQuery } from "../store/fetching";
import "./Home.css";

const Home: React.FC = () => {
    const { data } = useGetIsAuthenticatedQuery();
    const isAuthed = data?.isAuthenticated;
    const badgeContent = isAuthed
        ? { color: "success", text: "Authenticated" }
        : { color: "danger", text: "Not Authenticated" };

    const runningBadge = (
        <IonBadge color="light" key="runningBadge">
            Not running
        </IonBadge>
    );
    const authedBadge = (
        <IonBadge
            color={badgeContent.color}
            key="authBadge"
            style={{ marginLeft: "10px" }}
        >
            {badgeContent.text}
        </IonBadge>
    );
    return (
        <IonPage>
            <IonHeader translucent collapse="fade">
                <IonToolbar>
                    <IonButtons slot="secondary">
                        <Authentication />
                    </IonButtons>
                    <IonTitle slot="end" size="large">
                        {[runningBadge, authedBadge]}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Refresher />
                <Automation />
                <LimitSettings />
                <TwitterInfo />
                <ManualTweet />
            </IonContent>
        </IonPage>
    );
};

export default Home;
