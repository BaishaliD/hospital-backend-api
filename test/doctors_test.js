let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const mongoose = require('mongoose');
let expect = chai.expect;

chai.use(chaiHttp);



describe('Doctors',function () {

    //connects to the Test database

    before(function (done) {

        mongoose.connect('mongodb://localhost/hospital-test', { useNewUrlParser: true });
        mongoose.connection
            .once("open", () => {
                done();
            })
            .on("error", err => {
                console.log("Can't connect to test db: ", err);
            })

    });

    //Delete all the entries from the Doctors
    after((done) => {
       mongoose.connection.collections.doctors.deleteMany({},() => {
            console.log('dropped');
            done();
        });
    })

    //test cases

    describe('Register a doctor', async () => {

        var doctor = {
            "name": "John Doe",
            "email": "johndoe@abc.com",
            "username": "john_doe",
            "password": "1234"
        }
    
    
        it('should register a doctor if username and email id is not already registered', function (done) {
            chai.request(server)
                .post('/hospital/api/doctor/register')
                //.set("authorization", "Basic "+token)
                .send(doctor)
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("data");
                    expect(res.body.message).to.equal("User registered");
                    expect(res.body.data.name).to.equal(doctor.name);
                    expect(res.body.data.email).to.equal(doctor.email);
                    expect(res.body.data.username).to.equal(doctor.username);
                    done();
    
                });
    
    
        });
    
        await it('should not register a doctor if username and email id is already registered', function (done) {
            chai.request(server)
                .post('/hospital/api/doctor/register')
                .send(doctor)
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.status).to.equal("Failure");
                    expect(res.body.message).to.be.oneOf(["Username already exists", "Email already exists"]);
                    done();
    
                });
    
    
        });
    
    });
    
    //Login a doctor
    
    describe('Login a doctor', () => {
    
        var doctor1 = {
            "username": "john_doe_new",
            "password": "1234"
        }
    
        var doctor2 = {
            "username": "john_doe",
            "password": "123456"
        }
    
        var doctor3 = {
            "username": "john_doe",
            "password": "1234"
        }
    
    
        //if doctor is not registered
        it('should not login a doctor if not registered', function (done) {
            chai.request(server)
                .post('/hospital/api/doctor/login')
                .send(doctor1)
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body.status).to.equal("Failure");
                    expect(res.body.message).to.equal("Incorrect username or password");
                    done();
    
                });
    
    
        });
    
        //if doctor tries to log in using incorrect credentials (username/password)
        it('should not login a doctor if incorrect password', function (done) {
            chai.request(server)
                .post('/hospital/api/doctor/login')
                .send(doctor2)
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body.status).to.equal("Failure");
                    expect(res.body.message).to.equal("Incorrect username or password");
                    done();
    
                });
    
    
        });
    
        //if doctor is registered and all credentials are correct
        it('should login a doctor if registered and credentials are correct', function (done) {
            chai.request(server)
                .post('/hospital/api/doctor/login')
                .send(doctor3)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("Success");
                    expect(res.body).to.have.property("JWT_token");
                    done();
    
                });
    
    
        });
    
    });


});

