"use strict"

module.exports = (chance, error) => {
  if (Math.random() * (10 - 0) + 0 > chance)
    throw error
}