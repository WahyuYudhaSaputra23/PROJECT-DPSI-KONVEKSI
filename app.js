var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dataManagementRouter = require('./routes/dataManagement');
var reportRouter = require('./routes/report');
var productionRouter = require('./routes/production');
var userManagementRouter = require('./routes/userManagement');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var managementReportRouter = require('./routes/managementReport');
var employeesRouter = require('./routes/employees');
var rawMaterialsRouter = require('./routes/raw-materials');
var managementReportReportRouter = require('./routes/managementReportReport');
var productDataManagementRouter = require('./routes/productDataManagement');
var employeeDataManagementRouter = require('./routes/employeeDataManagement');
var rawMaterialDataManagementRouter = require('./routes/rawMaterialDataManagement'); 
var sequelize = require('./models/index').sequelize; 

var app = express();

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); 

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/data-management', dataManagementRouter);
app.use('/reports', reportRouter);
app.use('/production', productionRouter);
app.use('/user-management', userManagementRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/management-report', managementReportRouter);
app.use('/employees', employeesRouter);
app.use('/raw-materials', rawMaterialsRouter);
app.use('/management-report-report', managementReportReportRouter);
app.use('/product-data-management', productDataManagementRouter);
app.use('/employeeDataManagement', employeeDataManagementRouter);
app.use('/raw-material-data-management', rawMaterialDataManagementRouter); 

// Sinkronkan model dengan database
sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

module.exports = app;
