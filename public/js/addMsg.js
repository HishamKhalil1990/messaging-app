$(document).ready(() => {
  let post_answer = $(".post_answer");
  let added_answers = document.querySelector(".added_answers");
  let card = document.querySelector(".card");
  let card2 = document.querySelector(".card2");
  let msgContent = document.querySelector(".msgContent");
  post_answer.on("click", function () {
    const firstChild = $(".card2 ul")[0].firstChild;
    let added_answers_li = document.querySelector(".added_answers li");
    let saveButton = document.querySelector("#msgcontentbtu")
    let deleteButton = document.querySelector("#deletecontentbtu")
    let textarea = document.querySelector(".input_text textarea");
    let i = Math.floor(Math.random() * (99999779 - 343454) * 1000000);
    if (textarea.value.length > 5) {
      if (!firstChild) {
        card.classList.toggle("card-after");
        card2.classList.toggle("card2-after");
      }
      if (added_answers.children.length == 5) {
        card2.classList.remove("card2-hideScroll");
        card2.classList.add("card2-scroll");
      } else if (added_answers.children.length < 5) {
        if (card2.classList.contains("card2-scroll")) {
          card2.classList.remove("card2-scroll");
        }
      }
      const firstLine = fisrtLine()
      let newline = document.createElement("li");
      newline.setAttribute("id", i);
      saveButton.setAttribute("class", i);
      deleteButton.setAttribute("class", i);
      let newline_data = `<small onclick="Crossed(${i})"><div id="checked${i}"style="display: flex; justify-content: center; align-items: center"><svg style="fill: green; height: 70%; width: 70%"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 512 512"class="svgSelector${i}-1"><path d="M 511.6 36.86 l -64 415.1 c -1.5 9.734 -7.375 18.22 -15.97 23.05 c -4.844 2.719 -10.27 4.097 -15.68 4.097 c -4.188 0 -8.319 -0.8154 -12.29 -2.472 l -122.6 -51.1 l -50.86 76.29 C 226.3 508.5 219.8 512 212.8 512 C 201.3 512 192 502.7 192 491.2 v -96.18 c 0 -7.115 2.372 -14.03 6.742 -19.64 L 416 96 l -293.7 264.3 L 19.69 317.5 C 8.438 312.8 0.8125 302.2 0.0625 289.1 s 5.469 -23.72 16.06 -29.77 l 448 -255.1 c 10.69 -6.109 23.88 -5.547 34 1.406 S 513.5 24.72 511.6 36.86 Z"/></svg><svg style="fill: green; height: 70%; width: 70%"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 448 512"class="svgSelector${i}-2 svgHide"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg></div></small><p><strike id="strike${i}" class="strike_none"> ${firstLine}</strike></p><span onclick="Delete(${i})"><svg style="fill: red; height: 70%; width: 70%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg></span><div id="data-${i}" style='display:none;'></div> `;
      newline.innerHTML = newline_data;
      added_answers.appendChild(newline);
      addContent(`#data-${i}`,i,textarea)
      textarea.value = "";
      msgContent.classList.toggle('msgContent-after')
      saveButton.removeEventListener('click',func)
      saveButton.addEventListener('click',func)
      deleteButton.removeEventListener('click',func2)
      deleteButton.addEventListener('click',func2)
    }
  });
  $('#leftAlign').on('click',() => {
    let left = document.querySelector("#leftAlign");
    let right = document.querySelector("#rightAlign");
    left.classList.add("active");
    right.classList.remove("active");
    let textArea = document.querySelector("#text-area");
    textArea.classList.remove("text-alignment");
    let p = document.querySelector("#text-area-p");
    p.classList.remove("text-alignment");
  })
  $('#rightAlign').on('click',() => {
    let left = document.querySelector("#leftAlign");
    let right = document.querySelector("#rightAlign");
    left.classList.remove("active");
    right.classList.add("active");
    let textArea = document.querySelector("#text-area");
    textArea.classList.add("text-alignment");
    let p = document.querySelector("#text-area-p");
    p.classList.add("text-alignment");
  })
  $('#msgcontentbtu').on('click',() => {
    let msgContent = document.querySelector(".msgContent");
    msgContent.classList.toggle('msgContent-after')
    emptyAll()
    $('#btu1').addClass('activeButton')
    const div1 = document.querySelector("#div1");
    if(div1.classList.contains('final-pos')){
      emptyAllDiv()
      div1.classList.toggle('final-pos')
    }
  })
  $('#deletecontentbtu').on('click',() => {
    let msgContent = document.querySelector(".msgContent");
    msgContent.classList.toggle('msgContent-after')
    emptyAll()
    $('#btu1').addClass('activeButton')
    const div1 = document.querySelector("#div1");
    if(div1.classList.contains('final-pos')){
      emptyAllDiv()
      div1.classList.toggle('final-pos')
    }
  })
  $('#btu1').on('click',() => {
    emptyAll()
    $('#btu1').addClass('activeButton')
    const div1 = document.querySelector("#div1");
    if(div1.classList.contains('final-pos')){
      div1.classList.add('addDisplay')
      emptyAllDiv()
      div1.classList.toggle('final-pos')
    }
  })
  $('#btu2').on('click',() => {
    emptyAll()
    $('#btu2').addClass('activeButton')
    const div2 = document.querySelector("#div2");
    if(div2.classList.contains('final-pos')){
      const div1 = document.querySelector("#div1");
      div1.classList.remove('addDisplay')
      emptyAllDiv()
      div2.classList.toggle('final-pos')
    }
  })
  $('#btu3').on('click',() => {
    emptyAll()
    $('#btu3').addClass('activeButton')
    const div3 = document.querySelector("#div3");
    if(div3.classList.contains('final-pos')){
      const div1 = document.querySelector("#div1");
      div1.classList.remove('addDisplay')
      emptyAllDiv()
      div3.classList.toggle('final-pos')
    }
  })
  $('.notificationBar').on('click',() => {
    const div = document.querySelector('.notficationDiv')
    div.classList.toggle('body-pos')
  })
});
function Crossed(random_id) {
  let svg1 = document.querySelector(".svgSelector" + random_id + "-1");
  let svg2 = document.querySelector(".svgSelector" + random_id + "-2");
  if(svg2.classList.contains('svgHide')){
    svg1.classList.toggle("svgHide");
    svg2.classList.toggle("svgHide");
    let strike_cutted = document.getElementById("strike" + random_id);
    strike_cutted.classList.toggle("strike_none");
    sendMSG(random_id)
  }
}

