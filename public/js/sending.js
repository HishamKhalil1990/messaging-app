$(document).ready(() => {
    $('.sendingInnerCont').html(spinner)
    $('#closeCustomerList').on('click',() => {
        $('#customersLists').attr('style','position: absolute;height: 350px;width: 445px;box-shadow: 2px 5px 10px 1px #9d9d9d;top: 170px;left: 395px;overflow: scroll;z-index: -1;background-color:#fff;')
    })
    fetchTable()
    start()
    $('#msgBtu').on('click',(e) => {
        setTimeout(() => {
            $('.sendingInnerCont').html(spinner)
        },1100)
        setTimeout(() => {
            fetchTable()
            start()
        }, 2000);
        remove()
    })
})

const start = () => {   
    setTimeout(() => {
        document.getElementById('t-body2').addEventListener('click',listnerFunction)
    }, 200);
}

const remove = () => {
    document.getElementById('t-body2').removeEventListener('click',listnerFunction)
}

const listnerFunction = (e) => {
    const fullID = e.target.id
    const arr = fullID.split('-')
    if(arr.length > 1){
        if(arr[1] == 'send'){
            const id = arr[0]
            $(`#${id}`).attr('style','display:none')
            $.post(`/Messaging/Send/${id}`).then(() => {
            })
        }else if(arr[1] == 'delete'){
            const id = arr[0]
            $(`#${id}`).attr('style','display:none')
            $.post(`/Messaging/Delete/${id}`).then(() => {
            })
        }else if(arr[1] == 'name'){
            $('#customersLists').attr('style','position: absolute;height: 350px;width: 445px;box-shadow: 2px 5px 10px 1px #9d9d9d;top: 170px;left: 395px;overflow: scroll;z-index: 0;background-color:#fff;')
            let results = JSON.parse($(`#${arr[0]}-names`)[0].innerHTML)
            let lis = ""
            results = results.forEach(item => {
                lis += `<li>${item}</li>`
            })
            $('#customersListsUl').html(lis)
        }
    }
}

const fetchTable = () => {
    $.get('/Messaging/GetMsgs').then(results => {
        $('.sendingInnerCont').html(results)
        const length = $('#t-body2')[0].children.length
        if(length == 0){
            document.getElementById('noMsgs').style.zIndex = 1
        }
    })
}