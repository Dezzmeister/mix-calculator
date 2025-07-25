import React from "preact";
import { MixIngredient } from "../utils/types";

type MixIngredientChipProps = {
    readonly mixIngredient: MixIngredient;
    readonly onHover?: (isHovered: boolean) => void;
    readonly onClick?: () => void;
    readonly onDelete?: () => void;
};

export const MixIngredientChip: React.FunctionComponent<MixIngredientChipProps> = ({
    mixIngredient,
    onHover,
    onClick,
    onDelete
}) => {
    return (
        <div 
            key={mixIngredient.name}
            className={onClick ? "mix-ingredient-chip" : "mix-ingredient-chip-nohover"}
            onMouseEnter={() => onHover?.(true)}
            onMouseLeave={() => onHover?.(false)}
            onClick={onClick}
        >
            {onDelete && <strong className="mix-ingredient-chip-delete" onClick={() => onDelete()}>✖</strong>}
            <strong className="mix-ingredient-chip-name">{mixIngredient.name}</strong>
            <span
                style={{ color: mixIngredient.property.labelColor }}
            >
                {mixIngredient.property.name}
            </span>
        </div>
    );
};