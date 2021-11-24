const notesRouter = require('express').Router();
const Note = require('../models/notes');

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ error: 'id does not exist' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

notesRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).send({ message: 'entity deleted' });
    })
    .catch((err) => {
      next(err);
    });
});

notesRouter.post('/', (req, res, next) => {
  const { body } = req;

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  newNote
    .save()
    .then((note) => {
      res.json(note);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
