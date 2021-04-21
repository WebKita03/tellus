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

function logout(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    document.location.href = "login.html"
    alert("Вы вышли из аккаунта")
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
                alert("Аккаунт зарегистрирован")
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
        let block2=document.getElementsByClassName('b2');
        block2[0].classList.add('b22')
        block2[0].style.display='flex'
    }, 500);
    let plans_list = new Array();
    let panel=document.getElementById('panel')
    $.ajax({
        url: 'http://klkvr.com:8080/get_plans',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            plans_list = data['result']
            for (i = 0; i < plans_list.length; i++){
                let newPack = document.createElement("div")
                newPack.className = "pack"
                let j = i
                newPack.onclick = function() {
                    showDetails(j);
                    panel.style.display='block';
                }
                let text = document.createElement('div')
                text.innerHTML = plans_list[i]['name']
                text.className = "center-text"
                let img = document.createElement('img')
                img.src = "icons/"+plans_list[i]['pic']
                newPack.appendChild(img)
                newPack.appendChild(text)
                document.getElementById("packs-container").appendChild(newPack)
            }
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
                user_data['id']
            }
            });
        if (!(document.location.href.includes("main-page.html")))
            document.location.href = "main-page.html"
    }
    else{
        console.log(document.location.href)
        if (!document.location.href.includes("login.html") && !document.location.href.includes("registration.html"))
            document.location.href = "login.html"
    }
}

function showDetails(id){
    $.ajax({
        url: 'http://klkvr.com:8080/get_plans',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            plans_list = data['result']
            let plan = plans_list[id]
            let smellDiv = document.createElement("div")
            let touchDiv = document.createElement("div")
            let soundDiv = document.createElement("div")
            let pic = document.createElement("img")
            pic.src = "icons/"+ plan["pic"]
            pic.className = "details-picture"
            let nameDiv = document.createElement("div")
            nameDiv.innerHTML = plan["name"]
            nameDiv.className = "p name"
            smellDiv.className = "p smell"
            smellDiv.innerHTML = plan["smell"]
            touchDiv.className = "p touch"
            touchDiv.innerHTML = plan["touch"]
            soundDiv.className = "p sound"
            soundDiv.innerHTML = plan["sound"]
            document.getElementById("options-container").appendChild(smellDiv)
            document.getElementById("options-container").appendChild(soundDiv)
            document.getElementById("options-container").appendChild(touchDiv)
            document.getElementById("options-container").appendChild(pic)
            document.getElementById("options-container").appendChild(nameDiv)
            document.getElementById("packs-container").style.display = "none"
            document.getElementById("options-container").style.display='flex';
        }
        });
}

function back(){
    document.getElementById("packs-container").style.display = "flex";
    document.getElementById("options-container").style.display = "none";
}

document.body.onkeydown = function(event) {
    var e = event || window.event;
    var code = e.keyCode || e.which;
    var activeEl = document.activeElement.id;
    if(code == 13 && activeEl == "registration-form")
        register()

   if(code == 13 && activeEl == "pass-word") 
    login()

}