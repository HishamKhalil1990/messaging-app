function filter1Function() {
    let input, filter, ul, i, li;
    input = document.getElementById("search1");
    filter = input.value;
    ul = document.getElementById("filter1Ul");
    div = document.getElementsByClassName("rad-text-1");
    li = document.getElementsByClassName("li-1");
    for (i = 0; i < div.length; i++) {
      const txtValue = div[i].textContent || div[i].innerText;
      if (txtValue.indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}

function filter2Function() {
    let input, filter, ul, i, li;
    input = document.getElementById("search2");
    filter = input.value;
    ul = document.getElementById("filter2Ul");
    div = document.getElementsByClassName("rad-text-2");
    li = document.getElementsByClassName("li-2");
    for (i = 0; i < div.length; i++) {
      const txtValue = div[i].textContent || div[i].innerText;
      if (txtValue.indexOf(filter) > -1) {
        if(li[i].classList.contains("activeFilter") || li[i].classList.contains("filter2-none")){
          li[i].style.display = "";
        }
      } else {
        li[i].style.display = "none";
      }
    }
}

function filter3(classList) {
  for(let i = 0; i < classList.length; i++){
    const arr = classList[i].split('filter1-')
    if(arr.length == 2){
      displayFilter2Only(arr[1])
      displayCustomer(arr[1])
      break;
    }
  }
  document.getElementById('filter1Ul').addEventListener('click',func1)
}

function filter4(classList) {
  for(let i = 0; i < classList.length; i++){
    const arr = classList[i].split('filter2-')
    if(arr.length == 2){
      displayCustomer(arr[1])
      break;
    }
  }
  document.getElementById('filter2Ul').addEventListener('click',func2)
}

const displayFilter2Only = (filterStr) => {
  const filters = document.getElementsByClassName('toggeleFilter')
  for(let i = 0; i < filters.length; i++){
    const innerFilter = filters[i].classList
    for(let j = 0; j < innerFilter.length; j++){
      const str = innerFilter[j]
      if(str == filterStr){
        filters[i].style.display = "";
        innerFilter.add("activeFilter");
        break;
      }else{
        filters[i].style.display = "none";
        innerFilter.remove("activeFilter");
      }
    }
  }
}

const displayCustomer = (filterStr) => {
  if(filterStr != "none"){
    const customers = document.getElementsByClassName('toggeleCustomer')
    const checkbox = document.getElementsByClassName("checkbox")
    for(let i = 0; i < customers.length; i++){
      checkbox[i].checked = false;
      const innerFilter = customers[i].classList
      for(let j = 0; j < innerFilter.length; j++){
        const str = innerFilter[j]
        if(str == filterStr){
          customers[i].style.display = "";
          innerFilter.add("activeCustomer");
          checkbox[i].classList.add("activeCustomerBox");
          break;
        }else{
          customers[i].style.display = "none";
          innerFilter.remove("activeCustomer");
          checkbox[i].classList.remove("activeCustomerBox");
        }
      }
    }
  }else{
    const customers = document.getElementsByClassName('activeCustomer')
    const str = customers[0].classList[0]
    displayCustomer(str)
  }
}