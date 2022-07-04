const httpmocks = require('node-mocks-http');
const contentNegotiate = require('../../../utils/sendResponse');
const storyController = require('../../../controllers/storyController');
const storyService = storyController.storyService;

//test('testing storyController', async () => {});

const mockValueStories = [
  {
    id: 1,
    authorID: 1,
    title: 'Treap (Cartesian tree)',
    description:
      'A treap is a data structure which combines binary tree and binary heap (hence the name: tree + heap  Treap).',
    topic: 'Data Structure',
    difficulty: 'hard',
  },
  {
    id: 2,
    authorID: 3,
    title: 'Fenwick Tree',
    description:
      'Fenwick tree was first described in a paper titled "A new data structure for cumulative frequency tables" (Peter M. Fenwick, 1994).',
    topic: 'Data Structure',
    difficulty: 'medium',
  },
];

describe('All tests of story controller', () => {
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
  test('testing createStory', async () => {
    const mreq = httpmocks.createRequest({
      body: { ...mockValueStories[0] },
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    jest.spyOn(storyService, 'createStory').mockImplementation((x) => {
      return x;
    });
    await storyController.createStory(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(storyService.createStory).toHaveBeenCalledTimes(1);
    expect(storyService.createStory).toHaveBeenCalledWith(mockValueStories[0]);
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(201);
    expect(mresdata.data).toEqual(mockValueStories[0]);
  });

  test('testing getAllStory', async () => {
    const mreq = httpmocks.createRequest();
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    jest.spyOn(storyService, 'getAllStory').mockReturnValue(mockValueStories);
    await storyController.getAllStory(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(storyService.getAllStory).toHaveBeenCalledTimes(1);
    expect(storyService.getAllStory).toHaveBeenCalledWith();
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(200);
    expect(mresdata.data).toEqual(mockValueStories);
  });
  test('testing getStory', async () => {
    const mreq = httpmocks.createRequest({
      params: mockValueStories[0].id,
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    jest.spyOn(storyService, 'getStory').mockReturnValue(mockValueStories[0]);
    await storyController.getStory(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(storyService.getStory).toHaveBeenCalledTimes(1);
    expect(storyService.getStory).toHaveBeenCalledWith(mreq.params.id);
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(200);
    expect(mresdata.data).toEqual(mockValueStories[0]);
  });
  test('testing getStory for not found', async () => {
    const mreq = httpmocks.createRequest({
      params: mockValueStories[0].id,
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn((err) => {
      return err;
    });

    jest.spyOn(storyService, 'getStory').mockReturnValue();
    const error = await storyController.getStory(mreq, mres, mnxt);

    expect(error.message).toBe('No Story was found with that ID');
    expect(error.statusCode).toBe(404);
    expect(error.status).toEqual('fail');
    expect(error.isOperational).toBe(true);
  });
  test('testing deleteStory', async () => {
    const mreq = httpmocks.createRequest({
      params: mockValueStories[0].id,
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    jest.spyOn(storyService, 'deleteStory').mockReturnValue([1]);
    await storyController.deleteStory(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(storyService.deleteStory).toHaveBeenCalledTimes(1);
    expect(storyService.deleteStory).toHaveBeenCalledWith(mreq.params.id);
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(204);
    expect(mresdata.data).toEqual({});
  });

  test('testing delete for not found', async () => {
    const mreq = httpmocks.createRequest({
      params: mockValueStories[0].id,
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn((err) => {
      return err;
    });

    jest.spyOn(storyService, 'deleteStory').mockReturnValue();
    const error = await storyController.deleteStory(mreq, mres, mnxt);

    expect(error.message).toBe('No Story was found with that ID');
    expect(error.statusCode).toBe(404);
    expect(error.status).toEqual('fail');
    expect(error.isOperational).toBe(true);
  });
  test('testing updateStory', async () => {
    const mreq = httpmocks.createRequest({
      params: mockValueStories[0].id,
      body: { ...mockValueStories[0] },
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn();

    jest.spyOn(storyService, 'updateStory').mockReturnValue([1]);
    await storyController.updateStory(mreq, mres, mnxt);

    const mresdata = mres._getJSONData();
    expect(storyService.updateStory).toHaveBeenCalledTimes(1);
    expect(storyService.updateStory).toHaveBeenCalledWith(mreq.params.id, mreq.body);
    expect(contentNegotiate.sendResponse).toHaveBeenCalledTimes(1);
    expect(mres.statusCode).toBe(200);
    expect(mresdata.data).toEqual({});
  });

  test('testing update for not found', async () => {
    const mreq = httpmocks.createRequest({
      params: mockValueStories[0].id,
      body: { ...mockValueStories[0] },
    });
    const mres = httpmocks.createResponse();
    const mnxt = jest.fn((err) => {
      return err;
    });

    jest.spyOn(storyService, 'updateStory').mockReturnValue([0]);
    const error = await storyController.updateStory(mreq, mres, mnxt);

    expect(error.message).toBe('No Story was found with that ID');
    expect(error.statusCode).toBe(404);
    expect(error.status).toEqual('fail');
    expect(error.isOperational).toBe(true);
  });
});
