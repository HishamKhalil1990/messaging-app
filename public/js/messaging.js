const spinner = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
const ulContainer1 = `<div id="filter1Data" class="filterInnerDiv"><select onchange="myFunction()" id="filter1Ul" class="filterUL"></select></div>`
const resultContainer = `<div class="resultContainer" style="overflow-y:scroll;"></div>`
const contactContainer = `<div class="frame"><div class="list"><div class="head" style="background: linear-gradient(to left,#DBDFFD,#9BA3EB);"><div class="title">Contacts</div></div><ul id="contactList" class="listUl"></ul></div></div>`
let currentPage = 'newMessge'
let checkAll = false
$(document).ready(() => {
    const container = document.querySelector(".contentContainer");
    container.classList.toggle('container-active')
    update('newMessge')
    $('.menu').on('click',(e) => {
        const menuBtu = document.querySelector(".menu");
        menuBtu.classList.toggle('open')
        const container = document.querySelector(".contentContainer");
        container.classList.toggle('container-after')
    })
    $('#tasksBtu').on('click',(e) => {
        hideContainer("todo")
    })
    $('#msgBtu').on('click',(e) => {
        hideContainer("newMessge")
    })
    $('#logoutBtu').on('click',(e) => {
        $.post('/Login/Logout').then((result)=>{
            location.reload();
        })
    })
})

const showConatiner = async (content) => {
    const container = document.querySelector(".contentContainer");
    if(currentPage != content){
        update(content)
        const message = document.querySelector('#addMesageContainer')
        message.classList.toggle('hide-show')
        const todo = document.querySelector('#todoContainer')
        todo.classList.toggle('hide-show')
        currentPage = content? content : 'todo'
    }
    new Promise((resolve,reject) => {
        setTimeout(() => {
            container.classList.toggle('container-active')
            setTimeout(() => {
                resolve()
            },1000)
        }
        ,100)
    }).then(() => {
        container.classList.remove('container-transition1')
        container.classList.add('container-transition2')
    })
}

const hideContainer = (content) => {
    const container = document.querySelector(".contentContainer");
    container.classList.add('container-transition1')
    container.classList.remove('container-transition2')
    container.classList.toggle('container-active')
    setTimeout(() => {
        showConatiner(content)
    },1000)
}

const update = async(content) => {
    switch(content){
        case 'todo':
            break;
        case 'newMessge':
            updateFilters()
            break;
        default:
            break;
    }
}

const updateFilters = () => {
    const loading = `<div style="height:100%;width:100%;display:flex;justify-content:center;align-items:center;">${spinner}</div>`
    $('#allFiltered').html(loading)
    $('#contactsDiv').html(spinner)
    $.get('/Messaging/Customers').then((results) => {
        if(results != 'error'){
            const filter1List = []
            results.forEach(item => {
                if(!filter1List.includes(item.firstFilter)){
                    filter1List.push(item.firstFilter)
                }
            })
            const firstOptions = createLIforFirst(filter1List)
            const resultMenu = createResultMenu(results)
            insertFilters(firstOptions,resultMenu)
            filterResults(filter1List[0])
            document.getElementById('t-body').addEventListener('click',(e)=>{
                const className = e.target.className
                const arr = className.split('+')
                if(arr.length > 1){
                    const id = `input-${arr[1]}`
                    const input = document.getElementById(id)
                    const value = input.checked
                    input.checked = !value
                }
            })
            document.getElementById('selectAll').addEventListener('click',(e)=>{
                const option = document.getElementById("filter1Ul").value;
                const inputs = document.getElementsByClassName(`input-${option}`)
                for(let i = 0; i < inputs.length; i++){
                    inputs[i].checked = !checkAll
                }
                checkAll = !checkAll
            })
        }
    })
    $.get('/Messaging/Contacts').then((results) => {
        if(results != 'error'){
            const list = createContactList(results)
            insertContact(list)
        }
    })
}

const createLIforFirst = (filter1Group) => {
    let options = ""
    if(filter1Group.length > 0){
        filter1Group.forEach(filter => {
            options += `<option>${filter}</option>`
        })
    }else{
        options = `<option></option>`
    }
    return options
}

