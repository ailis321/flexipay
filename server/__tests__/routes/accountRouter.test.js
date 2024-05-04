const request = require('supertest');
const app = require('../../app'); 

describe('POST /api/accounts/login', () => {
  it('should authenticate the user and check onboarding status', async () => {
    
    const loginData = { email: 'TestAccount@test.com', password: 'Testing123$' };

    const response = await request(app)
      .post('/api/accounts/login')
      .send(loginData)
      .expect(200);

    
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('onboardingComplete', expect.any(Boolean));
  });
});
