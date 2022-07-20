class storyService {
  constructor(table) {
    this.storyTable = table;
  }
  async createStory(storyBody) {
    const { title, description, authorID, topic, difficulty } = storyBody;
    const newStory = {
      title,
      description,
      authorID,
      topic,
      difficulty,
    };
    console.log(`create story a asi @service before model func`);

    console.log(newStory);
    const data = await this.storyTable.create(newStory);
    console.log(`create story a asi @service after model func`);
    console.log(data);
    return data;
  }

  async getAllStory() {
    const data = await this.storyTable.findAll();
    return data;
  }
  async getAllStoryByAuthorID(id) {
    console.log(id);
    console.log(`getAllStoryByAuthorID a asi`);
    const data = await this.storyTable.findAll({ where: { authorID: id } });

    console.log(`getAllStoryByAuthorID a asi after`);
    console.log(data);
    return data;
  }

  async getStory(id) {
    const data = await this.storyTable.findOne({ where: { id } });
    return data;
  }
  async updateStory(id, storyBody) {
    console.log(`updatestory service a asi`);
    console.log('storybody' + storyBody);
    const { title, description, topic, difficulty } = storyBody;
    const temp = {
      title,
      description,
      topic,
      difficulty,
    };
    const data = await this.storyTable.update(temp, {
      where: { id },
    });
    return data;
  }
  async deleteStory(id) {
    const data = await this.storyTable.destroy({
      where: { id },
    });
    return data;
  }
  async getAuthorIdByStoryId(id) {
    const data = await this.storyTable.findOne({
      where: {
        id,
      },
    });
    //console.log(data);
    return data;
  }
}

module.exports = storyService;
