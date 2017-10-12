<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>用户接收消息页面</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<script type="text/javascript" src="js/ajax-pushlet-client.js"></script>
<script type="text/javascript">
	PL._init();
	PL.userId = "test";
	PL.joinListen('/push/test');
	function onData(event) {
		//console.info(event.get("msg"));
		document.getElementById("msg").innerHTML = document
				.getElementById("msg").innerHTML
				+ event.get("msg") + "<br/>";
	}
	window.onRefreshAck = function() {
		document.getElementById("status").innerHTML = "连接服务器成功！";
	}
</script>
</head>

<body>
	<h2 id="status">连接服务器中....</h2>
	<div id="msg"></div>
	<br />
	<br />
	<br />
	<a href="client2/publish.jsp" target="_blank">后台推送消息页面</a>
</body>
</html>
