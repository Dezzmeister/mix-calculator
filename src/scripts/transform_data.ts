/// <reference types="node" />
import type { Effect, MixerMap, Property, Vector2 } from "../utils/types";
import rawMixMaps from "./raw_mixmaps.json" with { type: "json" };
import rawMixIngredients from "./raw_ingredients.json" with { type: "json" };
import fs from "node:fs";
import path from "node:path";

type RawMixerMap = (typeof rawMixMaps)["WeedMixMap"];
type RawProperty = RawMixerMap["fields"]["Effects"]["fields"]["_items"]["m_Items"][number]["fields"]["Property"];
type RawMixIngredient = (typeof rawMixIngredients)["fields"]["_items"]["m_Items"][number];
type RawColor = RawProperty["fields"]["LabelColor"];

type MixIngredientOut = {
    readonly name: string;
    readonly propertyId: string;
};

type JSONOut = {
    mixerMap: {
        mapRadius: number;
        effects: readonly {
            position: Vector2;
            radius: number;
            property: Property;
        }[];
    };
    mixIngredients: readonly MixIngredientOut[];
};

main();

function main() {
    const dataModel: JSONOut = {
        mixerMap: mapMixerMap(rawMixMaps.MethMixMap),
        mixIngredients: rawMixIngredients.fields._items.m_Items.map(mapMixIngredient),
    };

    const dataModelPath = path.resolve(import.meta.dirname, "..", "data", "model.json");
    fs.writeFileSync(dataModelPath, JSON.stringify(dataModel, undefined, 2));
}

function mapMixIngredient(data: RawMixIngredient): MixIngredientOut {
    const rawItemDefn = data.fields.StorableItemDefinition.DefnFields;
    const properties = data.fields.Properties.fields._items.m_Items;

    return {
        name: rawItemDefn.Name.fields._firstChar,
        propertyId: properties[0].fields.ID.fields._firstChar,
    };
}

function mapMixerMap(data: RawMixerMap): MixerMap {
    const effects: Effect[] = [];

    for (const rawEffect of data.fields.Effects.fields._items.m_Items) {
        effects.push({
            position: rawEffect.fields.Position,
            radius: rawEffect.fields.Radius,
            property: mapProperty(rawEffect.fields.Property)
        });
    }

    return {
        mapRadius: data.fields.MapRadius,
        effects,
    };
}

function mapProperty(prop: RawProperty): Property {
    return {
        name: prop.fields.Name.fields._firstChar,
        id: prop.fields.ID.fields._firstChar,
        labelColor: mapColor(prop.fields.LabelColor),
        mixDirection: prop.fields.MixDirection,
        mixMagnitude: prop.fields.MixMagnitude,
    };
}

function mapColor(color: RawColor): string {
    const r = Math.floor(color.r * 255).toString(16).padStart(2, "0");
    const g = Math.floor(color.g * 255).toString(16).padStart(2, "0");
    const b = Math.floor(color.b * 255).toString(16).padStart(2, "0");
    const a = Math.floor(color.a * 255).toString(16).padStart(2, "0");

    return `#${r}${g}${b}${a}`;
}