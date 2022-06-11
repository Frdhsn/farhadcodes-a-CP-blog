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

        try {
            const data = await this.storyTable.create(newStory);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    getAllStory = async (req, res) => {
        try {
            const data = await this.storyTable.findAll();
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    getStory = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await this.storyTable.findAll({ where: { id: id } });
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    updateStory = async (req, res) => {
        try {
            const id = req.params.id;
            await this.storyTable.update({ where: { id: id } });
        } catch (err) {
            console.log(err);
        }
    };

    deleteStory = async (req, res) => {
        try {
            const id = req.params.id;
            await this.storyTable.destroy({ where: { id: id } });
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = storyService;
