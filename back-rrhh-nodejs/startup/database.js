const { Sequelize} = require("sequelize");
let _server = null;
let _mongoURI = null;
module.exports = class Database {
  constructor({ Server, sequelize }) {
    _server = Server;
    //_mongoURI = config.DB_BACKOFIICE_URL;
    this.sequelize = sequelize
  }
  connect() {
    /*mongoose
      .connect(_mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        readPreference: "secondaryPreferred",
      })
      .then(() => _server.start())
      .catch(console.log); */
    
      this.sequelize
      .authenticate()
      .then(()=>{
        console.log("Connected to MySQL database");
        _server.start();
      })
      .catch((err)=>{
        console.error("Error connection to MYSQL:", err)
      })

  }
};
