const { Speech } = require('./models');

module.exports = {
  createSpeech: function createSpeech(req, res){
    Speech.create(req.body, function(err, savedSpeech){
      if (err) return res.status(400).json(err);
      res.status(201).json(savedSpeech);
    })
  },

  getSpeech: function getSpeech(req, res){
    Speech.find(req.body, function(err, savedSpeech){
      if (err) return res.status(500).json(err);
      res.status(200).json(savedSpeech);
    })
  },

  updateSpeech(req, res){
    const { title, content, _id} = req.body;
    Speech.findByIdAndUpdate(_id, {title, content}, {new: true}, function(err, updatedSpeech){
      if (err) return res.status(400).json(err);
      res.status(200).json(updatedSpeech);
    })
  }
};
