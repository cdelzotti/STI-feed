import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class MessageRequest implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata): any;
}
