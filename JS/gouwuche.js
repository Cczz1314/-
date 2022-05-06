class Cart {
    count_div_num = 0
    constructor() {

        this.get.call(this)


    }
    async get() {

        let ul = Cart.getJd('.center .c-detail ul')

        await axios.get('http://localhost:3000/profile').then(res => {


            for (let i = 0; i < res.data.length; i++) {
                let li = document.createElement('li')
                li.innerHTML = `<div class="w1"> <input type="checkbox">
                </div>
                <div class="w2">
                    <div class="pic">
                        <a href="#">
                            <img src="${res.data[i].img}" alt="">
                        </a>
                    </div>
                    <div class="nameCon">
                        <div class="promotionBar">
                            <span>特价抢购中</span>
                            <span>距优惠结束</span>
                            <span>2天12小时</span>
                        </div>
                        <a href="#">${res.data[i].wares}</a>
                       
                    </div>
                </div>
                <div class="w3">
                    <span>${res.data[i].amount2}</span>
                </div>
                <div class="w4">
                    <span data-id='${res.data[i].id}'>-</span>
                    <input type="text" value="${res.data[i].num}">
                    <span data-id='${res.data[i].id}'>+</span>
                </div>
                <div class="w5">
                    <span class="price">¥25.00</span>
                </div>
                <div class="w6">
                    <a href="#none" data-id='${res.data[i].id}'>删除</a>
                </div>
          
                `
                ul.appendChild(li)
            }

            let shanchu = Cart.getJd('.m-cart .c-detail ul .first~li .w6 a')
                //获取两个节点
            shanchu.forEach((value, key) => {
                //给每个删除按钮再设置一个自定义属性
                value.setAttribute('data-id1', key)
            })

        })

        this.eve()
        this.ul_event.call(this)
        this.Price.call(this)
        this.select()
    }
    eve() {

        Cart.getJd('.m-cart .c-detail ul').onclick = this.ul_divClick
        Cart.getJd('.m-cart .cart-total ul li .w1 .box2 a~a').onclick = this.del
    }
    async del() {

        let list = Cart.getJd('.m-cart .c-detail ul .first~li .w1 input')
        let delBtn = Cart.getJd('.m-cart .c-detail ul .first~li .w6 a')



        for (let i = 0; i <= list.length; i++) {

            if (list[i].checked == true) {
                await axios.delete('http://localhost:3000/profile/' + delBtn[i].dataset.id)
            }
        }








    }


    ul_event(eve) {

        let li = Cart.getJd('.m-cart .c-detail ul li')

        li.forEach((value, key) => {
            value.onclick = this.liClick.bind(this)
        });

    }

    select() {
        let quanxuan = Cart.getJd('.m-cart .c-detail ul .first input')
        let list = Cart.getJd('.m-cart .c-detail ul .first~li .w1 input')

        quanxuan.onclick = function(value) {
            let allCheckStatus = this.checked;
            // console.log(allCheckStatus);

            // 4 遍历单个商品的按钮状态,让其跟谁全选按钮状态
            list.forEach(function(check) {
                // console.log(check);
                // 4-1 设置其状态
                check.checked = allCheckStatus;

            })
        }
        list.forEach(function(value) {
            value.onclick = selectCheckFn
        })

        function selectCheckFn() {
            //如果有一个没有被选中  全选按钮设置为false
            if (!this.checked) quanxuan.checked = false;


            var res = Array.from(list).find(function(input) {


                return !input.checked;

            });

            if (!res) quanxuan.checked = true;


        }

    }

    liClick(eve) {
        let inputCheck = Cart.getJd('.m-cart .c-detail ul .first~li .w1 input')


        if (eve.target.nodeName == 'SPAN') {
            if (eve.target.innerHTML == '-') {
                var input = eve.target.nextElementSibling;
                //获取input的值  处理后重新打印
                this.count_div_num = input.value
                    --this.count_div_num
                    //如果数据小于1则赋值为1
                if (this.count_div_num < 1) {
                    alert('最少买一个，或者点删除')
                    this.count_div_num = 1
                    return;
                }

                input.value = this.count_div_num


            }
            if (eve.target.innerHTML == '+') {

                input = eve.target.previousElementSibling;
                this.count_div_num = input.value
                    //获取input的值  处理后重新打印
                input.value = ++this.count_div_num

            }
            let id = eve.target.dataset.id //用来确定需要修改的数据ID
            axios.patch('http://localhost:3000/profile/' + id, {
                "num": input.value
            })


        }
        if (eve.target.nodeName == 'A') {
            if (eve.target.innerHTML == '删除') {
                //获取两个自定义节点  
                let id = eve.target.dataset.id //用来确定删除的ID

                let id1 = eve.target.dataset.id1 //用来判断所删除的是否被选中

                if (inputCheck[id1].checked == false) {
                    alert('请先选中')
                    return
                }
                axios.delete('http://localhost:3000/profile/' + id)
            }
        }
        this.Price()
    }

    Price() {
        let Price = []
        let input = Cart.getJd('.m-cart .c-detail ul .first~li .w4 input')
        let span = Cart.getJd('.m-cart .c-detail ul li .w3 span')
        let xiaoji = Cart.getJd('.m-cart .c-detail ul li .w5 span')
        let priceSpan = Cart.getJd('.m-cart .cart-total ul li .w2 .total p .yfje')
        let check = Cart.getJd('.m-cart .c-detail ul .first~li .w1 input')



        for (let i = 0; i < input.length; i++) {
            //计算获取到的数量和处理后的单价
            let sum = input[i].value * span[i].innerHTML.replace('¥', '')

            //打印到小结中
            xiaoji[i].innerHTML = '¥' + (Math.round((sum * 100)) / 100)
                //判断是否被选中  将选中的结果 保存到提前准备好的数组中
            if (check[i].checked == true) {
                Price.push(sum)
            }

        }
        if (Price.length == 0) {
            //如果没有被选中  总价为0
            priceSpan.innerHTML = '¥0'
        } else {
            //如果有选中  则计算总和
            let sum = Price.reduce((x, y) => x + y)

            priceSpan.innerHTML = '¥' + (Math.round((sum * 100)) / 100)

        }

    }


    static getJd(element) {
        let ele = document.querySelectorAll(element)
        return (ele.length == 1) ? ele[0] : ele
    }
}
new Cart