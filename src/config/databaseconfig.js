const cassandra = require("cassandra-driver");
const Client = cassandra.Client;
const client = new Client({
  cloud: {
    secureConnectBundle: "secure-connect-myman.zip",
  },
  credentials: {
    username: "bPyZWzpDruERRejLPMagKGSI",
    password:
      "xgm5i+qk28FiThvj,GQ8Q0J2LTUnACgOgzD9642jPP1eoDJfZRKIRd4_l0aqrUojnKSSK0qqSdTmemLgYNpPZ4rrtLDojTxJB3+Q_51XBHFxxnOZsc.lZ,0KyKZ10UFe",
  },
  keyspace: "myman_keyspace",
});


module.exports = client;
