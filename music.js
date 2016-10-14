var xmlHttp = createXmlHttpRequestObject();
var token ;
var access_token;

function createXmlHttpRequestObject(){
	var xmlHttp;

	if (window.ActiveXobject){
		try{
			xmlHttp =  new ActiveXObject("Microsoft.XMLHTTP"); //error handling for Internet Explorer
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
			document.getElementById('username').value='';
			document.getElementById('password').value='';
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
		xmlHttp.setRequestHeader("cache-control", "no-cache"); //need to add this to avoid status error 304
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
		var members=new Array();
		var data=xmlHttp.responseText;
		var jsonResponse = JSON.parse(data);
		for (i in jsonResponse)
		{
  			members[i] = ("name: " +jsonResponse[i].name +"  band: "+ jsonResponse[i].band +"  instrument: "+ jsonResponse[i].instrument);
		}
		alert(members.join("\n"));
	}
}


function addMembers()
{
	if (xmlHttp.readyState == 0 || xmlHttp.readyState== 4 )
	{
		var url = "https://musician.herokuapp.com/musicians";
		xmlHttp.open("POST",url,true);
		name_member = document.getElementById("name_add").value;
		band_member = document.getElementById("band_add").value;
		instru_member = document.getElementById("instru_add").value;
		var params = JSON.stringify({name:name_member, band:band_member,instrument:instru_member})
		token = sessionStorage.access_token;  //use session storrage instead of local to erase token after session ends
		xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlHttp.setRequestHeader("Authorization", token);
		xmlHttp.onreadystatechange = handleServerResponse_add;
		xmlHttp.send(null);
	}
	else
	{
		setTimeout('addMembers()',1000);
	}
}


function handleServerResponse_add()
{
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) 
	{
		document.getElementById('name_add').value='';
		document.getElementById('band_add').value='';
		document.getElementById('instru_add').value='';
		alert("member successfully added ");
	}
}