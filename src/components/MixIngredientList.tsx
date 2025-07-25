import React from "preact";
import type { MixIngredient } from "../utils/types";
import { MixIngredientChip } from "./MixIngredientChip";

type MixIngredientListProps = {
    readonly mixIngredients: readonly MixIngredient[];
    readonly onIngredientAddedToMix?: (ingredient: MixIngredient) => void;
    readonly onIngredientHovered?: (ingredient: MixIngredient | undefined) => void;
    readonly onIngredientDeleted?: (index: number) => void;
};

export const MixIngredientList: React.FunctionComponent<MixIngredientListProps> = ({
    mixIngredients,
    onIngredientAddedToMix,
    onIngredientHovered,
    onIngredientDeleted
}) => {
    return (
        <div className="mix-ingredient-list">
            {mixIngredients.map((mixIngredient, i) => (
                <MixIngredientChip
                    mixIngredient={mixIngredient}
                    onClick={
                        onIngredientAddedToMix &&
                        (() => onIngredientAddedToMix(mixIngredient))
                    }
                    onHover={
                        onIngredientHovered &&
                        ((isHovered) => onIngredientHovered(isHovered ? mixIngredient : undefined))
                    }
                    onDelete={
                        onIngredientDeleted &&
                        (() => onIngredientDeleted(i))
                    }
                />
            ))}
        </div>
    );
};