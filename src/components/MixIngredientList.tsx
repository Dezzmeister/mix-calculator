/*
 * This file is part of mix-calculator, a Schedule One mix calculator.
 * Copyright (C) 2024  Joe Desmond
 *
 * mix-calculator is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * mix-calculator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with mix-calculator.  If not, see <https://www.gnu.org/licenses/>.
 */
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