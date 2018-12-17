export class ChartConfiguration {

    margins: Margins;
    data: Series;
    xAxis: Axis;

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
