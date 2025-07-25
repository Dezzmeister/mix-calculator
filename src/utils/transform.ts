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
import model from "../data/model.json" with { type: "json" };
import type { DataModel, MixIngredient, Property } from "./types";

let dataModel: DataModel | undefined = undefined;

export function getDataModel(): DataModel {
    if (dataModel) {
        return dataModel;
    }

    const allProperties = model.mixerMap.effects.map(e => e.property);
    const mixerMap = model.mixerMap;
    const propertyMap: Record<string, Property> = {};

    for (const prop of allProperties) {
        propertyMap[prop.id] = prop;
    }

    const mixIngredients: MixIngredient[] = model.mixIngredients.map(m => ({
        name: m.name,
        property: propertyMap[m.propertyId]
    }));

    dataModel = {
        mixerMap,
        mixIngredients,
        allProperties,
    };

    return dataModel;
}