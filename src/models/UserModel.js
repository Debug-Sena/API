const client=require("../config/databaseconfig")
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { patient: { tables: ["patient"] } },
});
const userMapper = mapper.forModel("patient");
module.exports = userMapper;
