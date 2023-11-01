import { Reflector } from '@nestjs/core';
import { UserRoles } from '../models/enums/user-roles.enum';

export const Roles = Reflector.createDecorator<UserRoles[]>();
