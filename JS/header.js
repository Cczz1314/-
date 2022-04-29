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