import {
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonButton,
    IonSpinner,
} from "@ionic/react";
import { useState } from "react";

type TruntimeState = "start" | "stop";

const Controls = () => {
    const runtime = "Not running";
    const running = true;
    const [loading, setLoading] = useState(false);

    async function sendControl(state: TruntimeState) {
        setLoading(true);
        await setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    async function start() {
        await sendControl("start");
    }
    
    async function stop() {
        await sendControl("stop");
    }

    const ControlButton = () => {
        const startButton = {
            color: "success",
            content: "Start",
            disabled: false,
            onclick: start,
        };

        const stopButton = {
            color: "danger",
            content: "Stop",
            disabled: false,
            onclick: stop,
        };

        const loadingButton = {
            color: running ? startButton.color : stopButton.color,
            content: <IonSpinner name="dots" />,
            disabled: true,
            onclick: undefined,
        };

        const buttonContent = loading
            ? loadingButton
            : running
            ? stopButton
            : startButton;

        return (
            <IonButton
                color={buttonContent.color}
                size="default"
                slot="start"
                onClick={buttonContent.onclick}
                disabled={buttonContent.disabled}
            >
                {buttonContent.content}
            </IonButton>
        );
    };

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>Controls</IonLabel>
            </IonListHeader>
            <IonItem>
                <ControlButton />
                <IonLabel>
                    <h2>Start / Stop bot instance</h2>
                    <p>Runtime: {runtime}</p>
                </IonLabel>
            </IonItem>
        </IonList>
    );
};

export default Controls;
