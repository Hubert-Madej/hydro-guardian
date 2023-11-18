export interface TimeSeriesPoint {
  measurementName: string;
  tagName: string;
  tagValue: string;
  fields: {
    [key: string]: string;
  };
  timestamp: string;
}
