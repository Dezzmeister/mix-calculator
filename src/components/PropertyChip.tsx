import React from "preact";
import { Property } from "../utils/types";

type PropertyChipProps = {
    readonly property: Property;
};

export const PropertyChip: React.FunctionComponent<PropertyChipProps> = ({
    property
}) => {
    return (
        <div 
            key={property.id}
            className="property-chip"
        >
            <strong style={{ color: property.labelColor }}>
                {property.name}
            </strong>
        </div>
    );
};