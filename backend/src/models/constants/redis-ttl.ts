import { RedisKeys } from '../enums/redis-keys.enum';

export const RedisTTL: { [key: string]: number } = {
  [RedisKeys.VERIFICATION_CODE]: 3600000,
};
