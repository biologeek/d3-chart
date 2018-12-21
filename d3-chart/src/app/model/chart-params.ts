export class ChartConfiguration {
    /**
     * Margins between border of SVG element and chart, axis or whatever
     */
    margins: Margins;
    /**
     * Dimensions of SVG element
     */
    dimensions: Dimensions;
    /**
     * Series of data
     */
    data: Series;
    /**
     * Bottom axis configuration
     */
    xAxis: Axis;
    /**
     * Vertical Y axes list
     */
    yAxes: Axis[];

}

export class Dimensions {
    height: number;
    width: number;
}

export class Axis {
    id: number;
    label: string;
    min: number;
    max: number;
    function?: any;
}

export class Series {
    headers: SeriesHeaders;
    values: SeriesValues;
    x: MinMaxValues;
    y: Array<MinMaxValues>;
}

export class Serie {
    header: SerieHeader;
    values: SerieValues;
    y: Axis;
    x: Axis;
}


export class MinMaxValues {
    min: number;
    max: number;
}

export class SeriesValues extends Array<SerieValues> {}

export class SerieValues extends Array<SerieValue> {}

export class SerieValue {
    x: number;
    y: number;
}
export class SeriesHeaders extends Array<SerieHeader> {
}

export class SerieHeader {
    id: number;
    axis: number;
    color: string;
}

export class Margins {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
