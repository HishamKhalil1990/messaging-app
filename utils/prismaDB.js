const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// users CRUD
const newUser = async (params) =>{
    const {username,password} = params
    return await prisma.users.create({
        data : {
            username,
            password
        }
    })
}

const updateUser = async (params) =>{
    const {username,password,id} = params
    return await prisma.users.update({
        data : {
            username,
            password
        },
        where : {
            id
        }
    })
}

const deleteUser = async (params) =>{
    const {id} = params
    return await prisma.users.delete({
        where : {
            id,
        }
    })
}

const getUser = async(params) => {
    const {username} = params
    return await prisma.users.findUnique({
        where: {
            username,
        }
    })
}

const getUsers = async(params) => {
    return await prisma.users.findMany()
}

// contacts CRUD
const newContact = async (params) =>{
    const {name,number} = params
    return await prisma.contacts.create({
        data : {
            name,
            number
        }
    })
}

const updateContact = async (params) =>{
    const {name,number,id} = params
    return await prisma.contacts.update({
        data : {
            name,
            number
        },
        where : {
            id
        }
    })
}

const deleteContact = async (params) =>{
    const {id} = params
    return await prisma.contacts.delete({
        where : {
            id,
        }
    })
}

const getContacts = async(params) => {
    return await prisma.contacts.findMany()
}

// reminder CRUD
const newMessage = async (params) =>{
    const {messageText,customersList} = params
    return await prisma.messages.create({
        data : {
            messageText,
            customersList,
        }
    })
}

const updateMessages = async (params) =>{
    const {status,id} = params
    return await prisma.messages.update({
        data : {
            status
        },
        where : {
            id
        }
    })
}

const deleteMessages = async (params) =>{
    const {id} = params
    return await prisma.messages.delete({
        where : {
            id,
        }
    })
}

const getMessagess = async(params) => {
    const {status} = params
    return await prisma.messages.findMany({
        orderBy:{
            updatedAt:'desc'
        },
        where:{
            status
        }
    })
}

const getMsg = async(params) => {
    const {id} = params
    return await prisma.messages.findUnique({
        where:{
            id
        }
    })
}

// execution functions
const execute = async (func,params) => {
    return func(params)
    .catch(err => {
        return "err"
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 
}

const allFunctions = () => {
    return {
        newUser,
        updateUser,
        deleteUser,
        getUser,
        getUsers,
        newContact,
        updateContact,
        deleteContact,
        getContacts,
        newMessage,
        updateMessages,
        deleteMessages,
        getMessagess,
        getMsg
    }
}

module.exports = {
    execute,
    allFunctions
}