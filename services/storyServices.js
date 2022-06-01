class storyService {
  constructor(table) {
    this.storyTable = table;
  }
  createStory = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    const newStory = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      authorID: req.body.authorID, // not sure if
      topic: req.body.topic,
      difficulty: req.body.difficulty,
    };
    this.storyTable
      .create(newStory)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };

  getAllStory = (req, res) => {
    this.storyTable
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

  getStory = (req, res) => {
    this.storyTable
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

  updateStory = (req, res) => {
    const id = req.params.id;
    this.storyTable
      .update(req.body, {
        where: { id: id },
      })
      .then(() => {
        res.status(200).send({
          message: "The story was successfully updated",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: `Got an Error while updating story with id= ${id}`,
        });
      });
  };

  deleteStory = (req, res) => {
    const id = req.params.id;
    this.storyTable
      .destroy({
        where: { id: id },
      })
      .then(() => {
        res.status(200).send({
          message: "The story was successfully deleted",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: `Got an Error while deleting story with id= ${id}`,
        });
      });
  };
}

module.exports = storyService;
