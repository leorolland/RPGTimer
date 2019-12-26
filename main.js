'use strict'

const timerSpan = document.getElementById('time')
const pauseButton = document.getElementById('pause')
const reinitButton = document.getElementById('reinit')
const addButton = document.getElementById('add')
const addValue = document.getElementById('addValue')
const remButton = document.getElementById('rem')
const remValue = document.getElementById('remValue')
const expiryValue = document.getElementById('expiryValue')
const expiryButton = document.getElementById('expiryButton')

const begin = moment()
let expiry
let paused = true

const setExpiry = () => {
  expiry = moment().add(parseInt(expiryValue.value), 'hours')
  refreshDisplay()
}

const refreshDisplay = () => {
  const now = moment()
  const duration = moment.duration(expiry.diff(now))
  let finalString
  if (duration.asSeconds() > 0) {
    finalString = (duration.days()>0?duration.days() + 'j ':'') + (duration.hours()>0?duration.hours() + 'h ':'') + duration.minutes() + 'm ' + duration.seconds() + 's'
  } else {
    finalString = 'Temps écoulé !'
  }
  timerSpan.innerHTML = finalString
}

const tick = () => {
  if (paused) expiry.add(1, 'second')
  refreshDisplay()
}

// Pause button
pauseButton.onclick = () => {
  paused = !paused
  pauseButton.innerText = paused ? '▶️ Reprendre' : '⏸️ Pause'
  refreshDisplay()
}

// Reinit button
reinitButton.onclick = () => {
  setExpiry()
}

// Add button
addButton.onclick = () => {
  const value = moment.duration(parseInt(addValue.value), 'minutes')
  expiry.add(value)
  refreshDisplay()
}

// remove button
remButton.onclick = () => {
  const value = moment.duration(-parseInt(remValue.value), 'minutes')
  expiry.add(value)
  refreshDisplay()
}

// expiry button
expiryButton.onclick = () => {
  expiry = moment().add(parseInt(expiryValue.value), 'hours')
  refreshDisplay()
}

setExpiry()
tick()
setInterval(tick, 1000);