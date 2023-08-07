const mongoose = require('mongoose').set('bufferTimeoutMS', 1000000);
const supertest = require('supertest');
const testHelper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Note = require('../models/note');

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObject = testHelper.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObject.map((note) => note.save());
  await Promise.all(promiseArray);

  // let noteObject = new Note(testHelper.initialNotes[0]);
  // await noteObject.save();
  // noteObject = new Note(testHelper.initialNotes[1]);
  // await noteObject.save();
});

test('note are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 1000000);

test('there are two notes', async () => {
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(testHelper.initialNotes.length);
}, 1000000);

test('Notes contain "Browser can execute only JavaScript"', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map((r) => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
}, 300000);

test('a valid note can be added', async () => {
  const note = {
    content: 'Sync/await in ES7 makes writing asyncronous function ease',
    importance: true,
  };

  await api
    .post('/api/notes')
    .send(note)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const notesAtEnd = await testHelper.notesInDB();
  expect(notesAtEnd).toHaveLength(testHelper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).toContain(note.content);
}, 100000);

test('note is not saved if incomplete', async () => {
  const note = {
    importance: true,
  };

  await api
    .post('/api/notes')
    .send(note)
    .expect(400);

  const noteAtEnd = await testHelper.notesInDB();
  expect(noteAtEnd).toHaveLength(testHelper.initialNotes.length);
}, 100000);

test('a specific note can be view', async () => {
  const notesAtStart = await testHelper.notesInDB();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
}, 100000);

test('a specific note can be deleted', async () => {
  const notesAtStart = await testHelper.notesInDB();
  const noteToDelete = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(200)
    .expect('Content-type', /application\/json/);

  const notesAfter = await testHelper.notesInDB();

  expect(notesAfter).toHaveLength(testHelper.initialNotes.length - 1);
}, 100000);

test('a specific note can be modified', async () => {
  const notesAtStart = await testHelper.notesInDB();
  const noteToModify = notesAtStart[0];
  console.log(noteToModify);

  const note = { content: 'The lord is great', important: true };

  const modifiedNote = await api
    .put(`/api/notes/${noteToModify.id}`)
    .send(note)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(modifiedNote.body.content).toEqual('The lord is great');
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
