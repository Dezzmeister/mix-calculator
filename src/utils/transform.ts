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