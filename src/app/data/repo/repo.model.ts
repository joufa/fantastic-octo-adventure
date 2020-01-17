export interface TimeSpanDto {
  start: string;
  end: string;
}

export interface TimeCollectionDto {
  day: Date;
  spans: TimeSpanDto[];
}

