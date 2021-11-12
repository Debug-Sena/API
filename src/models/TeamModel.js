const client = require("../config/databaseconfig");
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { Team: { tables: ["team"] } },
});
const teamMapper = mapper.forModel("Team");
module.exports = teamMapper;
