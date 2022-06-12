class storyService {
    constructor(table) {
        this.storyTable = table;
    }
    createStory = async (req, res) => {
        const storyBody = req.body;
        const { id, title, description, authorID, topic, difficulty } =
            storyBody;
        const newStory = {
            id,
            title,
            description,
            authorID,
            topic,
            difficulty
        };

        const data = await this.storyTable.create(newStory);
        return data;
    };

    getAllStory = async (req, res) => {
        const data = await this.storyTable.findAll();
        return data;
    };

    getStory = async (req, res) => {
        const id = req.params.id;
        const data = await this.storyTable.findAll({ where: { id: id } });
        return data;
    };

    updateStory = async (req, res) => {
        const id = req.params.id;
        const data = await this.storyTable.update(req.body, {
            where: { id }
        });
        return data;
    };

    deleteStory = async (req, res) => {
        const id = req.params.id;
        const data = await this.storyTable.destroy({
            where: { id: id }
        });
        return data;
    };
}

module.exports = storyService;
