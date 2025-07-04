import * as user from '../user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'hello',
        password: 'hi'
      }
    };

    const res = {
      json: jest.fn((data) => {
        expect(data.token).toBeTruthy(); // check that a token exists
      }),
      status: jest.fn().mockReturnThis(), // allow chaining if needed
    };

    await user.createNewUser(req as any, res as any,()=>{}); // cast as any to bypass TS for test
  });
});
