import { IonButton, IonSpinner } from "@ionic/react";

interface LoadingButtonProps {
    onActiveClick?: () => void;
    onInactiveClick?: () => void;
    loading: boolean;
    active?: boolean;
    activeText: string;
    inactiveText: string;
    disabledOnActive?: boolean;
    disabledOnInactive?: boolean;
    expand?: "block" | "full";
    size?: "small" | "default" | "large";
}

const LoadingButton = (props: LoadingButtonProps) => {
    const {
        onActiveClick,
        onInactiveClick,
        loading,
        active,
        activeText,
        inactiveText,
        disabledOnActive,
        disabledOnInactive,
    } = props;

    //defaults
    const expand = props.expand || "block";
    const size = props.size || "default";

    const disabledButton = {
        color: "success",
        content: inactiveText,
        disabled: false || disabledOnInactive,
        onclick: onInactiveClick,
    };

    const activeButton = {
        color: "danger",
        content: activeText,
        disabled: false || disabledOnActive,
        onclick: onActiveClick,
    };

    const loadingButton = {
        color: active ? disabledButton.color : activeButton.color,
        content: <IonSpinner name="dots" />,
        disabled: true,
        onclick: undefined,
    };

    const buttonContent = loading
        ? loadingButton
        : active
        ? activeButton
        : disabledButton;

    return (
        <IonButton
            color={buttonContent.color}
            size={size}
            expand={expand}
            slot="start"
            onClick={buttonContent.onclick}
            disabled={buttonContent.disabled}
        >
            {buttonContent.content}
        </IonButton>
    );
};

export default LoadingButton;
