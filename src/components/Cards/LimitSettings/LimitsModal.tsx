import {
    InputChangeEventDetail,
    IonBadge,
    IonButton,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonText,
} from "@ionic/react";
import { useDispatch } from "react-redux";

import { BaseCard } from "../../";
import {
    useGetIntervalsQuery,
    useSetIntervalsMutation,
} from "../../../store/fetching";
import {
    useGetInteractionsQuery,
    useSetInteractionsMutation,
} from "../../../store/fetching/interactions";
import { setLimitsState } from "../../../store/slices/limitsSlice";
import store, { useTSelector } from "../../../store/store";
import { Accordions } from "../../Accordion";
import { Modal } from "../../Modal";

import "./LimitSettings.css";

interface IntervalInputProps {
    name: string;
    amount: number;
    unit: string;
    color?: string;
}

interface InfoSegmentProps {
    amount: number;
    label: string;
}

interface InfoSegmentsProps {
    data: { [k: string]: number } | undefined;
}

interface IcreateAccordionParams {
    title: string;
    open: boolean;
    elementProps: { name: string; unit: string; amount: number }[];
}

type TcreateAccordionParams = IcreateAccordionParams[];

const InfoSegment = ({ amount, label }: InfoSegmentProps) => {
    return (
        <div className="segment">
            <IonLabel>
                <IonText color="primary">
                    <h2>{amount}</h2>
                </IonText>
                <p>{label}</p>
            </IonLabel>
        </div>
    );
};

const InfoSegments = ({ data }: InfoSegmentsProps) => {
    if (data) {
        const values = Object.values(data);
        const names = Object.keys(data);
        return (
            <div className="segmentWrapper">
                {values.map((interaction: number, i: number) => (
                    <InfoSegment
                        amount={interaction}
                        label={names[i]}
                        key={i}
                    />
                ))}
            </div>
        );
    } else return <></>;
};

const SettingsItem = ({ name, amount, unit, color }: IntervalInputProps) => {
    const dispatch = useDispatch();
    const limits = useTSelector((state) => state.limits);

    const originalName = name;
    const spacePos = name.indexOf(" ");
    name = name.toLowerCase();
    if (spacePos > 0) {
        name =
            name.slice(0, spacePos) +
            name.slice(spacePos + 1, spacePos + 2).toUpperCase() +
            name.slice(spacePos + 2); // making camel case
    }

    const handleChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const { value } = event.detail;
        const newState = { ...limits, [name]: Number(value) };
        dispatch(setLimitsState(newState));
    };

    return (
        <IonItem lines="none" color={color}>
            <IonBadge slot="end" color="primary">
                {originalName}: {amount} {unit}
            </IonBadge>
            <IonLabel position="stacked">{originalName}</IonLabel>
            <IonInput
                name={originalName}
                placeholder="Set new amount"
                type="number"
                value={limits[name] || ""}
                onIonChange={handleChange}
            ></IonInput>
        </IonItem>
    );
};

const createAccordionContent = (elements: TcreateAccordionParams) => {
    return elements.map((element) => {
        return {
            title: element.title,
            open: element.open,
            elements: element.elementProps.map((elementProps) => {
                return (
                    <SettingsItem
                        key={elementProps.name}
                        name={elementProps.name}
                        amount={elementProps.amount}
                        unit={elementProps.unit}
                    />
                );
            }),
        };
    });
};

