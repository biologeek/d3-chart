export class ChartConfiguration {

    margins: Margins;
    dimensions: Dimensions;
    data: Series;
    xAxis: Axis;
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
}

export class Series {
    headers: SeriesHeaders;
    values: SeriesValues;
    x: MinMaxValues;
    y: Array<MinMaxValues>;
}


export class MinMaxValues {
    min: number;
    max: number;
}

export class SeriesValues {

}

export class SeriesHeaders {
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
