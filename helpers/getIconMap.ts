import { IconProps } from "@tabler/icons-react";
import * as Icons from "@tabler/icons-react";

export function getIconMap() {
    const iconMap: { [key: string]: React.ComponentType<IconProps> } = {};
    Object.keys(Icons).forEach((key) => {
        if (key.startsWith("Icon") && key !== "IconProps") {
            iconMap[key] = Icons[
                key as keyof typeof Icons
            ] as React.ComponentType<IconProps>;
        }
    });

    return iconMap;
}