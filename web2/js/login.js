function login() {
	var name = $("#username").val();
	var password = $("#password").val();
	$.post(HOST + '/admin/login', {
		'name' : name,
		'password' : hex_sha1(password)
	}, function(data) {
		var json = data;
		if (json.succ_code == json.code) {
			setCookie("admin", JSON.stringify(json.results.admin));
			console.log("admin," + JSON.stringify(json.results.admin));
			window.location.href = 'userinfo.html';
		} else {
			alert(json.msg);
		}
	})
}