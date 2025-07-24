import React from "preact";
import combomap from "../data/combomap.json" with { type: "json" };
import { Property } from "../utils/types";
import { PropertyChip } from "./PropertyChip";
import { getDataModel } from "../utils/transform";

type ComboListProps = {
    readonly desiredProperty: Property;
};

export const ComboList: React.FunctionComponent<ComboListProps> = ({
    desiredProperty
}) => {
    if (!(desiredProperty.id in combomap)) {
        return (
            <div className="combo-list">
                <h3>How to make <strong style={{ color: desiredProperty.labelColor }}>
                        {desiredProperty.name}
                </strong></h3>
                <p>It's impossible to create a mix with this property legitimately.</p>
            </div>
        );
    }

    const combos = combomap[desiredProperty.id as keyof typeof combomap];
    const allProperties = getDataModel().allProperties;
    const comboProperties = combos.map(({ existingProperty, newProperty }) => [
        allProperties.find(p => p.id === existingProperty)!,
        allProperties.find(p => p.id === newProperty)!
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