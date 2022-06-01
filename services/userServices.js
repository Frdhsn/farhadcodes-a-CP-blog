class userServices {
  constructor(table) {
    this.user = table;
  }
  createUser = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    this.user
      .create(newUser)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };
  getUser = (req, res) => {
    this.user
      .findAll({ where: { id: req.params.id } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };
  getAllUser = (req, res) => {
    this.user
      .findAll()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };
  updateUser = (req, res) => {
    console.log(req.body);

    const id = req.params.id;
    this.user
      .update(req.body, {
        where: { id: id },
      })
      .then(() => {
        res.status(200).send({
          message: "Updated successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: `Got an Error while updating story with id= ${id}`,
        });
      });
  };
  deleteUser = (req, res) => {
    const id = req.params.id;
    this.user
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if(num){
          res.status(200).send({
            message: "User was deleted successfully!",
          });
        }
        else{
          res.status(404).send({
            message: "User doesn't exist!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Could not delete user with id= ${id}`,
        });
      });
  };
}

module.exports = userServices;
