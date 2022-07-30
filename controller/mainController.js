const loginPage = async (req,res) => {
    req.session.loggedin = false
    res.render('loginPage')
}

const logout = async (req,res) => {
    res.redirect('/')
}

module.exports = {
    loginPage,
    logout
}