export interface Vector2 {
    readonly x: number;
    readonly y: number;
}

export interface Property {
    readonly name: string;
    readonly description: string;
    readonly id: string;
    readonly tier: number;
    readonly addictiveness: number;
    readonly productColor: string;
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

export interface ItemDefinition {
    readonly name: string;
    readonly description: string;
    readonly id: string;
    readonly category: number;
    readonly labelDisplayColor: string;
}

export interface MixIngredient {
    readonly itemDefn: ItemDefinition;
    readonly properties: readonly Property[];
}

export interface ProductManager {
    readonly weedMixMap: MixerMap;
    readonly methMixMap: MixerMap;
    readonly cokeMixMap: MixerMap;
    readonly mixIngredients: readonly MixIngredient[];
}