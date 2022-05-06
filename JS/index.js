//轮播图

let bannerULiAll = document.querySelectorAll('.banner ul li')
let bannerAAll = document.querySelectorAll('.banner ol li a')
let next = document.querySelector('.banner .you')
let prev = document.querySelector('.banner .zuo')
let banner = document.querySelector('.banner')
    //声明两个变量用来存放
let index = 0
let indexPrev = 0
    //声明定时器名字
let ccc = ''
    //绑定点击事件
bannerAAll.forEach((v, k) => {

    v.onclick = clickFn.bind({}, k)

})

function clickFn(key) {
    indexPrev = index
        //将索引值赋值给index并调用改变class的函数
    index = key
    loop()
}

banner.onmouseover = function() {
    //鼠标移入清除定时器
    clearInterval(ccc)
}
banner.onmouseout = function() {
    //鼠标移出开启定时器
    lock()
}

function lock() {
    ccc = setInterval(_ => {
        indexPrev = index
            //将上一个的索引存到变量中

        index++
        //判断index 最大索引
        if (index > 2) {
            index = 0
        }

        loop()
    }, 1000)
}
next.onclick = function() {
    indexPrev = index
    index++
    if (index > 2) {
        index = 0
    }
    loop()
}

prev.onclick = function() {
    indexPrev = index
    index--
    if (index < 0) {
        index = 2
    }
    loop()
}


function loop() {

    bannerAAll[indexPrev].className = ''
    bannerULiAll[indexPrev].className = ''


    bannerAAll[index].className = 'ac'
    bannerULiAll[index].className = 'ac'

}

//商品加载
//先获取节点
let section_list = document.querySelector('.section_list>div')
let section_next = document.querySelector('section .you')
let section_prev = document.querySelector('section .zuo')


let space = 10;
let url = ' http://localhost:3000'
let section_page = 0;
let max = 0;
let section_times1 = ''
let section_times2 = ''
let div_left = []
    //声明一个变量用来存放即将打印到里面的数据
let section_html = ''

async function get(page) {
    //获取服务器数据
    let arr = await axios.get(url + '/posts').then(res => {
        res.data.forEach((key, index) => {

            let { id, puth, puth2, wares, amount } = key

            section_html += `<div><a href="../html/shangpin.html?${index+1}" ><img src="${puth}" alt=""> <img src="${puth2}" alt=""></a><h5>${wares}</h5><p>${amount}</p></div>`
                //每个div left的值通过index的变化添加到数组中



            div_left.push(index * (265 + space))


        })
    })

    //声明数组用来保存left的值




    section_list.innerHTML = section_html


    let section_list_div = document.querySelectorAll('.section_list>div div')


    section_list_div.forEach((key, index) => {
        //将与key相匹配的left值赋值
        key.style.left = div_left[index] + 'px'

    })



    return div_left
}

let section_res = get(section_page)
    //绑定点击事件


section_next.onclick = section_Nextclick
section_prev.onclick = section_Prevclick




function section_Nextclick() {

    section_res.then(e => {
        section_prev.style.color = ''
        if (section_list.offsetLeft <= (-e[e.length - 1])) {
            section_next.style.color = '#' + 666
            return
        }
        //防止定时器重复开启
        if (section_times1) clearInterval(section_times1)

        //调用
        section_times1 = setInterval(_ => {
            max -= 20
            section_list.style.left = max + 'px'



            if ((section_list.offsetLeft % 1100) == 0) {
                clearInterval(section_times1)
            }

        }, 10)
    });


}


function section_Prevclick() {

    section_res.then(e => {
        section_next.style.color = ''
        if (section_list.offsetLeft >= (-e[0])) {
            section_prev.style.color = '#' + 666
            return;
        }

        //防止定时器重复开启
        if (section_times2) clearInterval(section_times2)


        section_times2 = setInterval(_ => {
            max += 20


            section_list.style.left = max + 'px'

            if ((section_list.offsetLeft % 1100) == 0) {
                clearInterval(section_times2)
            }

        }, 10)

    })

}


//人气推荐板块

let recommed_title = document.querySelector('.recommend_nav .title');
let recommed_bigBox = document.querySelectorAll('.recommend_nav .title~div')

recommed_title.onclick = function(event) {

    //事件委托机制
    let t = event.target
        //判断点击的是哪一个A标签
    if (t.innerHTML == '编辑推荐') {
        //将存在的Class设置为空
        document.querySelector('.recommend_nav .ac') && (document.querySelector('.recommend_nav .ac').className = '');
        //给当前点击的a标签设置class名
        t.className = 'ac';
        //通过改变class 设置dispaly none 和block
        recommed_bigBox[0].className = 'big_box';
        recommed_bigBox[1].className = '';
    }
    if (t.innerHTML == '热销总榜') {
        document.querySelector('.recommend_nav .ac') && (document.querySelector('.recommend_nav .ac').className = '');
        t.className = 'ac';
        recommed_bigBox[0].className = '';
        recommed_bigBox[1].className = 'big_box';
    }
}

//评论区轮播图

let comment_div_ul = document.querySelector('.comment_nav .title~div>ul')
let comment_arr = []
    //声明数组用来保存left的值
let comment_div_left = []
    //声明一个变量用来存放即将打印到里面的数据
let comment_html = ''
async function comment_get() {
    //获取服务器数据
    await axios.get(url + '/comments').then(res => {
        res.data.forEach((key, index) => {

            let { id, img, span, P } = key

            comment_html += `<li  data-id='${index}'>
            <a href=""><img src="${img}" alt=""></a>
            <div> <span>${span}</span><a href="">自然纤长卷翘睫毛膏大. <span>￥69</span></a>
                <p>${P}</p>
            </div>
            </li>`
                //每个div left的值通过index的变化添加到数组中


            comment_div_left.push(index * (360 + space))

        })

    })





    comment_div_ul.innerHTML = comment_html


    let comment_div_div = document.querySelectorAll('.comment_nav .title~div ul>li')

    comment_div_div.forEach((key, index) => {
        //将与key相匹配的left值赋值
        key.style.left = comment_div_left[index] + 'px'
        comment_arr.push(key)
    })



    return { comment_div_div, comment_div_left }
}
let comment_res = comment_get()
    //轮播

let comment_times1 = ''

// comment_arr[comment_arr.length - 1].style.left = '0px'


function conment_loop() {
    let num = 0

    comment_res.then(e => {



        comment_times1 = setInterval(_ => {
            let comment_div_div = document.querySelectorAll('.comment_nav .title~div ul>li')


            comment_div_ul.appendChild(comment_div_ul.children[0])
            comment_div_div.forEach((key, index) => {
                //将与key相匹配的left值赋值

                key.style.left = e.comment_div_left[index] + 'px'

            })


            if (num >= e.length) {


                clearInterval(comment_times1);


            }

        }, 2000)

    })


}
conment_loop()