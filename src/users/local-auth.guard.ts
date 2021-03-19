
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Define the guard for the logging route
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}