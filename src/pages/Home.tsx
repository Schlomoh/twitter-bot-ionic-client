import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";

import {
    Authentication,
    Automation,
    ManualTweet,
    Refresher,
    TwitterInfo,
} from "../components";
import "./Home.css";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Refresher />
                <IonGrid>
                    <IonRow>
                        <IonCol sizeMd="6" sizeXs="12">
                            <Authentication />
                            <Automation />
                        </IonCol>
                        <IonCol sizeMd="6" sizeXs="12">
                            <TwitterInfo />
                            <ManualTweet />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
