app.post('/admin/liste', async (req, res, next) => {
    try {
        const posts = await Posts.find({}).lean().exec()
        console.log(liste)
        res.render('admin/liste', {
            posts,
            isAuthenticated: req.isAuthenticated(),
            username: req.isAuthenticated() ? req.user.username: null
        })
    } catch(err) {
        res.status(500).send(err)
    }
    
})