function Delete(random_id) {
  let card = document.querySelector(".card");
  let card2 = document.querySelector(".card2");
  let added_answers = document.querySelector(".added_answers");
  let dustnin_removed = document.getElementById("Delete" + random_id);
  let delete_list = document.getElementById(random_id);
  added_answers.removeChild(delete_list);
  if (added_answers.children.length == 5) {
    if (card2.classList.contains("card2-scroll")) {
      card2.classList.remove("card2-scroll");
      card2.classList.add("card2-hideScroll");
    }
  }else if(added_answers.children.length == 0){
    card.classList.toggle("card-after");
    card2.classList.toggle("card2-after");
  }
}

const fisrtLine = () => {
  const lines = $('#text-area').val().split('\n');//gives all lines
  const firstLine=lines[0].split(' ')[0];
  return firstLine;
}

const fillLines = (textarea) => {
  const div = $("#text-area-p")
  div.empty()
  const lines = textarea.split('\n');
  if(lines.length > 12){
    div.attr('style','overflow-y:scroll')
  }else{
    div.attr('style','overflow-y:hidden')
  }
  lines.forEach(line => {
    div.append(`<div style="width:auto;">${line}</div>`);
  })
}

const sendMSG = (id) => {
  const data = {
    message :$(`#msg-${id}`)[0].innerText,
    customers :JSON.parse($(`#cust-${id}`)[0].innerText)
  }
  const div = document.getElementById('notification')
  div.style.zIndex = 5
  div.innerHTML = spinner
  $.ajax({
    type:'POST',
    url:'/Messaging/Save',
    data: JSON.stringify(data),
    contentType : "application/json",
    dataType: 'json',
    success: function (results) {
      if(results.msg == 'ok'){
        div.style.color = "green"
        div.innerHTML = "تم الارسال"
      }else{
        div.style.color = "red"
        div.innerHTML = "لم يتم الارسال بسبب خطا بالنظام"
      }
      setTimeout(() => {
        div.style.color = "green"
        div.innerHTML = ""
        div.style.zIndex = -1
      },2000)
    }
  })
}

const emptyAll = () => {
  $('#btu1').removeClass('activeButton')
  $('#btu2').removeClass('activeButton')
  $('#btu3').removeClass('activeButton')
}

const emptyAllDiv = () => {
  $('#div1').addClass('final-pos')
  $('#div2').addClass('final-pos')
  $('#div3').addClass('final-pos')
}

const addContent = (id,i,textarea) => {
  const element = $(id)
  let text = textarea.value
  text += '\n' + "للتواصل"
  const contacts = []
  const customer = []
  const customerNum = []
  const customerPhone = []
  const lis = document.getElementsByClassName('contactLI')
  const activeCust = document.getElementsByClassName('tr-tbody')
  for(let i = 0; i < lis.length; i++){
    contacts.push({
      name:lis[i].children[1].innerText,
      number:lis[i].children[2].innerText
    })
    const newContact = lis[i].children[1].innerText + " " + lis[i].children[2].innerText
    text += '\n' + newContact
  }
  for(let i = 0; i < activeCust.length; i++){
    if(activeCust[i].children[3].children[0].children[0].checked){
      customer.push({
        name:activeCust[i].children[0].children[0].innerText,
        number:activeCust[i].children[2].children[0].innerText
      })
      customerNum.push(activeCust[i].children[0].children[0].innerText)
      customerPhone.push(activeCust[i].children[2].children[0].innerText)
    }
  }
  const line = `<div id="msg-${i}" >${text}</div><div id="cust-${i}">${JSON.stringify({name:customerNum,number:customerPhone})}</div>`
  element.html(line)
  fillLines(text)
  fillCustomers(customer)
  fillContacts(contacts)
}

const fillCustomers = (customers) => {
  let lis = ""
  customers.forEach(cust => {
    lis += `<li>${cust.name}</li>`
  })
  $('#ulCustomers').html(lis)
}

const fillContacts = (contacts) => {
  let lis = ""
  contacts.forEach(cont => {
    lis += `<li>${cont.name}</li>`
  })
  $('#ulcontacts').html(lis)
}

const func = (e) => {
  const id = e.target.className
  Crossed(id)
  Delete(id)
}

const func2 = (e) => {
  const id = e.target.className
  Delete(id)
}