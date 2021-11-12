const client = require("../config/databaseconfig");
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { Workspace: { tables: ["workspace"] } },
});
const workMapper = mapper.forModel("Workspace");
module.exports = workMapper;
