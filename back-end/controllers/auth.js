const express = require('express');
const router = express.Router();
    
    module.exports = function (passport, User) {
    
        // 1- un user signup 
        router.post('/signup', (req, res, next) => {
            console.log(req.body)
            const { email, password, confirm_password } = req.body
            
            if (password.length < 8 || password !== confirm_password) {
                return res.status(400).send('The password is less than 8 character or not equal to the confirm password');
            }
            // 2- je l'enregistre dans la db
            User.register(new User({
                email
            }), password, (err) => {
                if (err) {
                    return res.status(500).send(err)
                }
                next()
            });
            // 3- je l'authentifie pour créer une session et le redirigé vers la page d'admin
        }, passport.authenticate('local'), (req, res, next) => res.redirect('/admin/liste'))
        
        
        router.post('/login', passport.authenticate('local', {
            successRedirect: '/admin/liste',
            failureRedirect: '/admin/login'
        }))
    
        
        return router
    }    
    

