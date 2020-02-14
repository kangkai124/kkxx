/* eslint-disable no-console */
const path = require('path')
const fs = require('fs-extra')
const cowsay = require('cowsay')

console.log('\x1b[42mCREATING CNAME...\x1b[0m')

fs.createFile(path.resolve(__dirname, '../docs/CNAME'))
  .then(() => {
    fs.writeFile(path.resolve(__dirname, '../docs/CNAME'), 'kkxx.love', 'utf-8')
      .then(() => {
        console.log(cowsay.say({
          text: 'CNAME CREATED!'
        }))
      })
      .catch(err => {
        console.error(err)
      })
  })
  .catch(err => {
    console.error(err)
  })