const LimitsModal = () => {
    const Interactions = () => {
        const { data, isLoading, refetch } = useGetInteractionsQuery();
        const [setInteractions, { isLoading: setInteractionsLoading }] =
            useSetInteractionsMutation();

        const [tweets, follows, likes, comments, retweets, variation] = [
            data?.tweets || 0,
            data?.follows || 0,
            data?.likes || 0,
            data?.comments || 0,
            data?.retweets || 0,
            data?.variation || 0,
        ];

        const contentObjects = [
            {
                title: "Tweets",
                open: false,
                elementProps: [
                    { name: "Tweets", unit: "per session", amount: tweets },
                ],
            },
            {
                title: "Comments",
                open: false,
                elementProps: [
                    { name: "Comments", unit: "per session", amount: comments },
                ],
            },
            {
                title: "Retweets",
                open: false,
                elementProps: [
                    { name: "Retweets", unit: "per session", amount: retweets },
                ],
            },
            {
                title: "Likes",
                open: false,
                elementProps: [
                    { name: "Likes", unit: "per session", amount: likes },
                ],
            },
            {
                title: "Follows",
                open: false,
                elementProps: [
                    { name: "Follows", unit: "per session", amount: follows },
                ],
            },
        ];

        const interactionsButtonCB = () => {
            const limits = store.getState().limits;
            setInteractions({
                tweets: limits.tweets || tweets,
                follows: limits.follows || follows,
                likes: limits.likes || likes,
                comments: limits.comments || comments,
                retweets: limits.retweets || retweets,
                variation: limits.variation || variation,
            });
            store.dispatch(
                setLimitsState({
                    tweets: 0,
                    follows: 0,
                    likes: 0,
                    comments: 0,
                    retweets: 0,
                    variation: 0,
                    workTime: limits.workTime,
                    breakTime: limits.breakTime,
                    workVariation: limits.workVariation,
                    breakVariation: limits.breakVariation,
                })
            );
        };

        return (
            <BaseCard title="Interactions" subtitle="per work session">
                <>
                    <InfoSegments data={data} />
                    <Accordions
                        content={createAccordionContent(contentObjects)}
                        multiple
                    />
                    <SettingsItem
                        color="light"
                        name="Variation"
                        amount={variation}
                        unit="per session"
                    />
                    <IonCardContent>
                        <IonButton
                            expand="block"
                            onClick={interactionsButtonCB}
                        >
                            Set interaction values
                        </IonButton>
                    </IonCardContent>
                </>
            </BaseCard>
        );
    };

    const Intervals = () => {
        const { data } = useGetIntervalsQuery();
        const [setIntervals, { isLoading: setIntervalsLoading }] =
            useSetIntervalsMutation();

        const [workTime, workVariation, breakTime, breakVariation] = [
            data?.workTime || 0,
            data?.workVariation || 0,
            data?.breakTime || 0,
            data?.breakVariation || 0,
        ];

        const contentObjects = [
            {
                title: "Work",
                open: false,
                elementProps: [
                    {
                        name: "Work time",
                        unit: "minutes",
                        amount: workTime,
                    },
                    {
                        name: "Work variation",
                        unit: "minutes",
                        amount: workVariation,
                    },
                ],
            },
            {
                title: "Break",
                open: false,
                elementProps: [
                    {
                        name: "Break time",
                        unit: "minutes",
                        amount: breakTime,
                    },
                    {
                        name: "Break variation",
                        unit: "minutes",
                        amount: breakVariation,
                    },
                ],
            },
        ];

        const intervalsButtonCB = () => {
            const limits = store.getState().limits;
            setIntervals({
                workTime: limits.workTime || workTime,
                workVariation: limits.workVariation || workVariation,
                breakTime: limits.breakTime || breakTime,
                breakVariation: limits.breakVariation || breakVariation,
            });
            store.dispatch(
                setLimitsState({
                    tweets: limits.tweets,
                    follows: limits.follows,
                    likes: limits.likes,
                    comments: limits.comments,
                    retweets: limits.retweets,
                    variation: limits.randomVariation,
                    workTime: 0,
                    breakTime: 0,
                    workVariation: 0,
                    breakVariation: 0,
                })
            );
        };

        return (
            <BaseCard title="Intervals" subtitle="in minutes">
                <>
                    <InfoSegments data={data} />
                    <Accordions
                        content={createAccordionContent(contentObjects)}
                        multiple
                    />
                    <IonCardContent>
                        <IonButton expand="block" onClick={intervalsButtonCB}>
                            Set interval values
                        </IonButton>
                    </IonCardContent>
                </>
            </BaseCard>
        );
    };

    const Breakdown = () => {
        const { data: interactionData } = useGetInteractionsQuery();
        const { data: intervalData } = useGetIntervalsQuery();

        function getIntervals() {
            if (intervalData) {
                return (
                    1440 / (intervalData?.workTime + intervalData?.breakTime)
                );
            }
        }

        const floorMultiplication = (a: number, b: number) => Math.floor(a * b);
        const floorDivide = (a: number, b: number) => Math.floor(a / b);

        const intervals = getIntervals();
        if (intervals && interactionData && intervalData) {
            const amountData = {
                Follows: floorMultiplication(
                    interactionData.follows,
                    intervals
                ),
                Likes: floorMultiplication(interactionData.likes, intervals),
                Retweets: floorMultiplication(
                    interactionData.retweets,
                    intervals
                ),
            };

            const timingData = {
                Follows: floorDivide(
                    intervalData.workTime,
                    interactionData.follows
                ),
                Likes: floorDivide(
                    intervalData.workTime,
                    interactionData.likes
                ),
                Retweets: floorDivide(
                    intervalData.workTime,
                    interactionData.retweets
                ),
            };

            return (
                <BaseCard
                    title="Breakdown"
                    subtitle="evaluated stats for a day"
                >
                    <>
                        <IonLabel>
                            <p style={{ marginLeft: "20px" }}>Amounts</p>
                        </IonLabel>
                        <InfoSegments data={amountData} />

                        <IonLabel>
                            <p style={{ marginLeft: "20px" }}>
                                Interaction every X minutes
                            </p>
                        </IonLabel>
                        <InfoSegments data={timingData} />
                    </>
                </BaseCard>
            );
        } else return <></>;
    };

    return (
        <Modal
            enableScroll
            fullscreen
            title="Limit & interval settings"
            buttonText="Limit settings"
        >
            <>
                <Breakdown />
                <Interactions />
                <Intervals />
            </>
        </Modal>
    );
};

export default LimitsModal;
