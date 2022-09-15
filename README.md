"# node-baise-api1" 

<!-- #### Start create nodejs project#### -->
"1. npm init -y (Create nodejs project)"
2. npm i cors express mysql (install package)

# Incase Connect Mysql error as: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
- flush privileges;


<!-- ##################Allows Port (CORS)################### -->
#####Allows port only client access server#####
const cors = require('cors');
app.use(cors({
    origin: 'https://www.section.io'
}));

<!-- #####Allows 2 clients access to server#### -->
const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));

<!-- ######Allows N or more client and not limit access to server#### -->
app.use(cors({
    origin: '*'
}));
<!-- ##################end Allows Port################### -->
<!-- ################allows header access######## -->
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
See detail at: https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
<!-- ################end allows header access######## -->



