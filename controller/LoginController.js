const prisma = require('../utils/prismaDB')

const login = async (req,res) => {
    const {username,password} = req.body
    const user = await prisma.execute(prisma.allFunctions().getUser,{username})
    if(password == user?.password){
        req.session.loggedin = true
        res.send({msg : user.role})
    }else{
        req.session.loggedin = false
        res.send({msg:"error"})
    }
}

const logout = async (req,res) => { 
    req.session.loggedin = false
    res.send('ok')
}

module.exports = {
    login,
    logout
}