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
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(params);
	}
	else
	{
		setTimeout('process()',1000);
	}
}

function handleServerResponse()
{
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) 
	{
		alert(xmlHttp.responseText);
	}
}

