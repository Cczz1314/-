class Commodity {
    count_div_lock = ''

    btn_addCart_num = 1
    url = 'http://localhost:3000'
    cont = ''
    count_div_num = 1

    specProp_li = Commodity.getJd('.detailHD .m-info .specProp li')
    constructor() {
        this.get()


    }
    async get() {
        this.id = window.location.search.replace('?', '')
        console.log(this.id);
        let arr = await axios.get(this.url + '/posts/' + this.id)

        //获取各个需要渲染的节点

        let slide = Commodity.getJd('.m-detail .detailHD .m-slide');

        let { puth, puth2, wares, amount, amount2, goodsId, goodsId1, amount3, wares2 } = arr.data


        this.wares = wares
        this.wares1 = wares2
        this.imgSec = puth
        this.imgSec1 = puth2
        this.jiage = amount
        this.jiage2 = amount2
        this.jiage3 = amount3
        slide.innerHTML = `
        <div class="m-slide">
        <!-- 放大镜 -->
        <div id="zoom">
            <div class="big">
                <img src="${puth}" alt="" width='800px' height='800px'>
            </div>
            <div class="middle">
                <img src="${puth}" alt="" width='100%' height='100%'>
                <div class="mask"></div>
            </div>
            <div class="small">
                <ul>
                    <li><img src="${puth}" alt="" width='100%' height='100%'  data-id="1"></li>
                    <li><img src="${puth2}" alt="" width='100%' height='100%'  data-id="2"></li>
                    <li><img src="${puth}" alt="" width='100%' height='100%'  data-id="3"></li>
                    <li><img src="${puth2}" alt="" width='100%' height='100%'  data-id="4"></li>
                    <li><img src="${puth}" alt="" width='100%' height='100%'  data-id="5"></li>
                </ul>
            </div>

        </div>
        
        `
        let info = Commodity.getJd('.m-detail .detailHD .m-info')


        info.innerHTML = ` <div class="intro">
        <h2>${wares}</h2>
        <div class="text">
            <span>匠心之作 微苦醇香 </span>
            <a href="#" class="fs-14">
    查看评价
    <i class="iconfont">&#xe621;</i>
  </a>
        </div>

    </div>
    <div class="m-limitedPrice">
        <span class="content">特价</span>
        <span class="countdown">距优惠结束3天09时09分</span>
    </div>
    <div class="price">
        <div class="flex title">
            <span class="fz">活动价</span>
            <span>${amount}</span>
            <span>${amount2}</span>
        </div>
        <div class="flex canClick">
            <span class="fz"></span>
            <span>
    天天免邮Pro会员立享免邮，到手价28.41
  </span>
        </div>
        <div class="flex sale">
            <span class="fz">促销</span>
            <span>打骨折</span>
        </div>
        <div class="flex m-feedbackBonus">
            <span class="fz">购物返</span>
            <span>最高返2积分</span>
        </div>
        <div class="flex pointInfo">
            <span class="fz">限制</span>
            <span>特价商品不可与优惠券叠加使用</span>
        </div>
        <div class="flex freightText">
            <span class="fz">邮费</span>
            <a href="#">满99元免邮</a>
        </div>
        <div class="flex delivery">
            <span class="fz">配送</span>
            <span>湖南长沙</span>
        </div>
        <hr>
        <div class="flex policyBox">
            <span class="fz">服务</span>
            <a href="#">
                <span>网易严选自营 > </span>
                <span>不支持无忧退换 > </span>
                <span>不可用券 > </span>
                <span>国内部分地区不可配送</span>
            </a>
        </div>
    </div>
    <div class="specProp">
        <span class="fz">规格</span>
        <ul>
            <li class=""><img class="a1"goodsId="${goodsId}" src="${puth}" alt="" width="52px" height="52px"></li>
            <li><img class="a2" goodsId="${goodsId1}" src="${puth2}" alt="" width='52px' height="52px"></li>
        </ul>
    </div>
    <div class="count">
        <span class="fz">数量</span>
        <div class="u-selnum">
            <span class="sub">-</span>
            <input type="text" value="1">
            <span class="sup">+</span>
        </div>
    </div>
    <div class="btn">
        <a href="javascript:" class="submit">立即购买</a>
        <a href="javascript:" class="addCart">加入购物车</a>
        <a href="javascript:">收藏</a>
        <a href="javascript:">下载严选APP</a>
    </div>
        `



        this.Event()

    }
    Event() {
        Commodity.getJd('.detailHD #zoom .small ul').onmouseover = this.small_ulFn.bind(this)
        Commodity.getJd('.detailHD #zoom .middle').onmouseover = this.middle_overFn
        Commodity.getJd('.detailHD #zoom .middle').onmouseout = this.middle_outFn
        Commodity.getJd('.detailHD #zoom .middle').onmousemove = this.middle_moveFn
        Commodity.getJd('.detailHD .m-info .specProp ul').onclick = this.specProp_ulClick.bind(this)
        Commodity.getJd('.m-detail .detailHD .m-info .count .u-selnum').onclick = this.count_divClick.bind(this)
        Commodity.getJd('.detailHD .m-info .btn .addCart').onclick = this.btn_addCartClick.bind(this)
        Commodity.getJd('.detailHD .m-info .btn  .submit').onclick = this.btn_submitClick.bind(this)

    }
    small_ulFn(eve) {
        let middle_img = Commodity.getJd('.detailHD #zoom .middle img')

        let big_img = Commodity.getJd('.detailHD #zoom .big img')

        if (eve.target.nodeName == 'IMG') {

            if (eve.target.dataset.id == '1') {

                middle_img.src = this.imgSec1
                big_img.src = this.imgSec1
            };
            if (eve.target.dataset.id == '2') {
                middle_img.src = this.imgSec
                big_img.src = this.imgSec

            };
            if (eve.target.dataset.id == '3') {
                middle_img.src = this.imgSec1
                big_img.src = this.imgSec1

            };
            if (eve.target.dataset.id == '4') {
                middle_img.src = this.imgSec
                big_img.src = this.imgSec

            };
            if (eve.target.dataset.id == '5') {
                middle_img.src = this.imgSec1
                big_img.src = this.imgSec1

            };
        }
    }
    middle_overFn() {
        Commodity.getJd('.detailHD #zoom .middle .mask').style.display = 'block'
        Commodity.getJd('.detailHD #zoom .big').style.display = 'block'
    }
    middle_outFn() {
        Commodity.getJd('.detailHD #zoom .middle .mask').style.display = 'none'
        Commodity.getJd('.detailHD #zoom .big').style.display = 'none'
    }
    middle_moveFn(eve) {

        //获取各个节点
        let big = Commodity.getJd('.detailHD #zoom .big')
        let big_img = Commodity.getJd('.detailHD #zoom .big img')
        let middle = Commodity.getJd('.detailHD #zoom .middle')
        let mask = Commodity.getJd('.detailHD #zoom .middle .mask')
        let middle_fj = Commodity.getJd('.m-detail .center')

        //小div自身宽高的一半
        let maskHeight = mask.offsetHeight / 2
        let maskWidth = mask.offsetWidth / 2

        //图片的自身宽高
        let middleWidth = middle.offsetWidth
        let middleHeight = middle.offsetHeight

        //鼠标移动时小div跟随
        mask.style.left = (eve.pageX - middle_fj.offsetLeft - maskWidth) + 'px';
        mask.style.top = (eve.pageY - middle_fj.offsetTop - maskHeight - 45) + 'px';

        //判断边界
        if ((eve.pageX - middle_fj.offsetLeft - maskWidth) <= 0) mask.style.left = 0
        if ((eve.pageY - middle_fj.offsetTop - maskHeight - 45) <= 0) mask.style.top = 0

        if ((eve.pageX - middle_fj.offsetLeft - maskWidth) >= (middleWidth - mask.offsetWidth)) mask.style.left = (middleWidth - mask.offsetWidth) + 'px'
        if ((eve.pageY - middle_fj.offsetTop - maskHeight - 45) >= (middleHeight - mask.offsetHeight)) mask.style.top = (middleHeight - mask.offsetHeight) + 'px'

        //给大图片设置移动值
        big_img.style.left = (parseInt(mask.style.left) / (middleWidth - mask.offsetWidth) * (big.offsetWidth - big_img.offsetWidth)) + 'px'
        big_img.style.top = (parseInt(mask.style.top) / (middleHeight - mask.offsetHeight) * (big.offsetHeight - big_img.offsetHeight)) + 'px'



    }
    specProp_ulClick(eve) {

        let span1 = Commodity.getJd('.detailHD .m-info .price .title span:nth-child(2)')
        let span2 = Commodity.getJd('.detailHD .m-info .price .title span:nth-child(3)')
        this.h2 = Commodity.getJd('.detailHD .m-info .intro h2')
        if (eve.target.className == 'a1') {


            Commodity.getJd('.borderAc') && (Commodity.getJd('.borderAc').className = '')
            eve.target.parentNode.className = 'borderAc'
            this.count_div_lock = '1'
            span1.innerHTML = this.jiage;
            span2.innerHTML = this.jiage2;
            this.h2.innerHTML = this.wares

        }
        if (eve.target.className == 'a2') {
            Commodity.getJd('.borderAc') && (Commodity.getJd('.borderAc').className = '')
            eve.target.parentNode.className = 'borderAc'


            span1.innerHTML = this.jiage2;
            span2.innerHTML = this.jiage3;
            this.count_div_lock = '2'
            this.h2.innerHTML = this.wares1

        }


    }
    count_divClick(eve) {

        let input = Commodity.getJd('.m-detail .detailHD .m-info .count .u-selnum input')



        if (eve.target.nodeName == 'SPAN') {

            if (eve.target.innerHTML == '-') {
                this.count_div_num--
                    if (this.count_div_num < 1) {
                        this.count_div_num = 1
                        return;
                    }

                input.value = this.count_div_num


            }
            if (eve.target.innerHTML == '+') {

                input.value = ++this.count_div_num

            }

        }
    }
    async btn_addCartClick() {
        let goodsid = Commodity.getJd('.borderAc>img').getAttribute('goodsid')
        let input = Commodity.getJd('.m-detail .detailHD .m-info .count .u-selnum input')
        let span1 = Commodity.getJd('.detailHD .m-info .price .title span:nth-child(2)')

        let arr = await axios.get('http://localhost:3000/profile?goodsid=' + goodsid)
        let { data } = arr
        if (data.length == 0) {

            axios.post('http://localhost:3000/profile', {
                "img": Commodity.getJd('.borderAc>img').src,
                "wares": Commodity.getJd('.m-detail .detailHD .m-info .intro h2').innerHTML,
                "amount2": Commodity.getJd('.detailHD .m-info .price .title span:nth-child(2)').innerHTML,
                "goodsid": goodsid,
                "num": Commodity.getJd('.m-detail .detailHD .m-info .count .u-selnum input').value,
            })
        } else {

            axios.patch('http://localhost:3000/profile/' + data[0].id, {
                "num": ++data[0].num
            })
        }



    }
    btn_submitClick() {
        let token = localStorage.getItem('token')
            // 跳转
        console.log(token);
        if (!token) location.assign('../html/login.html')

    }
    static getJd(element) {
        let ele = document.querySelectorAll(element)
        return (ele.length == 1) ? ele[0] : ele
    }

}
new Commodity()