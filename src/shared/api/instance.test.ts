import { vi } from 'vitest';

import { instance } from './instance';

vi.mock('./auth/auth.api');

describe('instance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should create an instance of axios with the correct base URL', () => {
    expect(instance.defaults.baseURL).toBeDefined();
  });
});
