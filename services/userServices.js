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
        try {
            const userData = await this.userTable.create(newUser);
            return userData;
        } catch (err) {
            console.log(err);
        }
    };
    getUser = async (req, res) => {
        const id = req.params.id;
        try {
            const userData = await this.userTable.findAll({
                where: { id: id }
            });
            return userData;
        } catch (err) {
            console.log(err);
        }
    };
    getAllUser = async (req, res) => {
        try {
            const userData = await this.userTable.findAll();
            return userData;
        } catch (err) {
            console.log(err);
        }
    };
    updateUser = async (req, res) => {
        const id = req.params.id;
        try {
            const userData = await this.userTable.update(req.body, {
                where: { id: id }
            });
            return userData;
        } catch (err) {
            console.log(err);
        }
    };
    deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            const userData = await this.userTable.destroy({
                where: { id: id }
            });
            return userData;
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = userServices;
