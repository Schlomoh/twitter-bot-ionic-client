import {
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonList,
} from "@ionic/react";

interface AccordionContentProps {
    content: {
        title: string;
        open?: boolean;
        elements: React.ReactElement<any, any> | React.ReactElement<any, any>[];
    }[];
}

interface AccordionProps extends AccordionContentProps {
    multiple?: boolean;
}

const MappedAccordions = ({ content }: AccordionContentProps) => {
    return (
        <>
            {content.map((c, i) => (
                <IonAccordion key={i} value={c.title}>
                    <IonItem slot="header">
                        <IonLabel>{c.title}</IonLabel>
                    </IonItem>
                    <IonList slot="content">{c.elements}</IonList>
                </IonAccordion>
            ))}
        </>
    );
};

const Accordions = ({ content, multiple }: AccordionProps) => {
    let value = "";
    content.forEach((c) => (c.open ? (value = c.title) : (value = value)));
    return (
        <IonAccordionGroup multiple={multiple} value={value}>
            <MappedAccordions content={content} />
        </IonAccordionGroup>
    );
};

export default Accordions;
