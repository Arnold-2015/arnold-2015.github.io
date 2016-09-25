//getStyle方法封装
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }



//匀速运动doMove函数封装
function doMove ( obj, attr, dir, target, endFn ) {
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
		}
	}, 30);
}




//缓冲运动startMove函数封装
function startMove ( obj, attr, target, endFn ) {
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		//取值
		var iCur=0;
		if(attr=='opacity'){
			iCur=parseInt(100*parseFloat(getStyle( obj, attr )));
		}
		else{
			iCur=parseInt(getStyle( obj, attr ));
		}
		//计算速度
		var iSpeed = (target-iCur)/8;			// 速度
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		//判断停止
		if ( iCur == target ) {
			clearInterval( obj.timer );
			// if ( endFn ) {endFn();}
			endFn && endFn();
		}
		else{

			if(attr=='opacity'){
				obj.style.filter ='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else{
				obj.style[attr] = iCur+iSpeed + 'px';
			}
		}
	}, 30);
}




//完美运动perfectMove函数封装
function perfectMove ( obj, json, endFn ) {
	clearInterval( obj.timer );
	obj.timer = setInterval(function ()	 {
		var bStop=true;//值皆达到，循环结束
		for(var attr in json){
			//取值
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseInt(100*parseFloat(getStyle( obj, attr )));
			}
			else{
				iCur=parseInt(getStyle( obj, attr ));
			}
			//计算速度
			var iSpeed = (json[attr]-iCur)/8;			// 速度
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//判断停止
			if ( iCur != json[attr] ) {
				bStop=false;
			}
				if(attr=='opacity'){
					obj.style.filter ='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else{
					obj.style[attr] = iCur+iSpeed + 'px';
				}
		}
		if(bStop){
			 clearInterval( obj.timer );
	         endFn && endFn();
		 }
	}, 30);
}




//弹性运动elasticMove函数封装
function elasticMove ( obj, target,attr) {
	clearInterval( obj.timer );
	var iSpeed=0;
	var tmp=0;
	obj.timer = setInterval(function () {
			var iCur=parseInt(getStyle( obj, attr ));
		iSpeed +=(target-iCur)/5;
		iSpeed *=0.7;
		tmp+=iSpeed;
		if(Math.abs(iSpeed)<1&&Math.abs(tmp-target)<1) {
			clearInterval( obj.timer );
			obj.style[attr]=target+'px';
		}
			else{
				obj.style[attr] = tmp+ 'px';
			}

	}, 30);
}



//抖动函数封装
function shake (obj,attr,endFn){
	var pos=parseInt(getStyle(obj,attr));
	var num=0;
	var arr=[];

	for(var i=20;i>0;i-=2){
		arr.push(i,-i);
	}
	arr.push(0);
	clearInterval(obj.shake);
	obj.shake=setInterval(function(){
		obj.style[attr]=pos+arr[num]+'px';
		num++;
		if(num===arr.length){clearInterval(obj.shake);endFn&&endFn();}
	},30)
}



//拖拽函数封装 磁性吸附(改变临界值)
function drag(obj) {

	obj.onmousedown = function(ev) {
		var ev = ev || event;

		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;

		if ( obj.setCapture ) {
			obj.setCapture();
		}

		document.onmousemove = function(ev) {
			var ev = ev || event;

			var L = ev.clientX - disX;
			var T = ev.clientY - disY;

			if ( L < 0 ) {
				L = 0;
			} else if ( L> document.documentElement.clientWidth - obj.offsetWidth ) {
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}

			if ( T < 0 ) {
				T = 0;
			} else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}

			obj.style.left = L + 'px';
			obj.style.top = T + 'px';

		}

		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if ( obj.releaseCapture ) {
				obj.releaseCapture();
			}
		}
		return false;
	}
}


//完美拖拽
function perfectDragSimple(vElement, fnOnDragStart, fnOnDraging, fnOnDragEnd)
{
	var oElementDrag=null;

	if(typeof vElement == 'string')
	{
		oElementDrag=document.getElementById(vElement);
	}
	else if(typeof vElement == 'object')
	{
		oElementDrag=vElement;
	}

	this.creator=MiaovPerfectDrag;

	this.creator
	(
		oElementDrag,
		function ()
		{
			return {x: oElementDrag.offsetLeft, y: oElementDrag.offsetTop};
		},
		function (x, y)
		{
			oElementDrag.style.left=x+'px';
			oElementDrag.style.top=y+'px';

			if(fnOnDraging)
			{
				fnOnDraging(x, y);
			}
		},
		fnOnDragStart, fnOnDragEnd
	);

	delete this.creator;
}

MiaovperfectDragSimple.prototype=MiaovPerfectDrag.prototype;

function MiaovPerfectDrag(oElementDrag, fnGetPos, fnDoMove, fnOnDragStart, fnOnDragEnd)
{
	var obj=this;

	this.oElement=oElementDrag;

	this.oElement.style.overflow='hidden';

	this.fnGetPos=fnGetPos;
	this.fnDoMove=fnDoMove;
	this.fnOnDragStart=fnOnDragStart;
	this.fnOnDragEnd=fnOnDragEnd;

	this.__oStartOffset__={x:0, y:0};

	this.oElement.onmousedown=function (ev)
	{
		obj.startDrag(window.event || ev);
	};

	this.fnOnMouseUp=function (ev)
	{
		obj.stopDrag(window.event || ev);
	};

	this.fnOnMouseMove=function (ev)
	{
		obj.doDrag(window.event || ev);
	};
}

MiaovPerfectDrag.prototype.enable=function ()
{
	var obj=this;

	this.oElement.onmousedown=function (ev)
	{
		obj.startDrag(window.event || ev);
	};
};

MiaovPerfectDrag.prototype.disable=function ()
{
	this.oElement.onmousedown=null;
};

MiaovPerfectDrag.prototype.startDrag=function (oEvent)
{
	var oPos=this.fnGetPos();

	var x=oEvent.clientX;
	var y=oEvent.clientY;

	if(this.fnOnDragStart)
	{
		this.fnOnDragStart();
	}

	this.__oStartOffset__.x=x-oPos.x;
	this.__oStartOffset__.y=y-oPos.y;

	if(this.oElement.setCapture)
	{
		this.oElement.setCapture();

		this.oElement.onmouseup=this.fnOnMouseUp;
		this.oElement.onmousemove=this.fnOnMouseMove;
	}
	else
	{
		document.addEventListener("mouseup", this.fnOnMouseUp, true);
		document.addEventListener("mousemove", this.fnOnMouseMove, true);

		window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
	}
};

MiaovPerfectDrag.prototype.stopDrag=function (oEvent)
{
	if(this.oElement.releaseCapture)
	{
		this.oElement.releaseCapture();

		this.oElement.onmouseup=null;
		this.oElement.onmousemove=null;
	}
	else
	{
		document.removeEventListener("mouseup", this.fnOnMouseUp, true);
		document.removeEventListener("mousemove", this.fnOnMouseMove, true);

		window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP);
	}

	if(this.fnOnDragEnd)
	{
		if(oEvent.clientX==this.__oStartOffset__.x && oEvent.clientY==this.__oStartOffset__.y)
		{
			this.fnOnDragEnd(false);
		}
		else
		{
			this.fnOnDragEnd(true);
		}
	}
};

MiaovPerfectDrag.prototype.doDrag=function (oEvent)
{
	var x=oEvent.clientX;
	var y=oEvent.clientY;

	this.fnDoMove(x-this.__oStartOffset__.x, y-this.__oStartOffset__.y);
};

