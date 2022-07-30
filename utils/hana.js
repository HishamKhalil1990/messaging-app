require('dotenv').config();
const hana = require('@sap/hana-client')

// enviroment variables
const HANA_HOST = process.env.HANA_HOST
const HANA_USER = process.env.HANA_USER
const HANA_PASSWORD = process.env.HANA_PASSWORD
const HANA_MODE = process.env.HANA_MODE

const hanaConfig = {
    serverNode  : `${HANA_HOST}:30015`,
    uid : HANA_USER,
    pwd : HANA_PASSWORD,
    sslValidateCertificate: 'false',
}

const connection = hana.createConnection();

const getRealCustomers = async () => {
    const sqlStatment = `select * from "DB_ABUODEH_BEFORE"."MAZ_CUSTOMER_WHATSAPP"`
    return new Promise((resolve,reject) => {
        try{
            connection.connect(hanaConfig,(err) => {
                if(err){
                    console.log(err)
                    reject()
                }else{
                    connection.exec(sqlStatment,function(err, results) {
                        if(err){
                            console.log(err)
                            reject()
                        }
                        connection.disconnect();
                        resolve(results)
                    });
                }
            })
        }catch(err){
            reject()
        }
    })
}

const getFakeCustomers = () => {
    return [
        {
            firstFilter : "رز",
            secondFilter : "مندي",
            customerName : "رز مندي cust1",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "رز",
            secondFilter: "مصري",
            customerName : "رز مصري cust2",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "رز",
            secondFilter: "امريكي",
            customerName :"رز امريكي cust3",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "رز",
            secondFilter: "بسمتي",
            customerName :"رز بسمتي cust4",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "قهوة",
            secondFilter: "اكسترا",
            customerName :"قهوة اكسترا cust5",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "قهوة",
            secondFilter: "عادي",
            customerName :"قهوة عادي cust6",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "قهوة",
            secondFilter: "حب",
            customerName :"قهوة حب cust7",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "قهوة",
            secondFilter : "مطحون",
            customerName :"قهوة مطحون cust8",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "عدس",
            secondFilter : "مجروش",
            customerName :"عدس مجروش cust9",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "عدس",
            secondFilter : "محلي",
            customerName :"عدس محلي cust10",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "عدس",
            secondFilter: "مستورد",
            customerName :"عدس مستورد cust11",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
        {
            firstFilter : "عدس",
            secondFilter: "الريحان",
            customerName :"عدس الريحان cust12",
            customerNumber : "962795288265",
            customerCode : "FC111111111"
        },
    ]
}

const getCustomers = async() => {
    if(HANA_MODE == 'test'){
        return getFakeCustomers()
    }else{
        return getRealCustomers()
        .then((results) => {
            return results.map(item => {
                return {
                    firstFilter : item.Descr,
                    secondFilter: "",
                    customerName :item.CardName,
                    customerNumber : item.Phone1,
                    customerCode : item.CardCode
                }
            })
        }).catch(err => {
            return 'error'
        })
    }
}

module.exports = {
    getCustomers
}