const mocha = require('mocha');
const sinon = require('sinon');
const mongoose = require('mongoose');

const {
  createSpeech,
  getSpeech,
  updateSpeech
} = require('../routeHandlers');
const { Speech } = require('../models');

let res = {};

let sandbox;

beforeEach(function(){
  sandbox = sinon.createSandbox();
  const spy = sinon.spy();
  res = {
    json: spy,
    status: sinon.stub().returns({json: spy})
  }
})
afterEach(function(){
  sandbox.restore();
})

it('should create a Speech', function(){
  let req = {
    body: {
      title: "Liger",
      content: "this is our speech. it's a lady and a tiger.",
    }
  };
  let expectedResult = {
    title: "Liger",
    content: "this is our speech. it's a lady and a tiger.",
    _id: new mongoose.Types.ObjectId(),
  };
  sandbox.stub(Speech, 'create').yields(null, expectedResult);
  createSpeech(req, res);
  sinon.assert.calledWith(Speech.create, req.body);
  sinon.assert.calledWith(
    res.json,
    sinon.match(expectedResult)
  )
})

it('should get all the speeches', function(){
  let req = {
    body: {}
  }
  let expectedResult = [
    {
      title: "Liger",
      content: "this is our speech. it's a lady and a tiger.",
      _id: new mongoose.Types.ObjectId(),
    },
    {
      title: "Tady",
      content: "this is our speech. it's still a lady and a tiger.",
      _id: new mongoose.Types.ObjectId(),
    }
  ]
  sandbox.stub(Speech, 'find').yields(null, expectedResult);
  getSpeech(req, res);
  sinon.assert.calledWith(res.status, sinon.match(200))
})

it('should update a speech', function(){
  const ID = new mongoose.Types.ObjectId();
  let req = {
    body: {
      _id: ID,
      title: "updatedTitle",
      content: "this my updated content",
    }
  };
  let expectedResult = {
    _id: ID,
    title: "updatedTitle",
    content: "this my updated content",
  };
  sandbox.stub(Speech, 'findByIdAndUpdate').yields(null, expectedResult);
  updateSpeech(req, res);
  sinon.assert.calledWith(Speech.findByIdAndUpdate, req.body._id, {title: req.body.title, content: req.body.content}, {new: true} );
  sinon.assert.calledWith(res.status, sinon.match(200));
})


