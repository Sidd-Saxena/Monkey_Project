var xmlHttp = createXmlHttpRequestObject();
var token ;
var access_token;
handleServerResponse_auth();


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
		var success = jsonResponse["success"]
		alert(jsonResponse["msg"]);
		if (success == true)
		{
			open("webpage.html",'_self');
		}
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
		token = jsonResponse["token"];
		sessionStorage.access_token = token;
		if (result == true)
		{
			open("info_page.html",'_self');
		}
		else if (result == false)
		{
			alert(jsonResponse["msg"]);
		}
	}
}


function viewMembers()
{
if (xmlHttp.readyState == 0 || xmlHttp.readyState== 4 )
	{
		var url = "https://musician.herokuapp.com/musicians";
		xmlHttp.open("GET",url,true);
		token = sessionStorage.access_token;
		xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlHttp.setRequestHeader("Authorization", token);
		xmlHttp.setRequestHeader("cache-control", "no-cache");
		xmlHttp.onreadystatechange = handleServerResponse_findall;
		xmlHttp.send(null);
	}
	else
	{
		setTimeout('viewMembers()',1000);
	}
}



function handleServerResponse_findall()
{
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) 
	{
		var data=xmlHttp.responseText;
		var jsonResponse = JSON.parse(data);
		//var name = jsonResponse["_id"];
		//alert("reached");
		alert();
	}
}