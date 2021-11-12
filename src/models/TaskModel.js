const client = require("../config/databaseconfig");
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { Task: { tables: ["task"] } },
});
const userMapper = mapper.forModel("Task");
module.exports = userMapper;
