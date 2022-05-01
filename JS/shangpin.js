class Commodity {
    constructor() {
        this.Event()
    }
    Event() {
        Commodity.getJd('.detailHD #zoom .small ul').onmouseover = this.small_ulFn
        Commodity.getJd('.detailHD #zoom .middle').onmouseover = this.middle_overFn
        Commodity.getJd('.detailHD #zoom .middle').onmouseout = this.middle_outFn
        Commodity.getJd('.detailHD #zoom .middle').onmousemove = this.middle_moveFn
    }
    small_ulFn(eve) {
        let middle_img = Commodity.getJd('.detailHD #zoom .middle img')

        let big_img = Commodity.getJd('.detailHD #zoom .big img')
        console.log(middle_img);
        if (eve.target.nodeName == 'IMG') {
            console.log(eve.target.src);
            if (eve.target.src == 'http://127.0.0.1:5500/%E5%BC%A0%E5%AE%B9%E5%AE%87pc%E7%AB%AF/images/ssss1.png') {
                middle_img.src = '../images/mmmm1.png'
                big_img.src = '../images/bbbb1.png'

            };
            if (eve.target.src == 'http://127.0.0.1:5500/%E5%BC%A0%E5%AE%B9%E5%AE%87pc%E7%AB%AF/images/ssss2.png') {
                middle_img.src = '../images/mmmm2.png'
                big_img.src = '../images/bbbb2.png'

            };
            if (eve.target.src == 'http://127.0.0.1:5500/%E5%BC%A0%E5%AE%B9%E5%AE%87pc%E7%AB%AF/images/ssss3.png') {
                middle_img.src = '../images/mmmm3.png'
                big_img.src = '../images/bbbb3.png'

            };
            if (eve.target.src == 'http://127.0.0.1:5500/%E5%BC%A0%E5%AE%B9%E5%AE%87pc%E7%AB%AF/images/ssss4.png') {
                middle_img.src = '../images/mmmm4.png'
                big_img.src = '../images/bbbb4.png'

            };
            if (eve.target.src == 'http://127.0.0.1:5500/%E5%BC%A0%E5%AE%B9%E5%AE%87pc%E7%AB%AF/images/ssss5.png') {
                middle_img.src = '../images/mmmm5.png'
                big_img.src = '../images/bbbb5.png'

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
        let big = Commodity.getJd('.detailHD #zoom .big')
        let big_img = Commodity.getJd('.detailHD #zoom .big img')
        let middle = Commodity.getJd('.detailHD #zoom .middle')
        let mask = Commodity.getJd('.detailHD #zoom .middle .mask')
        let middle_fj = Commodity.getJd('.m-detail .center')
        let maskHeight = mask.offsetHeight / 2
        let maskWidth = mask.offsetWidth / 2
        let middleWidth = middle.offsetWidth
        let middleHeight = middle.offsetHeight
        mask.style.left = (eve.pageX - middle_fj.offsetLeft - maskWidth) + 'px';
        mask.style.top = (eve.pageY - middle_fj.offsetTop - maskHeight - 45) + 'px';


        if ((eve.pageX - middle_fj.offsetLeft - maskWidth) <= 0) mask.style.left = 0
        if ((eve.pageY - middle_fj.offsetTop - maskHeight - 45) <= 0) mask.style.top = 0

        if ((eve.pageX - middle_fj.offsetLeft - maskWidth) >= (middleWidth - mask.offsetWidth)) mask.style.left = (middleWidth - mask.offsetWidth) + 'px'
        if ((eve.pageY - middle_fj.offsetTop - maskHeight - 45) >= (middleHeight - mask.offsetHeight)) mask.style.top = (middleHeight - mask.offsetHeight) + 'px'

        big_img.style.left = (parseInt(mask.style.left) / (middleWidth - mask.offsetWidth) * (big.offsetWidth - big_img.offsetWidth)) + 'px'
        big_img.style.top = (parseInt(mask.style.top) / (middleHeight - mask.offsetHeight) * (big.offsetHeight - big_img.offsetHeight)) + 'px'

        console.log(big_img.left, big_img.top);


    }
    static getJd(element) {
        let ele = document.querySelectorAll(element)
        return (ele.length == 1) ? ele[0] : ele
    }

}
new Commodity()