const createResultMenu = (results) => {
    let trs = ""
    results.forEach(item => {
        trs += `<tr class="${item.firstFilter} tr-tbody" id="${item.customerName}" style="display:"none";">
                    <td class="tr+${item.customerName}">
                        <p style="padding:5px" class="tr+${item.customerName}">
                            ${item.customerName}
                        </p>
                    </td>
                    <td class="tr+${item.customerName}">
                        <p style="padding:5px" class="tr+${item.customerName}">
                            ${item.customerCode}
                        </p>
                    </td>
                    <td class="tr+${item.customerName}">
                        <p style="padding:5px" class="tr+${item.customerName}">
                            ${item.customerNumber}
                        </p>
                    </td>
                    <td id="${item.customerName}">
                        <div style="padding:5px">
                            <input type="checkbox" id="input-${item.customerName}" class="input input-${item.firstFilter}"/>
                        </div>
                    </td>
                </tr>`
    })
    return `<table style="width:100%">
                <thead style="width:100%;background:linear-gradient(to left, #9BA3EB, #DBDFFD);color:#fff;">
                    <tr style="width:100%">
                        <th style="text-align:left;width:40%;">
                            <p style="padding:5px">
                                Name
                            </p>
                        </th>
                        <th style="text-align:left;width:30%;">
                            <p style="padding:5px">
                                Code
                            </p>
                        </th>
                        <th style="text-align:left;width:20%;">
                            <p style="padding:5px">
                                Phone Number
                            </p>
                        </th>
                        <th id="selectAll" style="text-align:left;width:10%;">
                            <p style="padding:5px">
                                SelectAll
                            </p>
                        </th>
                    </tr>
                </thead>    
                <tbody id="t-body">
                    ${trs}
                </tbody>
            </table>`
}

const insertFilters = (firstOptions,resultMenu) => {
    const content = ulContainer1 + resultContainer
    $('#allFiltered').html(content)
    $('#filter1Ul').html(firstOptions)
    $('.resultContainer').html(resultMenu)
}


const createContactList = (contactList) => {
    let lis = `<li class="OutercontactLI" id="li-all-contacts">
                    <input class="checkbox" id="all-contacts" type="checkbox" name="all-contacts" />
                    <label for="all-contacts" class="text">الكل</label>
                    <label style="display:none;"></label>
                    <label for="all-contacts" class="button"></label>
                    <div class="wrapper">
                        <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 98.5 98.5"
                        enable-background="new 0 0 98.5 98.5"
                        xml:space="preserve"
                        >
                        <path
                            class="checkmark"
                            fill="none"
                            stroke-width="8"
                            stroke-miterlimit="10"
                            d="M81.7,17.8C73.5,9.3,62,4,49.2,4
                    C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
                        />
                        </svg>
                    </div>
                </li>`
    if(contactList.length > 0){
        contactList.forEach(cont => {
            lis += `<li class="contactLI">
                        <input class="checkbox innerCheckBox" type="checkbox" id="${cont.id}" name="${cont.id}" />
                        <label for="${cont.id}" class="text">${cont.name}</label>
                        <label style="display:none;">${cont.number}</label>
                        <label for="${cont.id}" class="button"></label>
                        <div class="wrapper">
                            <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 98.5 98.5"
                            enable-background="new 0 0 98.5 98.5"
                            xml:space="preserve"
                            >
                            <path
                                class="checkmark"
                                fill="none"
                                stroke-width="8"
                                stroke-miterlimit="10"
                                d="M81.7,17.8C73.5,9.3,62,4,49.2,4
                        C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
                            />
                            </svg>
                        </div>
                    </li>`
        })
    }else{
        lis = `<li>nothing to show</li>`
    }
    return lis
}

const insertContact = (list) => {
    $('#contactsDiv').html(contactContainer)
    $('#contactList').html(list)
    $('#all-contacts').on('click',() => {
        const val = $('#li-all-contacts')[0].children[0].checked
        const contacts = document.getElementsByClassName('innerCheckBox')
        for(let i = 0;i < contacts.length; i++){
            contacts[i].checked = val
        }
    })
}

const filterResults = (option) => {
    checkAll = false
    const inputs = document.getElementsByClassName('input')
    for(let i = 0; i < inputs.length; i++){
        inputs[i].checked = false
    }
    const trs = document.getElementsByClassName('tr-tbody')
    for(let i = 0; i < trs.length; i++){
        trs[i].style.display ="none"
    }
    const activeTrs = document.getElementsByClassName(option)
    for(let i = 0; i < activeTrs.length; i++){
        activeTrs[i].style.display =""
    }
}

const myFunction = () => {
    const option = document.getElementById("filter1Ul").value;
    filterResults(option)
  }