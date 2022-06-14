import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import {
    useGetHashtagsQuery,
    useGetIsAuthenticatedQuery,
} from "../../store/fetching";

interface ContentProps {}
const Content = ({}: ContentProps) => {
    const { refetch: refetchIsAuthed } = useGetIsAuthenticatedQuery();
    const { refetch: refetchHashtags } = useGetHashtagsQuery();
    const refresh = async (event: CustomEvent<RefresherEventDetail>) => {
        refetchIsAuthed();
        refetchHashtags();
        event.detail.complete();
    };

    return (
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent
                pullingIcon="lines"
                refreshingSpinner="lines"
            />
        </IonRefresher>
    );
};

const Refresher = () => {
    return <Content />;
};

export default Refresher;
