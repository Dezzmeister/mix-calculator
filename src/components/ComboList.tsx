import React from "preact";
import combomap from "../data/combomap.json" with { type: "json" };
import { Property } from "../utils/types";
import { PropertyChip } from "./PropertyChip";

type ComboListProps = {
    readonly allProperties: readonly Property[];
    readonly desiredProperty: Property;
};

export const ComboList: React.FunctionComponent<ComboListProps> = ({
    allProperties,
    desiredProperty
}) => {
    if (!(desiredProperty.name in combomap)) {
        return (
            <div className="combo-list">
                <h3>How to make <strong style={{ color: desiredProperty.labelColor }}>
                        {desiredProperty.name}
                </strong></h3>
                <p>It's impossible to create a mix with this property legitimately.</p>
            </div>
        );
    }

    const combos = combomap[desiredProperty.name as keyof typeof combomap];
    const comboProperties = combos.map(({ existingProperty, newProperty }) => [
        allProperties.find(p => p.name === existingProperty)!,
        allProperties.find(p => p.name === newProperty)!
    ]);

    return (
        <div className="combo-list">
            <h3>How to make <strong style={{ color: desiredProperty.labelColor }}>
                    {desiredProperty.name}
            </strong></h3>
            {comboProperties.map(([existingProp, newProp], i) => (
                <div key={i} className="combo-list-row">
                    <PropertyChip property={existingProp} />
                    <div className="connector">
                        +
                    </div>
                    <PropertyChip property={newProp} />
                </div>
            ))}
            <p>
                Add an ingredient with the property on the right
                to a mix with the property on the left.
            </p>
        </div>
    );
};