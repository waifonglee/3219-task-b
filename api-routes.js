let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'api!'
    });
});

var postController = require('../Blog/postController');

router.route('/posts')
    .get(postController.index)
    .post(postController.new);

router.route('/posts/:post_id')
.get(postController.view)
.patch(postController.update)
.put(postController.update)
.delete(postController.delete);


module.exports = router;