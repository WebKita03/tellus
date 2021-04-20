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
                alert("Not logged in")
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
    
}

