$(function (){
	//抽奖接口
//	var WHEEL = 'http://114.215.26.249/treasure/event/disc';//接口请求中奖信息
	var WHEEL = './mook/mook.json';
	var platform = '';
	var userToken = '';
//	var parm = window.location.href.split("?")[1];
//	var	platform = parm.split("=")[1].split("&")[0];
//	var	userToken =  parm.split("=")[2].split("&")[0];
	
	var platform = 'ios';
	var userToken = 'sssssssssssssssss';
	var bRotate = false;
	//获取token
	/*这段代码是固定的，必须要放到js中*/
	function setupWebViewJavascriptBridge(callback) {
	    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	    window.WVJBCallbacks = [callback];
	    var WVJBIframe = document.createElement('iframe');
	    WVJBIframe.style.display = 'none';
	    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	    document.documentElement.appendChild(WVJBIframe);
	    setTimeout(function(){ document.documentElement.removeChild(WVJBIframe) }, 0)
	}
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.registerHandler('callUserH5',function(data, responseCallback) {})
	})
	//请求封装
	function Post(url,option,func){
		$.ajax(url,{
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			beforeSend: function (xhr) {  
				xhr.setRequestHeader("userToken", userToken);  
				xhr.setRequestHeader("platform", platform); 
				xhr.setRequestHeader("content-type","application/x-www-form-urlencoded"); 
			},
			data:option,
			async:true,
			success:function(data){
				func(data);
			},
			error:function(xhr,type,errorThrown){
				try{ 
				if(typeof(Error)=="function"){
                       Error(xhr,type,errorThrown);
                }
				}catch(e){
                } 
			}
		});
	};
	function Get(url,option,func){
		$.ajax(url,{
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			beforeSend: function (xhr) {  
				xhr.setRequestHeader("userToken", userToken);  
				xhr.setRequestHeader("platform", platform); 
				xhr.setRequestHeader("content-type","application/x-www-form-urlencoded"); 
			},
			data:option,
			async:true,
			success:function(data){
				func(data);
			},
			error:function(xhr,type,errorThrown){
				try{ 
				if(typeof(Error)=="function"){
                       Error(xhr,type,errorThrown);
                }
				}catch(e){
                } 
			}
		});
	};
	//点击确定
	$('.sure').on('click',function(){
		$('.face').hide();
	});
	//免费再玩一次
	if(platform == "android"){
		$('.btnone').on("click",function(){
			//injs为Android程序中建立的InJavaScript对象的一个实例名字，runOnAndroidJavaScript为方法，str为参数
			//http://m.blog.csdn.net/article/details?id=50826346
			//window.injs.runOnAndroidJavaScript(str);
			window.android.onWebCallNative(0);
		})
	}else{
		//http://www.cnblogs.com/jiang-xiao-yan/p/5345755.html
		setupWebViewJavascriptBridge(function(bridge) {
	        $('.btnone').on("click",function(){
        		bridge.callHandler('getFromObjC', {'type':'0'}, function(response) {
	                //alert('免费再玩一次！');
	                //alert('JS got response', response);
	        	})
	        })
        })
	}	
	//充值
	if(platform == "android"){
		$('.btntwo').on("click",function(){
			//openPage(2,"charge");
			//window.android_lvstudio.queryData(1,1);
			window.android.onWebCallNative(1);
		})
	}else{
		setupWebViewJavascriptBridge(function(bridge) {
			$('.btntwo').on("click",function(){
	    		bridge.callHandler('getFromObjC',{'type':'1'}, function(response) {
	                //alert('充值已登录！');
	                //alert('JS got response', response);
	        	})
    		})
        })
	}
	var rotateTimeOut = function (){
		$('#rotate').rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	function rotateFn(awards, angles, txt){
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle:0,
			animateTo:angles + 1800,
			duration:8000,
			callback:function (){
				if(awards==0){
					$('.face').show();
					$('.happyimg').attr('src','img/sad.png');
					$('.tip').html('还差一点点就抽到了哦!');
				}else if(awards==1){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">1</span>元红包，请在账户中查看');
				}else if(awards==2){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">5</span>元红包，请在账户中查看');
				}else if(awards==3){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">10</span>元红包，请在账户中查看');
				}else if(awards==4){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">20</span>元红包，请在账户中查看');
				}
				else if(awards==5){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">iphone 5</span>，请在账户中查看');
				}else if(awards==6){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">iphone 7</span>，请在账户中查看');
				}else if(awards==7){
					$('.face').show();
					$('.happyimg').attr('src','img/happy.png');
					$('.tip').html('恭喜你获得<span class="money">宝马 X5</span>，请在账户中查看');
				}
//				$('#rotate').rotate({angle:0});
				bRotate = !bRotate;
			}
		})
	};
	$('.pointer').click(function (){
		if(bRotate){
			return;
		}
		var item = '';
		//var item = rnd(0,7);
		//alert("调接口前！");
		try{ 
		Get(WHEEL,'',function(data){
			//alert("接口回调==" + JSON.stringify(data));
			if (data.ErrorCode == 0) {
				item = data.data.resultId;
			}else if(data.ErrorCode == 100304){
				$('.face').show();
				$('.happyimg').attr('src','img/sad.png');
				$('.tip').text('没有转动大转盘的机会了');
				return false;
			}
			console.log('item==' + item);
			switch (item) {
				case 0:
					rotateFn(0, 113, '还差一点点就抽到了哦&sim;');
					break;
				case 1:
					rotateFn(1, 158, '1元红包');
					break;
				case 2:
					rotateFn(2, 247, '5元红包');
					break;
				case 3:
					rotateFn(3, 68, '10元红包');
					break;
				case 4:
					rotateFn(4, 337, '20元红包');
					break;
				case 5:
					rotateFn(5, 203, 'iphone 5');
					break;
				case 6:
					rotateFn(6, 293, 'iPhone 7');
					break;
				case 7:
					rotateFn(7, 23, '宝马 X5');
					break;
			}
		})
		}
		catch(err)
		{
		  	txt="此页面存在一个错误。\n\n";
		 	txt+="错误描述: " + err.description + "\n\n";
		  	txt+="点击OK继续。\n\n";
		  	alert(txt);
		} 
	});
});