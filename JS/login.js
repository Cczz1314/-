class Login {
    url = 'http://localhost:8888'
    constructor() {
        this.event()
    }
    event() {
        Login.getJd('.login .bg .g-row .btn button ').onclick = this.btn
    }
    btn(event) {
        event.preventDefault()
        let input_text = Login.getJd('.login .bg .g-row .inputbox #phone')
        let input_pwd = Login.getJd('.login .bg .g-row .inputbox #pwd')

        // if (!input_text.value.trim() || !input_pwd.value.trim()) throw new Error('请输入账号密码');


        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // xhr.setReuestHeader
        // 对参数进行编码
        let data = `username=${input_text.value}&password=${input_pwd.value}`;
        axios.post('http://localhost:8888/users/login', data).then(res => {
            let { status, data } = res;


            if (status == 200) { // 请求成功

                // 判断是否登录成功
                if (data.code == 1) {
                    // token 是登录 的 标识符

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_id', data.user.id);
                    //从哪里来,跳转到哪里去
                    window.history.back()
                } else { // 登录失败,就提示输入错误
                    layer.open({
                        title: '登录提示',
                        content: '用户名或者密码输入错误'
                    });
                }
            }
            console.log(localStorage.setItem('token'));


        });

    }


    static getJd(element) {
        let ele = document.querySelectorAll(element)
        return (ele.length == 1) ? ele[0] : ele
    }

}
new Login