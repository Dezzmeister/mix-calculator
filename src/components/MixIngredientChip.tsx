import React from "preact";
import { MixIngredient } from "../utils/types";

type MixIngredientChipProps = {
    readonly mixIngredient: MixIngredient;
    readonly onHover?: (isHovered: boolean) => void;
    readonly onClick?: () => void;
};

export const MixIngredientChip: React.FunctionComponent<MixIngredientChipProps> = ({
    mixIngredient,
    onHover,
    onClick
}) => {
    return (
        <div 
            key={mixIngredient.itemDefn.id}
            className={onClick ? "mix-ingredient-chip" : "mix-ingredient-chip-nohover"}
            onMouseEnter={() => onHover?.(true)}
            onMouseLeave={() => onHover?.(false)}
            onClick={onClick}
        >
            <strong>{mixIngredient.itemDefn.name}</strong>
            <span
                style={{ color: mixIngredient.properties[0].labelColor }}
            >
                {mixIngredient.properties[0].name}
            </span>
        </div>
    );
};