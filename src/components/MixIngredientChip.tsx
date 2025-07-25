/*
 * This file is part of mix-calculator, a Schedule One mix calculator.
 * Copyright (C) 2025  Joe Desmond
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