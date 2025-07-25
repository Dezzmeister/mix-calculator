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
export interface Vector2 {
    readonly x: number;
    readonly y: number;
}

export interface Property {
    readonly name: string;
    readonly id: string;
    readonly labelColor: string;
    readonly mixDirection: Vector2;
    readonly mixMagnitude: number;
}

export interface Effect {
    readonly position: Vector2;
    readonly radius: number;
    readonly property: Property;
}

export interface MixerMap {
    readonly mapRadius: number;
    readonly effects: readonly Effect[];
}

export interface Reaction {
    readonly existing: Property;
    readonly output: Property;
}

export interface MixIngredient {
    readonly name: string;
    readonly property: Property;
}

export interface DataModel {
    readonly mixerMap: MixerMap;
    readonly mixIngredients: readonly MixIngredient[];
    readonly allProperties: readonly Property[];
}