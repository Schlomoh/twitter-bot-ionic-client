import axios from "axios";
import {
    IonButton,
    IonCardContent,
    IonTextarea,
    IonIcon,
    IonSpinner,
} from "@ionic/react";
import { send } from "ionicons/icons";
import { useState } from "react";

import { BaseCard } from "../../BaseCard";

const ManualTweet = () => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const disabled = false;

    const sendTweet = async () => {
        setLoading(true);
        await axios.post(
            "https://twitter-authentication.herokuapp.com/sendTweet",
            { text: text }
        );
        setText("");
        setLoading(false);
    };

    const ButtonContent = () => {
        return loading ? (
            <IonSpinner name="dots" />
        ) : (
            <>
                Send it <IonIcon size="small" slot="end" icon={send} />
            </>
        );
    };

    return (
        <BaseCard title="Manual Tweet" subtitle="Give em some more">
            <IonCardContent>
                <IonTextarea
                    disabled={disabled}
                    placeholder="Enter the Tweet here..."
                    value={text}
                    onIonChange={(e) => setText(e.detail.value!)}
                ></IonTextarea>
                <IonButton
                    disabled={disabled || !text}
                    expand="block"
                    onClick={sendTweet}
                >
                    <ButtonContent />
                </IonButton>
            </IonCardContent>
        </BaseCard>
    );
};

export default ManualTweet;
