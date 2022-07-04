const httpmocks = require('node-mocks-http');
const contentNegotiate = require('../../../utils/sendResponse');
const userController = require('../../../controllers/userController');
const userService = userController.userService;
// mock value for all users
const mockValueUsers = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@gmail.com',
    password: '$2b$10$d/917mjPpFTCjMX6GBj6FukYdhBWA/w4P6MSAX5idJlBf9znWlG6e',
    updatedAt: '2022-06-28T06:18:22.634Z',
    createdAt: '2022-06-28T06:18:22.634Z',
  },
  {
    id: 2,
    name: 'Alice',
    email: 'Alice@gmail.com',
    password: '$2b$10$xQXTo8b66iNtreqqoROcweq4GmGsQv3TdR3N94jLMWLq9Ex85E/VG',
    updatedAt: '2022-06-28T06:19:40.354Z',
    createdAt: '2022-06-28T06:19:40.354Z',
  },
];
describe('All tests of user controller', () => {
  beforeEach(() => {
    jest.spyOn(contentNegotiate, 'sendResponse').mockImplementation((mreq, mres, statusCode, data, message) => {
      mres.statusCode = statusCode || 200;
      return mres.status(statusCode).json({
        status: 'success',
        message: message,
        data: data,
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('testing getUser', async () => {
    const mreq = httpmocks.createRequest({
      params: {
        id: mockValueUsers[0].id,
      },
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    jest.spyOn(userService, 'getUser').mockReturnValue(mockValueUsers[0]);
    await userController.getUser(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(userService.getUser).toHaveBeenCalledTimes(1);
    expect(userService.getUser).toHaveBeenCalledWith(mockValueUsers[0].id);
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(200);
    expect(mresdata.data).toEqual(mockValueUsers[0]);
  });
  test('testing getUser for error', async () => {
    const mreq = httpmocks.createRequest({
      params: {
        id: mockValueUsers[0].id,
      },
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn((err) => {
      return err;
    });

    jest.spyOn(userService, 'getUser').mockReturnValue();
    const error = await userController.getUser(mreq, mres, mnxt);

    expect(error.message).toBe('No user was found with that ID');
    expect(error.statusCode).toBe(404);
    expect(error.status).toEqual('fail');
    expect(error.isOperational).toBe(true);
  });
  test('testing getAllUser', async () => {
    jest.spyOn(userService, 'getAllUser').mockReturnValue(mockValueUsers);

    const mreq = httpmocks.createRequest();
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    await userController.getAllUser(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(userService.getAllUser).toHaveBeenCalledTimes(1);
    expect(userService.getAllUser).toHaveBeenCalledWith();
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(200);
    expect(mresdata.data).toEqual(mockValueUsers);
  });
  test('testing updateUser', async () => {
    const mres = httpmocks.createResponse();
    const mreq = httpmocks.createRequest({
      body: {
        email: mockValueUsers[0].email,
        name: mockValueUsers[0].name,
      },
      params: {
        id: mockValueUsers[0].id,
      },
    });

    const mnxt = jest.fn();
    jest.spyOn(userService, 'updateUser').mockReturnValue([1]); // ekhane problem chilo

    await userController.updateUser(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();

    expect(userService.updateUser).toHaveBeenCalledTimes(1);
    expect(userService.updateUser).toHaveBeenCalledWith(mockValueUsers[0].id, mreq.body);
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(200);
    expect(mresdata.data).toEqual({});
  });
  test('testing updateUser for error', async () => {
    const mreq = httpmocks.createRequest();
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn((err) => {
      return err;
    });

    jest.spyOn(userService, 'updateUser').mockReturnValue([0]);
    const error = await userController.updateUser(mreq, mres, mnxt);

    expect(error.message).toBe('No user was found with that ID');
    expect(error.statusCode).toBe(404);
    expect(error.status).toEqual('fail');
    expect(error.isOperational).toBe(true);
  });
  test('Testing deleteUser', async () => {
    const mreq = httpmocks.createRequest({
      params: {
        id: mockValueUsers[0].id,
      },
    });
    const mres = httpmocks.createResponse();
    const nxt = jest.fn();
    jest.spyOn(userService, 'deleteUser').mockReturnValue([1]);

    await userController.deleteUser(mreq, mres, nxt);

    const mresData = mres._getJSONData();

    expect(userService.deleteUser).toHaveBeenCalledTimes(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(mockValueUsers[0].id);
    expect(mres.statusCode).toBe(204);
    expect(mresData.data).toEqual({});
  });

  test('testing deleteUser for error', async () => {
    const mreq = httpmocks.createRequest();
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn((err) => {
      return err;
    });

    jest.spyOn(userService, 'deleteUser').mockReturnValue();
    const error = await userController.deleteUser(mreq, mres, mnxt);

    expect(error.message).toBe('No user was found with that ID');
    expect(error.statusCode).toBe(404);
    expect(error.status).toEqual('fail');
    expect(error.isOperational).toBe(true);
  });
});
//test('Testing userController', async () => {});
