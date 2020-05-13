let mongoose = require("mongoose");
let User = require('../models/User');
// Require dev dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("User", (done) => {
    // Empty the test database before each test
    before(done => {
        User.deleteOne({ email: "amol@gmail.com" }, err => done());
    });

    after(done => {
        User.deleteOne({ email: "amol@gmail.com" }, err => done());
    });

    describe("/POST User", (done) => {
        it("It Should Create a User", done => {
            let user = {
                name: "Amol Saini",
                password: "12345678",
                email: "amol@gmail.com",
                mobile: 987643210
            };
            chai.request(server).post("/api/users/").send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("result");
                    res.body.result.should.be.a("object");
                    done()
                })
        });
    });


});
