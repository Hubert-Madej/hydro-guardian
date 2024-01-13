import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetadataDto } from './page-metadata.dto';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetadataDto })
  readonly metadata: PageMetadataDto;

  constructor(data: T[], metadata: PageMetadataDto) {
    this.data = data;
    this.metadata = metadata;
  }
}
