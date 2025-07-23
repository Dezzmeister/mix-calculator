import React from "preact";
import type { MixIngredient } from "../utils/types";
import { MixIngredientChip } from "./MixIngredientChip";

type MixIngredientListProps = {
    readonly mixIngredients: readonly MixIngredient[];
    readonly onIngredientAddedToMix?: (ingredient: MixIngredient) => void;
    readonly onIngredientHovered?: (ingredient: MixIngredient | undefined) => void;
};

export const MixIngredientList: React.FunctionComponent<MixIngredientListProps> = ({
    mixIngredients,
    onIngredientAddedToMix,
    onIngredientHovered
}) => {
    return (
        <div className="mix-ingredient-list">
            {mixIngredients.map(mixIngredient => (
                <MixIngredientChip
                    mixIngredient={mixIngredient}
                    onClick={onIngredientAddedToMix && (() => onIngredientAddedToMix(mixIngredient))}
                    onHover={onIngredientHovered && ((isHovered) => onIngredientHovered(isHovered ? mixIngredient : undefined))}
                />
            ))}
        </div>
    );
};