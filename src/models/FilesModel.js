const client = require("../config/databaseconfig");
const cassandra = require("cassandra-driver");
const Mapper = cassandra.mapping.Mapper;
const mapper = new Mapper(client, {
  models: { files: { tables: ["files"] } },
});
const userMapper = mapper.forModel("files");
module.exports = userMapper;
