import { AuthGateway } from '@/lib/auth/models/auth.gateway';

export class FakeAuthGateway implements AuthGateway {
authUser!: string;
  getAuthUser() {
    return this.authUser;
  }
}

export const authGateway = new FakeAuthGateway();