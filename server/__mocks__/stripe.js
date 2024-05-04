
module.exports = () => ({
    customers: {
      create: jest.fn().mockResolvedValue({ id: 'mockCustomerId' }),
      list: jest.fn().mockResolvedValue({ data: [{ id: 'mockCustomerId' }] }),
      update: jest.fn().mockResolvedValue({}),
      del: jest.fn().mockResolvedValue({})
    }
  });
  