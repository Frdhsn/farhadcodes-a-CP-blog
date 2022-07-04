const StoryService = require('../../../services/storyServices');
const StoryTable = require('../../../models/storymodel');

const storyService = new StoryService(StoryTable);

// mock value for all stories
const mockValueStories = [
  {
    authorID: 1,
    title: 'Treap (Cartesian tree)',
    description:
      'A treap is a data structure which combines binary tree and binary heap (hence the name: tree + heap  Treap).',
    topic: 'Data Structure',
    difficulty: 'hard',
  },
  {
    authorID: 3,
    title: 'Fenwick Tree',
    description:
      'Fenwick tree was first described in a paper titled "A new data structure for cumulative frequency tables" (Peter M. Fenwick, 1994).',
    topic: 'Data Structure',
    difficulty: 'medium',
  },
];

describe('All tests of story service', () => {
  test('Testing getAllStory', async () => {
    jest.spyOn(StoryTable, 'findAll').mockReturnValue(mockValueStories);
    const stories = await storyService.getAllStory();
    expect(StoryTable.findAll).toHaveBeenCalledTimes(1);
    expect(StoryTable.findAll).toHaveBeenCalledWith();
    expect(stories).toBe(mockValueStories);
  });

  test('Testing getStory', async () => {
    jest.spyOn(StoryTable, 'findOne').mockReturnValue(mockValueStories[1]);
    const story = await storyService.getStory(1);
    expect(story).toBe(mockValueStories[1]);
  });

  test('Testing updateStory', async () => {
    jest.spyOn(StoryTable, 'update').mockReturnValue(1);
    const story = await storyService.updateStory(1, mockValueStories[1]);
    expect(story).toBe(1);
  });

  test('Testing deleteStory', async () => {
    jest.spyOn(StoryTable, 'destroy').mockReturnValue();
    const story = await storyService.deleteStory(1);
    expect(story).toBe();
  });
  test('Testing createStory', async () => {
    jest.spyOn(StoryTable, 'create').mockImplementation((x) => {
      return x;
    });

    const story = await storyService.createStory(mockValueStories[0]);
    const { authorID, title, description, topic, difficulty } = mockValueStories[0];
    expect(story).toEqual({ authorID, title, description, topic, difficulty });
  });
  test('Testing getAuthorIDbyStoryId', async () => {
    jest.spyOn(StoryTable, 'findOne').mockReturnValue(mockValueStories[0].authorID);

    const data = await storyService.getAuthorIdByStoryId(1);
    expect(data).toBe(mockValueStories[0].authorID);
  });
});

//test('test story service', () => {});
