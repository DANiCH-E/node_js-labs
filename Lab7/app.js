const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()
session = require('express-session'),
  passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  flash = require('connect-flash')


//Основная часть

let CONTACTS = [
  {id: v4(), name: 'Список покупок', value: 'Хлеб, молоко, йогурт', marked: false}
]

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS)
  }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'Контакт был удален'})
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
	let id = +req.params.id;
	let body = req.body;
	let index = CONTACTS.findIndex((st) => st.id === id);
	let updated = {id: id, ...body};
	CONTACTS[index] = updated;
	res.send(updated);
  //const idx = CONTACTS.findIndex(c => c.id === req.params.id)
  //CONTACTS[idx] = req.body
  //res.json(CONTACTS[idx])
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))