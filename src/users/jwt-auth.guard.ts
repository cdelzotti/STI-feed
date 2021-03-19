
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
/**
 * Create a guard to apply on routes that should be
 * protected.
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}