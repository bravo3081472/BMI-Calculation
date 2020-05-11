var list = document.querySelector('.list')
var sendData = document.querySelector('.send')
var data = JSON.parse(localStorage.getItem('listData')) || []

var today = new Date()
var month = today.getMonth()+1
var day = today.getDate()
// var output = today.getFullYear()+'/'+(month<10 ? '0' : '')+month
if(month<10){month = '0' + month}
if(day<10){day = '0' + day}
var output = today.getFullYear()+'/'+month+ '/' + day

sendData.addEventListener('click',Calculation,false)
list.addEventListener('click',toggleDone,false)
updatedList(data)

function Calculation(e) {
    var body_height = document.querySelector('.body-height').value
    var body_weight = document.querySelector('.body-weight').value
    var result = body_weight / Math.pow((body_height/100),2)

    var index_color =''
    // var BMI_index = (result<18.5 ? '體重過輕' : 18.5<=result && result<24 ? '體重正常' : 24<=result && result<27 ? '體重過重' : 27<=result && result<30 ? '輕度肥胖' : 30<=result && result<35 ? '中度肥胖' : result>=35 ? '重度肥胖' : '')
    var BMI_index = ''
    if(result<18.5){
        BMI_index = '體重過輕'
        index_color = 'li_blue'
    }else if(18.5<=result && result<24) {
        BMI_index = '體重正常'
        index_color = 'li_green'
    }else if(24<=result && result<27) {
        BMI_index = '體重過重'
        index_color = 'li_yellow'
    }else if(27<=result && result<30) {
        BMI_index = '輕度肥胖'
        index_color = 'li_orange'
    }else if(30<=result && result<35) {
        BMI_index = '中度肥胖'
        index_color = 'li_orange'
    }else if(result && result>=35) {
        BMI_index = '重度肥胖'
        index_color = 'li_red'
    }

    BMI_result = {
        color: index_color,
        index: BMI_index,
        content: result.toFixed(2),
        weight: body_weight,
        height: body_height,
        today: output
    }
    data.push(BMI_result)
    updatedList(data)
    localStorage.setItem('listData',JSON.stringify(data))
}

function updatedList(data) {
    str = ''
    var len = data.length
    for( i=0; i < len; i++ ){
        str += 
        '<li class="'+ data[i].color +'"><div class="list__box"><span class="list__index">'+ data[i].index +'</span></div>       <div class="list__box"><span class="list__title">BMI</span> <span class="list__value">'+ data[i].content +'</span></div>       <div class="list__box"><span class="list__title">weight</span> <span class="list__value">'+ data[i].weight +'kg</span></div>      <div class="list__box"><span class="list__title">height</span> <span class="list__value">'+ data[i].height +'cm</span></div>         <div class="list__box"><span class="list__today">'+ data[i].today +'</span></div>     <a href="#" data-index='+ i +'>X</a>      </li>'
    }
    list.innerHTML = str
}

function toggleDone(e) {
    e.preventDefault()
    if(e.target.tagName !== 'A'){return}
    var index = e.target.dataset.index
    data.splice(index,1)
    localStorage.setItem('listData',JSON.stringify(data))
    updatedList(data)
}
