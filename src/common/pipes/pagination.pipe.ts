import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  public offset: number;
  public limit: number;

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      return value;
    }

    this.offset = value?.offset ? parseInt(value.offset, 10) : 0;
    this.limit = value?.limit ? parseInt(value.limit, 10) : 500; // Setting default to 500

    if (isNaN(this.offset) || isNaN(this.limit)) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    return this; // Return the pipe instance itself
  }
}
