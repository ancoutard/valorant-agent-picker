const express = require("express")
const app = express()
const url = "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
const request = require("request")
var agents = null

request(url, { json: true }, (err, response, body) => {
  if (err) {
    return "Valorant web api call failed."
  }
  agents = body.data
})

// ----------
// routes
// ----------
app.get("/agents", (req, res) => {
  res.status(200).json(agents)
})

app.get("/agents/random", (req, res) => {
  const randomId = getRandomAgentId(agents.length - 1)
  const agent = agents[randomId]
  res.status(200).json(agent)
})

app.get("/agents/random/:role", (req, res) => {
  agentsOfRole = agents.filter(function (a) {
    return a.role.displayName === req.params.role
  })
  const randomId = getRandomAgentId(agentsOfRole.length - 1)
  const agent = agentsOfRole[randomId]
  res.status(200).json(agent)
})

app.get("/agents/:name", (req, res) => {
  const agent = agents.find((agent) => agent.displayName === req.params.name)
  res.status(200).json(agent)
})

// ----------
// server start
// ----------
app.listen(8080, () => {
  console.log("Server up")
})

// ----------
// functions
// ----------
function getRandomAgentId(max) {
  return Math.floor(Math.random() * max)
}
