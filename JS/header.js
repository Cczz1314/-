function getElement(ele) {
    let element = document.querySelectorAll(ele)
    return element.length == 1 ? element[0] : element

}
//获取input框节点
let input = getElement('#header_sousuo')
    //获取ul节点
let headerUl = getElement('#header_ul')
let times = ''
input.oninput = function() {
    //防抖
    if (times) clearTimeout(times)
    times = setTimeout(function() {

            search(this.value)
        }.bind(this), 200)
        //改变this指向,


}

function search(val) {
    // 创建script标签
    let script = document.createElement("script");
    script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=callback";
    // 将script追加到head中
    document.head.appendChild(script);
    // 追加完成就删除
    script.remove();
}

function callback(data) {
    //结构数据
    let { s } = data
    //遍历并将数据追加到页面中
    let li = ''
    s.forEach((v, k) => {
        li += `<li><a>${v}</a></li>`
    })
    console.log(li);


    //追加到ul中
    headerUl.innerHTML = li
    headerUl.style.display = 'block'
}
//当input框失去焦点关闭搜索框
input.onblur = function() {
        headerUl.style.display = 'none'
    }
    //获取焦点时也打开搜索框
input.onfocus = function() {
    headerUl.style.display = 'block'
}

let gouwuche = document.querySelector('header>div>a~span')
let ul = document.querySelector('header>div>ul')

async function inner() {
    await axios.get('http://localhost:3000/profile').then(res => {
        gouwuche.innerHTML = res.data.length
        for (let i = 0; i < res.data.length; i++) {
            let li = document.createElement('li')
            li.innerHTML = `   <div class="w2">
        <a href="#">
            <img src="${res.data[i].img}" alt="">
        </a>
    </div>
    <div class="w3">
        <span>${res.data[i].wares}</span>
        <p>数量:${res.data[i].num}
        </p>
    </div>
    <div class="w5">
        <span class="price">¥${Math.round(((res.data[i].num*res.data[i].amount2.replace('¥','')) * 100)) / 100}</span>
    </div>
    <div class="w6">
        <a href="#none" data-id='${res.data[i].id}'>X</a>
    </div>
        `
            ul.appendChild(li)
        }


    })

    let liAll = document.querySelectorAll('header>div>ul li')


    liAll.forEach((value, key) => {
        value.onclick = liAllClickFn
    })
}

inner()

function liAllClickFn(eve) {
    if (eve.target.nodeName == 'A') {
        if (eve.target.innerHTML == 'X') {

            let id = eve.target.dataset.id

            axios.delete('http://localhost:3000/profile/' + id)


        }
    }
}
let div = document.querySelectorAll('header>div')

div.onmouseover = function() {
    inner()

}