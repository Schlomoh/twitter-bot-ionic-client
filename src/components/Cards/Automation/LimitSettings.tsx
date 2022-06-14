import {
    InputChangeEventDetail,
    InputCustomEvent,
    IonBadge,
    IonButton,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
} from "@ionic/react";
import { useDispatch } from "react-redux";

import { BaseCard } from "../../";
import { useGetIntervalsQuery } from "../../../store/fetching";
import { useGetInteractionsQuery } from "../../../store/fetching/interactions";
import { setLimitsState } from "../../../store/slices/limitsSlice";
import store, { useTSelector } from "../../../store/store";
import { Accordions } from "../../Accordion";
import { Modal } from "../../Modal";

interface IntervalInputProps {
    name: string;
    amount: number;
    unit: string;
    color?: string;
}

const LimitSettings = () => {
    const dispatch = useDispatch();
    
    const SettingsItem = ({
        name,
        amount,
        unit,
        color,
    }: IntervalInputProps) => {
        const limits = useTSelector((state) => state.limits);
        const originalName = name;
        name = name.toLowerCase();
        const spacePos = name.indexOf(" ");
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
                <IonBadge slot="end" color="medium">
                    {originalName}: {amount} {unit}
                </IonBadge>
                <IonLabel position="stacked">{originalName}</IonLabel>
                <IonInput
                    name={originalName}
                    placeholder="Set amount"
                    type="number"
                    value={limits[name] || ""}
                    onIonChange={handleChange}
                ></IonInput>
            </IonItem>
        );
    };

    const createAccordionContent = (
        elements: {
            title: string;
            open: boolean;
            elementProps: { name: string; unit: string; amount: number }[];
        }[]
    ) => {
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

    const Interactions = () => {
        const { data } = useGetInteractionsQuery();

        const [follows, likes, comments, retweets, variation] = [
            data?.follows || 0,
            data?.likes || 0,
            data?.comments || 0,
            data?.retweets || 0,
            data?.randomVariation || 0,
        ];

        const contentObjects = [
            {
                title: "Follows",
                open: false,
                elementProps: [
                    { name: "Follows", unit: "per session", amount: follows },
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
        ];

        const setInteractions = () => {

        };

        return (
            <BaseCard title="Interactions" subtitle="per work session">
                <>
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
                        <IonButton expand="block" onClick={setInteractions}>
                            Set interaction values
                        </IonButton>
                    </IonCardContent>
                </>
            </BaseCard>
        );
    };

    const Intervals = () => {
        // const { data } = useGetIntervalsQuery();
        const data = {
            work: { time: 0, randomizeSpan: 0 },
            break: { time: 0, randomizeSpan: 0 },
        };

        const [workTime, workVariation, breakTime, breakVariation] = [
            data?.work.time || 0,
            data?.work.randomizeSpan || 0,
            data?.break.time || 0,
            data?.break.randomizeSpan || 0,
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

        const setIntervals = () => {
            const limits = store.getState().limits;
            const intervalsObject = {
                workTime: limits.workTime,
                breakTime: limits.breakTime,
                workVariation: limits.workVariation,
                breakVariation: limits.breakVariation,
            };
            console.log(intervalsObject);
        };

        return (
            <BaseCard title="Intervals" subtitle="in minutes">
                <>
                    <Accordions
                        content={createAccordionContent(contentObjects)}
                        multiple
                    />
                    <IonCardContent>
                        <IonButton expand="block" onClick={setIntervals}>
                            Set interval values
                        </IonButton>
                    </IonCardContent>
                </>
            </BaseCard>
        );
    };

    return (
        <Modal
            enableScroll
            fullscreen
            title="Limit & interval settings"
            buttonText="Limit settings"
        >
            <>
                <Interactions />
                <Intervals />
            </>
        </Modal>
    );
};

export default LimitSettings;
