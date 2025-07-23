/// <reference types="node" />
import type { Effect, ItemDefinition, MixerMap, MixIngredient, ProductManager, Property } from "../utils/types";
import rawMixMaps from "./raw_mixmaps.json" with { type: "json" };
import rawMixIngredients from "./raw_ingredients.json" with { type: "json" };
import fs from "node:fs";
import path from "node:path";

type RawMixerMap = (typeof rawMixMaps)["WeedMixMap"];
type RawProperty = RawMixerMap["fields"]["Effects"]["fields"]["_items"]["m_Items"][number]["fields"]["Property"];
type RawMixIngredient = (typeof rawMixIngredients)["fields"]["_items"]["m_Items"][number];
type RawColor = RawProperty["fields"]["LabelColor"];

main();

function main() {
    const productManager: ProductManager = {
        weedMixMap: mapMixerMap(rawMixMaps.WeedMixMap),
        methMixMap: mapMixerMap(rawMixMaps.MethMixMap),
        cokeMixMap: mapMixerMap(rawMixMaps.CokeMixMap),
        mixIngredients: rawMixIngredients.fields._items.m_Items.map(mapMixIngredient),
    };

    const productManagerPath = path.resolve(import.meta.dirname, "..", "data", "product_manager.json");
    fs.writeFileSync(productManagerPath, JSON.stringify(productManager, undefined, 2));
}

function mapMixIngredient(data: RawMixIngredient): MixIngredient {
    const rawItemDefn = data.fields.StorableItemDefinition.DefnFields;
    const properties = data.fields.Properties.fields._items.m_Items.map(mapProperty);
    const itemDefn: ItemDefinition = {
        name: rawItemDefn.Name.fields._firstChar,
        description: rawItemDefn.Description.fields._firstChar,
        id: rawItemDefn.ID.fields._firstChar,
        category: rawItemDefn.Category,
        labelDisplayColor: mapColor(rawItemDefn.LabelDisplayColor),
    };

    return {
        itemDefn,
        properties,
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
        description: prop.fields.Description.fields._firstChar,
        id: prop.fields.ID.fields._firstChar,
        tier: prop.fields.Tier,
        addictiveness: prop.fields.Addictiveness,
        productColor: mapColor(prop.fields.ProductColor),
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