
const client = require("../config/databaseconfig");
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { tra: { tables: ["tra"] } },
});
const userMapper = mapper.forModel("tra");
module.exports = userMapper;
