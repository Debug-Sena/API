const client=require("../config/databaseconfig")
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { doctor: { tables: ["doctor"] } },
});
const userMapper = mapper.forModel("doctor");
module.exports = userMapper;
