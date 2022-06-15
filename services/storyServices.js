class storyService {
  constructor(table) {
    this.storyTable = table;
  }
  async createStory(storyBody) {
    const { id, title, description, authorID, topic, difficulty } = storyBody;
    const newStory = {
      id,
      title,
      description,
      authorID,
      topic,
      difficulty,
    };

    const data = await this.storyTable.create(newStory);
    return data;
  }

  async getAllStory() {
    const data = await this.storyTable.findAll();
    return data;
  }

  async getStory(id) {
    const data = await this.storyTable.findOne({ where: { id } });
    return data;
  }
  async updateStory(id, storyBody) {
    const data = await this.storyTable.update(storyBody, {
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
}

module.exports = storyService;
