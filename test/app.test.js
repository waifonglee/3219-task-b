const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
let Post = require('../postModel');
let mongoose = require("mongoose");


const { expect } = chai;
chai.use(chaiHttp);
chai.should();

describe('posts', () => {
    beforeEach((done) => { //Before each test we empty the database
        Post.deleteMany({}, (err) => {
           done();
        });
    });

    after(done => {
        mongoose.models = {};
        mongoose.modelSchemas = {};
        mongoose.connection.close();
        done();
    });

    describe('/GET posts', () => {
        it("should get all posts", (done) => {
            chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST post', () => {
        it ("should post a post", (done) => {
            let post = new Post({
                title: "happy day", 
                content: "sdc finales", 
                author: "wf"
            });

            chai.request(app)
            .post('/api/posts')
            .send(post)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('title').eql("happy day");
                res.body.data.should.have.property('content').eql("sdc finales");
                res.body.data.should.have.property('author').eql("wf");
              done();
            });
        });

    });

    describe('/GET postid', () => {
        it ("should get a post based on the given id", (done) => {
            let post = new Post({
                title: "sad day", 
                content: "sdc ended", 
                author: "wf"
            });
            post.save((err, post) => {
                chai.request(app)
                .get('/api/posts/' + post.id)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('title').eql("sad day");
                    res.body.data.should.have.property('content').eql("sdc ended");
                    res.body.data.should.have.property('author').eql("wf");
                    done();
                });
            });
        });
    });

    describe('/PUT postid', () => {
        it('should update a post based on the given id', (done) => {
            let post = new Post({
                title: "random title", 
                content: "random content", 
                author: "wf"
            });
            
            let updated_post = {
                title: "random title updated", 
                content: "random content", 
                author: "wf"
            };

            post.save((err, post) => {
                chai.request(app)
                .put('/api/posts/' + post.id)
                .send(updated_post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.property('title').eql("random title updated");
                    res.body.data.should.have.property('content').eql("random content");
                    res.body.data.should.have.property('author').eql("wf");
                    done();
                });
            });
        });
    });

    describe('/DELETE postid', () => {
        it('should delete a post based on the given id', (done) => {
            let post = new Post({
                title: "random title", 
                content: "random content", 
                author: "wf"
            });

            post.save((err, book) => {
                chai.request(app)
                .delete('/api/posts/' + post.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('post deleted');
                    done();
                });
            });
        });
    });
});



