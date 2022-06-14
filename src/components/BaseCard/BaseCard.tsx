import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonItem,
} from "@ionic/react";
import React, { ReactElement } from "react";

interface SubtitleProps {
    subtitle?: string;
}

interface BadgesProps {
    badges?: ReactElement<any, any>[];
}

interface CardProps extends BadgesProps, SubtitleProps {
    children: ReactElement<any, any>;
    title?: string;
}

const Subtitle = ({ subtitle }: SubtitleProps) =>
    subtitle ? <IonCardSubtitle>{subtitle}</IonCardSubtitle> : <></>;

const Badges = ({ badges }: BadgesProps) => {
    if (badges && badges.length !== 0) {
        const moddedBadges = badges.map((badge) =>
            React.cloneElement(badge, { slot: "end" })
        );
        return <IonItem lines="full">{moddedBadges}</IonItem>;
    } else return <></>;
};

const Card = (props: CardProps) => {
    const { title, subtitle, children, badges } = props;

    return (
        <IonCard >
            <Badges badges={badges} />
            {title || subtitle ? (
                <IonCardHeader>
                    <IonCardTitle>{title}</IonCardTitle>
                    <Subtitle subtitle={subtitle} />
                </IonCardHeader>
            ) : (
                <></>
            )}
            {children}
        </IonCard>
    );
};

const BaseCard = (props: CardProps) => {
    return <Card {...props}>{props.children}</Card>;
};

export default BaseCard;
