function login(){
    let form=document.getElementById('login-form-real').elements
    console.log(form)
    let username = form['f1'].value
    let password = form['f2'].value
    $.ajax({
    url: 'http://klkvr.com:8080/login',
    type: 'POST',
    data: JSON.stringify({"username": username,
        "password": password}),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
        switch (data['result']){
            case true:
                document.cookie = "user="+username;
                document.location.href = "main-page.html";
                break
            case false:
                alert("Неправильное имя пользователя или пароль")
                break
        }
    }
    });
}

function register(){
    let form = document.getElementById('register-form-real').elements
    console.log(form)
    let name = form['name'].value
    let surname = form['surname'].value
    let phone = form['phone'].value
    let username = form['username'].value
    let password = form['password'].value
    if (name == ""){
        alert("Имя и фамилия не могут быть пустыми!")
        return
    }
    if (username == ""){
        alert("Логин не может быть пустым")
        return
    }
    if (password == ""){
        alert("Пароль не может быть пустым")
        return
    }
    $.ajax({
    url: 'http://klkvr.com:8080/register',
    type: 'POST',
    data: JSON.stringify({"name": name,
                          "surname": surname,
                          "phone": phone,
                          "username": username,
                          "password": password}),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
        console.log(data)
        switch (data['result']){
            case true:
                document.cookie = "user="+username;
                alert("Account registered")
                document.location.href = "login.html"
                break;
        }
    }
    });
}

function change1() {
    let block1 =document.getElementsByClassName('block')
    block1[0].classList.add('b1');
    setTimeout(() => {
        block1[0].style.display='none'
    }, 500);
    setTimeout(() => {
        let block2=document.getElementsByClassName('b2');
        block2[0].classList.add('b22')
        block2[0].style.display='flex'
    }, 500);
    let plans_list = new Array()
    $.ajax({
        url: 'http://klkvr.com:8080/get_plans',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            plans_list = data['result']
            console.log(plans_list)
        }
        });
    
}
window.onload = function checkCookies() {
    if (document.cookie.includes('user=')){
        let username = document.cookie
            .split('; ')
            .find(row => row.startsWith('user='))
            .split('=')[1];
        $.ajax({
            url: 'http://klkvr.com:8080/user_data',
            type: 'POST',
            data: JSON.stringify({"username": username}),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (user_data) {
                console.log(user_data);
            }
            });
        if (document.location.href != "main-page.html") 
            document.location.href = "main-page.html"
    }
    else{
        console.log(document.location.href)
        if (document.location.href != "login.html")
            document.location.href = "login.html"
    }
    
}