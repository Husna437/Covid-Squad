export interface IConfirmationModal {
    title: string;
    message: string;
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
    isDanger?: boolean;
    primaryButtonAction?: Function;
    secondaryButtonAction?: Function;
    hideCloseButton?: boolean;
}
