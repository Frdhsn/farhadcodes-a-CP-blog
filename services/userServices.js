class userServices {
    constructor(table) {
        this.userTable = table;
    }
    createUser = async (req, res) => {
        const userBody = req.body;
        const { name, email, password } = userBody;
        const newUser = {
            name,
            email,
            password
        };
        const userData = await this.userTable.create(newUser);
        return userData;
    };
    getUser = async (req, res) => {
        const id = req.params.id;
        const userData = await this.userTable.findAll({
            where: { id: id }
        });
        return userData;
    };
    getAllUser = async (req, res) => {
        const userData = await this.userTable.findAll();
        return userData;
    };
    updateUser = async (req, res) => {
        const id = req.params.id;
        const userData = await this.userTable.update(req.body, {
            where: { id: id }
        });
    };
    deleteUser = async (req, res) => {
        const id = req.params.id;
        const userData = await this.userTable.destroy({
            where: { id: id }
        });
        return userData;
    };
}

module.exports = userServices;
