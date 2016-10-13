var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;

	if (window.ActiveXobject){
		try{
			xmlHttp =  new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xmlHttp = false;
		}
	}else{
		try{
			xmlHttp =  new XMLHttpRequest;
		}catch(e){
			xmlHttp = false;
		}
	}


	if (!xmlHttp)
		alert("Cant create the XML Object");
	else
		return xmlHttp;
}


function createAccount(){
	if (xmlHttp.readyState == 0 || xmlHttp.readyState== 4 )
	{
		var url = "https://musician.herokuapp.com/signup";
		username_auth = document.getElementById("name_auth").value;
		password_auth = document.getElementById("pswrd_auth").value;
		var params = JSON.stringify({name:username_auth, password:password_auth})
		xmlHttp.open("POST",url,true);
		xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlHttp.onreadystatechange = handleServerResponse_signup;
		xmlHttp.send(params);
	}
	else
	{
		setTimeout('createAccount()',1000);
	}
}

function handleServerResponse_signup()
{
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) 
	{
		var data=xmlHttp.responseText;
		var jsonResponse = JSON.parse(data);
		alert(jsonResponse["msg"]);
	}
}



function authenticateAccount(){
if (xmlHttp.readyState == 0 || xmlHttp.readyState== 4 )
	{
		var url = "https://musician.herokuapp.com/authenticate";
		username_auth = document.getElementById("username").value;
		password_auth = document.getElementById("password").value;
		var params = JSON.stringify({name:username_auth, password:password_auth})
		xmlHttp.open("POST",url,true);
		xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlHttp.onreadystatechange = handleServerResponse_auth;
		xmlHttp.send(params);
	}
	else
	{
		setTimeout('authenticateAccount()',1000);
	}
}


function handleServerResponse_auth()
{
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) 
	{
		var data=xmlHttp.responseText;
		var jsonResponse = JSON.parse(data);
		var result = jsonResponse["success"];
		if (result == true)
		{
			open("new_account.html");
		}
		else if (result == false)
		{
			alert(jsonResponse["msg"]);
		}
	}
}