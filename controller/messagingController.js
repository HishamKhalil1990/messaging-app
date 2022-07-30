const orange = require('../utils/orangeSMS')
const hana = require('../utils/hana')
const prisma = require('../utils/prismaDB')

const messagingPage = async (req,res) => {
    if(req.session.loggedin){
        res.render('messagingPage')
    }else{
        res.redirect('/')
    }
}

const messages = async (req,res) => {
    const msgs = await prisma.execute(prisma.allFunctions().getMessagess,{status:'pending'})
    let names = []
    msgs.forEach(msg => {
        names.push(msg.customersList.list.name)
        msg.customersList.list.name = `سيتم ارسال الرسالة الى ${msg.customersList.list.name.length} عميل`
        msg.messageText = msg.messageText.split('للتواصل')[0]
    })
    res.render('partials/list',{results:msgs,names})
}

const sendingPage = async (req,res) => {
    if(req.session.loggedin){
        res.render('sendingPage')
    }else{
        res.redirect('/')
    }
}

const sendMessage = async (req,res) => {
    let {id} = req.params
    id = parseInt(id)
    const msg = await prisma.execute(prisma.allFunctions().getMsg,{id})
    const message = msg.messageText
    const numbers = msg.customersList.list.number
    const status = await orange.sendSMS(message,numbers)
    await prisma.execute(prisma.allFunctions().updateMessages,{status:'sent',id})
    res.send({msg:status})
}

const deleteMessage = async (req,res) => {
    let {id} = req.params
    id = parseInt(id)
    await prisma.execute(prisma.allFunctions().deleteMessages,{id})
    res.send({msg:'ok'})
}

const saveMessage = async (req,res) => {
    const {message,customers} = req.body
    const status = await prisma.execute(prisma.allFunctions().newMessage,{
        messageText:message,
        customersList:{
                        list:customers
                      }
    })
    if(status != "err"){
        res.send({msg:'ok'})
    }else{
        res.send({msg:'err'})
    }
}

const contents = async (req,res) => {
    const {page} = req.params
    res.render(`partials/${page}`)
}

const getCustomers = async (req,res) => {
    const customers = await hana.getCustomers()
    res.send(customers)
}

const getContacts = async (req,res) =>{
    const contacts = await prisma.execute(prisma.allFunctions().getContacts,null)
    res.send(contacts)
}

module.exports = {
    messagingPage,
    sendMessage,
    contents,
    getCustomers,
    getContacts,
    saveMessage,
    sendingPage,
    messages,
    deleteMessage
}