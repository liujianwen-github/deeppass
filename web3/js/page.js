/**
 * 页码配置 TODO
 */
var pageConfig = {
	firstPage : 1,
	pageRows : 1,
	totalCount : 1,
	pageCount : 18,
	callback :callbackFuc
}

/**
 * TODO
 * 
 * @pageContentID 渲染分页的DIV元素
 * @curPage 当前开始页
 * @totalCount 总数量
 * @pageRows 每页显示数量
 * @callback 显示数据的回调函数
 */
function PageList(pageContentID, option) {
	this.pageContentID = document.getElementById(pageContentID);
	
	// 当前页
	if (option.curPage == undefined)
		this.curPage = pageConfig.firstPage;
	else
		this.curPage = option.curPage;
	
	// 总页数
	if (option.totalCount == undefined)
		this.totalCount = pageConfig.totalCount;
	else
		this.totalCount = option.totalCount;

	// 分页行
	if (option.pageRows == undefined)
		this.pageRows = pageConfig.pageRows;
	else
		this.pageRows = option.pageRows;

	//回调
	if (option.callback == undefined)
		this.callback = pageConfig.callback;
	else
		this.callback = option.callback;

	this.pageSize = Math.ceil(this.totalCount / this.pageRows);
}

/**
 * 配置 TODO
 */
PageList.prototype = {
	init : function() {
		this.renderbtn();
	},
	firstpage : function() {
		var _self = this;
		_self._firstpage = document.createElement("li");
		_self._firstpageA = document.createElement("a");
		_self._firstpageA.innerHTML = "首页";
		_self._firstpage.appendChild(_self._firstpageA);
		this.pageContentID.appendChild(_self._firstpage);
		_self._firstpage.onclick = function() {
			_self.gotopage(1);
		}
	},
	lastpage : function() {
		var _self = this;
		_self._lastpage = document.createElement("li");
		_self._lastpageA = document.createElement("a");
		_self._lastpageA.innerHTML = "尾页";
		_self._lastpage.appendChild(_self._lastpageA);
		this.pageContentID.appendChild(_self._lastpage);
		_self._lastpage.onclick = function() {
			_self.gotopage(_self.pageSize);
		}
	},
	prewpage : function() {
		var _self = this;
		_self._prew = document.createElement("li");
		_self._prewA = document.createElement("a");
		_self._prewA.innerHTML = "<<";
		_self._prew.appendChild(_self._prewA);
		this.pageContentID.appendChild(_self._prew);
		_self._prew.onclick = function() {
			if (_self.curPage > 1) {
				_self.curPage--;
			}
			_self.callback.call(this, _self.curPage);
			_self.init();
			console.log(_self.curPage);
			if($('#a1').hasClass('cur')){
				getUnMatchedList(_self.curPage);
			}
			if($('#a2').hasClass('cur')){
				getMatchedPersonList(_self.curPage);
			}
			if($('#a3').hasClass('cur')){
				getPersonList(_self.curPage);
			}
		}
	},
	nextpage : function() {
		var _self = this;
		_self._next = document.createElement("li");
		_self._nextA = document.createElement("a");
		_self._nextA.innerHTML = ">>";
		_self._next.appendChild(_self._nextA);
		this.pageContentID.appendChild(_self._next);
		_self._next.onclick = function() {
			if (_self.curPage < _self.pageSize) {
				_self.curPage++;
			}
			_self.callback.call(this, _self.curPage);
			_self.init();
			console.log(_self.curPage);
			if($('#a1').hasClass('cur')){
				getUnMatchedList(_self.curPage);
			}
			if($('#a2').hasClass('cur')){
				getMatchedPersonList(_self.curPage);
			}
			if($('#a3').hasClass('cur')){
				getPersonList(_self.curPage);
			}
		}
	},
	pagenum : function() {
		var _self = this;
		if (this.pageSize <= 10) {
			for (var i = 1, len = this.pageSize; i <= len; i++) {
				_self._num = document.createElement("li");
				_self._numA = document.createElement("a");
				_self._numA.innerHTML = i;
				_self._num.appendChild(_self._numA);
				this.pageContentID.appendChild(_self._num);
				_self._num.onclick = function() {
					var curpage = $(this).text();
					_self.gotopage(curpage);
				}
			}
		} else {
			if (_self.curPage <= 10) {
				for (var i = 1; i <= 10; i++) {
					_self._num = document.createElement("li");
					_self._numA = document.createElement("a");
					_self._numA.innerHTML = i;
					_self._num.appendChild(_self._numA);
					this.pageContentID.appendChild(_self._num);
					_self._num.onclick = function() {
						var curpage = $(this).text();
						_self.gotopage(curpage);
					}
				}
			} else if (_self.curPage > 10 && _self.curPage <= this.pageSize) {
				if (this.pageSize < Math.ceil(_self.curPage / 10) * 10) {
					for (var i = Math.floor(_self.curPage / 10) * 10 + 1; i <= this.pageSize; i++) {
						if (_self.curPage > this.pageSize)
							return;
						_self._num = document.createElement("li");
						_self._numA = document.createElement("a");
						_self._numA.innerHTML = i;
						_self._num.appendChild(_self._numA);
						this.pageContentID.appendChild(_self._num);
						_self._num.onclick = function() {
							var curpage = $(this).text();
							_self.gotopage(curpage);
						}
					}
				} else {
					if (Math.ceil(_self.curPage / 10) * 10 == _self.curPage) {
						for (var i = _self.curPage - 9; i <= _self.curPage; i++) {
							_self._num = document.createElement("li");
							_self._numA = document.createElement("a");
							_self._numA.innerHTML = i;
							_self._num.appendChild(_self._numA);
							this.pageContentID.appendChild(_self._num);
							_self._num.onclick = function() {
								var curpage = $(this).text();
								_self.gotopage(curpage);
							}
						}
					} else {
						for (var i = Math.floor(_self.curPage / 10) * 10 + 1; i <= Math
								.ceil(_self.curPage / 10) * 10; i++) {
							_self._num = document.createElement("li");
							_self._numA = document.createElement("a");
							_self._numA.innerHTML = i;
							_self._num.appendChild(_self._numA);
							this.pageContentID.appendChild(_self._num);
							_self._num.onclick = function() {
								var curpage = $(this).text();
								_self.gotopage(curpage);
							}
						}
					}

				}
			}
		}
		$(".pagination li").each(function() {
			if ($(this)[0].innerText == _self.curPage) {
				$(".pagination li").children("a").removeClass("navcur");
				$(this).children("a").addClass("navcur");
			}
		});

	},
	gotopage : function(curpage) {
		this.curPage = curpage;
		this.callback.call(this, this.curPage);
		this.init();
		console.log(this.curPage);
		if($('#a1').hasClass('cur')){
			getUnMatchedList(this.curPage);
		}
		if($('#a2').hasClass('cur')){
			getMatchedPersonList(this.curPage);
		}
		if($('#a3').hasClass('cur')){
			getPersonList(this.curPage);
		}
	},
	renderbtn : function() {
		$(".pagination").html("");
		this.firstpage();
		this.prewpage();
		this.pagenum();
		this.nextpage();
		this.lastpage();
	}
};

/**
 * 点击换页操作 TODO
 * 
 * @param curpage
 */
function callbackFuc(curpage) {
	if (curpage != undefined) {
//		alert(curpage);
	}
}