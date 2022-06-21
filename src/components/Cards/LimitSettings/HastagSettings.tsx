import {
    IonIcon,
    IonLabel,
    IonInput,
    IonButton,
    IonChip,
    InputChangeEventDetail,
    IonCardContent,
    IonSkeletonText,
    IonSpinner,
} from "@ionic/react";
import { addOutline, closeCircle } from "ionicons/icons";
import { useState } from "react";
import {
    useGetHashtagsQuery,
    useSetHashtagsMutation,
} from "../../../store/fetching";
import { useDeleteHashtagMutation } from "../../../store/fetching/hashtags";
import { BaseCard } from "../../BaseCard";
import { Modal } from "../../Modal";

type ChangeEvent = CustomEvent<InputChangeEventDetail>;

const HashtagSettings = () => {
    // prettier-ignore
    const [setHashtags, { isLoading: isSetHashtagsLoading }] = useSetHashtagsMutation();
    //prettier-ignore
    const { data: hashtags, isLoading: isHashtagsLoading, refetch: refetchTags } = useGetHashtagsQuery();
    const [deleteHashtag] = useDeleteHashtagMutation();

    const HashtagChip = ({ text }: { text: string }) => {
        function chipClick() {
            deleteHashtag(text);
        }

        return (
            <IonChip color="primary" onClick={chipClick}>
                <IonLabel style={{ overflow: "unset" }}>#{text}</IonLabel>
                <IonIcon icon={closeCircle} />
            </IonChip>
        );
    };

    const HashtagChips = ({ hashtags }: { hashtags?: string[] }) => {
        const chips =
            hashtags && hashtags.length > 0 ? (
                <p>
                    {hashtags.map((hashtag, i) => (
                        <HashtagChip key={i} text={hashtag} />
                    ))}
                </p>
            ) : (
                <IonLabel>
                    <p style={{ textAlign: "center" }}>
                        No hashtags added or found
                    </p>
                </IonLabel>
            );

        const TagsOrLoading = isHashtagsLoading ? (
            <IonCardContent>
                <IonSkeletonText animated />
            </IonCardContent>
        ) : (
            <IonCardContent>{chips}</IonCardContent>
        );

        return <BaseCard>{TagsOrLoading}</BaseCard>;
    };

    const HashtagInput = () => {
        const [hashtagInput, setHashtagInput] = useState("");
        function handleHashtagInput(e: ChangeEvent) {
            const value = e.detail.value || "";
            setHashtagInput(value);
        }
        function addHashtags() {
            const hashtagArr = hashtagInput
                .split(",")
                .map(
                    (h) => h.trim().charAt(0).toUpperCase() + h.trim().slice(1)
                );
            setHashtags(hashtagArr.join(","));
            setHashtagInput("");
        }
        return (
            <BaseCard title="Hashtag input" subtitle="Add hashtags">
                <IonCardContent>
                    <IonLabel position="stacked">Enter hashtags here</IonLabel>
                    <IonInput
                        placeholder="Separate hashtags with commas (one, two, three)"
                        onIonChange={handleHashtagInput}
                        value={hashtagInput}
                        onKeyDown={(e) => {
                            e.key === "Enter" && addHashtags();
                        }}
                    />

                    <IonButton
                        expand="block"
                        disabled={!hashtagInput}
                        onClick={addHashtags}
                    >
                        {isSetHashtagsLoading ? (
                            <IonSpinner name="dots" />
                        ) : (
                            <IonIcon icon={addOutline} />
                        )}
                    </IonButton>
                </IonCardContent>
            </BaseCard>
        );
    };

    return (
        <Modal
            title="Hashtag settings"
            buttonText="Hashtag settings"
            openCallback={refetchTags}
            initialBreakpoint={0.75}
            breakpoints={[0.5, 0.75]}
        >
            <>
                <HashtagChips hashtags={hashtags} />
                <HashtagInput />
            </>
        </Modal>
    );
};

export default HashtagSettings;
