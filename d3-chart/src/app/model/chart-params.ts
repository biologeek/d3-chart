export class ChartConfiguration {

    /**
     * Dimensions of SVG element
     */
    dimensions: Dimensions;
    /**
     * Bottom axis configuration
     */
    xAxis: Axis;
    /**
     * Vertical Y axes list
     */
    yAxes: Axis[];

}

export class AutoScale {
    x: boolean;
    y: boolean;
}

export class Dimensions {
    height: number;
    width: number;
    /**
    * Margins between border of SVG element and chart, axis or whatever
    */
    margins: Margins;
}

export class Axis {
    id: number;
    label: string;
    min?: any;
    max?: any;
    function?: any;
}

export class Series {
    series: Array<Serie>;
    x: MinMaxValues<number>;
    y: Array<MinMaxValues<number>>;
}

export class Serie {
    header: SerieHeader;
    values: SerieValues;
    y: Axis;
    x: Axis;
}


export class MinMaxValues<T> {
    min: T;
    max: T;
}

export class SeriesValues extends Array<SerieValues> { }

export class SerieValues extends Array<SerieValue> { }

export class SerieValue {
    x: any;
    y: number;
    /**
     * Data injected in DotConfig.colorHex function to determine dot color.
     * Can be anything provided colorHex function handles it
     */
    dotConfigData?: any;
}

export class DotConfig {

    /**
     * Returns dot color as an hexadecimal string prefixed with #
     * @param data The object that will be used to determine dot color
     */
    colorHex?: (data: any) => string;
    /**
     * Action on hover
     */
    hover?: (data: any) => void;
    /**
     * action on left click
     */
    click?: () => void;
    /**
     * Action on right click
     */
    rightClick?: () => void;

    /**
     * Diameter in px
     */
    diameter = 2;
}
export class SeriesHeaders extends Array<SerieHeader> {
}

export class SerieHeader {
    id: number;
    axis: number;
    color: string;
    line: LineType;
    maxPoints?: number;
    dotConfig?: DotConfig;
}

export enum LineType {
    LINE, DASHED, DOTTED
}

export class Margins {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
