import { useState } from "react"

interface UseDisclosureParamOptions {
    onOpen?: () => void;
    onClose?: () => void;
}

export function useDisclosure(initialState: boolean, options?: UseDisclosureParamOptions) {
    const [ opened, setOpened ] = useState(initialState);
    
    function handleOpen() {
        if (opened) {
            return;
        }

        setOpened(true);

        if (options && options.onOpen) {
            options.onOpen();
        }
    }

    function handleClose() {
        if (!opened) {
            return;
        }

        setOpened(false);

        if (options && options.onClose) {
            options.onClose();
        }
    }

    function handleToggle() {
        const toggledState = !opened;

        setOpened(toggledState);

        if (options && toggledState && options.onOpen) {
            options.onOpen();
        } else if (options && !toggledState && options.onClose) {
            options.onClose();
        }
    }

    return [
        opened,
        {
            open: handleOpen,
            close: handleClose,
            toggle: handleToggle
        }
    ] as const;

}