/ *！
* jQuery Mobile 1.4.5
* Git HEAD哈希：68e55e78b292634d3991c795f06f5e37a512decc <>日期：Fri Oct 31 2014 17:33:30 UTC
* http://jquerymobile.com
*
*版权所有2010，2014 jQuery Foundation，Inc.及其他贡献者
*根据麻省理工学院的许可证发布。
* http://jquery.org/license
*
* /


（function（root，doc，factory）{
	if（typeof define ===“function”&& define.amd）{
		// AMD。注册为匿名模块。
		define（[“jquery”]，function（$）{
			工厂（$，root，doc）;
			return $ .mobile;
		}）;
	} else {
		//浏览器全局变量
		factory（root.jQuery，root，doc）;
	}
}（this，document，function（jQuery，window，document，undefined）{
（function（$）{
	$ .mobile = {};
}（jQuery））;

/ *！
 * jQuery UI Core c0ab71056b936627e8a7821f03c044aec6280a40
 * http://jqueryui.com
 *
 *版权所有2013 jQuery Foundation等贡献者
 *根据麻省理工学院的许可证发布。
 * http://jquery.org/license
 *
 * http：//api.jqueryui.com/category/ui-core/
 * /
（function（$，undefined）{

var uuid = 0，
	runiqueId = / ^ ui-id- \ d + $ /;

// $ .ui可能存在没有依赖关系的组件，例如$ .ui.position
$ .ui = $ .ui || {};

$ .extend（$ .ui，{
	版本：“c0ab71056b936627e8a7821f03c044aec6280a40”，

	关键代码： {
		BACKSPACE：8，
		COMMA：188，
		删除：46，
		下：40，
		END：35，
		ENTER：13，
		ESCAPE：27，
		主页：36，
		左：37，
		PAGE_DOWN：34，
		PAGE_UP：33，
		周期：190，
		右：39，
		空格：32，
		TAB：9，
		UP：38
	}
}）;

//插件
$ .fn.extend（{
	焦点：（function（orig）{
		返回函数（delay，fn）{
			return typeof delay ===“number”？
				this.each（function（）{
					var elem = this;
					setTimeout（function（）{
						$（elem）.focus（）;
						if（fn）{
							fn.call（elem）;
						}
					}，延迟）;
				}）：
				orig.apply（this，arguments）;
		};
	}）（$ .fn.focus），

	scrollParent：function（）{
		var scrollParent;
		if（（$ .ui.ie &&（/(static|relative)/).test(this.css("position“）））||（/absolute/).test(this.css("position”）） ）{
			scrollParent = this.parents（）。filter（function（）{
				return（/(relative|absolute|fixed )/).test($.css(this,“position”））&&（/(auto|scroll)/).test($.css(this,"overflow")+） $的CSS（这一点， “溢出-Y”）+ $ CSS（这一点， “溢出-X”））。
			}）当量（0）。
		} else {
			scrollParent = this.parents（）。filter（function（）{
				return（/(auto|scroll)/).test($.css(this,"overflow" )+$.css(this,"overflow-y")+$.css(this,"overflow-x“）） ;
			}）当量（0）。
		}

		return（/ fixed /）.test（this.css（“position”））|| ！scrollParent.length？$（this [0] .ownerDocument || document）：scrollParent;
	}，

	uniqueId：function（）{
		return this.each（function（）{
			if（！this.id）{
				this.id =“ui-id-”+（++ uuid）;
			}
		}）;
	}，

	removeUniqueId：function（）
		return this.each（function（）{
			if（runiqueId.test（this.id））{
				$（this）.removeAttr（“id”）;
			}
		}）;
	}
}）;

//选择器
function focusable（element，isTabIndexNotNaN）{
	var map，mapName，img，
		nodeName = element.nodeName.toLowerCase（）;
	if（“area”=== nodeName）{
		map = element.parentNode;
		mapName = map.name;
		如果（！element.href ||！mapName || map.nodeName.toLowerCase（）！==“map”）{
			返回假
		}
		img = $（“img [usemap =＃”+ mapName +“]”）[0];
		返回!! img && visible（img）;
	}
	return（/input|select|textarea|button|object/.test（nodeName）？
		！element.disabled：
		“a”=== nodeName？
			element.href || isTabIndexNotNaN：
			isTabIndexNotNaN）&&
		//元素及其所有祖先必须可见
		可见（元素）;
}

function visible（element）{
	return $ .expr.filters.visible（element）&&
		！$（element）.parents（）。addBack（）。filter（function（）{
			return $ .css（this，“visibility”）===“hidden”;
		}）。长度;
}

$ .extend（$ .expr [“：”]，{
	数据：$ .expr.createPseudo？
		$ .expr.createPseudo（function（dataName）{
			返回函数（elem）{
				return !! $。data（elem，dataName）;
			};
		}）：
		// support：jQuery <1.8
		function（elem，i，match）{
			return !! $。data（elem，match [3]）;
		}，

	focusable：function（element）{
		return focusable（element，！isNaN（$ .attr（element，“tabindex”）））;
	}，

	tabbable：function（element）{
		var tabIndex = $ .attr（element，“tabindex”），
			isTabIndexNaN = isNaN（tabIndex）;
		return（isTabIndexNaN || tabIndex> = 0）&& focusable（element，！isTabIndexNaN）;
	}
}）;

// support：jQuery <1.8
if（！$（“<a>”）.outerWidth（1）.jquery）{
	$ .each（[“Width”，“Height”]，function（i，name）{
		var side = name ===“Width”？[“左”，“右”]：[“顶”，“下”]，
			type = name.toLowerCase（），
			orig = {
				innerWidth：$ .fn.innerWidth，
				innerHeight：$ .fn.innerHeight，
				outerWidth：$ .fn.outerWidth，
				outerHeight：$ .fn.outerHeight
			};

		功能减少（elem，size，border，margin）{
			$ .each（side，function（）{
				size  -  = parseFloat（$ .css（elem，“padding”+ this））|| 0;
				if（border）{
					size  -  = parseFloat（$ .css（elem，“border”+ this +“Width”））|| 0;
				}
				if（margin）{
					size  -  = parseFloat（$ .css（elem，“margin”+ this））|| 0;
				}
			}）;
			返回尺寸;
		}

		$ .fn [“inner”+ name] = function（size）{
			if（size === undefined）{
				return orig [“inner”+ name] .call（this）;
			}

			return this.each（function（）{
				$（this）.css（type，reduce（this，size）+“px”）;
			}）;
		};

		$ .fn [“outer”+ name] = function（size，margin）{
			if（typeof size！==“number”）{
				return orig [“outer”+ name] .call（this，size）;
			}

			return this.each（function（）{
				$（this）.css（type，reduce（this，size，true，margin）+“px”）;
			}）;
		};
	}）;
}

// support：jQuery <1.8
if（！$。fn.addBack）{
	$ .fn.addBack = function（selector）{
		return this.add（selector == null？
			this.prevObject：this.prevObject.filter（selector）
		）;
	};
}

// support：jQuery 1.6.1，1.6.2（http://bugs.jquery.com/ticket/9413）
if（$（“<a>”）.data（“ab”，“a”）.removeData（“ab”）.data（“ab”））{
	$ .fn.removeData =（function（removeData）{
		返回函数（key）{
			if（arguments.length）{
				return removeData.call（this，$ .camelCase（key））;
			} else {
				return removeData.call（this）;
			}
		};
	}）（$ .fn.removeData）;
}





//已弃用
$ .ui.ie = !! / msie [\ w。] + /。exec（navigator.userAgent.toLowerCase（））;

document.createElement（“div”）中的$ .support.selectstart =“onselectstart”;
$ .fn.extend（{
	disableSelection：function（）{
		return this.bind（（$ .support.selectstart？“selectstart”：“mousedown”）+
			“.ui-disableSelection”，function（event）{
				event.preventDefault（）;
			}）;
	}，

	enableSelection：function（）{
		return this.unbind（“.ui-disableSelection”）;
	}，

	zIndex：function（zIndex）{
		if（zIndex！== undefined）{
			return this.css（“zIndex”，zIndex）;
		}

		if（this.length）{
			var elem = $（this [0]），position，value;
			while（elem.length && elem [0]！== document）{
				//如果位置设置为z-index被浏览器忽略的值，则忽略z-index
				//这使得此功能的行为在浏览器之间保持一致
				//如果元素被定位，WebKit总是返回自动
				position = elem.css（“position”）;
				if（position ===“absolute”|| position ===“relative”|| position ===“fixed”）{
					//没有指定zIndex时，IE返回0
					//其他浏览器返回一个字符串
					//我们忽略显式值为0的嵌套元素的情况
					// <div style =“z-index：-10;”> <div style =“z-index：0;”> </ div> </ div>
					value = parseInt（elem.css（“zIndex”），10）;
					if（！isNaN（value）&& value！== 0）{
						返回值;
					}
				}
				elem = elem.parent（）;
			}
		}

		返回0;
	}
}）;

// $ .ui.plugin已被弃用。使用$ .widget（）扩展名。
$ .ui.plugin = {
	add：function（module，option，set）{
		var i，
			proto = $ .ui [module] .prototype;
		for（i in set）{
			proto.plugins [i] = proto.plugins [i] || [];
			proto.plugins [i] .push（[option，set [i]]）;
		}
	}，
	调用：function（instance，name，args，allowDisconnected）{
		var i，
			set = instance.plugins [name];

		if（！set）{
			返回;
		}

		if（！allowDisconnected &&（！instance.element [0] .parentNode || instance.element [0] .parentNode.nodeType === 11））{
			返回;
		}

		for（i = 0; i <set.length; i ++）{
			if（instance.options [set [i] [0]]）{
				set [i] [1] .apply（instance.element，args）;
			}
		}
	}
};

}）（jQuery）;

（function（$，window，undefined）{

	//从页面高度减去外部工具栏的高度，如果页面没有
	//相同类型的内部工具栏 如果我们找到一个，我们会小心使用小部件选项
	//小部件实例和元素的数据属性否则。
	var compensationToolbars = function（page，desiredHeight）{
		var pageParent = page.parent（），
			toolbarsAffectingHeight = []，

			//我们使用这个函数来过滤固定的工具栏，并将选项updatePagePadding设置为
			// true（这是默认值）从我们的高度减法，因为固定的工具栏与
			// option updatePagePadding设置为true通过添加填充来补偿它们的存在
			//到活动页面。我们想避免重复计数，也可以减去它们
			//从所需页面高度的高度。
			noPadders = function（）{
				var theElement = $（this），
					widgetOptions = $ .mobile.toolbar && theElement.data（“mobile-toolbar”）？
						theElement.toolbar（“option”）：{
							位置：theElement.attr（“data-”+ $ .mobile.ns +“position”），
							updatePagePadding：（theElement.attr（“data-”+ $ .mobile.ns +
								“update-page-padding”）！== false）
						};

				return！（widgetOptions.position ===“fixed”&&
					widgetOptions.updatePagePadding === true）;
			}，
			externalHeaders = pageParent.children（“：jqmData（role ='header'）”）.filter（noPadders），
			internalHeaders = page.children（“：jqmData（role ='header'）”），
			externalFooters = pageParent.children（“：jqmData（role ='footer'）”）.filter（noPadders），
			internalFooters = page.children（“：jqmData（role ='footer'）”）;

		//如果我们没有内部头文件，但我们确实有外部头文件，那么它们的高度
		//降低页面高度
		if（internalHeaders.length === 0 && externalHeaders.length> 0）{
			toolbarsAffectingHeight = toolbarsAffectingHeight.concat（externalHeaders.toArray（））;
		}

		//如果我们没有内部页脚，但我们确实有外部页脚，那么他们的高度
		//降低页面高度
		if（internalFooters.length === 0 && externalFooters.length> 0）{
			toolbarsAffectingHeight = toolbarsAffectingHeight.concat（externalFooters.toArray（））;
		}

		$ .each（toolbarsAffectingHeight，function（index，value）{
			desiredHeight  -  = $（value）.outerHeight（）;
		}）;

		//高度必须至少为零
		返回Math.max（0，desiredHeight）;
	};

	$ .extend（$ .mobile，{
		//定义窗口和文档对象
		窗口：$（窗口），
		文件：$（文件），

		// TODO：直接删除并使用$ .ui.keyCode
		keyCode：$ .ui.keyCode，

		//存放各种小部件扩展名
		行为：{}，

		//垂直滚动页面：滚动到0以隐藏iOS地址栏，或传递Y值
		silentScroll：function（ypos）{
			if（$ .type（ypos）！==“number”）{
				ypos = $ .mobile.defaultHomeScroll;
			}

			//阻止scrollstart和scrollstop事件
			$ .event.special.scrollstart.enabled = false;

			setTimeout（function（）{
				window.scrollTo（0，ypos）;
				$ .mobile.document.trigger（“silentscroll”，{x：0，y：ypos}）;
			}，20）;

			setTimeout（function（）{
				$ .event.special.scrollstart.enabled = true;
			}，150）;
		}，

		getClosestBaseUrl：function（ele）{
			//找到最近的页面并提取其url。
			var url = $（ele）.closest（“.ui-page”）.jqmData（“url”），
				base = $ .mobile.path.documentBase.hrefNoHash;

			if（！$。mobile.dynamicBaseEnabled ||！url ||！$。mobile.path.isPath（url））{
				url = base;
			}

			return $ .mobile.path.makeUrlAbsolute（url，base）;
		}，
		removeActiveLinkClass：function（forceRemoval）{
			if（!! $。mobile.activeClickedLink &&
				（！$。mobile.activeClickedLink.closest（“。”+ $ .mobile.activePageClass）.length ||
					forceRemoval））{

				$ .mobile.activeClickedLink.removeClass（$ .mobile.activeBtnClass）;
			}
			$ .mobile.activeClickedLink = null;
		}，

		// DEPRECATED in 1.4
		//找到最近的一个主题类的父类。注意
		//我们目前没有使用$ .fn.closest（），因为这样
		//方法被调用了很多，我们需要它一样快
		//尽可能的
		getInheritedTheme：function（el，defaultTheme）{
			var e = el [0]，
				ltr =“”，
				re = / ui-（bar | body | overlay） - （[az]）\ b /，
				厘米;
			而（e）{
				c = e.className || “”;
				if（c &&（m = re.exec（c））&&（ltr = m [2]））{
					//我们发现了一个带有主题类的父类
					//在这个循环中保释。
					打破;
				}

				e = e.parentNode;
			}
			//返回我们发现的主题字母，如果没有，返回
			//指定默认值。
			return ltr || defaultTheme || “一个”;
		}，

		增强功能：function（elements）{
			return this.haveParents（elements，“enhancement”）;
		}，

		劫持：function（elements）{
			return this.haveParents（elements，“ajax”）;
		}，

		haveParents：function（elements，attr）{
			if（！$。mobile.ignoreContentEnabled）{
				返回元素
			}

			var count = elements.length，
				$ newSet = $（），
				e，$元素，排除，
				我知道了;

			for（i = 0; i <count; i ++）{
				$ element = elements.eq（i）;
				被排除=假;
				e =元素[i];

				而（e）{
					c = e.getAttribute？e.getAttribute（“data-”+ $ .mobile.ns + attr）：“”;

					if（c ===“false”）{
						excluded = true;
						打破;
					}

					e = e.parentNode;
				}

				if（！excluded）{
					$ newSet = $ newSet.add（$ element）;
				}
			}

			return $ newSet;
		}，

		getScreenHeight：function（）{
			// Native innerHeight在平台上返回更准确的值，
			// jQuery版本在这里是像Symbian这样的平台的标准化后退
			return window.innerHeight || $ .mobile.window.height（）;
		}，

		//根据方向，将活动页面的最小高度设置为屏幕高度
		resetActivePageHeight：function（height）{
			var page = $（“。”+ $ .mobile.activePageClass），
				pageHeight = page.height（），
				pageOuterHeight = page.outerHeight（true）;

			height = compensationToolbars（page，
				（typeof height ===“number”）？height：$ .mobile.getScreenHeight（））;

			//删除任何以前的最小高度设置
			page.css（“min-height”，“”）;

			//仅当CSS确定的高度不足时才设置最小高度
			if（page.height（）<height）{
				page.css（“min-height”，height  - （pageOuterHeight  -  pageHeight））;
			}
		}，

		加载：function（）{
			//如果这是对该函数的第一个调用，则实例化加载器小部件
			var loader = this.loading._widget || $（$ .mobile.loader.prototype.defaultHtml）.loader（），

				//调用装载器上的适当方法
				returnValue = loader.loader.apply（loader，arguments）;

			//确保装载器保留以备将来调用此功能。
			this.loading._widget = loader

			return returnValue;
		}
	}）;

	$ .addDependents = function（elem，newDependents）{
		var $ elem = $（elem），
			dependents = $ elem.jqmData（“dependents”）|| $（）;

		$ elem.jqmData（“dependents”，$（dependents）.add（newDependents））;
	};

	//插件
	$ .fn.extend（{
		removeWithDependents：function（）{
			$ .removeWithDependents（this）;
		}，

		//增强子元素
		enhancementWithin：function（）{
			var指数，
				widgetElements = {}，
				keepNative = $ .mobile.page.prototype.keepNativeSelector（），
				那=这个

			//向元素添加没有js类
			if（$ .mobile.nojs）{
				$ .mobile.nojs（this）;
			}

			//绑定ajax导航链接
			if（$ .mobile.links）{
				$ .mobile.links（this）;
			}

			//降低输入的样式
			if（$ .mobile.degradeInputsWithin）{
				$ .mobile.degradeInputsWithin（this）;
			}

			//运行buttonmarkup
			if（$ .fn.buttonMarkup）{
				this.find（$ .fn.buttonMarkup.initSelector）.not（keepNative）
				。.jqmEnhanceable（）buttonMarkup（）;
			}

			//为fieldContain添加类
			if（$ .fn.fieldcontain）{
				this.find（“：jqmData（role ='fieldcontain'）”）.not（keepNative）
				.jqmEnhanceable（）fieldcontain（）;
			}

			//加强小部件
			$ .each（$ .mobile.widgets，function（name，constructor）{

				//如果initSelector不是false查找元素
				if（constructor.initSelector）{

					//过滤不应该根据父母进行增强的元素
					var elements = $ .mobile.enhanceable（that.find（constructor.initSelector））;

					//如果任何匹配的元素仍然使用keepNativeSelector过滤
					if（elements.length> 0）{

						// $ .mobile.page.prototype.keepNativeSelector已被弃用，这仅用于backcompat
						//在1.5中切换到$ .mobile.keepNative，这只是一个不是函数的值
						elements = elements.not（keepNative）;
					}

					//加强剩下的任何东西
					if（elements.length> 0）{
						widgetElements [constructor.prototype.widgetName] = elements;
					}
				}
			}）;

			for（在widgetElements中的索引）{
				widgetElements [index] [index]（）;
			}

			回来
		}，

		addDependents：function（newDependents）{
			$ .addDependents（this，newDependents）;
		}，

		//请注意，此帮助程序不会尝试处理回调
		//或设置一个html元素的文本，其唯一目的是
		//在所有情况下返回文本的html编码版本。（因此名字）
		getEncodedText：function（）{
			return $（“<a>”）.text（this.text（））.html（）;
		}，

		//流畅的助手功能为移动命名空间的等效项
		jqmEnhanceable：function（）{
			返回$ .mobile.enhanceable（this）;
		}，

		jqmHijackable：function（）{
			return $ .mobile.hijackable（this）;
		}
	}）;

	$ .removeWithDependents = function（nativeElement）{
		var element = $（nativeElement）;

		（element.jqmData（“dependents”）|| $（））.remove（）;
		element.remove（）;
	};
	$ .addDependents = function（nativeElement，newDependents）{
		var element = $（nativeElement），
			dependents = element.jqmData（“dependents”）|| $（）;

		element.jqmData（“dependents”，$（dependents）.add（newDependents））;
	};

	$ .find.matches = function（expr，set）{
		return $ .find（expr，null，null，set）;
	};

	$ .find.matchesSelector = function（node，expr）{
		return $ .find（expr，null，null，[node]）.length> 0;
	};

}）（jQuery，this）;

（function（$，window，undefined）{
	$ .extend（$ .mobile，{

		// jQuery Mobile Framework的版本
		版本：“1.4.5”，

		//已弃用，不再在1.4中删除1.5
		//定义用于引用小部件生成的子页面的url参数。
		//转换为example.html＆ui-page = subpageIdentifier
		//哈希段之前＆ui-page =用于制作Ajax请求
		subPageUrlKey：“ui-page”，

		hideUrlBar：true，

		// Keepnative选择器
		keepNative：“：jqmData（role ='none'），：jqmData（role ='nojs'）”，

		//在1.4中弃用，在1.5中删除
		//分配给当前视图中的页面和转换期间的类
		activePageClass：“ui-page-active”，

		//在1.4中弃用，在1.5中删除
		//用于“活动”按钮状态的类，从CSS框架
		activeBtnClass：“ui-btn-active”，

		//在1.4中弃用，在1.5中删除
		//从CSS框架中用于“focus”表单元素状态的类
		focusClass：“ui-focus”，

		//通过Ajax自动处理点击和表单提交，同域
		ajaxEnabled：true，

		//根据location.hash自动加载和显示页面
		hashListeningEnabled：true，

		//禁用以阻止jquery麻烦链接
		linkBindingEnabled：true，

		//设置默认页面转换 - “无”为无转换
		defaultPageTransition：“fade”，

		//设置适用于转换的最大窗口宽度 - “false”表示无限制
		maxTransitionWidth：false，

		//返回页面时将被记住的最小滚动距离
		//在1.5中弃用删除
		minScrollBack：0，

		//设置默认对话框转换 - “无”为无转换
		defaultDialogTransition：“pop”，

		//错误响应消息 - 当Ajax页面请求失败时出现
		pageLoadErrorMessage：“加载页面错误”，

		//对于错误消息，该框使用哪个主题？
		pageLoadErrorMessageTheme：“a”，

		//用phonegaps导航帮助替换对window.history.back的调用
		//在窗口对象上提供它
		phonegapNavigationEnabled：false，

		//准备好后自动初始化DOM
		autoInitializePage：true，

		pushStateEnabled：true，

		//允许用户通过标记父元素来选择忽略内容
		//数据忽略
		ignoreContentEnabled：false，

		buttonMarkup：{
			hoverDelay：200
		}，

		//禁用动态基本标签或链接的更改
		//不支持动态基本标签
		dynamicBaseEnabled：true，

		//默认在init模块中删除依赖关系的属性
		pageContainer：$（），

		//启用跨域页面支持
		allowCrossDomainPages：false，

		dialogHashKey：“＆ui-state = dialog”
	}）;
}）（jQuery，this）;

/ *！
 * jQuery UI Widget c0ab71056b936627e8a7821f03c044aec6280a40
 * http://jqueryui.com
 *
 *版权所有2013 jQuery Foundation等贡献者
 *根据麻省理工学院的许可证发布。
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 * /
（function（$，undefined）{

var uuid = 0，
	slice = Array.prototype.slice，
	_cleanData = $ .cleanData;
$ .cleanData = function（elems）{
	for（var i = 0，elem;（elem = elems [i]）！= null; i ++）{
		尝试{
			$（elem）.triggerHandler（“remove”）;
		// http://bugs.jquery.com/ticket/8235
		} catch（e）{}
	}
	_cleanData（elems）;
};

$ .widget = function（name，base，prototype）{
	var fullName，existingConstructor，constructor，basePrototype，
		// proxiedPrototype允许提供的原型保持不变
		//这样它可以用作多个小部件的混合（＃8876）
		proxiedPrototype = {}，
		namespace = name.split（“。”）[0];

	name = name.split（“。”）[1];
	fullName = namespace +“ - ”+名称;

	if（！prototype）{
		原型=基础;
		base = $ .Widget;
	}

	//创建插件的选择器
	$ .expr [“：”] [fullName.toLowerCase（）] = function（elem）{
		return !! $。data（elem，fullName）;
	};

	$ [namespace] = $ [namespace] || {};
	existingConstructor = $ [namespace] [name];
	constructor = $ [namespace] [name] = function（options，element）{
		//允许没有“new”关键字的实例化
		if（！this._createWidget）{
			return new constructor（options，element）;
		}

		//允许实例化而不初始化简单继承
		//必须使用“new”关键字（上面的代码总是传递args）
		if（arguments.length）{
			this._createWidget（options，element）;
		}
	};
	//用现有的构造函数进行扩展以承载任何静态属性
	$ .extend（constructor，existingConstructor，{
		版本：prototype.version，
		//复制用于创建原型的对象，以防我们需要
		稍后再重新定义窗口小部件
		_proto：$ .extend（{}，prototype），
		//跟踪从这个小部件继承的小部件，以防万一这个小部件是
		//在widget继承之后重新定义
		_childConstructors：[]
	}）;

	basePrototype = new base（）;
	//我们需要使这些选项直接在新的实例上hash属性
	//否则我们将修改我们原型上的选项哈希
	//继承
	basePrototype.options = $ .widget.extend（{}，basePrototype.options）;
	$ .each（prototype，function（prop，value）{
		if（！$。isFunction（value））{
			proxiedPrototype [prop] = value;
			返回;
		}
		proxiedPrototype [prop] =（function（）{
			var _super = function（）{
					return base.prototype [prop] .apply（this，arguments）;
				}，
				_superApply = function（args）{
					return base.prototype [prop] .apply（this，args）;
				};
			return function（）{
				var __super = this._super，
					__superApply = this._superApply，
					的returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply（this，arguments）;

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		}）（）;
	}）;
	constructor.prototype = $ .widget.extend（basePrototype，{
		// TODO：删除对widgetEventPrefix的支持
		//总是使用名称+冒号作为前缀，例如draggable：start
		//不要为不基于DOM的窗口小部件前缀
		widgetEventPrefix：existingConstructor？（basePrototype.widgetEventPrefix || name）：name
	}，proxiedPrototype，{
		构造函数：构造函数，
		命名空间：命名空间，
		widgetName：name，
		widgetFullName：fullName
	}）;

	//如果这个widget被重新定义，那么我们需要找到所有的widget
	//从它继承，并重新定义所有这些，以便它们继承
	//这个小部件的新版本。我们本来试图取代一个
	//在原型链中的级别。
	if（existingConstructor）{
		$ .each（existingConstructor._childConstructors，function（i，child）{
			var childPrototype = child.prototype;

			//使用与之相同的原型重新定义子小部件
			//原来使用，但是继承自新版本的基础
			$ .widget（childPrototype.namespace +“。”+ childPrototype.widgetName，constructor，child._proto）;
		}）;
		//从旧构造函数中删除现有子构造函数的列表
		//所以老的构造函数可以被垃圾收集
		删除existingConstructor._childConstructors;
	} else {
		base._childConstructors.push（构造函数）;
	}

	$ .widget.bridge（name，constructor）;

	返回构造函数;
};

$ .widget.extend = function（target）{
	var input = slice.call（arguments，1），
		inputIndex = 0，
		inputLength = input.length，
		键，
		值;
	for（; inputIndex <inputLength; inputIndex ++）{
		for（键入输入[inputIndex]）{
			value = input [inputIndex] [key];
			if（input [inputIndex] .hasOwnProperty（key）&& value！== undefined）{
				//克隆对象
				if（$ .isPlainObject（value））{
					target [key] = $ .isPlainObject（target [key]）？
						$ .widget.extend（{}，target [key]，value）：
						//不要用对象扩展字符串，数组等
						$ .widget.extend（{}，value）;
				//通过引用复制一切
				} else {
					target [key] = value;
				}
			}
		}
	}
	返回目标;
};

$ .widget.bridge = function（name，object）{
	var fullName = object.prototype.widgetFullName || 名称;
	$ .fn [name] = function（options）{
		var isMethodCall = typeof options ===“string”，
			args = slice.call（arguments，1），
			returnValue = this;

		//允许在init上传递多个哈希值
		options =！isMethodCall && args.length？
			$ .widget.extend.apply（null，[options] .concat（args））：
			选择;

		if（isMethodCall）{
			this.each（function（）{
				var methodValue，
					instance = $ .data（this，fullName）;
				if（options ===“instance”）{
					returnValue = instance;
					返回假
				}
				if（！instance）{
					返回$ .error（“初始化之前不能调用方法”+ name +“;”+
						“尝试调用方法”“+ options +”'“）;
				}
				if（！$。isFunction（instance [options]）|| options.charAt（0）===“_”）{
					return $ .error（“no such method”“+ options +”'for“+ name +”widget instance“）;
				}
				methodValue = instance [options] .apply（instance，args）;
				if（methodValue！== instance && methodValue！== undefined）{
					returnValue = methodValue && methodValue.jquery
						returnValue.pushStack（methodValue.get（））：
						methodValue;
					返回假
				}
			}）;
		} else {
			this.each（function（）{
				var instance = $ .data（this，fullName）;
				if（instance）{
					instance.option（options || {}）._ init（）;
				} else {
					$ .data（this，fullName，new object（options，this））;
				}
			}）;
		}

		return returnValue;
	};
};

$ .Widget = function（/ * options，element * /）{};
$ .Widget._childConstructors = [];

$ .Widget.prototype = {
	widgetName：“widget”，
	widgetEventPrefix：“”，
	defaultElement：“<div>”，
	选项：{
		禁用：假，

		//回调
		创建：null
	}，
	_createWidget：function（options，element）{
		element = $（element || this.defaultElement || this）[0];
		this.element = $（element）;
		this.uuid = uuid ++;
		this.eventNamespace =“。” + this.widgetName + this.uuid;
		this.options = $ .widget.extend（{}，
			this.options，
			this._getCreateOptions（）
			选项）;

		this.bindings = $（）;
		this.hoverable = $（）;
		this.focusable = $（）;

		if（element！== this）{
			$ .data（element，this.widgetFullName，this）;
			this._on（true，this.element，{
				remove：function（event）{
					if（event.target === element）{
						this.destroy（）;
					}
				}
			}）;
			this.document = $（element.style？
				//元素在文档中
				element.ownerDocument：
				//元素是窗口或文档
				element.document || 元素）;
			this.window = $（this.document [0] .defaultView || this.document [0] .parentWindow）;
		}

		this._create（）;
		this._trigger（“create”，null，this._getCreateEventData（））;
		this._init（）;
	}，
	_getCreateOptions：$ .noop，
	_getCreateEventData：$ .noop，
	_create：$ .noop，
	_init：$ .noop，

	destroy：function（）{
		this._destroy（）;
		//我们可以在2.0中删除unbind调用
		//所有的事件绑定都应该通过this._on（）
		this.element
			.unbind（this.eventNamespace）
			.removeData（this.widgetFullName）
			// support：jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData（$ .camelCase（this.widgetFullName））;
		this.widget（）
			.unbind（this.eventNamespace）
			.removeAttr（“aria-disabled”）
			.removeClass（
				this.widgetFullName +“-disabled”+
				“无国残”）;

		//清理事件和状态
		this.bindings.unbind（this.eventNamespace）;
		this.hoverable.removeClass（“ui-state-hover”）;
		this.focusable.removeClass（“ui-state-focus”）;
	}，
	_destroy：$ .noop，

	widget：function（）{
		返回this.element;
	}，

	选项：function（key，value）{
		var options = key，
			部分，
			curOption，
			一世;

		if（arguments.length === 0）{
			//不要返回对内部哈希的引用
			return $ .widget.extend（{}，this.options）;
		}

		if（typeof key ===“string”）{
			//处理嵌套的键，例如“foo.bar”=> {foo：{bar：___}}
			options = {};
			parts = key.split（“。”）;
			key = parts.shift（）;
			if（parts.length）{
				curOption = options [key] = $ .widget.extend（{}，this.options [key]）;
				for（i = 0; i <parts.length  -  1; i ++）{
					curOption [parts [i]] = curOption [parts [i]] || {};
					curOption = curOption [parts [i]];
				}
				key = parts.pop（）;
				if（value === undefined）{
					return curOption [key] === undefined？null：curOption [key];
				}
				curOption [key] = value;
			} else {
				if（value === undefined）{
					return this.options [key] === undefined？null：this.options [key];
				}
				options [key] = value;
			}
		}

		this._setOptions（options）;

		回来
	}，
	_setOptions：function（options）{
		var键;

		for（键入选项）{
			this._setOption（key，options [key]）;
		}

		回来
	}，
	_setOption：function（key，value）{
		this.options [key] = value;

		if（key ===“disabled”）{
			this.widget（）
				.toggleClass（this.widgetFullName +“-disabled”，!! value）;
			this.hoverable.removeClass（“ui-state-hover”）;
			this.focusable.removeClass（“ui-state-focus”）;
		}

		回来
	}，

	enable：function（）{
		return this._setOptions（{disabled：false}）;
	}，
	disable：function（）{
		return this._setOptions（{disabled：true}）;
	}，

	_on：function（suppressDisabledCheck，element，handler）{
		var delegateElement，
			实例=这个

		// no suppressDisabledCheck flag，shuffle arguments
		if（typeof suppressDisabledCheck！==“boolean”）{
			处理程序=元素
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		//没有元素参数，随机播放并使用this.element
		if（！handlers）{
			处理程序=元素
			element = this.element;
			delegateElement = this.widget（）;
		} else {
			//接受选择器，DOM元素
			element = delegateElement = $（element）;
			this.bindings = this.bindings.add（element）;
		}

		$ .each（处理程序，函数（事件，处理程序）{
			function handlerProxy（）{
				//允许小部件自定义禁用的处理
				//  - 禁用为数组而不是布尔值
				//  - 禁用类作为禁用单个部件的方法
				if（！suppressDisabledCheck &&
						（instance.options.disabled === true ||
							$（this）.hasClass（“ui-state-disabled”）））{
					返回;
				}
				return（typeof handler ===“string”？instance [handler]：handler）
					.apply（instance，arguments）;
			}

			// copy the guid so direct unbinding works
			if（typeof handler！==“string”）{
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $ .guid ++;
			}

			var match = event.match（/^(\w+)\s*(.*)$/），
				eventName = match [1] + instance.eventNamespace，
				selector = match [2];
			if（selector）{
				delegateElement.delegate（selector，eventName，handlerProxy）;
			} else {
				element.bind（eventName，handlerProxy）;
			}
		}）;
	}，

	_off：function（element，eventName）{
		eventName =（eventName ||“”）.split（“”）.join（this.eventNamespace +“”）+ this.eventNamespace;
		element.unbind（eventName）.undelegate（eventName）;
	}，

	_delay：function（handler，delay）{
		function handlerProxy（）{
			return（typeof handler ===“string”？instance [handler]：handler）
				.apply（instance，arguments）;
		}
		var instance = this;
		return setTimeout（handlerProxy，delay || 0）;
	}，

	_hoverable：function（element）{
		this.hoverable = this.hoverable.add（element）;
		this._on（element，{
			mouseenter：function（event）{
				$（event.currentTarget）.addClass（“ui-state-hover”）;
			}，
			mouseleave：function（event）{
				$（event.currentTarget）.removeClass（“ui-state-hover”）;
			}
		}）;
	}，

	_focusable：function（element）{
		this.focusable = this.focusable.add（element）;
		this._on（element，{
			focusin：function（event）{
				$（event.currentTarget）.addClass（“ui-state-focus”）;
			}，
			focusout：function（event）{
				$（event.currentTarget）.removeClass（“ui-state-focus”）;
			}
		}）;
	}，

	_trigger：function（type，event，data）{
		var prop，orig，
			callback = this.options [type];

		data = data || {};
		event = $ .Event（event）;
		event.type =（type === this.widgetEventPrefix？
			类型：
			this.widgetEventPrefix + type）.toLowerCase（）;
		//原始事件可能来自任何元素
		//所以我们需要重新设置新事件的目标
		event.target = this.element [0];

		//将原始事件属性复制到新事件
		orig = event.originalEvent;
		if（orig）{
			for（prop in orig）{
				if（！（prop in event））{
					事件[prop] = orig [prop];
				}
			}
		}

		this.element.trigger（event，data）;
		return！（$ .isFunction（callback）&&
			callback.apply（this.element [0]，[event] .concat（data））=== false ||
			event.isDefaultPrevented（））;
	}
};

$ .each（{show：“fadeIn”，hide：“fadeOut”}，function（method，defaultEffect）{
	$ .Widget.prototype [“_”+ method] = function（element，options，callback）{
		if（typeof options ===“string”）{
			options = {effect：options};
		}
		var hasOptions，
			effectName =！选项？
				方法 ：
				选项=== true || typeof options ===“number”？
					defaultEffect：
					options.effect || defaultEffect;
		options = options || {};
		if（typeof options ===“number”）{
			options = {duration：options};
		}
		hasOptions =！$。isEmptyObject（options）;
		options.complete = callback;
		if（options.delay）{
			element.delay（options.delay）;
		}
		if（hasOptions && $ .effects && $ .effects.effect [effectName]）{
			element [method]（options）;
		} else if（effectName！== method && element [effectName]）{
			element [effectName]（options.duration，options.easing，callback）;
		} else {
			element.queue（function（next）{
				$（this）[method]（）;
				if（callback）{
					callback.call（element [0]）;
				}
				下一个（）;
			}）;
		}
	};
}）;

}）（jQuery）;

（function（$，window，undefined）{
	var nsNormalizeDict = {}，
		oldFind = $ .find，
		rbrace = /（？：\ {[\ s \ S] * \} | \ [[\ s \ S] * \]）$ /
		jqmDataRE = /：jqmData \（（[^）] *）\）/ g;

	$ .extend（$ .mobile，{

		//使用框架范围内的数据服务器的命名空间。默认是没有命名空间

		ns：“”，

		//从元素中检索一个属性，然后对该值进行一些按摩

		getAttribute：function（element，key）{
			var数据;

			element = element.jquery？element [0]：element;

			if（element && element.getAttribute）{
				data = element.getAttribute（“data-”+ $ .mobile.ns + key）;
			}

			//从核心的src / data.js复制：dataAttr（）
			//从字符串转换为正确的数据类型
			尝试{
				data = data ===“true”？真的：
					数据===“假”？假：
					数据===“null”？空值 ：
					//只有在不改变字符串的情况下才转换为数字
					+数据+“”===数据？+资料：
					rbrace.test（数据）？JSON.parse（data）：
					数据;
			} catch（err）{}

			返回数据;
		}，

		//将我们的缓存用于测试目的。
		nsNormalizeDict：nsNormalizeDict，

		//取数据属性属性，前缀名称空间
		//然后camel case属性字符串。添加结果
		//到我们的nsNormalizeDict，所以我们不必这样做了。
		nsNormalize：function（prop）{
			返回nsNormalizeDict [prop] ||
				（nsNormalizeDict [prop] = $ .camelCase（$ .mobile.ns + prop））;
		}，

		//找到最接近的javascript页面元素来收集设置数据jsperf测试
		// http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
		//可能是天真的，但它显示解析开销*只是*页面选择器vs
		//页面和对话框选择器是可忽略的。这可能会加快
		//做一个类似的父节点遍历到上面继承的主题代码中找到的父节点
		nearestPageData：function（$ target）{
			返回$目标
				.closest（“：jqmData（role ='page'），：jqmData（role ='dialog'）”）
				.data（“mobile-page”）;
		}

	}）;

	// Mobile版本的数据和removeData和hasData方法
	//确保使用jQuery Mobile的数据命名空间设置和检索所有数据
	$ .fn.jqmData = function（prop，value）{
		var结果;
		if（typeof prop！==“undefined”）{
			if（prop）{
				prop = $ .mobile.nsNormalize（prop）;
			}

			//未定义允许作为第二个参数的显式输入
			//在这种情况下，它返回值并且不将其设置为undefined
			if（arguments.length <2 || value === undefined）{
				result = this.data（prop）;
			} else {
				result = this.data（prop，value）;
			}
		}
		返回结果;
	};

	$ .jqmData = function（elem，prop，value）{
		var结果;
		if（typeof prop！==“undefined”）{
			result = $ .data（elem，prop？$ .mobile.nsNormalize（prop）：prop，value）;
		}
		返回结果;
	};

	$ .fn.jqmRemoveData = function（prop）{
		返回this.removeData（$ .mobile.nsNormalize（prop））;
	};

	$ .jqmRemoveData = function（elem，prop）{
		return $ .removeData（elem，$ .mobile.nsNormalize（prop））;
	};

	$ .find = function（selector，context，ret，extra）{
		if（selector.indexOf（“：jqmData”）> -1）{
			selector = selector.replace（jqmDataRE，“[data-”+（$ .mobile.ns ||“”）+“$ 1]”）;
		}

		return oldFind.call（this，selector，context，ret，extra）;
	};

	$ .extend（$ .find，oldFind）;

}）（jQuery，this）;

（function（$，undefined）{

var rcapitals = / [AZ] / g，
	replaceFunction = function（c）{
		return“ - ”+ c.toLowerCase（）;
	};

$ .extend（$ .Widget.prototype，{
	_getCreateOptions：function（）{
		var选项，值，
			elem = this.element [0]，
			options = {};

		//
		if（！$。mobile.getAttribute（elem，“defaults”））{
			for（在this.options中的选项）{
				value = $ .mobile.getAttribute（elem，option.replace（rcapitals，replaceFunction））;

				if（value！= null）{
					options [option] = value;
				}
			}
		}

		退货选择;
	}
}）;

// TODO：仅在1.5中删除backcompat
$ .mobile.widget = $ .Widget;

}）（jQuery）;


（function（$）{
	// TODO将加载器类移动到窗口小部件设置中
	var loaderClass =“ui-loader”，$ html = $（“html”）;

	$ .widget（“mobile.loader”，{
		//注意如果定义了全局配置设置，它们将覆盖这些设置
		//选项
		选项：{
			//加载邮件的主题
			主题：“一”

			//是否显示加载消息中的文本
			textVisible：false，

			//为自定义html加载消息的内容
			html：“”

			//显示弹出窗口时要显示的文本
			文字：“加载”
		}，

		defaultHtml：“<div class ='”+ loaderClass +“'>”+
			“<span class ='ui-icon-loading'> </ span>”+
			“<h1> </ h1>”+
			“</ DIV>”，

		//对于非固定的支持浏览器。位于y中心（如果scrollTop支持），在activeBtn上方（如果已定义），或仅从顶部100px
		fakeFixLoader：function（）{
			var activeBtn = $（“。”+ $ .mobile.activeBtnClass）.first（）;

			this.element
				的CSS（{
					top：$ .support.scrollTop && this.window.scrollTop（）+ this.window.height（）/ 2 ||
						activeBtn.length && activeBtn.offset（）。top || 100
				}）;
		}，

		//检查装载机的位置，看看它是否看起来是“固定的”到中心
		//如果没有，请使用abs定位
		checkLoaderPosition：function（）{
			var offset = this.element.offset（），
				scrollTop = this.window.scrollTop（），
				screenHeight = $ .mobile.getScreenHeight（）;

			if（offset.top <scrollTop ||（offset.top  -  scrollTop）> screenHeight）{
				this.element.addClass（“ui-loader-fakefix”）;
				this.fakeFixLoader（）;
				this.window
					.unbind（“scroll”，this.checkLoaderPosition）
					.bind（“scroll”，$ .proxy（this.fakeFixLoader，this））;
			}
		}，

		resetHtml：function（）{
			this.element.html（$（this.defaultHtml）.html（））;
		}，

		//打开/关闭页面加载消息。主题加倍为对象参数
		//具有以下形状：{theme：''，text：''，html：''，textVisible：''}
		//请注意，超过第一个的$ .mobile.loading *设置和参数已被弃用
		// TODO甜蜜的耶稣我们需要打破一些
		show：function（theme，msgText，textonly）{
			var textVisible，message，loadSettings;

			this.resetHtml（）;

			//使用原型选项，以便人们可以在全局设置它们
			// mobile init。一致性，这是晚餐
			if（$ .type（theme）===“object”）{
				loadSettings = $ .extend（{}，this.options，theme）;

				theme = loadSettings.theme;
			} else {
				loadSettings = this.options;

				//这里我们更喜欢以字符串参数传递的主题值
				//我们更喜欢全局选项，因为我们不能使用未定义的默认值
				//原型选项，然后是原型选项
				主题=主题|| loadSettings.theme;
			}

			//设置消息文本，更喜欢param，然后设置对象
			//然后加载消息
			message = msgText || （loadSettings.text === false？“”：loadSettings.text）;

			//准备dom
			$ html.addClass（“ui-loading”）;

			textVisible = loadSettings.textVisible;

			//添加适当的css给定的选项（主题，文本等）
			//强制文本可见性，如果提供了第二个参数，或者
			//如果文本在对象args中被显式设置
			this.element.attr（“class”，loaderClass +
				“ui-corner-all ui-body-”+主题+
				“ui-loader-”+（textVisible || msgText || theme.text？“verbose”：“default”）+
				（loadSettings.textonly || textonly？“ui-loader-textonly”：“”））;

			// TODO验证jquery.fn.html是否可以在这两种情况下使用
			//这可能是防止不了解xss的过度防御
			//如果在加载设置中定义了html属性，请使用它
			//否则使用上面的回退
			if（loadSettings.html）{
				this.element.html（loadSettings.html）;
			} else {
				this.element.find（“h1”）.text（message）;
			}

			//如果已经定义了pagecontainer小部件，我们可能会使用：mobile-pagecontainer
			//并附加到已经定义了pagecontainer小部件的元素。如果不，
			//我们附着在身上。
			this.element.appendTo（$ .mobile.pagecontainer？
				$（“：mobile-pagecontainer”）：$（“body”））;

			//检查加载程序是否可见
			this.checkLoaderPosition（）;

			//滚动检查装载机位置
			this.window.bind（“scroll”，$ .proxy（this.checkLoaderPosition，this））;
		}，

		hide：function（）{
			$ html.removeClass（“ui-loading”）;

			if（this.options.text）{
				this.element.removeClass（“ui-loader-fakefix”）;
			}

			this.window.unbind（“scroll”，this.fakeFixLoader）;
			this.window.unbind（“scroll”，this.checkLoaderPosition）;
		}
	}）;

}）（jQuery，this）;


/ *！
 * jQuery hashchange event  -  v1.3  -  7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 *版权所有（c）2010“牛仔”本·阿尔曼
 *根据麻省理工学院和GPL许可证获得双重许可。
 * http://benalman.com/about/license/
 * /

//脚本：jQuery hashchange事件
//
// *版本：1.3，最后更新：7/21/2010 *
// 
// Project Home  -  http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub  -  http://github.com/cowboy/jquery-hashchange/
// Source  -  http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
//（Minified） -  http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js（0.8kb gzipped）
// 
//关于：许可证
// 
//版权所有（c）2010“Cowboy”Ben Alman，
//根据MIT和GPL许可证进行双重许可。
// http://benalman.com/about/license/
// 
//关于：示例
// 
//这些工作示例，完整的注释代码，说明了一些
//可以使用此插件的方式。
// 
// hashchange event  -  http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain  -  http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
//关于：支持和测试
// 
//关于jQuery这个插件的版本或版本的信息
//测试，测试了哪些浏览器，以及单元测试的位置
//居住（所以你可以自己测试）。
// 
// jQuery版本 -  1.2.6，1.3.2，1.4.1，1.4.2
//经过测试的浏览器 -  Internet Explorer 6-8，Firefox 2-4，Chrome 5-6，Safari 3.2-5，
// Opera 9.6-10.60，iPhone 3.1，Android 1.6-2.2，BlackBerry 4.6-5。
//单元测试 -  http://benalman.com/code/projects/jquery-hashchange/unit/
// 
//关于：已知问题
// 
//这个jQuery hashchange事件实现是相当稳定的
//强大，有一些不幸的浏览器错误围绕着预期
//基于hashchange事件的行为，独立于任何JavaScript
// window.onhashchange抽象。有关更多信息，请参阅以下示例
//信息：
// 
// Chrome：Back Button  -  http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox：Remote XMLHttpRequest  -  http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit：Iframe中的Back Button  -  http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari：Back Button from a different domain  -  http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
//还要注意，浏览器本来应该支持window.onhashchange 
//事件，但不报告它，将使用回退轮询循环。
// 
//关于：发布历史
// 
// 1.3  - （7/21/2010）重组的IE6 / 7 iframe代码使其更多
//“可移动”用于仅移动开发。添加了IE6 / 7 document.title
//支持。尝试通过使用尽可能隐藏iframe
// http://www.paciellogroup.com/blog/?p=604的技术。添加
//支持“快捷方式”格式$（window）.hashchange（fn）和
// $（window）.hashchange（）like jQuery提供了内置的事件。
//将jQuery.hashchangeDelay重命名为<jQuery.fn.hashchange.delay>和
//将其默认值降低到50.添加了<jQuery.fn.hashchange.domain>
//和<jQuery.fn.hashchange.src>属性加上document-domain.html
//在文件中设置document.domain时遇到访问被拒绝的问题
// IE6 / 7。
// 1.2  - （2/11/2010）修复了使用此插件返回页面的错误
//从另一个域的页面将导致Safari 4中的错误。另外，
// IE6 / 7 Iframe现在插入到body之后（实际上是这样），
//这阻止了当事件首次绑定时页面滚动。
//事件现在也可以在DOM准备好之前被绑定，但是它将无法使用
//之前在IE6 / 7。
// 1.1  - （1/21/2010）包含document.documentMode测试来修复IE8错误
//浏览器版本错误地报告为8.0，尽管如此
//包含X-UA兼容的IE = EmulateIE7元标记。
// 1.0  - （1/9/2010）初始版本。打破了jQuery BBQ event.special
// window.onhashchange功能插入用户的单独插件
//谁想要的只是基本的事件和后退按钮支持，没有所有的
//烧烤提供的额外的awesomeness。这个插件将被包括在内
//部分jQuery烧烤，但也可单独提供。

（函数（$，窗，未定义）{
  '$：nomunge'; //由YUI压缩器使用
  
  //重用字符串。
  var str_hashchange ='hashchange'，
    
    //方法/对象引用。
    doc = document，
    fake_onhashchange，
    special = $ .event.special，
    
    //浏览器是否支持window.onhashchange？注意IE8的运行
    // IE7兼容模式在窗口中为'onhashchange'报告为true
    //虽然事件不受支持，也是测试document.documentMode。
    doc_mode = doc.documentMode，
    窗口中的supports_onhashchange ='on'+ str_hashchange &&（doc_mode === undefined || doc_mode> 7）;
  
  //获取location.hash（或你期望的location.hash是什么）没有任何
  // 领导 ＃。感谢您的需要，Firefox！
  function get_fragment（url）{
    url = url || location.href;
    返回'＃'+ url.replace（/^[^#]*#?(.*)$/，'$ 1'）;
  };
  
  //方法：jQuery.fn.hashchange
  // 
  //将一个处理程序绑定到window.onhashchange事件或触发所有绑定
  // window.onhashchange事件处理程序。这个行为是一致的
  // jQuery的内置事件处理程序。
  // 
  //用法：
  // 
  //> jQuery（window）.hashchange（[handler]）;
  // 
  //参数：
  // 
  // handler  - （Function）要绑定到hashchange的可选处理程序
  //事件。这是更详细的形式的“快捷方式”：
  // jQuery（window）.bind（'hashchange'，handler）。如果省略处理程序，
  //所有绑定的window.onhashchange事件处理程序将被触发。这个
  //是更详细的快捷方式
  // jQuery（window）.trigger（'hashchange'）。这些形式在
  // <hashchange event>部分。
  // 
  //返回：
  // 
  //（jQuery）元素的初始jQuery集合。
  
  //允许“快捷方式”格式$（elem）.hashchange（fn）用于绑定和
  // $（elem）.hashchange（）用于触发，就像jQuery对内置事件一样。
  $ .fn [str_hashchange] = function（fn）{
    返回fn？this.bind（str_hashchange，fn）：this.trigger（str_hashchange）;
  };
  
  //属性：jQuery.fn.hashchange.delay
  // 
  // <hashchange事件>的数值间隔（以毫秒为单位）
  //轮询循环执行。默认为50。
  
  // Property：jQuery.fn.hashchange.domain
  // 
  //如果您在JavaScript中设置document.domain，并且希望哈希
  //历史在IE6 / 7中工作，不仅必须设置此属性，而且必须设置
  //也设置document.domain在jQuery加载到页面之前。这个
  //属性仅适用于您支持IE6 / 7（或IE8操作）
  //在“IE7兼容性”模式下）。
  // 
  //此外，必须将<jQuery.fn.hashchange.src>属性设置为
  //包含的“document-domain.html”文件的路径，可以重命名或
  //如有必要修改（请注意，指定的document.domain必须是
  //在您的主要JavaScript以及此文件中都相同）。
  // 
  //用法：
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property：jQuery.fn.hashchange.src
  // 
  //如果由于某种原因需要指定一个Iframe src文件（例如，
  //当在<jQuery.fn.hashchange.domain>中设置document.domain时），你可以
  //这样使用这个属性。请注意，使用此属性时，历史记录
  //在加载Iframe src文件之前，不会将其记录在IE6 / 7中。这个性质
  //仅适用于您支持IE6 / 7（或IE8在“IE7”中运行）
  // 兼容模式）。
  // 
  //用法：
  // 
  // jQuery.fn.hashchange.src ='path / to / file.html';
  
  $ .fn [str_hashchange] .delay = 50;
  / *
  $ .fn [str_hashchange] .domain = null;
  $ .fn [str_hashchange] .src = null;
  * /
  
  //事件：hashchange事件
  // 
  //当location.hash发生变化时触发。在支持它的浏览器中，本机
  //使用HTML5 window.onhashchange事件，否则轮询循环是
  //初始化，运行每个<jQuery.fn.hashchange.delay>毫秒
  //查看哈希是否已更改。在IE6 / 7（和IE8操作在“IE7
  //兼容性“模式），创建一个隐藏的iframe以允许后退按钮
  //和基于哈希的历史记录工作。
  // 
  //如<jQuery.fn.hashchange>所述的用法：
  // 
  //> //绑定事件处理程序。
  //> jQuery（window）.hashchange（function（e）{
  //> var hash = location.hash;
  //> ...
  //>}）;
  //> 
  //> //手动触发事件处理程序。
  //> jQuery（window）.hashchange（）;
  // 
  //允许事件命名空间的更详细的用法：
  // 
  //> //绑定事件处理程序。
  //> jQuery（window）.bind（'hashchange'，function（e）{
  //> var hash = location.hash;
  //> ...
  //>}）;
  //> 
  //> //手动触发事件处理程序。
  //> jQuery（window）.trigger（'hashchange'）;
  // 
  // 补充笔记：
  // 
  // *直到至少有一个处理程序才会创建轮询循环和iframe
  //实际上绑定到'hashchange'事件。
  // *如果您需要立即执行绑定的处理程序，在这种情况下
  //通过书签或页面刷新，页面加载中存在location.hash
  //例如，使用jQuery（window）.hashchange（）或更详细 
  // jQuery（window）.trigger（'hashchange'）。
  // *事件可以在DOM准备好之前绑定，但是由于它不可用
  //在IE6 / 7之前（由于必要的iframe），推荐的用法是
  //将其绑定到DOM就绪处理程序中。
  
  //覆盖现有的$ .event.special.hashchange方法（允许此插件
  //要在BBQ的源代码中的jQuery BBQ之后定义）。
  special [str_hashchange] = $ .extend（special [str_hashchange]，{
    
    //仅当第一个'hashchange'事件绑定到窗口时调用。
    setup：function（）{
      //如果window.onhashchange本身是支持的，那没有什么可做的
      if（supports_onhashchange）{return false; }
      
      //否则，我们需要创建自己的。而我们不想这样称呼
      //直到用户绑定到事件，以防万一他们从未这样做
      //将创建一个轮询循环，甚至可能创建一个隐藏的Iframe。
      $（fake_onhashchange.start）;
    }，
    
    //仅在最后一个“hashchange”事件从窗口中绑定时调用。
    拆分：function（）{
      //如果window.onhashchange本身是支持的，那没有什么可做的
      if（supports_onhashchange）{return false; }
      
      //否则，我们需要停止（如果可能的话）。
      $（fake_onhashchange.stop）;
    }
    
  }）;
  
  // fake_onhashchange执行触发window.onhashchange的所有工作
  //没有本机支持的浏览器的事件，包括创建一个
  //轮询循环来查看哈希更改，并在IE 6/7中创建一个隐藏的
  // iframe启用后退和转发。
  fake_onhashchange =（function（）{
    var self = {}，
      timeout_id，
      
      //记住初始哈希，不会立即触发。
      last_hash = get_fragment（），
      
      fn_retval = function（val）{return val; }，
      history_set = fn_retval，
      history_get = fn_retval;
    
    //启动轮询循环。
    self.start = function（）
      timeout_id || 轮询（）;
    };
    
    //停止轮询循环。
    self.stop = function（）{
      timeout_id && clearTimeout（timeout_id）
      timeout_id = undefined;
    };
    
    //此轮询循环检查每个$ .fn.hashchange.delay毫秒以查看
    //如果location.hash已更改，并触发“hashchange”事件
    //窗口必要时。
    function poll（）{
      var hash = get_fragment（），
        history_hash = history_get（last_hash）;
      
      if（hash！== last_hash）{
        history_set（last_hash = hash，history_hash）;
        
        $（window）.trigger（str_hashchange）;
        
      } else if（history_hash！== last_hash）{
        location.href = location.href.replace（/#.*/，''）+ history_hash;
      }
      
      timeout_id = setTimeout（poll，$ .fn [str_hashchange] .delay）;
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv删除如果不支持IE6 / 7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    window.attachEvent &&！window.addEventListener &&！supports_onhashchange &&（function（）{
      //不仅IE6 / 7需要“魔法”iframe治疗，而且IE8也是如此
      //在“IE7兼容”模式下运行。
      
      var iframe，
        iframe_src;
      
      //当事件被绑定并且在IE 6/7中启动轮询时，创建一个隐藏的
      //历史处理的iframe
      self.start = function（）{
        if（！iframe）{
          iframe_src = $ .fn [str_hashchange] .src;
          iframe_src = iframe_src && iframe_src + get_fragment（）;
          
          //创建隐藏的iframe。尝试使iframe隐藏尽可能
          //通过使用http://www.paciellogroup.com/blog/?p=604的技术。
          iframe = $（'<iframe tabindex =“ -  1”title =“empty”/>'）hide（）
            
            //当Iframe完全加载时，初始化历史记录
            //开始轮询
            .one（'load'，function（）{
              iframe_src || history_set（get_fragment（））;
              轮询（）;
            }）
            
            // Load Iframe src如果指定，否则没有。
            .attr（'src'，iframe_src ||'javascript：0'）
            
            //在身体结束后追加Iframe以防止不必要
            //初始页面滚动（是的，这个工程）。
            .insertAfter（'body'）[0] .contentWindow;
          
          //每当`document.title`更改时，请更新Iframe的标题
          //优化后面/下一个历史菜单条目。由于IE有时候
          //错误与“未指定错误”这是第一次设置
          //（是的，非常有用）用try / catch块包装它。
          doc.onpropertychange = function（）{
            尝试{
              if（event.propertyName ==='title'）{
                iframe.document.title = doc.title;
              }
            } catch（e）{}
          };
          
        }
      };
      
      //自创建IE6 / 7 Iframe之后，覆盖“停止”方法。甚至
      //如果不再有任何绑定的事件处理程序，轮询循环
      //仍然需要返回/下一个工作！
      self.stop = fn_retval;
      
      //通过查看隐藏的Iframe的location.hash获取历史记录。
      history_get = function（）{
        return get_fragment（iframe.location.href）;
      };
      
      //通过打开然后关闭iframe来设置一个新的历史记录项
      // document，* then *设置其location.hash。如果document.domain有
      //已设置，更新。
      history_set = function（hash，history_hash）{
        var iframe_doc = iframe.document，
          domain = $ .fn [str_hashchange] .domain;
        
        if（hash！== history_hash）{
          //更新可能设置的任何初始`document.title`的iframe。
          iframe_doc.title = doc.title;
          
          //打开iframe的文档关闭后是什么
          //实际上添加了一个历史记录条目。
          iframe_doc.open（）;
          
          //如果需要，为Iframe文档设置document.domain。
          domain && iframe_doc.write（'\ x3cscript> document.domain =“'+ domain +'”\ x3c / script>'）;
          
          iframe_doc.close（）;
          
          //更新Iframe的哈希，为了很好的正义。
          iframe.location.hash = hash;
        }
      };
      
    }）（）;
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^删除如果不支持IE6 / 7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^
    
    返回自我
  }）（）;
  
}）（jQuery的，这一点）;


（function（$，undefined）{

	/ *！matchMedia（）polyfill  - 在JS中测试CSS媒体类型/查询。作者和版权（c）2012：Scott Jehl，Paul Irish，Nicholas Zakas。双MIT / BSD许可证* /
	window.matchMedia = window.matchMedia || （function（doc，undefined）{

		var bool，
			docElem = doc.documentElement，
			refNode = docElem.firstElementChild || docElem.firstChild，
			//在<head>中执行<FF4所需的fakeBody
			fakeBody = doc.createElement（“body”），
			div = doc.createElement（“div”）;

		div.id =“mq-test-1”;
		div.style.cssText =“position：absolute; top：-100em”;
		fakeBody.style.background =“none”;
		fakeBody.appendChild（DIV）;

		返回函数（q）{

			div.innerHTML =“＆shy; <style media = \”“+ q +”\“>＃mq-test-1 {width：42px;} </ style>”;

			docElem.insertBefore（fakeBody，refNode）;
			bool = div.offsetWidth === 42;
			docElem.removeChild（fakeBody）;

			返回{
				比赛：bool，
				媒体：q
			};

		};

	}（文件））;

	// $ .mobile.media使用matchMedia返回一个布尔值。
	$ .mobile.media = function（q）{
		return window.matchMedia（q）.matches;
	};

}）（jQuery的）;

	（function（$，undefined）{
		var support = {
			触摸：“touchend”在文件中
		};

		$ .mobile.support = $ .mobile.support || {};
		$ .extend（$ .support，support）;
		$ .extend（$ .mobile.support，support）;
	}（jQuery））;

	（function（$，undefined）{
		$ .extend（$ .support，{
			方向：窗口中的“方向”和窗口中的“onorientationchange”
		}）;
	}（jQuery））;

（function（$，undefined）{

// thx Modernizr
功能propExists（prop）{
	var uc_prop = prop.charAt（0）.toUpperCase（）+ prop.substr（1），
		props =（prop +“”+ vendors.join（uc_prop +“”）+ uc_prop）.split（“”），
		v;

	for（v in props）{
		if（fbCSS [props [v]]！== undefined）{
			返回真
		}
	}
}

var fakeBody = $（“<body>”）.prependTo（“html”），
	fbCSS = fakeBody [0] .style，
	vendor = [“Webkit”，“Moz”，“O”]，
	webos =“palmGetResource”在窗口中，//只用于排除scrollTop
	operamini = window.operamini &&（{}）toString.call（window.operamini）===“[object OperaMini]”，
	bb = window.blackberry &&！propExists（“-webkit-transform”），//只用于排除盒子阴影，因为它在BB 5和下面填充不透明
	nokiaLTE7_3;

//内联SVG支持测试
function inlineSVG（）{
	//谢谢Modernizr＆Erik Dahlstrom
	var w = window，
		svg = !! w.document.createElementNS && !! w.document.createElementNS（“http://www.w3.org/2000/svg”，“svg”）.createSVGRect &&！（w.opera && navigator.userAgent .indexOf（“Chrome”）=== -1），
		support = function（data）{
			if（！（data && svg））{
				$（“html”）.addClass（“ui-nosvg”）;
			}
		}，
		img = new w.Image（）;

	img.onerror = function（）{
		支持（false）;
	};
	img.onload = function（）{
		支持（img.width === 1 && img.height === 1）;
	};
	img.src =“data：image / gif; base64，R0lGODlhAQABAIAAAAAAAP /// ywAAAAAAQABAAACAUwAOw ==”;
}

function transform3dTest（）{
	var mqProp =“transform-3d”，
		//因为下面的`translate3d`测试在Android中抛出了错误的肯定：
		ret = $ .mobile.media（“（ - ”+ vendors.join（“ - ”+ mqProp +“），（ - ”）+“ - ”+ mqProp +“），（”+ mqProp +“）
		el，transforms，t;

	if（ret）{
		回来！
	}

	el = document.createElement（“div”）;
	transforms = {
		//暂时忽略了Opera; MS使用无限制。
		“MozTransform”：“-moz-transform”，
		“变换”：“变换”
	};

	fakeBody.append（el）;

	for（t in transforms）{
		if（el.style [t]！== undefined）{
			el.style [t] =“translate3d（100px，1px，1px）”;
			ret = window.getComputedStyle（el）.getPropertyValue（transforms [t]）;
		}
	}
	return（!! ret && ret; ==“none”）;
}

//测试动态更新基本标签支持（允许我们避免href，src attr重写）
function baseTagTest（）{
	var fauxBase = location.protocol +“//”+ location.host + location.pathname +“ui-dir /”，
		base = $（“head base”），
		fauxEle = null，
		href =“”，
		链接，rebase;

	if（！base.length）{
		base = fauxEle = $（“<base>”，{“href”：fauxBase}）。appendTo（“head”）;
	} else {
		href = base.attr（“href”）;
	}

	link = $（“<a href='testurl' />”）.prependTo（fakeBody）;
	rebase = link [0] .href;
	base [0] .href = href || location.pathname;

	if（fauxEle）{
		fauxEle.remove（）;
	}
	return rebase.indexOf（fauxBase）=== 0;
}

//谢谢Modernizr
函数cssPointerEventsTest（）{
	var element = document.createElement（“x”），
		documentElement = document.documentElement，
		getComputedStyle = window.getComputedStyle，
		支持;

	if（！（element.style中的“pointerEvents”））{
		返回假
	}

	element.style.pointerEvents =“auto”;
	element.style.pointerEvents =“x”;
	documentElement.appendChild（element）;
	supports = getComputedStyle &&
	getComputedStyle（element，“”）.pointerEvents ===“auto”;
	documentElement.removeChild（element）;
	返回!!支持;
}

function boundingRect（）{
	var div = document.createElement（“div”）;
	return typeof div.getBoundingClientRect！==“undefined”;
}

//非基于UA的IE版本检查由James Padolsey，由jdalton修改 - 从http://gist.github.com/527683
//允许包括IE 6+，包括Windows Mobile 7
$ .extend（$ .mobile，{browser：{}}）;
$ .mobile.browser.oldIE =（function（）{
	var v = 3，
		div = document.createElement（“div”），
		a = div.all || [];

	做{
		div.innerHTML =“<！ -  [if gt IE”+（++ v）+“]> <br> <！[endif]  - >”;
	} while（a [0]）;

	返回v> 4？v：！v
}）（）;

function fixedPosition（）{
	var w = window，
		ua = navigator.userAgent，
		platform = navigator.platform，
		//渲染引擎是Webkit，并捕获主要版本
		wkmatch = ua.match（/ AppleWebKit \ /（[0-9] +）/），
		wkversion = !! wkmatch && wkmatch [1]
		ffmatch = ua.match（/ Fennec \ /（[0-9] +）/），
		ffversion = !! ffmatch && ffmatch [1]，
		operammobilematch = ua.match（/ Opera Mobi \ /（[0-9] +）/），
		omversion = !! operammobilematch && operammobilematch [1];

	如果
		// iOS 4.3及以上版本：平台是iPhone / Pad / Touch和Webkit版本小于534（ios5）
		（（platform.indexOf（“iPhone”）> -1 || platform.indexOf（“iPad”）> -1 || platform.indexOf（“iPod”）> -1）&& wkversion && wkversion <534）||
		// Opera Mini
		（w.operamini &&（{}）。toString.call（w.operamini）===“[object OperaMini]”）||
		（operammobilematch && omversion <7458）||
		// Android lte 2.1：平台是Android和Webkit版本不到533（Android 2.2）
		（ua.indexOf（“Android”）> -1 && wkversion && wkversion <533）||
		// Firefox Mobile 6.0之前 - 
		（ffversion && ffversion <6）||
		// WebOS小于3
		（“palmGetResource”在窗口&& wkversion && wkversion <534）||
		// MeeGo
		（ua.indexOf（“MeeGo”）> -1 && ua.indexOf（“NokiaBrowser / 8.5.0”）> -1））{
		返回假
	}

	返回真
}

$ .extend（$ .support，{
	//注意，Chrome for iOS具有极其古怪的popstate实现。
	//我们已经选择了最短的路径来解决问题＃5426的错误修复
	//有关所选正则表达式的信息，请参阅以下链接
	// https://developers.google.com/chrome/mobile/docs/user-agent#chrome_for_ios_user-agent
	pushState：“pushState”在历史&&
		“replaceState”在历史&&
		//在FF iframe中运行时，调用replaceState会导致错误
		！（window.navigator.userAgent.indexOf（“Firefox”）> = 0 && window.top！== window）&&
		（window.navigator.userAgent.search（/ CriOS /）=== -1），

	mediaquery：$ .mobile.media（“only all”），
	cssPseudoElement：!! propExists（“content”），
	touchOverflow：!! propExists（“overflowScrolling”），
	cssTransform3d：transform3dTest（），
	boxShadow：!! propExists（“boxShadow”）&&！bb，
	fixedPosition：fixedPosition（），
	scrollTop：（“pageXOffset”在窗口中||
		document.documentElement中的“scrollTop”||
		fakeBody [0]中的“scrollTop”）&&！webos &&！operamini，

	dynamicBaseTag：baseTagTest（），
	cssPointerEvents：cssPointerEventsTest（），
	boundingRect：boundingRect（），
	inlineSVG：inlineSVG
}）;

fakeBody.remove（）;

// $ .mobile.ajaxBlacklist用于覆盖已知与哈希历史更新冲突的平台上的ajaxEnabled（BB5，Symbian）
//或一般工作更好浏览常规http的全页刷新（Opera Mini）
//注意：以下检测用作最后的手段。
//当所有其他更可靠/前瞻性的方法是不可能的时候，我们建议只使用这些检测方法
nokiaLTE7_3 =（function（）{

	var ua = window.navigator.userAgent;

	//以下是尝试将运行Symbian / s60的诺基亚浏览器与版本7.3或更高版本的Webkit进行匹配
	返回ua.indexOf（“Nokia”）> -1 &&
			（ua.indexOf（“Symbian / 3”）> -1 || ua.indexOf（“Series60 / 5”）> -1）&&
			ua.indexOf（“AppleWebKit”）> -1 &&
			ua.match（/(BrowserNG|NokiaBrowser)\/7\.[0-3]/）;
}）（）;

//支持必须满足的条件才能继续
//默认增强资格是媒体查询支持或IE 7+

$ .mobile.gradeA = function（）{
	return（（$ .support.mediaquery && $ .support.cssPseudoElement）|| $ .mobile.browser.oldIE && $ .mobile.browser.oldIE> = 8）&&（$ .support.boundingRect || $ .fn.jquery .match（/ 1 \。[0-7 +] \。[0-9 +]？/）！== null）;
};

$ .mobile.ajaxBlacklist =
			// BlackBerry浏览器，pre-webkit
			window.blackberry &&！window.WebKitPoint ||
			// Opera Mini
			操作||
			// Symbian webkits 7.3
			nokiaLTE7_3;

//最后，这个解决方法是我们迄今为止找到7.3之前Symbian Webkit设备的唯一方法
//在这个脚本引用之前渲染样式表，就像我们建议的那样。
//这简单地重新接受了CSS，由于某种原因使它适用
if（nokiaLTE7_3）{
	$（function（）{
		$（“head link [rel ='stylesheet']”）.attr（“rel”，“alternate stylesheet”）.attr（“rel”，“stylesheet”）;
	}）;
}

//通过css排除阴影
if（！$。support.boxShadow）{
	$（“html”）.addClass（“ui-noboxshadow”）;
}

}）（jQuery）;


（function（$，undefined）{
	var $ win = $ .mobile.window，self，
		dummyFnToInitNavigate = function（）{
		};

	$ .event.special.beforenavigate = {
		setup：function（）{
			$ win.on（“navigate”，dummyFnToInitNavigate）;
		}，

		拆分：function（）{
			$ win.off（“navigate”，dummyFnToInitNavigate）;
		}
	};

	$ .event.special.navigate = self = {
		绑定：假，

		pushStateEnabled：true，

		originalEventName：undefined，

		//如果存在pushstate支持并且定义了push状态支持
		//在移动命名空间上是正确的。
		isPushStateEnabled：function（）{
			返回$ .support.pushState &&
				$ .mobile.pushStateEnabled === true &&
				this.isHashChangeEnabled（）;
		}，

		// !! 假定移动命名空间存在
		isHashChangeEnabled：function（）{
			return $ .mobile.hashListeningEnabled === true;
		}，

		// TODO在popstate和hashchange之间有很多重复
		popstate：function（event）{
			var newEvent = new $ .Event（“navigate”），
				beforeNavigate = new $ .Event（“beforenavigate”），
				state = event.originalEvent.state || {};

			beforeNavigate.originalEvent = event;
			$ win.trigger（beforeNavigate）;

			if（beforeNavigate.isDefaultPrevented（））{
				返回;
			}

			if（event.historyState）{
				$ .extend（state，event.historyState）;
			}

			//确保原始事件被跟踪到最后
			//用户检查他们想做一些特别的事情
			newEvent.originalEvent = event;

			//注意，我们让当前的堆栈展开，因为任何分配
			// location.hash将停止世界并运行此事件处理程序。通过
			//这样做，我们在hash上创建一个类似的行为
			//作业
			setTimeout（function（）{
				$ win.trigger（newEvent，{
					状态：状态
				}）;
			}，0）;
		}，

		hashchange：function（event / *，data * /）{
			var newEvent = new $ .Event（“navigate”），
				beforeNavigate = new $ .Event（“beforenavigate”）;

			beforeNavigate.originalEvent = event;
			$ win.trigger（beforeNavigate）;

			if（beforeNavigate.isDefaultPrevented（））{
				返回;
			}

			//确保原始事件被跟踪到最后
			//用户检查他们想做一些特别的事情
			newEvent.originalEvent = event;

			//用用户提供的状态触发hashchange
			//改变了哈希
			$ win.trigger（newEvent，{
				//要完全规范化两个事件的用户
				//将需要对堆栈进行历史管理
				//在触发此绑定之前，将事件添加到事件中
				// TODO考虑允许显式添加回调
				//在此值设置为避免事件计时问题之前被触发
				state：event.hashchangeState || {}
			}）;
		}，

		// TODO我们真的只想设置一次
		//但是我不清楚是否有更好的实现方式
		//这与jQuery特殊的事件结构
		setup：function（/ * data，namespaces * /）{
			if（self.bound）{
				返回;
			}

			self.bound = true;

			if（self.isPushStateEnabled（））{
				self.originalEventName =“popstate”;
				$ win.bind（“popstate.navigate”，self.popstate）;
			} else if（self.isHashChangeEnabled（））{
				self.originalEventName =“hashchange”;
				$ win.bind（“hashchange.navigate”，self.hashchange）;
			}
		}
	};
}）（jQuery）;



（function（$，undefined）{
		var path，$ base，dialogHashKey =“＆ui-state = dialog”;

		$ .mobile.path = path = {
			uiStateKey：“＆ui-state”，

			//这个可怕的正则表达式解析绝对URL或其相对性
			//变体（协议，站点，文档，查询和哈希），进入各种
			//组件（协议，主机，路径，查询，片段等）组成
			// URL以及一些其他常用的子部分。与RegExp.exec（）一起使用时
			//或String.match，它将URL解析为一个结果数组，如下所示：
			//
			// [0]：http：// jblas：password@mycompany.com：8080 / mail / inbox？msg = 1234＆type = unread＃msg-content
			// [1]：http：// jblas：password@mycompany.com：8080 / mail / inbox？msg = 1234＆type =未读
			// [2]：http：// jblas：password@mycompany.com：8080 / mail / inbox
			// [3]：http：// jblas：password@mycompany.com：8080
			// [4]：http：
			// [5]：//
			// [6]：jblas：password@mycompany.com：8080
			// [7]：jblas：password
			// [8]：jblas
			// [9]：密码
			// [10]：mycompany.com:8080
			// [11]：mycompany.com
			// [12]：8080
			// [13]：/ mail / inbox
			// [14]：/ mail /
			// [15]：收件箱
			// [16]：？msg = 1234＆type = unread
			// [17]：＃msg-content
			//
			urlParseRE：/ ^ \ s *（（（[^：\ /＃\？] +：）？（？：（\ / \ /）（（？ ）））@）（（（：\：（+？[^ @ \ /＃\]）？[^？：\ /＃\ \] \ [] + | \ [[^ \ / \] ？@＃] + \]）（？：\：（[0-9] +））））））（（\ /（：？？？？？？？[^ \ / \＃] + \ / + ）*）（[^ \？＃] *）））？（\？[^＃] +）？）（＃。*）/？，

			//通过删除权限来解决xss（问题＃4787）的抽象
			//自动解码的浏览器。所有对location.href的引用应该是
			//替换为此方法的调用，以便在此处可以正确处理
			getLocation：function（url）{
				var parsedUrl = this.parseUrl（url || location.href），
					uri = url？parsedUrl：location，

					//确保解析哈希的url或location对象，因为使用
					// location.hash在firefox中自动解码，其余url应该是
					//对象（位置，除非我们正在测试），以避免包含
					//权限
					hash = parsedUrl.hash;

				//当哈希为空时，模拟浏览器为空字符串
				hash = hash ===“＃”？“”：哈希;

				返回uri.protocol +
					parsedUrl.doubleSlash +
					uri.host +

					//如果有协议，路径名必须以斜杠开头，因为您
					//不能有跟随相对路径的协议。另外，这是不可能的
					//如果绝对URL没有，则从相对的URL计算绝对URL
					//一个领先的“/”。
					（（uri.protocol！==“”&& uri.pathname.substring（0，1）！==“/”）？
						“/”：“”）+
					uri.pathname +
					uri.search +
					散列;
			}，

			//返回原始文档的URL
			getDocumentUrl：function（asParsedObject）{
				返回asParsedObject？$ .extend（{}，path.documentUrl）：path.documentUrl.href;
			}，

			parseLocation：function（）{
				return this.parseUrl（this.getLocation（））;
			}，

			//将URL解析为允许轻松访问的结构
			//所有的URL组件按名称。
			parseUrl：function（url）{
				//如果我们传递一个对象，我们假设它是
				//一个解析的url对象，只是将其返回给调用者。
				if（$ .type（url）===“object”）{
					返回url;
				}

				var matches = path.urlParseRE.exec（url ||“”）|| [];

					//创建允许调用者访问子匹配的对象
					// 按名字。请注意，IE返回一个空字符串而不是undefined，
					//像所有其他浏览器一样，所以我们规范化一切，使其一致
					//无论我们在运行什么浏览器。
					返回{
						href：matches [0] || “”
						hrefNoHash：matches [1] || “”
						hrefNoSearch：matches [2] || “”
						域：matches [3] || “”
						协议：matches [4] || “”
						doubleSlash：matches [5] || “”
						权威：匹配[6] || “”
						用户名：matches [8] || “”
						密码：matches [9] || “”
						主机：matches [10] || “”
						hostname：matches [11] || “”
						port：matches [12] || “”
						路径名：matches [13] || “”
						目录：matches [14] || “”
						filename：matches [15] || “”
						搜索：matches [16] || “”
						哈希：matches [17] || “”
					};
			}，

			//将relPath转换为asbolute路径。absPath是
			//一个可选的绝对路径，描述什么
			// relPath是相对于。
			makePathAbsolute：function（relPath，absPath）{
				var absStack，
					relStack，
					ID;

				if（relPath && relPath.charAt（0）===“/”）{
					return relPath;
				}

				relPath = relPath || “”;
				absPath = absPath absPath.replace（/ ^ \ / |（\ / [^ \ /] * | [^ \ /] +）$ / g，“”）：“”;

				absStack = absPath？absPath.split（“/”）：[];
				relStack = relPath.split（“/”）;

				for（i = 0; i <relStack.length; i ++）{
					d = relStack [i];
					开关（d）{
						案件 ”。”：
							打破;
						案件 ”..”：
							if（absStack.length）{
								absStack.pop（）;
							}
							打破;
						默认：
							absStack.push（d）;
							打破;
					}
				}
				return“/”+ absStack.join（“/”）;
			}，

			//如果两个网址具有相同的域，则返回true。
			isSameDomain：function（absUrl1，absUrl2）{
				return path.parseUrl（absUrl1）.domain.toLowerCase（）===
					path.parseUrl（absUrl2）.domain.toLowerCase（）;
			}，

			//为任何相对变体返回true。
			isRelativeUrl：function（url）{
				//所有相对的Url变体有一个共同点，没有协议。
				return path.parseUrl（url）.protocol ===“”;
			}，

			//为绝对URL返回true。
			isAbsoluteUrl：function（url）{
				return path.parseUrl（url）.protocol！==“”;
			}，

			//将指定的实时URL转换为绝对URL。这个功能
			//可以处理所有相对变体（协议，站点，文档，查询，片段）。
			makeUrlAbsolute：function（relUrl，absUrl）{
				if（！path.isRelativeUrl（relUrl））{
					返回relUrl;
				}

				if（absUrl === undefined）{
					absUrl = this.documentBase;
				}

				var relObj = path.parseUrl（relUrl），
					absObj = path.parseUrl（absUrl），
					protocol = relObj.protocol || absObj.protocol，
					doubleSlash = relObj.protocol？relObj.doubleSlash：（relObj.doubleSlash || absObj.doubleSlash），
					authority = relObj.authority || absObj.authority，
					hasPath = relObj.pathname！==“”，
					pathname = path.makePathAbsolute（relObj.pathname || absObj.filename，absObj.pathname），
					search = relObj.search || （！hasPath && absObj.search）|| “”
					hash = relObj.hash;

				return protocol + doubleSlash + authority + pathname + search + hash;
			}，

			//将搜索（也称查询）参数添加到指定的URL。
			addSearchParams：function（url，params）{
				var u = path.parseUrl（url），
					p =（typeof params ===“object”）？$ .param（params）：params，
					s = u.search || “？”;
				return u.hrefNoSearch + s +（s.charAt（s.length  -  1）！==“？”？“＆”：“”）+ p +（u.hash ||“”）;
			}，

			convertUrlToDataUrl：function（absUrl）{
				var result = absUrl，
					u = path.parseUrl（absUrl）;

				if（path.isEmbeddedPage（u））{
					//对于嵌入式页面，删除对话框哈希键，如在getFilePath（）中，
					//并删除否则数据网址将不匹配嵌入页面的ID。
					result = u.hash
						.split（dialogHashKey）[0]
						.replace（/ ^＃/，“”）
						.replace（/\?.*$/，“”）;
				} else if（path.isSameDomain（u，this.documentBase））{
					result = u.hrefNoHash.replace（this.documentBase.domain，“”）.split（dialogHashKey）[0];
				}

				return window.decodeURIComponent（result）;
			}，

			//从当前哈希或文件路径获取路径
			get：function（newPath）{
				if（newPath === undefined）{
					newPath = path.parseLocation（）。hash;
				}
				return path.stripHash（newPath）.replace（/[^\/]*\.[^\/*]+$/，“”）;
			}，

			//将位置哈希设置为路径
			set：function（path）{
				location.hash = path;
			}，

			//测试一个给定的url（string）是否是一个路径
			//注意可能是非常幼稚的
			isPath：function（url）{
				return（/ \ //）.test（url）;
			}，

			//返回一个url路径，同时删除窗口的位置protocol / hostname / pathname
			clean：function（url）{
				return url.replace（this.documentBase.domain，“”）;
			}，

			//只返回没有初始＃
			stripHash：function（url）{
				return url.replace（/ ^＃/，“”）;
			}，

			stripQueryParams：function（url）{
				return url.replace（/\?.*$/，“”）;
			}，

			//删除前面的哈希，任何查询参数和对话框符号
			cleanHash：function（hash）{
				return path.stripHash（hash.replace（/\?.*$/，“”）.replace（dialogHashKey，“”））;
			}，

			isHashValid：function（hash）{
				return（/ ^＃[^＃] + $ /）.test（hash）;
			}，

			//检查一个网址是引用相同的域，还是外部域或不同的协议
			//可以是mailto等
			isExternal：function（url）{
				var u = path.parseUrl（url）;

				return !!（u.protocol &&
					（u.domain.toLowerCase（）！== this.documentUrl.domain.toLowerCase（）））;
			}，

			hasProtocol：function（url）{
				return（/ ^（：？\ w +：）/）.test（url）;
			}，

			isEmbeddedPage：function（url）{
				var u = path.parseUrl（url）;

				//如果路径是绝对的，那么我们需要比较url对
				// this.documentUrl和documentBase。这个的主要原因
				//是嵌入在外部文件中的链接将引用
				//应用程序文档，而嵌入在应用程序中的链接
				//文档将根据文档基础解决。
				if（u.protocol！==“”）{
					return（！this.isPath（u.hash）&& u.hash &&（u.hrefNoHash === this.documentUrl.hrefNoHash ||（this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash）））;
				}
				return（/ ^＃/）.test（u.href）;
			}，

			squash：function（url，resolutionUrl）{
				var href，cleaningUrl，search，stateIndex，docUrl，
					isPath = this.isPath（url），
					uri = this.parseUrl（url），
					savedHash = uri.hash，
					uiState =“”;

				//产生一个可以解决提供的路径的url
				if（！resolutionUrl）{
					if（isPath）{
						resolutionUrl = path.getLocation（）;
					} else {
						docUrl = path.getDocumentUrl（true）;
						if（path.isPath（docUrl.hash））{
							resolutionUrl = path.squash（docUrl.href）;
						} else {
							resolutionUrl = docUrl.href;
						}
					}
				}

				//如果url是一个简单的字符串，除去任何以前的哈希
				// eg＃foo / bar  - > foo / bar
				// #foo  - > #foo
				cleanUrl = isPath？path.stripHash（url）：url;

				//如果URL是具有哈希检查的完整URL，如果解析的哈希是一个路径
				//如果是，则删除＃，否则继续使用，否则会更改
				cleaningUrl = path.isPath（uri.hash）？path.stripHash（uri.hash）：cleaningUrl;

				//将UI状态键拆分为href
				stateIndex = cleaningUrl.indexOf（this.uiStateKey）;

				//存储ui状态键以供使用
				if（stateIndex> -1）{
					uiState = cleaningUrl.slice（stateIndex）;
					cleanUrl = cleaningUrl.slice（0，stateIndex）;
				}

				//将cleanUrl相对于解析网址设置为absolute
				href = path.makeUrlAbsolute（cleaningUrl，resolutionUrl）;

				//从解析之后抓取已解析的URL的搜索
				//传递的URL可能不会产生正确的结果
				search = this.parseUrl（href）.search;

				// TODO所有这些垃圾是可怕的，清理干净
				if（isPath）{
					//拒绝哈希，如果它是一个路径，或者它只是一个对话键
					if（path.isPath（preserHash）|| preserHash.replace（“＃”，“”）.indexOf（this.uiStateKey）=== 0）{
						preserveHash =“”;
					}

					//附加UI状态键存在的位置，并将其删除
					//从url
					if（uiState && savedHash.indexOf（this.uiStateKey）=== -1）{
						preserveHash + = uiState;
					}

					//确保磅在哈希的前面
					if（preserveHash.indexOf（“＃”）=== -1 && savedHash！==“”）{
						preserveHash =“＃”+ storedHash;
					}

					//用新的搜索字符串和哈希重建每个片段
					href = path.parseUrl（href）;
					href = href.protocol + href.doubleSlash + href.host + href.pathname + search +
						preservedHash;
				} else {
					href + = href.indexOf（“＃”）> -1？uiState：“＃”+ uiState;
				}

				返回href;
			}，

			isPreservableHash：function（hash）{
				return hash.replace（“＃”，“”）.indexOf（this.uiStateKey）=== 0;
			}，

			//如果要将其用作选择器，则可以将哈希中的奇怪字符转义
			hashToSelector：function（hash）{
				var hasHash =（hash.substring（0，1）===“＃”）;
				if（hasHash）{
					hash = hash.substring（1）;
				}
				return（hasHash？“＃”：“”）+ hash.replace（/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~] ）/ g，“\\ $ 1”）;
			}，

			//在对话框HashKey之前返回一个文件路径的子串，用于制作服务器
			//请求
			getFilePath：function（path）{
				返回路径&& path.split（dialogHashKey）[0];
			}，

			//检查指定的url是否指主要的第一页
			//应用文档。
			isFirstPageUrl：function（url）{
				//我们只处理绝对路径。
				var u = path.parseUrl（path.makeUrlAbsolute（url，this.documentBase）），

					//该URL与文档具有相同的路径？
					samePath = u.hrefNoHash === this.documentUrl.hrefNoHash ||
						（this.documentBaseDiffers &&
							u.hrefNoHash === this.documentBase.hrefNoHash），

					//获取第一页元素。
					fp = $ .mobile.firstPage，

					//获取第一个页面元素的id，如果它有一个。
					fpId = fp && fp [0]？fp [0] .id：undefined;

				//如果路径与文档匹配，则url指的是第一页
				//它没有哈希值，或者哈希完全等于id
				//的第一页元素。
				return samePath &&
					（！u.hash ||
						u.hash ===“＃”||
						（fpId && u.hash.replace（/ ^＃/，“”）=== fpId））;
			}，

			//一些嵌入式浏览器，如Phone Gap中的Web视图，允许
			//跨域XHR请求，如果执行请求的文档被加载
			//通过file：//协议。这通常是允许应用程序
			//“phone home”并获取应用程序的具体数据。我们通常会让浏览器
			//处理外部/跨域网址，但如果allowCrossDomainPages
			//选项是真的，我们将允许跨域http / https请求去
			//通过我们的页面加载逻辑。
			isPermittedCrossDomainRequest：function（docUrl，reqUrl）{
				return $ .mobile.allowCrossDomainPages &&
					（docUrl.protocol ===“file：”|| docUrl.protocol ===“content：”）&&
					reqUrl.search（/ ^ https？：/）！== -1;
			}
		};

		path.documentUrl = path.parseLocation（）;

		$ base = $（“head”）.find（“base”）;

		path.documentBase = $ base.length？
			path.parseUrl（path.makeUrlAbsolute（$ base.attr（“href”），path.documentUrl.href））：
			path.documentUrl;

		path.documentBaseDiffers =（path.documentUrl.hrefNoHash！== path.documentBase.hrefNoHash）;

		//返回原始文档的基本URL
		path.getDocumentBase = function（asParsedObject）{
			返回asParsedObject？$ .extend（{}，path.documentBase）：path.documentBase.href;
		};

		// DEPRECATED as as 1.4.0  -  remove in 1.5.0
		$ .extend（$ .mobile，{

			//返回原始文档的URL
			getDocumentUrl：path.getDocumentUrl，

			//返回原始文档的基本URL
			getDocumentBase：path.getDocumentBase
		}）;
}）（jQuery）;



（function（$，undefined）{
	$ .mobile.History = function（stack，index）{
		this.stack = stack || [];
		this.activeIndex = index || 0;
	};

	$ .extend（$。mobile.History.prototype，{
		getActive：function（）{
			return this.stack [this.activeIndex];
		}，

		getLast：function（）{
			return this.stack [this.previousIndex];
		}，

		getNext：function（）{
			return this.stack [this.activeIndex + 1];
		}，

		getPrev：function（）{
			return this.stack [this.activeIndex  -  1];
		}，

		//添加新页面时使用addNew
		add：function（url，data）{
			data = data || {};

			//如果有前进的历史，擦拭它
			if（this.getNext（））{
				this.clearForward（）;
			}

			//如果哈希包含在数据中，请确保形状
			//是一致的比较
			if（data.hash && data.hash.indexOf（“＃”）=== -1）{
				data.hash =“＃”+ data.hash;
			}

			data.url = url;
			this.stack.push（data）;
			this.activeIndex = this.stack.length  -  1;
		}，

		//擦除主动索引之前的网址
		clearForward：function（）{
			this.stack = this.stack.slice（0，this.activeIndex + 1）;
		}，

		find：function（url，stack，earlyReturn）{
			stack = stack || this.stack;

			var entry，i，length = stack.length，index;

			for（i = 0; i <length; i ++）{
				entry = stack [i];

				if（decodeURIComponent（url）=== decodeURIComponent（entry.url）||
					decodeURIComponent（url）=== decodeURIComponent（entry.hash））{
					index = i;

					if（earlyReturn）{
						回报指数;
					}
				}
			}

			回报指数;
		}，

		最近的：function（url）{
			var最近，a = this.activeIndex;

			//首先，在当前索引前搜索历史堆栈的片段并进行搜索
			//为网址匹配 如果找到的话，我们会避免避免通过前进的历史
			//注意反向历史运动的偏好是由以下事实所驱动的
			//大多数移动浏览器只有一个专用的后退按钮，用户很少使用
			//桌面浏览器中的向前按钮无论如何
			nearest = this.find（url，this.stack.slice（0，a））;

			//如果在向后历史记录中没有发现，请向前看。“真”
			//作为第三个参数传递的值导致find方法中断
			//在前进历史片段中的第一场比赛。起始指数
			然后必须将//的片段添加到结果中以获取元素索引
			//在原始历史堆栈:( :(
			//
			// TODO这是超级混乱，应该清理（呃这么糟糕）
			if（nearest === undefined）{
				nearest = this.find（url，this.stack.slice（a），true）;
				最近=最接近===未定义？最接近：最近+ a;
			}

			返回最近
		}，

		direct：function（opts）{
			var newActiveIndex = this.closest（opts.url），a = this.activeIndex;

			//保存新页面索引，null检查以防止falsey 0结果
			//记录上一个索引以供参考
			if（newActiveIndex！== undefined）{
				this.activeIndex = newActiveIndex;
				this.previousIndex = a;
			}

			//在适当的时候调用回调函数
			//
			// TODO这也很复杂和混乱
			if（newActiveIndex <a）{
				（opts.present || opts.back || $ .noop）（this.getActive（），“back”）;
			} else if（newActiveIndex> a）{
				（opts.present || opts.forward || $ .noop）（this.getActive（），“forward”）;
			} else if（newActiveIndex === undefined && opts.missing）{
				opts.missing（this.getActive（））;
			}
		}
	}）;
}）（jQuery）;



（function（$，undefined）{
	var path = $ .mobile.path，
		initialHref = location.href;

	$ .mobile.Navigator = function（history）{
		这个历史=历史
		this.ignoreInitialHashChange = true;

		$ .mobile.window.bind（{
			“popstate.history”：$ .proxy（this.popstate，this），
			“hashchange.history”：$ .proxy（this.hashchange，this）
		}）;
	};

	$ .extend（$。mobile.Navigator.prototype，{
		squash：function（url，data）{
			var state，href，hash = path.isPath（url）？path.stripHash（url）：url;

			href = path.squash（url）;

			//确保在没有明确设置的情况下提供此信息
			//传递给squash方法的数据对象
			state = $ .extend（{
				哈希：哈希，
				url：href
			}，数据）;

			//用新的href替换当前url并存储状态
			//请注意，在某些情况下，我们可能会替换一个url
			// same url。我们这样做是因为我们需要确保
			//我们所有的历史记录条目都有与之关联的状态对象
			//他们 这允许我们解决$ .mobile.back（）
			//调用从外部页面转换到嵌入页面。
			//在这种特殊情况下，浏览器生成的hashchange事件是* NOT *。
			//确保每个历史记录条目都有一个状态对象意味着onPopState（）
			//即使在一个hashchange事件时也会始终触发我们的hashchange回调
			//未触发
			window.history.replaceState（state，state.title || document.title，href）;

			返回状态
		}，

		hash：function（url，href）{
			var parsed，loc，hash，resolved;

			//抓住哈希记录。如果传递的url是路径
			//我们使用被压缩的url的解析版本重建，
			//否则我们假设它是一个哈希并直接存储
			parsed = path.parseUrl（url）;
			loc = path.parseLocation（）;

			if（loc.pathname + loc.search === parsed.pathname + parsed.search）{
				//如果传递的URL的路径名和搜索与当前的loc相同
				//那我们必须使用哈希。否则将不会有事件
				// eg，url =“/ foo / bar？baz＃bang”，location.href =“http://example.com/foo/bar?baz”
				hash = parsed.hash？parsed.hash：parsed.pathname + parsed.search;
			} else if（path.isPath（url））{
				resolved = path.parseUrl（href）;
				//如果传递的url是一个路径，使其成为相关的域，并删除任何尾随的哈希
				hash = resolved.pathname + resolved.search +（path.isPreservableHash（resolved.hash）？resolved.hash.replace（“＃”，“”）：“”）;
			} else {
				hash = url;
			}

			返回哈希;
		}，

		// TODO重新考虑名称
		go：function（url，data，noEvents）{
			var state，href，hash，popstateEvent，
				isPopStateEvent = $ .event.special.navigate.isPushStateEnabled（）;

			//获取url，因为它看起来会挤压到当前的解析网址
			href = path.squash（url）;

			//弄清楚这个哈希是不是从url
			hash = this.hash（url，href）;

			//这里我们阻止下一个哈希更改或popstate事件执行任何操作
			//历史管理。在hashchange的情况下，我们不会吞咽它
			//如果不会发生hashchange（因为不会重置该值）
			//并将吞下以下hashchange
			if（noEvents && hash！== path.stripHash（path.parseLocation（）。hash））{
				this.preventNextHashChange = noEvents;
			}

			//在支持popstate的情况下重要的是事件将被触发
			//直接，停止进一步的执行 - 即中介这个流程
			//这个表达式的方法调用fire绑定。在导航方式下面
			//有一个绑定来捕获此事件并停止其传播。
			//
			//然后我们在具有空状态的窗口上触发一个新的popstate事件
			//使得导航事件可以正确地完成他们的工作
			//
			//如果url是我们要保留可用的查询参数的路径
			//当前的url。
			this.preventHashAssignPopState = true;
			window.location.hash = hash;

			//如果启用popstate，并且浏览器在哈希时触发“popstate”事件
			//设置（这通常在像Chrome这样的浏览器中立即发生），然后
			//此标志已被设置为false。如果它是不触发的浏览器
			//一个“popstate”在哈希分配或“replaceState”，那么我们需要避免分支
			//吞下由散列分配生成的popstate创建的事件
			//在撰写本文时，会发生这种情况与Opera 12和某些版本的IE
			this.preventHashAssignPopState = false;

			state = $ .extend（{
				url：href，
				哈希：哈希，
				标题：document.title
			}，数据）;

			if（isPopStateEvent）{
				popstateEvent = new $ .Event（“popstate”）;
				popstateEvent.originalEvent = {
					类型：“popstate”，
					state：null
				};

				this.squash（url，state）;

				//触发一个新的人造popstate事件来替换我们的
				//抓到是由上面的哈希设置触发的。
				if（！noEvents）{
					this.ignorePopState = true;
					$ .mobile.window.trigger（popstateEvent）;
				}
			}

			//记录历史记录条目，以便可以包含该信息
			//在hashchange事件中以类似的方式驱动导航事件
			//由popstate提供的状态
			this.history.add（state.url，state）;
		}，

		//此绑定旨在捕获被触发的popstate事件
		//当$ .navigate`方法的执行停止在window.location.hash = url;
		//并完全阻止它们传播。那么这个popstate事件就是这样
		//执行恢复后重新触发
		//
		// TODO在这里抓住原来的事件，并将其用于合成事件
		//这个绑定后面的导航执行的下半部分
		popstate：function（event）{
			var hash，state;

			//部分支持我们的测试套件，手工更改支持
			//测试hashchange的值。部分地防止周围的怪异
			if（！$。event.special.navigate.isPushStateEnabled（））{
				返回;
			}

			//如果这是由哈希的实际改变触发的popstate
			//完全防止它 历史将被手动跟踪
			if（this.preventHashAssignPopState）{
				this.preventHashAssignPopState = false;
				event.stopImmediatePropagation（）;
				返回;
			}

			//如果这是在“replaceState”调用后触发的popstate
			//方法，然后简单地忽略它。历史记录条目已被捕获
			if（this.ignorePopState）{
				this.ignorePopState = false;
				返回;
			}

			//如果没有状态，并且历史堆栈长度是一个
			//可能让Chrome浏览器触发了页面加载popstate
			//避免它，并将一次性标记设置为false。
			// TODO：我们真的需要所有这些条件吗？比较位置hrefs
			//应该够了
			if（！event.originalEvent.state &&
				this.history.stack.length === 1 &&
				this.ignoreInitialHashChange）{
				this.ignoreInitialHashChange = false;

				if（location.href === initialHref）{
					event.preventDefault（）;
					返回;
				}
			}

			//直接操纵哈希表。那就是我们会收到一个流行歌舞
			//当哈希通过赋值改变，并且它不会有一个状态关联。我们
			//然后需要压缩哈希。请参阅下面的处理散列分配
			//匹配现有的历史记录条目
			// TODO可能更好地只添加到历史堆栈
			//当哈希与活动历史记录条目相邻时
			hash = path.parseLocation（）。hash;
			if（！event.originalEvent.state && hash）{
				//用replaceState压缩在URL上分配的哈希
				//还可以获取生成的状态对象进行存储
				state = this.squash（hash）;

				//将新哈希记录为附加历史记录条目
				//匹配浏览器的哈希分配处理
				this.history.add（state.url，state）;

				//传递新创建的状态信息
				//与事件一起
				event.historyState = state;

				//不要改变历史记录，我们添加了一个新的历史记录条目
				//所以我们知道我们在哪里
				返回;
			}

			//如果其他所有的失败都是来自后退或前进按钮的popstate
			//确保正确设置我们的历史堆栈的状态，并记录方向性
			this.history.direct（{
				url：（event.originalEvent.state || {}）。url || 哈希，

				//当URL是向前或向后的历史包括条目
				//作为用于在导航事件中合并为数据的事件对象的数据
				present：function（historyEntry，direction）{
					//确保创建一个新对象作为导航事件数据传递下来
					event.historyState = $ .extend（{}，historyEntry）;
					event.historyState.direction = direction;
				}
			}）;
		}，

		//注意必须绑定之前`navigate`特殊事件hashchange绑定否则
		//导航数据不会及时附加到hashchange事件中
		//绑定将其附加到`navigate`特殊事件
		// TODO在这里添加一个检查，“hashchange.navigate”已经绑定了，否则就是这样
		//破（异常？）
		hashchange：function（event）{
			var history，hash;

			//如果显式地禁用了hashchange侦听或支持pushstate
			//避免使用hashchange处理程序。
			if（！$。event.special.navigate.isHashChangeEnabled（）||
				$ .event.special.navigate.isPushStateEnabled（））{
				返回;
			}

			//有时明确地想要阻止下一个哈希来传播，因为我们只是
			//在这里改变url来表示新的状态
			if（this.preventNextHashChange）{
				this.preventNextHashChange = false;
				event.stopImmediatePropagation（）;
				返回;
			}

			历史= this.history;
			hash = path.parseLocation（）。hash;

			//如果这是由后退或前进按钮引起的哈希更改
			//确保正确设置我们的历史堆栈的状态
			this.history.direct（{
				url：哈希，

				//当URL是向前或向后的历史包括条目
				//作为用于在导航事件中合并为数据的事件对象的数据
				present：function（historyEntry，direction）{
					//确保创建一个新对象作为导航事件数据传递下来
					event.hashchangeState = $ .extend（{}，historyEntry）;
					event.hashchangeState.direction = direction;
				}，

				//当我们没有在我们的历史中找到一个哈希清楚，我们的目标是去那里
				//将条目记录为将来遍历的新条目
				//
				//注意，这是不正确的事情，因为我们是不完全清楚的
				//不知道用户的意图。最好明确地说_not_
				//支持location.hash分配优先于$ .navigate调用
				// TODO首先加入应该是href，但它会导致识别问题
				//嵌入页面
				缺少：function（）{
					history.add（hash，{
						哈希：哈希，
						标题：document.title
					}）;
				}
			}）;
		}
	}）;
}）（jQuery）;



（function（$，undefined）{
	// TODO考虑排队导航活动，直到之前的活动完成
	//所以最终用户不必考虑它。现在打乒乓球
	// 去做 ！！将事件绑定移动到导航事件的回调
	$ .mobile.navigate = function（url，data，noEvents）{
		$ .mobile.navigate.navigator.go（url，data，noEvents）;
	};

	//在导航方法中公开历史，以期全面整合
	//现有的导航功能与历史信息紧密耦合
	$ .mobile.navigate.history = new $ .mobile.History（）;

	//实例化导航器的实例，以便在$ .navigate方法中使用
	$ .mobile.navigate.navigator = new $ .mobile.Navigator（$ .mobile.navigate.history）;

	var loc = $ .mobile.path.parseLocation（）;
	$ .mobile.navigate.history.add（loc.href，{hash：loc.hash}）;
}）（jQuery）;


（function（$，undefined）{
	var props = {
			“动画”： {}，
			“过渡”： {}
		}，
		testElement = document.createElement（“a”），
		vendorPrefixes = [“”，“webkit-”，“moz-”，“o-”];

	$ .each（[“animation”，“transition”]，function（i，test）{

		//获取正确的测试名称
		var testName =（i === 0）？test +“ - ”+“name”：test;

		$ .each（vendorPrefixes，function（j，prefix）{
			if（testElement.style [$ .camelCase（prefix + testName）]！== undefined）{
				 props [test] [“prefix”] =前缀;
				返回假
			}
		}）;

		//设置事件和持续时间名称供以后使用
		道具[测试] [“持续时间”] =
			$ .camelCase（props [test] [“prefix”] + test +“ - ”+“duration”）;
		道具[test] [“event”] =
			$ .camelCase（props [test] [“prefix”] + test +“ - ”+“end”）;

		//所有小写如果不是供应商支持
		if（props [test] [“prefix”] ===“”）{
			props [test] [“event”] = props [test] [“event”] .toLowerCase（）;
		}
	}）;

	//如果找到一个有效的前缀，那么浏览器就会支持它
	$ .support.cssTransitions =（props [“transition”] [“prefix”]！== undefined）;
	$ .support.cssAnimations =（props [“animation”] [“prefix”]！== undefined）;

	//删除testElement
	$（testElement）.remove（）;

	//动画完成回调
	$ .fn.animationComplete = function（callback，type，fallbackTime）{
		var定时器，持续时间，
			那就是这个，
			eventBinding = function（）{

				//清除定时器，所以我们不会调用回调两次
				clearTimeout（定时器）;
				callback.apply（this，arguments）;
			}，
			animationType =（！type || type ===“animation”）？“动画”：“过渡”;

		//确保浏览器支持选择的类型
		if（（$ .support.cssTransitions && animationType ===“transition”）||
			（$ .support.cssAnimations && animationType ===“animation”））{

			//如果没有通过设置回退时间
			if（fallbackTime === undefined）{

				//确保在检查.css之前未绑定到文档
				if（$（this）.context！== document）{

					//解析durration，因为它的第二个倍数为1000毫秒
					//乘以3，确保给动画充足的时间。
					duration = parseFloat（
						$（this）.css（props [animationType] .duration）
					）* 3000;
				}

				//如果我们无法读取持续时间使用默认值
				if（duration === 0 || duration === undefined || isNaN（duration））{
					duration = $ .fn.animationComplete.defaultDuration;
				}
			}

			//如果事件没有到来，设置回退
			timer = setTimeout（function（）{
				$（that）.off（props [animationType] .event，eventBinding）;
				callback.apply（that）;
			}，持续时间）;

			//绑定事件
			return $（this）.one（props [animationType] .event，eventBinding）;
		} else {

			//不支持CSS动画/转换
			//延迟执行webkit /非webkit之间的一致性
			setTimeout（$ .proxy（callback，this），0）;
			返回$（this）;
		}
	};

	//允许在mobileInit上配置默认回调
	$ .fn.animationComplete.defaultDuration = 1000;
}）（jQuery）;

//这个插件是一个抽象的触摸和鼠标的实验
//事件，使开发人员不用担心输入的方法
//设备的文档加载在支持上。
//
//这里的想法是允许开发人员注册听众
//基本的鼠标事件，如mousedown，mousemove，mouseup，然后单击，
//并且插件将注意注册正确的监听器
//幕后调用监听器在最快的时间
//对于该设备，同时仍保留事件触发的顺序
//传统的鼠标环境，应该注册多个处理程序
//针对不同事件的相同元素。
//
//当前版本将以下虚拟事件公开给jQuery绑定方法：
//“vmouseover vmousedown vmousemove vmouseup vclous vmouseout vmousecancel”

（function（$，window，document，undefined）{

var dataPropertyName =“virtualMouseBindings”，
	touchTargetPropertyName =“virtualTouchID”，
	virtualEventNames =“vmouseover vmousedown vmousemove vmouseup vclus vmouseout vmousecancel”.split（“”），
	touchEventProps =“clientX clientY pageX pageY screenX screenY”.split（“”），
	mouseHookProps = $ .event.mouseHooks？$ .event.mouseHooks.props：[]，
	mouseEventProps = $ .event.props.concat（mouseHookProps），
	activeDocHandlers = {}，
	resetTimerID = 0，
	startX = 0，
	startY = 0，
	didScroll = false，
	clickBlockList = []
	blockMouseTriggers = false，
	blockTouchTriggers = false，
	eventCaptureSupported =“addEventListener”在文档中，
	$ document = $（document），
	nextTouchID = 1，
	lastTouchID = 0，阈值，
	一世;

$ .vmouse = {
	moveDistanceThreshold：10，
	clickDistanceThreshold：10，
	resetTimerDuration：1500
};

function getNativeEvent（event）{

	while（event && typeof event.originalEvent！==“undefined”）{
		event = event.originalEvent;
	}
	返回事件
}

function createVirtualEvent（event，eventType）{

	var t = event.type，
		oe，道具，ne，prop，ct，touch，i，j，len;

	event = $ .Event（event）;
	event.type = eventType;

	oe = event.originalEvent;
	props = $ .event.props;

	//将$ .event.props的分隔到$ .event.mouseHook.props和Issue 3280中
	// https://github.com/jquery/jquery-mobile/issues/3280
	if（t.search（/ ^（mouse | click）/）> -1）{
		props = mouseEventProps;
	}

	//将原始事件属性复制到新事件
	//如果我们可以调用$ .event.fix而不是$ .Event，这将会发生
	//但是我们没有办法强制多次修复事件
	if（oe）{
		for（i = props.length，prop; i;）{
			prop =道具[--i];
			事件[prop] = oe [prop];
		}
	}

	//确保如果鼠标和点击虚拟事件被生成
	//没有一个定义
	if（t.search（/ mouse（down | up）| click /）> -1 &&！event.which）{
		event.which = 1;
	}

	if（t.search（/ ^ touch /）！== -1）{
		ne = getNativeEvent（oe）;
		t = ne.touches;
		ct = ne.changedTouches;
		touch =（t && t.length）？t [0]：（（ct && ct.length）？ct [0]：undefined）;

		如果（触摸）{
			for（j = 0，len = touchEventProps.length; j <len; j ++）{
				prop = touchEventProps [j];
				事件[prop] = touch [prop];
			}
		}
	}

	返回事件
}

function getVirtualBindingFlags（element）{

	var flags = {}，
		b，k;

	while（element）{

		b = $ .data（element，dataPropertyName）;

		for（k in b）{
			if（b [k]）{
				flags [k] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	返回标志
}

function getClosestElementWithVirtualBinding（element，eventType）{
	var b
	while（element）{

		b = $ .data（element，dataPropertyName）;

		if（b &&（！eventType || b [eventType]））{
			返回元素
		}
		element = element.parentNode;
	}
	返回null;
}

function enableTouchBindings（）{
	blockTouchTriggers = false;
}

function disableTouchBindings（）{
	blockTouchTriggers = true;
}

function enableMouseBindings（）{
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	//当启用鼠标绑定时，我们的
	//触摸绑定被禁用。
	disableTouchBindings（）;
}

function disableMouseBindings（）{
	//当鼠标绑定被禁用时，我们的
	//触摸绑定已启用。
	enableTouchBindings（）;
}

function startResetTimer（）{
	clearResetTimer（）;
	resetTimerID = setTimeout（function（）{
		resetTimerID = 0;
		enableMouseBindings（）;
	}，$ .vmouse.resetTimerDuration）;
}

function clearResetTimer（）{
	if（resetTimerID）{
		clearTimeout（resetTimerID）;
		resetTimerID = 0;
	}
}

function triggerVirtualEvent（eventType，event，flags）{
	变量

	if（（flags && flags [eventType]）||
				（！flags && getClosestElementWithVirtualBinding（event.target，eventType）））{

		ve = createVirtualEvent（event，eventType）;

		$（event.target）.trigger（ve）;
	}

	返回
}

函数mouseEventCallback（event）{
	var touchID = $ .data（event.target，touchTargetPropertyName），
		五个;

	if（！blockMouseTriggers &&（！lastTouchID || lastTouchID！== touchID））{
		ve = triggerVirtualEvent（“v”+ event.type，event）;
		if（ve）{
			如果（ve.isDefaultPrevented（））{
				event.preventDefault（）;
			}
			if（ve.isPropagationStopped（））{
				event.stopPropagation（）;
			}
			if（ve.isImmediatePropagationStopped（））{
				event.stopImmediatePropagation（）;
			}
		}
	}
}

函数handleTouchStart（event）{

	var touches = getNativeEvent（event）.touches，
		目标，旗帜，t;

	if（touches && touches.length === 1）{

		target = event.target;
		flags = getVirtualBindingFlags（target）;

		if（flags.hasVirtualBinding）{

			lastTouchID = nextTouchID ++;
			$ .data（target，touchTargetPropertyName，lastTouchID）;

			clearResetTimer（）;

			disableMouseBindings（）;
			didScroll = false;

			t = getNativeEvent（event）.touches [0];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent（“vmouseover”，event，flags）;
			triggerVirtualEvent（“vmousedown”，event，flags）;
		}
	}
}

function handleScroll（event）{
	if（blockTouchTriggers）{
		返回;
	}

	if（！didScroll）{
		triggerVirtualEvent（“vmousecancel”，event，getVirtualBindingFlags（event.target））;
	}

	didScroll = true;
	startResetTimer（）;
}

function handleTouchMove（event）{
	if（blockTouchTriggers）{
		返回;
	}

	var t = getNativeEvent（event）.touches [0]，
		didCancel = didScroll，
		moveThreshold = $ .vmouse.moveDistanceThreshold，
		flags = getVirtualBindingFlags（event.target）

		didScroll = didScroll ||
			（Math.abs（t.pageX  -  startX）> moveThreshold ||
				Math.abs（t.pageY  -  startY）> moveThreshold）;

	if（didScroll &&！didCancel）{
		triggerVirtualEvent（“vmousecancel”，event，flags）;
	}

	triggerVirtualEvent（“vmousemove”，event，flags）;
	startResetTimer（）;
}

function handleTouchEnd（event）{
	if（blockTouchTriggers）{
		返回;
	}

	disableTouchBindings（）;

	var flags = getVirtualBindingFlags（event.target），
		ve，t
	triggerVirtualEvent（“vmouseup”，event，flags）;

	if（！didScroll）{
		ve = triggerVirtualEvent（“vclick”，event，flags）;
		if（ve && ve.isDefaultPrevented（））{
			//跟随touchend的鼠标事件的目标
			//事件不一定匹配在此期间使用的目标
			//触摸 这意味着我们需要依靠坐标来阻止
			//生成的任何点击。
			t = getNativeEvent（event）.changedTouches [0];
			clickBlockList.push（{
				touchID：lastTouchID，
				x：t.clientX，
				y：t.clientY
			}）;

			//防止触发后的任何鼠标事件
			//虚拟事件通知。
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent（“vmouseout”，event，flags）;
	didScroll = false;

	startResetTimer（）;
}

函数hasVirtualBindings（ele）{
	var bindings = $ .data（ele，dataPropertyName），
		K表;

	if（bindings）{
		for（k in bindings）{
			if（bindings [k]）{
				返回真
			}
		}
	}
	返回假
}

function dummyMouseHandler（）{}

function getSpecialEventObject（eventType）{
	var realType = eventType.substr（1）;

	返回{
		setup：function（/ * data，namespace * /）{
			//如果这是该元素的第一个虚拟鼠标绑定，
			//将绑定对象添加到其数据。

			if（！hasVirtualBindings（this））{
				$ .data（this，dataPropertyName，{}）;
			}

			//如果调用setup，我们知道这是第一个绑定
			// eventType，因此将eventType的计数初始化为零。
			var bindings = $ .data（this，dataPropertyName）;
			bindings [eventType] = true;

			//如果这是此类型的第一个虚拟鼠标事件，
			//在文档上注册一个全局处理程序。

			activeDocHandlers [eventType] =（activeDocHandlers [eventType] || 0）+ 1;

			if（activeDocHandlers [eventType] === 1）{
				$ document.bind（realType，mouseEventCallback）;
			}

			//某些浏览器，如Opera Mini，不会调度鼠标/点击事件
			//对于元素，除非他们实际上在其上注册了处理程序。
			//为了解决这个问题，我们在元素上注册了虚拟处理程序。

			$（this）.bind（realType，dummyMouseHandler）;

			//现在，如果不支持事件捕获，我们依靠鼠标处理程序。
			if（eventCaptureSupported）{
				//如果这是文档的第一个虚拟鼠标绑定，
				//在文档上注册我们的touchstart处理程序。

				activeDocHandlers [“touchstart”] =（activeDocHandlers [“touchstart”] || 0）+ 1;

				if（activeDocHandlers [“touchstart”] === 1）{
					$ document.bind（“touchstart”，handleTouchStart）
						.bind（“touchend”，handleTouchEnd）

						//在触摸平台上，触摸屏幕，然后拖动手指
						//导致窗口内容在一些距离阈值之后滚动
						//已超过 在这些平台上，滚动可以防止点击事件出现
						//发送，在某些平台上，甚至触发器被抑制。至
						//模拟对点击事件的抑制，我们需要注意滚动
						//事件。不幸的是，像iOS这样的平台不会调度滚动
						//事件直到* AFTER *用户抬起他们的手指（touchend）。意即
						//我们需要看滚动和touchmove事件来确定是否
						//或触发事件触发之前，滚动不会发生。

						.bind（“touchmove”，handleTouchMove）
						.bind（“scroll”，handleScroll）;
				}
			}
		}，

		拆分：function（/ * data，namespace * /）{
			//如果这是此eventType的最后一个虚拟绑定，
			//从文档中删除其全局处理程序。

			--activeDocHandlers [eventType];

			if（！activeDocHandlers [eventType]）{
				$ document.unbind（realType，mouseEventCallback）;
			}

			if（eventCaptureSupported）{
				//如果这是现有的最后一个虚拟鼠标绑定，
				//删除我们的文档touchstart监听器。

				--activeDocHandlers [“touchstart”];

				if（！activeDocHandlers [“touchstart”]）{
					$ document.unbind（“touchstart”，handleTouchStart）
						.unbind（“touchmove”，handleTouchMove）
						.unbind（“touchend”，handleTouchEnd）
						.unbind（“scroll”，handleScroll）;
				}
			}

			var $ this = $（this），
				bindings = $ .data（this，dataPropertyName）;

			//当一个元素是时，可能会调用拆分
			//从DOM中删除 如果是这样的话，
			// jQuery core可能已经剥离了元素
			//任何数据绑定，所以我们需要检查它
			// 使用它。
			if（bindings）{
				bindings [eventType] = false;
			}

			//取消注册虚拟事件处理程序。

			$ this.unbind（realType，dummyMouseHandler）;

			//如果这是最后一个虚拟鼠标绑定
			//元素，从元素中删除绑定数据。

			if（！hasVirtualBindings（this））{
				$ this.removeData（dataPropertyName）;
			}
		}
	};
}

//将我们的自定义事件暴露给jQuery bind / unbind机制。

for（i = 0; i <virtualEventNames.length; i ++）{
	$ .event.special [virtualEventNames [i]] = getSpecialEventObject（virtualEventNames [i]）;
}

//添加捕获点击处理程序来阻止点击。
//请注意，我们需要事件捕获支持，所以如果设备
//不支持它，我们现在平安，只依靠鼠标事件。
if（eventCaptureSupported）{
	document.addEventListener（“click”，function（e）{
		var cnt = clickBlockList.length，
			target = e.target，
			x，y，ele，i，o，touchID;

		if（cnt）{
			x = e.clientX;
			y = e.clientY;
			threshold = $ .vmouse.clickDistanceThreshold;

			//这里的想法是通过clickBlockList来查看是否
			//当前的点击事件在我们之一附近
			// vclick事件，其中有preventDefault（）被调用。如果我们发现
			//一，然后阻止点击。
			//
			//为什么我们必须依靠邻近？
			//
			//因为触发事件触发vclick的目标
			//可以与合成的点击事件的目标不同
			//由浏览器 合成的鼠标/点击事件的目标
			//从触摸事件似乎是具体的实现。例如，
			//某些浏览器会触发接近的链接的鼠标/点击事件
			//触摸事件，即使touchstart / touchend事件的目标
			//表示用户触摸了链接之外。此外，似乎与大多数
			//浏览器，鼠标/点击事件的目标不会计算直到
			//时间调度，所以如果你替换你感动的元素
			//与另一个元素，鼠标/点击的目标将是新的
			//元素下面的那一点。
			//
			//除了邻近，我们还检查目标和任何目标
			其祖先//阻止了点击。这是必要的
			//因为奇怪的鼠标/点击目标计算完成了
			// Android 2.1浏览器，如果你点击一个元素，那里有一个
			//鼠标/点击处理程序的一个祖先，目标将是
			//触摸元素的最内层的孩子，即使那个孩子不在哪里
			//靠近触摸点

			ele = target;

			而（ele）{
				for（i = 0; i <cnt; i ++）{
					o = clickBlockList [i];
					touchID = 0;

					if（（ele === target && Math.abs（ox-x）<threshold && Math.abs（oy  -  y）<threshold）||
								$ .data（ele，touchTargetPropertyName）=== o.touchID）{
						// XXX：我们可能需要考虑从阻止列表中删除匹配项
						//而不是等待复位定时器触发。
						e.preventDefault（）;
						e.stopPropagation（）;
						返回;
					}
				}
				ele = ele.parentNode;
			}
		}
	}，true）;
}
}）（jQuery，window，document）;


（function（$，window，undefined）{
	var $ document = $（document），
		supportTouch = $ .mobile.support.touch，
		scrollEvent =“touchmove scroll”，
		touchStartEvent = supportTouch？“touchstart”：“mousedown”，
		touchStopEvent = supportTouch？“touchend”：“mouseup”，
		touchMoveEvent = supportTouch？“touchmove”：“mousemove”;

	//设置新的事件快捷方式
	$ .each（（“touchstart touchmove touchend”+
		“tap taphold”+
		“swipe swipeleft swiperight”+
		“scrollstart scrollstop”）.split（“”），function（i，name）{

		$ .fn [name] = function（fn）{
			返回fn？this.bind（name，fn）：this.trigger（name）;
		};

		// jQuery <1.8
		if（$ .attrFn）{
			$ .attrFn [name] = true;
		}
	}）;

	function triggerCustomEvent（obj，eventType，event，bubble）{
		var originalType = event.type;
		event.type = eventType;
		if（bubble）{
			$ .event.trigger（event，undefined，obj）;
		} else {
			$ .event.dispatch.call（obj，event）;
		}
		event.type = originalType;
	}

	//还处理scrollstop
	$ .event.special.scrollstart = {

		启用：true，
		setup：function（）{

			var thisObject = this，
				$ this = $（thisObject），
				滚动，
				定时器;

			函数触发器（事件，状态）{
				滚动=状态
				triggerCustomEvent（thisObject，scrolling？“scrollstart”：“scrollstop”，event）;
			}

			// iPhone触发滚动一小段延迟; 使用touchmove代替
			$ this.bind（scrollEvent，function（event）{

				if（！$。event.special.scrollstart.enabled）{
					返回;
				}

				if（！scrolling）{
					trigger（event，true）;
				}

				clearTimeout（定时器）;
				timer = setTimeout（function（）{
					trigger（event，false）;
				}，50）
			}）;
		}，
		拆分：function（）{
			$（this）.unbind（scrollEvent）;
		}
	};

	//也处理taphold
	$ .Event.special.tap = {
		tapholdThreshold：750，
		emitTapOnTaphold：true，
		setup：function（）{
			var thisObject = this，
				$ this = $（thisObject），
				isTaphold = false;

			$ this.bind（“vmousedown”，function（event）{
				isTaphold = false;
				if（event.which && event.which！== 1）{
					返回假
				}

				var origTarget = event.target，
					定时器;

				function clearTapTimer（）{
					clearTimeout（定时器）;
				}

				函数clearTapHandlers（）{
					clearTapTimer（）;

					$ this.unbind（“vclick”，clickHandler）
						.unbind（“vmouseup”，clearTapTimer）;
					$ document.unbind（“vmousecancel”，clearTapHandlers）;
				}

				函数clickHandler（event）{
					clearTapHandlers（）;

					//如果起始目标是ON，则触发“点击”事件
					//与停止目标相同。
					if（！isTaphold && origTarget === event.target）{
						triggerCustomEvent（thisObject，“tap”，event）;
					} else if（isTaphold）{
						event.preventDefault（）;
					}
				}

				$ this.bind（“vmouseup”，clearTapTimer）
					.bind（“vclick”，clickHandler）;
				$ document.bind（“vmousecancel”，clearTapHandlers）;

				timer = setTimeout（function（）{
					if（！$。event.special.tap.emitTapOnTaphold）{
						isTaphold = true;
					}
					triggerCustomEvent（thisObject，“taphold”，$ .Event（“taphold”，{target：origTarget}））;
				}，$ .event.special.tap.tapholdThreshold）;
			}）;
		}，
		拆分：function（）{
			$（this）.unbind（“vmousedown”）.unbind（“vclick”）.unbind（“vmouseup”）;
			$ document.unbind（“vmousecancel”）;
		}
	};

	//还处理swipeleft，swiperight
	$ .event.special.swipe = {

		//比这个水平位移更多，我们会压制滚动。
		scrollSupressionThreshold：30，

		//比这更多的时间，这不是一个滑动。
		durationThreshold：1000，

		//滑动水平位移必须大于此。
		horizo​​ntalDistanceThreshold：30，

		//滑动垂直位移必须小于此。
		verticalDistanceThreshold：30，

		getLocation：function（event）{
			var winPageX = window.pageXOffset，
				winPageY = window.pageYOffset，
				x = event.clientX，
				y = event.clientY;

			if（event.pageY === 0 && Math.floor（y）> Math.floor（event.pageY）||
				event.pageX === 0 && Math.floor（x）> Math.floor（event.pageX））{

				// iOS4 clientX / clientY具有应该是的值
				// in pageX / pageY。而pageX / page /的值为0
				x = x  -  winPageX;
				y = y  -  winPageY;
			} else if（y <（event.pageY  -  winPageY）|| x <（event.pageX  -  winPageX））{

				//某些Android浏览器对于clientX / Y具有完全虚假的价值
				//滚动/缩放页面时。可检测自clientX / clientY
				//不应该小于pageX / pageY减去页面滚动
				x = event.pageX  -  winPageX;
				y = event.pageY  -  winPageY;
			}

			返回{
				x：x，
				y：y
			};
		}，

		start：function（event）{
			var data = event.originalEvent.touches？
					event.originalEvent.touches [0]：事件，
				location = $ .event.special.swipe.getLocation（data）;
			返回{
						time：（new Date（））.getTime（），
						coords：[location.x，location.y]，
						来源：$（event.target）
					};
		}，

		stop：function（event）{
			var data = event.originalEvent.touches？
					event.originalEvent.touches [0]：事件，
				location = $ .event.special.swipe.getLocation（data）;
			返回{
						time：（new Date（））.getTime（），
						coords：[location.x，location.y]
					};
		}，

		handleSwipe：function（start，stop，thisObject，origTarget）{
			if（stop.time  -  start.time <$ .event.special.swipe.durationThreshold &&
				Math.abs（start.coords [0]  -  stop.coords [0]）> $ .event.special.swipe.horizo​​ntalDistanceThreshold &&
				Math.abs（start.coords [1]  -  stop.coords [1]）<$ .event.special.swipe.verticalDistanceThreshold）{
				var direction = start.coords [0]> stop.coords [0]？“swipeleft”：“swiperight”;

				triggerCustomEvent（thisObject，“swipe”，$ .Event（“swipe”，{target：origTarget，swipestart：start，swipestop：stop}），true）;
				triggerCustomEvent（thisObject，direction，$。Event（direction，{target：origTarget，swipestart：start，swipestop：stop}），true）;
				返回真
			}
			返回假

		}，

		//这是一个标志，以确保最多只有一个刷卡事件事件
		//在任何给定的时间工作
		eventInProgress：false，

		setup：function（）{
			var事件，
				thisObject = this，
				$ this = $（thisObject），
				context = {};

			//检索此元素的事件数据并添加滑动上下文
			events = $ .data（this，“mobile-events”）;
			if（！events）{
				events = {length：0};
				$ .data（这是“移动事件”，事件）;
			}
			events.length ++;
			events.swipe = context;

			context.start = function（event）{

				//如果我们已经在刷卡活动了，请保密
				if（$ .event.special.swipe.eventInProgress）{
					返回;
				}
				$ .event.special.swipe.eventInProgress = true;

				var stop，
					start = $ .event.special.swipe.start（event），
					origTarget = event.target，
					emit = false;

				context.move = function（event）{
					if（！start || event.isDefaultPrevented（））{
						返回;
					}

					stop = $ .event.special.swipe.stop（event）;
					if（！emit）{
						emit = $ .event.special.swipe.handleSwipe（start，stop，thisObject，origTarget）;
						if（emit）{

							//重置上下文以使下一个滑动事件成为可能
							$ .event.special.swipe.eventInProgress = false;
						}
					}
					//防止滚动
					if（Math.abs（start.coords [0]  -  stop.coords [0]）> $ .event.special.swipe.scrollSupressionThreshold）{
						event.preventDefault（）;
					}
				};

				context.stop = function（）{
						emit = true;

						//重置上下文以使下一个滑动事件成为可能
						$ .event.special.swipe.eventInProgress = false;
						$ document.off（touchMoveEvent，context.move）;
						context.move = null;
				};

				$ document.on（touchMoveEvent，context.move）
					.one（touchStopEvent，context.stop）;
			};
			$ this.on（touchStartEvent，context.start）;
		}，

		拆分：function（）{
			var事件，上下文;

			events = $ .data（this，“mobile-events”）;
			if（events）{
				context = events.swipe;
				删除events.swipe;
				events.length--;
				if（events.length === 0）{
					$ .removeData（this，“mobile-events”）;
				}
			}

			if（context）{
				if（context.start）{
					$（this）.off（touchStartEvent，context.start）;
				}
				if（context.move）{
					$ document.off（touchMoveEvent，context.move）;
				}
				if（context.stop）{
					$ document.off（touchStopEvent，context.stop）;
				}
			}
		}
	};
	$。每个（{
		scrollstop：“scrollstart”，
		taphold：“tap”，
		swipeleft：“swipe.left”，
		swiperight：“swipe.right”
	}，function（event，sourceEvent）{

		$ .event.special [event] = {
			setup：function（）{
				$（this）.bind（sourceEvent，$ .noop）;
			}，
			拆分：function（）{
				$（this）.unbind（sourceEvent）;
			}
		};
	}）;

}）（jQuery，this）;


	//限制调整大小事件
	（function（$）{
		$ .event.special.throttledresize = {
			setup：function（）{
				$（this）.bind（“resize”，handler）;
			}，
			拆分：function（）{
				$（this）.unbind（“resize”，handler）;
			}
		};

		var throttle = 250，
			handler = function（）{
				curr =（new Date（））.getTime（）;
				diff = curr  -  lastCall;

				if（diff> = throttle）{

					lastCall = curr;
					$（this）.trigger（“throttledresize”）;

				} else {

					if（heldCall）{
						clearTimeout（heldCall）;
					}

					//承诺持有的通话仍然执行
					heldCall = setTimeout（handler，throttle  -  diff）;
				}
			}，
			lastCall = 0，
			heldCall，
			CURR，
			差异;
	}）（jQuery）;


（function（$，window）{
	var win = $（window），
		event_name =“orientationchange”，
		get_orientation，
		last_orientation，
		initial_orientation_is_landscape，
		initial_orientation_is_default，
		portrait_map = {“0”：true，“180”：true}，
		ww，wh，landscape_threshold;

	//似乎有些设备/浏览器供应商使用0和180的window.orientation值
	//表示“默认”方向。对于iOS设备和大多数其他智能手机进行测试，
	//默认方向总是“纵向”，但在某些基于Android和RIM的平板电脑中，
	//默认方向是“景观”。以下代码尝试使用该窗口
	//尺寸来确定当前方向是什么，然后进行调整
	//要到portrait_map，如有必要，这样我们就可以正确解码了
	//调用get_orientation（）时的window.orientation值。
	//
	//请注意，我们曾经使用媒体查询来确定浏览器的方向
	//认为它在：
	//
	// initial_orientation_is_landscape = $ .mobile.media（“all and（orientation：landscape）”）;
	//
	//但是有一个iPhone / iPod Touch bug从iOS 4.2开始，通过iOS 5.1，
	//浏览器*总是应用景观媒体查询。这个bug不行
	//发生在iPad上

	if（$ .support.orientation）{

		//检查窗口的宽度和高度，找出当前的方向
		该设备的//在此刻。请注意，我们初始化了人像图
		//值为0和180，* AND *我们有意检查景观，以便我们猜测
		//错误，我们默认假设肖像是默认方向。
		//我们使用下面的阈值检查，因为在某些平台上，如iOS，iPhone
		//如果用户打开，外形尺寸可以报告比高度更大的宽度
		//开发者控制台 实际的门槛值有些随意，我们就是这样
		//需要确保它足够大以排除开发者控制台的情况。

		ww = window.innerWidth || win.width（）;
		wh = window.innerHeight || win.height（）;
		landscape_threshold = 50;

		首先_orientation_is_landscape = ww> wh &&（ww  -  wh）> landscape_threshold;

		//现在检查当前的window.orientation是0或180。
		initial_orientation_is_default = portrait_map [window.orientation];

		//如果初始方向是横向，但window.orientation报告0或180，* OR *
		//如果初始方向是纵向，但window.orientation报告90或-90，我们
		//需要翻转我们的portrait_map值，因为Landscape是默认的方向
		//这个设备/浏览器。
		if（（initial_orientation_is_landscape && initial_orientation_is_default）||（！initial_orientation_is_landscape &&！initial_orientation_is_default））{
			portrait_map = {“-90”：true，“90”：true};
		}
	}

	$ .event.special.orientationchange = $ .extend（{}，$ .event.special.orientationchange，{
		setup：function（）{
			//如果事件本身是支持的，则返回false以使jQuery
			//将使用DOM方法绑定到事件。
			if（$ .support.orientation &&！$。event.special.orientationchange.disabled）{
				返回假
			}

			//获取当前方向以避免初始双触发。
			last_orientation = get_orientation（）;

			//因为orientationchange事件不存在，模拟
			//通过测试窗口尺寸调整大小。
			win.bind（“throttledresize”，handler）;
		}，
		拆分：function（）{
			//如果事件本身不支持，则返回false
			// jQuery将使用DOM方法取消绑定事件。
			if（$ .support.orientation &&！$。event.special.orientationchange.disabled）{
				返回假
			}

			//因为orientationchange事件不存在，请取消绑定
			//调整大小事件处理程序。
			win.unbind（“throttledresize”，handler）;
		}，
		add：function（handleObj）{
			//保存对绑定事件处理程序的引用。
			var old_handler = handleObj.handler;

			handleObj.handler = function（event）{
				//修改事件对象，添加.orientation属性。
				event.orientation = get_orientation（）;

				//调用原始绑定的事件处理函数并返回其结果。
				return old_handler.apply（this，arguments）;
			};
		}
	}）;

	//如果事件本身不支持，这个处理程序将被绑定
	// window调整大小事件以模拟orientationchange事件。
	function handler（）{
		//获取当前方向。
		var orientation = get_orientation（）;

		if（orientation！== last_orientation）{
			//方向已更改，因此触发orientationchange事件。
			last_orientation = orientation;
			win.trigger（event_name）;
		}
	}

	//获取当前的页面方向。这个方法是公开的，应该的
	//需要，像jQuery.event.special.orientationchange.orientation（）
	$ .event.special.orientationchange.orientation = get_orientation = function（）
		var isPortrait = true，elem = document.documentElement;

		//喜欢窗口方向到基于屏幕尺寸的计算
		//实际屏幕调整大小发生在方向更改事件之前或之后
		//已经被触发了取决于实现（例如Android 2.3之前，iphone之后）。
		//需要更多的测试来确定更可靠的确定新屏幕的方法
		//当定向更改被触发时，（例如，使用媒体查询+元素+不透明度）
		if（$ .support.orientation）{
			//如果窗口方向注册为0或180度报告
			//肖像，否则风景
			isPortrait = portrait_map [window.orientation];
		} else {
			isPortrait = elem && elem.clientWidth / elem.clientHeight <1.1;
		}

		回报是眼镜？“风景素描”;
	};

	$ .fn [event_name] = function（fn）{
		返回fn？this.bind（event_name，fn）：this.trigger（event_name）;
	};

	// jQuery <1.8
	if（$ .attrFn）{
		$ .attrFn [event_name] = true;
	}

}（jQuery，this））;




（function（$，undefined）{

	//现有的基础标签？
	var baseElement = $（“head”）.children（“base”），

	//基本元素管理，根据动态基础标签支持定义
	// TODO移动到外部小部件
	base = {

		//定义基本元素，用于路由引用的资产网址
		//在Ajax请求的标记
		元素：（baseElement.length？baseElement：
			$（“<base>”，{href：$ .mobile.path.documentBase.hrefNoHash}）.prependTo（$（“head”））），

		linkSelector：“[src]，link [href]，a [rel ='external']，：jqmData（ajax ='false'），a [target]

		//将生成的BASE元素的href设置为新页面的基本路径
		set：function（href）{

			//如果用户想要管理他们的url基础，我们该怎么办？
			//手动
			if（！$。mobile.dynamicBaseEnabled）{
				返回;
			}

			//我们应该使用基础标签，如果我们可以动态地操作它
			if（$ .support.dynamicBaseTag）{
				base.element.attr（“href”，
					$ .mobile.path.makeUrlAbsolute（href，$ .mobile.path.documentBase））;
			}
		}，

		重写：function（href，page）{
			var newPath = $ .mobile.path.get（href）;

			page.find（base.linkSelector）.each（function（i，link）{
				var thisAttr = $（link）.is（“[href]”）？“href”：
					$（link）.is（“[src]”）？“src”：“动作”，
				theLocation = $ .mobile.path.parseLocation（），
				thisUrl = $（link）.attr（thisAttr）;

				// XXX_jblas：我们需要修复它，以便它删除文档
				//基本网址，然后添加新的网页网址。
				//如果完整路径存在并且相同，则将其删除 - 帮助IE输出
				thisUrl = thisUrl.replace（theLocation.protocol + theLocation.doubleSlash +
					theLocation.host + theLocation.pathname，“”）;

				if（！/ ^（\ w +：|＃| \ /）/。test（thisUrl））{
					$（link）.attr（thisAttr，newPath + thisUrl）;
				}
			}）;
		}，

		//将生成的BASE元素的href设置为新页面的基本路径
		reset：function（/ * href * /）{
			base.element.attr（“href”，$ .mobile.path.documentBase.hrefNoSearch）;
		}
	};

	$ .mobile.base = base;

}）（jQuery）;


（function（$，undefined）{
$ .mobile.widgets = {};

var originalWidget = $ .widget，

	//记录$ .mobile.keepNative的原始非移动设备修改版本
	//所以我们以后可以确定某人是否已修改$ .mobile.keepNative
	keepNativeFactoryDe​​fault = $ .mobile.keepNative;

$ .widget =（function（orig）{
	return function（）{
		var constructor = orig.apply（this，arguments），
			name = constructor.prototype.widgetName;

		constructor.initSelector =（（constructor.prototype.initSelector！== undefined）？
			constructor.prototype.initSelector：“：jqmData（role ='”+ name +“'）”）;

		$ .mobile.widgets [name] =构造函数;

		返回构造函数;
	};
}）（$ .widget）;

//确保$ .widget还有桥接和扩展方法
$ .extend（$ .widget，originalWidget）;

//对于1.5中的backcompat删除
$ .mobile.document.on（“create”，function（event）{
	$（event.target）.enhanceWithin（）;
}）;

$ .widget（“mobile.page”，{
	选项：{
		主题：“一”
		domCache：false，

		//在1.4中弃用，在1.5中删除
		keepNativeDefault：$ .mobile.keepNative，

		//在1.4中弃用，在1.5中删除
		contentTheme：null，
		增强：假
	}，

	// DEPRECATED for> 1.4
	// TODO删除1.5
	_createWidget：function（）{
		$ .Widget.prototype._createWidget.apply（this，arguments）;
		this._trigger（“init”）;
	}，

	_create：function（）{
		//如果回调函数返回false，则不会创建页面
		if（this._trigger（“beforecreate”）=== false）{
			返回假
		}

		if（！this.options.enhanced）{
			this._enhance（）;
		}

		this._on（this.element，{
			pagebeforehide：“removeContainerBackground”，
			pagebeforeshow：“_handlePageBeforeShow”
		}）;

		this.element.enhanceWithin（）;
		//对话框小部件在1.4中已被弃用，在1.5中删除
		if（$ .mobile.getAttribute（this.element [0]，“role”）===“dialog”&& $ .mobile.dialog）{
			this.element.dialog（）;
		}
	}，

	_enhance：function（）{
		var attrPrefix =“data-”+ $ .mobile.ns，
			自我=这个

		if（this.options.role）{
			this.element.attr（“data-”+ $ .mobile.ns +“role”，this.options.role）;
		}

		this.element
			.attr（“tabindex”，“0”）
			.addClass（“ui-page ui-page-theme-”+ this.options.theme）;

		//操作内容os从1.5开始，弃用为1.4
		this.element.find（“[”+ attrPrefix +“role ='content']”）.each（function（）{
			var $ this = $（this），
				theme = this.getAttribute（attrPrefix +“theme”）|| 不确定的;
				self.options.contentTheme = theme || self.options.contentTheme || （self.options.dialog && self.options.theme）|| （self.element.jqmData（“role”）===“dialog”&& self.options.theme）;
				$ this.addClass（“ui-content”）;
				if（self.options.contentTheme）{
					$ this.addClass（“ui-body-”+（self.options.contentTheme））;
				}
				//添加ARIA角色
				$ this.attr（“role”，“main”）.addClass（“ui-content”）;
		}）;
	}，

	bindRemove：function（callback）{
		var page = this.element;

		//当dom缓存未启用或页面嵌入绑定删除隐藏页面
		if（！page.data（“mobile-page”）.options.domCache &&
			page.is（“：jqmData（external-page ='true'）”））{

			// TODO使用_on  - 也就是说，为什么它在这种情况下不起作用
			page.bind（“pagehide.remove”，callback || function（e，data）{

				//检查这是否是相同的页面转换，如果没有删除页面
				if（！data.samePage）{
					var $ this = $（this），
						prEvent = new $ .Event（“pageremove”）;

					$ this.trigger（prEvent）;

					if（！prEvent.isDefaultPrevented（））{
						$ this.removeWithDependents（）;
					}
				}
			}）;
		}
	}，

	_setOptions：function（o）{
		if（o.theme！== undefined）{
			this.element.removeClass（“ui-page-theme-”+ this.options.theme）.addClass（“ui-page-theme-”+ o.theme）;
		}

		if（o.contentTheme！== undefined）{
			this.element.find（“[data-”+ $ .mobile.ns +“='content']”）.removeClass（“ui-body-”+ this.options.contentTheme）
				.addClass（“ui-body-”+ o.contentTheme）;
		}
	}，

	_handlePageBeforeShow：function（/ * e * /）{
		this.setContainerBackground（）;
	}，
	//在1.4中弃用，在1.5中删除
	removeContainerBackground：function（）{
		this.element.closest（“：mobile-pagecontainer”）.pagecontainer（{“theme”：“none”}）;
	}，
	//在1.4中弃用，在1.5中删除
	//将页面容器背景设置为页面主题
	setContainerBackground：function（theme）{
		this.element.parent（）。pagecontainer（{“theme”：theme || this.options.theme}）;
	}，
	//在1.4中弃用，在1.5中删除
	keepNativeSelector：function（）{
		var options = this.options，
			keepNative = $ .trim（options.keepNative ||“”），
			globalValue = $ .trim（$ .mobile.keepNative），
			optionValue = $ .trim（options.keepNativeDefault），

			//检查$ .mobile.keepNative是否从出厂默认值更改
			newDefault =（keepNativeFactoryDe​​fault === globalValue？
				“”：globalValue），

			//如果$ .mobile.keepNative没有更改，请使用options.keepNativeDefault
			oldDefault =（newDefault ===“”？optionValue：“”）;

		//将来自所有来源的keepNative选择器连接到该值
		//已更改，或者如果没有更改，返回默认值
		return（（keepNative？[keepNative]：[]）
			.concat（newDefault？[newDefault]：[]）
			.concat（oldDefault？[oldDefault]：[]）
			.join（“，”））;
	}
}）;
}）（jQuery）;

（function（$，undefined）{

	$ .widget（“mobile.pagecontainer”，{
		选项：{
			主题：“a”
		}，

		initSelector：false，

		_create：function（）{
			this._trigger（“beforecreate”）;
			this.setLastScrollEnabled = true;

			this._on（this.window，{
				//当hashchange已被触发时禁用滚动设置，
				//这只能工作，因为记录滚动位置
				//在浏览器可能更改后延迟100ms
				//因为hashchange的位置
				导航：“_disableRecordScroll”，

				//绑定到scrollstop的第一页，“pagechange”不会
				//在这种情况下被解雇
				scrollstop：“_delayedRecordScroll”
			}）;

			// TODO考虑移动小部件的导航处理程序OUT
			//其他一些对象作为导航事件和之间的粘合
			//内容小部件加载和更改方法
			this._on（this.window，{navigate：“_filterNavigateEvents”}）;

			// TODO从页面*事件转移到内容*事件
			this._on（{pagechange：“_afterContentChange”}）;

			//处理来自chrome的初始hashchange :(
			this.window.one（“navigate”，$ .proxy（function（）{
				this.setLastScrollEnabled = true;
			}， 这个））;
		}，

		_setOptions：function（options）{
			if（options.theme！== undefined && options.theme！==“none”）{
				this.element.removeClass（“ui-overlay-”+ this.options.theme）
					.addClass（“ui-overlay-”+ options.theme）;
			} else if（options.theme！== undefined）{
				this.element.removeClass（“ui-overlay-”+ this.options.theme）;
			}

			this._super（options）;
		}，

		_disableRecordScroll：function（）{
			this.setLastScrollEnabled = false;
		}，

		_enableRecordScroll：function（）{
			this.setLastScrollEnabled = true;
		}，

		// TODO考虑这里的名称，因为它的目的是具体的
		_afterContentChange：function（）{
			//一旦页面更改，重新启用滚动录制
			this.setLastScrollEnabled = true;

			//删除以前在get滚动上存在的任何绑定
			//它可能与也可能不同于滚动元素
			//以前确定此页面
			this._off（this.window，“scrollstop”）;

			//确定并绑定到当前可能的scoll元素
			//窗口或在触摸溢出的情况下元素触摸溢出
			this._on（this.window，{scrollstop：“_delayedRecordScroll”}）;
		}，

		_recordScroll：function（）{
			//此屏障阻止基于滚动值设置
			//浏览器基于hashchange滚动窗口
			if（！this.setLastScrollEnabled）{
				返回;
			}

			var active = this._getActiveHistory（），
				currentScroll，minScroll，defaultScroll;

			if（active）{
				currentScroll = this._getScroll（）;
				minScroll = this._getMinScroll（）;
				defaultScroll = this._getDefaultScroll（）;

				//设置活动页面的lastScroll道具。如果我们的位置
				//滚动到小于minScrollBack，让它走。
				active.lastScroll = currentScroll <minScroll？defaultScroll：currentScroll;
			}
		}，

		_delayedRecordScroll：function（）{
			setTimeout（$ .proxy（this，“_recordScroll”），100）;
		}，

		_getScroll：function（）{
			return this.window.scrollTop（）;
		}，

		_getMinScroll：function（）{
			返回$ .mobile.minScrollBack;
		}，

		_getDefaultScroll：function（）{
			返回$ .mobile.defaultHomeScroll;
		}，

		_filterNavigateEvents：function（e，data）{
			var url;

			if（e.originalEvent && e.originalEvent.isDefaultPrevented（））{
				返回;
			}

			url = e.originalEvent.type.indexOf（“hashchange”）> -1？data.state.hlp：data.state.url;

			if（！url）{
				url = this._getHash（）;
			}

			if（！url || url ===“＃”|| url.indexOf（“＃”+ $ .mobile.path.uiStateKey）=== 0）{
				url = location.href;
			}

			this._handleNavigate（url，data.state）;
		}，

		_getHash：function（）{
			return $ .mobile.path.parseLocation（）。hash;
		}，

		// TODO活动页面应由容器管理（即它应该是一个属性）
		getActivePage：function（）{
			return this.activePage;
		}，

		// TODO的第一页应该是在_create期间使用逻辑设置的属性
		//当前位于init中
		_getInitialContent：function（）{
			return $ .mobile.firstPage;
		}，

		// TODO每个内容容器应该有一个历史记录对象
		_getHistory：function（）{
			返回$ .mobile.navigate.history;
		}，

		_getActiveHistory：function（）{
			return this._getHistory（）。getActive（）;
		}，

		// TODO文档基础应在创建时确定
		_getDocumentBase：function（）{
			返回$ .mobile.path.documentBase;
		}，

		返回：function（）{
			this.go（-1）;
		}，

		forward：function（）{
			this.go（1）;
		}，

		go：function（steps）{

			//如果启用了hashlistening，则使用本机历史记录方法
			if（$ .mobile.hashListeningEnabled）{
				window.history.go（steps）;
			} else {

				//我们没有在哈希中听，因此在内部处理历史记录
				var activeIndex = $ .mobile.navigate.history.activeIndex，
					index = activeIndex + parseInt（steps，10），
					url = $ .mobile.navigate.history.stack [index] .url，
					direction =（steps> = 1）？“前进”：“回来”

				//更新历史记录对象
				$ .mobile.navigate.history.activeIndex = index;
				$ .mobile.navigate.history.previousIndex = activeIndex;

				//更改到新页面
				this.change（url，{direction：direction，changeHash：false，fromHashChange：true}）;
			}
		}，

		// TODO rename _handleDestination
		_handleDestination：function（to）{
			瓦史

			//清理哈希进行比较，如果它是一个url
			if（$ .type（to）===“string”）{
				to = $ .mobile.path.stripHash（to）;
			}

			if（to）{
				history = this._getHistory（）;

				//在这一点上，'to'可以是3个东西之一，一个缓存的页面
				//来自历史堆栈条目的元素，id或site-relative /
				//绝对URL。如果“to”是一个id，我们需要解决它
				// documentBase，而不是location.href，因为hashchange
				//可能是前向/后向导航的结果
				//从外部页面/对话框到内部交叉
				//页面/对话框。
				//
				// TODO移动检查到历史对象或路径对象？
				to =！$。mobile.path.isPath（to）？（$ .mobile.path.makeUrlAbsolute（“＃”+ to，this._getDocumentBase（）））：to;
			}
			返回|| this._getInitialContent（）;
		}，

		_transitionFromHistory：function（direction，defaultTransition）{
			var history = this._getHistory（），
				entry =（direction ===“back”？history.getLast（）：history.getActive（））;

			return（entry && entry.transition）|| defaultTransition;
		}，

		_handleDialog：function（changePageOptions，data）{
			var to，active，activeContent = this.getActivePage（）;

			//如果当前活动页面不是对话框，跳过该对话框并继续
			//在同一个方向
			//注意：对话窗口小部件从1.4.0开始不推荐使用，将在1.5.0中删除。
			//因此，从1.5.0 ActiveContent.data（“mobile-dialog”）将始终评估
			// falsy，所以if语句中的第二个条件可以完全删除。
			if（activeContent &&！activeContent.data（“mobile-dialog”））{
				//确定我们前进或后退，继续
				//相应地通过当前对话框
				if（data.direction ===“back”）{
					this.back（）;
				} else {
					this.forward（）;
				}

				//阻止changePage调用
				返回假
			} else {
				//如果当前活动页面是对话框，并且我们正在导航
				//对话框使用保存在堆栈中的对话框
				to = data.pageUrl;
				active = this._getActiveHistory（）;

				//确保设置角色，转换和反转
				//因为大多数这个都是由domCache清理丢失的
				$ .extend（changePageOptions，{
					角色：active.role，
					transition：this._transitionFromHistory（
						data.direction，
						changePageOptions.transition），
					reverse：data.direction ===“back”
				}）;
			}

			还给;
		}，

		_handleNavigate：function（url，data）{
			//通过散列查找第一页
			// TODO用handleUrl剥离哈希值两次
			var to = $ .mobile.path.stripHash（url），history = this._getHistory（），

				//如果是第一页，则转换为false，未定义
				//否则（默认情况下可能会被覆盖）
				transition = history.stack.length === 0？“没有” ：
					this._transitionFromHistory（data.direction），

				//检查后进行的changPage调用的默认选项
				//页面的当前状态和散列，注意
				//转换是从以前的历史记录条目导出的
				changePageOptions = {
					changeHash：false，
					fromHashChange：true，
					reverse：data.direction ===“back”
				};

			$ .extend（changePageOptions，data，{
				过渡：过渡
			}）;

			// TODO移动到_handleDestination？
			//如果这不是第一页，如果当前url是一个对话框哈希
			//键，初始目的地不等于当前目标
			//页面，使用特殊的对话框处理
			if（history.activeIndex> 0 &&
				to.indexOf（$ .mobile.dialogHashKey）> -1）{

				to = this._handleDialog（changePageOptions，data）;

				if（to === false）{
					返回;
				}
			}

			this._changeContent（this._handleDestination（to），changePageOptions）;
		}，

		_changeContent：function（to，opts）{
			$ .mobile.changePage（to，opts）;
		}，

		_getBase：function（）{
			返回$ .mobile.base;
		}，

		_getNs：function（）{
			返回$ .mobile.ns;
		}，

		_enhance：function（content，role）{
			// TODO考虑支持自定义回调，并传入
			//包含角色的设置
			return content.page（{role：role}）;
		}，

		_include：function（page，settings）{
			//附加到页面并增强
			page.appendTo（this.element）;

			//使用页面小部件来增强
			this._enhance（page，settings.role）;

			//删除隐藏页面
			page.page（“bindRemove”）;
		}，

		_find：function（absUrl）{
			// TODO考虑支持自定义回调
			var fileUrl = this._createFileUrl（absUrl），
				dataUrl = this._createDataUrl（absUrl），
				page，initialContent = this._getInitialContent（）;

			//检查页面是否已经存在于DOM中。
			//注意do _not_使用：jqmData伪选择器，因为括号
			//是一个有效的url char，它会在第一次发生时中断
			page = this.element
				.children（“[data-”+ this._getNs（）+）
					“url ='”+ $ .mobile.path.hashToSelector（dataUrl）+“']”）;

			//如果我们找不到页面，请检查url是否是
			//引用嵌入页面。如果是这样，它可能是动态的
			//由开发者注入，在这种情况下，它将缺少一个
			// data-url属性并需要增强。
			if（page.length === 0 && dataUrl &&！$。mobile.path.isPath（dataUrl））{
				page = this.element.children（$ .mobile.path.hashToSelector（“＃”+ dataUrl））
					.attr（“data-”+ this._getNs（）+“url”，dataUrl）
					.jqmData（“url”，dataUrl）;
			}

			//如果我们未能在DOM中找到一个页面，请检查该URL以查看它
			//指应用程序中的第一页。还要检查以确保
			//我们的缓存首页实际上在DOM中。部分用户部署
			//应用程序由于各种原因而从DOM修剪第一页。
			//我们在这里检查这种情况是因为我们不想要第一页
			//一个id落入不存在的嵌入页错误的情况。
			if（page.length === 0 &&
				$ .mobile.path.isFirstPageUrl（fileUrl）&&
				initialContent &&
				initialContent.parent（）。length）{
				page = $（initialContent）;
			}

			返回页面
		}，

		_getLoader：function（）{
			return $ .mobile.loading（）;
		}，

		_showLoading：function（delay，theme，msg，textonly）{
			//这个可配置的超时允许缓存页面简短
			//延迟加载而不显示消息
			if（this._loadMsg）{
				返回;
			}

			this._loadMsg = setTimeout（$。proxy（function（）{
				this._getLoader（）。loader（“show”，theme，msg，textonly）;
				this._loadMsg = 0;
			}，这个），延迟）;
		}，

		_hideLoading：function（）{
			//停止消息显示定时器
			clearTimeout（this._loadMsg）;
			this._loadMsg = 0;

			//隐藏加载消息
			this._getLoader（）。loader（“hide”）;
		}，

		_showError：function（）{
			//确保删除当前的加载消息
			this._hideLoading（）;

			//显示错误消息
			this._showLoading（0，$ .mobile.pageLoadErrorMessageTheme，$ .mobile.pageLoadErrorMessage，true）;

			//延迟后隐藏错误信息
			// TODO配置
			setTimeout（$ .proxy（this，“_hideLoading”），1500）;
		}，

		_parse：function（html，fileUrl）{
			// TODO考虑允许自定义此方法。这是非常JQM具体
			var page，all = $（“<div> </ div>”）;

			//解决方法，允许脚本在页面div中包含时执行
			all.get（0）.innerHTML = html;

			page = all.find（“：jqmData（role ='page'），：jqmData（role ='dialog'）”）.first（）;

			//如果找不到页面elem，创建一个并插入body元素的内容
			if（！page.length）{
				page = $（“<div data-”+ this._getNs（）+“role ='page'>”+
					（html.split（/ <\ /？body [^>] *> / gmi）[1] ||“”）+
					“</ div>”）;
			}

			// TODO使用外部标记页面，以确保嵌入页面不是
			//删除的各种页面处理代码是不好的。具有页面处理代码
			//在很多地方都不好 解决方案帖子1.0
			page.attr（“data-”+ this._getNs（）+“url”，this._createDataUrl（fileUrl））
				.attr（“data-”+ this._getNs（）+“external-page”，true）;

			返回页面
		}，

		_setLoadedTitle：function（page，html）{
			//页面标题regexp
			var newPageTitle = html.match（/ <title [^>] *>（[^ <] *）/）&& RegExp。$ 1;

			if（newPageTitle &&！page.jqmData（“title”））{
				newPageTitle = $（“<div>”+ newPageTitle +“</ div>”）.text（）;
				page.jqmData（“title”，newPageTitle）;
			}
		}，

		_isRewritableBaseTag：function（）{
			返回$ .mobile.dynamicBaseEnabled &&！$。support.dynamicBaseTag;
		}，

		_createDataUrl：function（absoluteUrl）{
			return $ .mobile.path.convertUrlToDataUrl（absoluteUrl）;
		}，

		_createFileUrl：function（absoluteUrl）{
			return $ .mobile.path.getFilePath（absoluteUrl）;
		}，

		_triggerWithDeprecated：function（name，data，page）{
			var deprecatedEvent = $ .Event（“page”+ name），
				newEvent = $ .Event（this.widgetName + name）;

			// DEPRECATED
			//如果提供，则触发页面上的旧的已弃用的事件
			（页面|| this.element）.trigger（deprecatedEvent，data）;

			//使用小部件触发方法来获取新的内容*事件
			this._trigger（name，newEvent，data）;

			返回{
				deprecatedEvent：deprecatedEvent，
				event：newEvent
			};
		}，

		// TODO它会很好分裂这个更多，但一切似乎是“一个关闭”
		//或要求排序，以便在其间的部分之间喷洒其他位
		//可以作为一个组抽象出来
		_loadSuccess：function（absUrl，triggerData，settings，deferred）{
			var fileUrl = this._createFileUrl（absUrl）;

			return $ .proxy（function（html，textStatus，xhr）{
				// pre-parse html检查一个数据网址，
				//将其用作新的fileUrl，基本路径等
				var内容，

					// TODO句柄对话框
					pageElemRegex = new RegExp（“（<[^>] + \\ bdata-”+ this._getNs（）+“role = [\”']？page [\“']？[^>] *>）”） ，

					dataUrlRegex = new RegExp（“\\ bdata-”+ this._getNs（）+“url = [\”']？（[^ \“'>] *）[\”']？

				必须为基础标签提供// data-url，以便资源请求
				//可以指向正确的URL。加载到一个临时的
				//元素立即生成这些请求
				if（pageElemRegex.test（html）&&
					RegExp。$ 1 &&
					dataUrlRegex.test（RegExp。$ 1）&&
					RegExp。$ 1）{
					fileUrl = $ .mobile.path.getFilePath（$（“<div>”+ RegExp。$ 1 +“</ div>”）。text（））;

					//我们指定，如果在页面div上给出了一个data-url属性，它的值
					//必须给予非URL编码。但是，在这部分代码中，fileUrl是
					//假设是URL编码的，所以我们在这里对检索到的值进行URL编码
					fileUrl = this.window [0] .encodeURIComponent（fileUrl）;
				}

				//如果我们正在预取，不要更新基本标签
				if（settings.prefetch === undefined）{
					this._getBase（）。set（fileUrl）;
				}

				content = this._parse（html，fileUrl）;

				this._setLoadedTitle（content，html）;

				//将内容引用和xhr添加到我们的triggerData。
				triggerData.xhr = xhr;
				triggerData.textStatus = textStatus;

				// DEPRECATED
				triggerData.page = content;

				triggerData.content = content;

				triggerData.toPage = content;

				//如果默认行为被阻止，请停在这里！
				//注意它是监听器/处理程序的责任
				//称为preventDefault（），解析/拒绝
				// delayData中的延迟对象。
				if（this._triggerWithDeprecated（“load”，triggerData）.event.isDefaultPrevented（））{
					返回;
				}

				//如果基本标签不起作用，则重写src和href attrs以使用基本URL
				if（this._isRewritableBaseTag（）&& content）{
					this._getBase（）。rewrite（fileUrl，content）;
				}

				this._include（content，settings）;

				//删除加载消息。
				if（settings.showLoadMsg）{
					this._hideLoading（）;
				}

				deferred.resolve（absUrl，设置，内容）;
			}， 这个）;
		}，

		_加载默认： {
			类型：“get”，
			数据：未定义，

			// DEPRECATED
			reloadPage：false，

			重新加载：假，

			//默认情况下，我们依赖于@ data-role属性定义的角色。
			作用：未定义，

			showLoadMsg：false，

			//这个延迟允许从浏览器缓存拉到的数据
			//发生而不显示加载消息。
			loadMsgDelay：50
		}，

		load：function（url，options）{
			//这个函数使用延迟通知来让调用者
			//知道内容何时完成加载，或者发生错误。
			var deferred =（options && options.deferred）|| $ .Deferred（）

				//检查用户传递的选项“reloadPage”自1.4.0起已被弃用
				//并将在1.5.0中删除。
				//将选项“reloadPage”复制到“重新加载”，但仅当选项“重新加载”不存在时
				reloadOptionExtension =
					（（options && options.reload === undefined &&
						options.reloadPage！== undefined）？
							{reload：options.reloadPage}：{}），

				//具有由调用者指定的覆盖的默认加载选项。
				settings = $ .extend（{}，this._loadDefaults，options，reloadOptionExtension），

				//内容载入后的DOM元素。
				content = null，

				//传递到函数的URL的绝对版本。这个
				//版本的URL可能包含对话/子内容参数。
				absUrl = $ .mobile.path.makeUrlAbsolute（url，this._findBaseWithDefault（）），
				fileUrl，dataUrl，pblEvent，triggerData;

			//如果调用者提供了数据，并且我们使用“get”请求，
			//将数据附加到URL。
			if（settings.data && settings.type ===“get”）{
				absUrl = $ .mobile.path.addSearchParams（absUrl，settings.data）;
				settings.data = undefined;
			}

			//如果调用者正在使用“post”请求，则reload必须为true
			if（settings.data && settings.type ===“post”）{
				settings.reload = true;
			}

			// URL的绝对版本减去任何对话/子内容参数。
			//换句话说，要加载的内容的真实URL。
			fileUrl = this._createFileUrl（absUrl）;

			// URL的版本实际存储在data-url属性中
			// 内容。对于嵌入式内容，它只是页面的ID。对于
			//与文档基础相同的域内的内容，它是该站点
			//相对路径 对于跨域内容（仅限电话间隔）整个
			//绝对网址用于加载内容。
			dataUrl = this._createDataUrl（absUrl）;

			content = this._find（absUrl）;

			//如果它不是对第一个内容的引用，并且是指缺少的
			//嵌入内容拒绝延迟和返回
			if（content.length === 0 &&
				$ .mobile.path.isEmbeddedPage（fileUrl）&&
				！$。mobile.path.isFirstPageUrl（fileUrl））{
				deferred.reject（absUrl，settings）;
				return deferred.promise（）;
			}

			//将基准重置为默认文档库
			// TODO弄清楚为什么我们这样做
			this._getBase（）复位（）;

			//如果我们感兴趣的内容已经在DOM中，
			//并且调用者没有指出我们应该强制一个
			//重新加载文件，我们完成了。解决被延期的事情
			//用户可以在承诺上绑定到.done
			if（content.length &&！settings.reload）{
				this._enhance（content，settings.role）;
				deferred.resolve（absUrl，设置，内容）;

				//如果我们正在重新加载内容，请确保我们更新
				// base，如果它不是一个预取
				如果（！settings.prefetch）{
					this._getBase（）设定（URL）。
				}

				return deferred.promise（）;
			}

			triggerData = {
				url：url，
				absUrl：absUrl，
				toPage：url，
				上一页：选项？options.fromPage：undefined，
				dataUrl：dataUrl，
				递延：延期，
				选项：设置
			};

			//让听众知道我们即将加载内容。
			pblEvent = this._triggerWithDeprecated（“beforeload”，triggerData）;

			//如果默认行为被阻止，请停在这里！
			if（pblEvent.deprecatedEvent.isDefaultPrevented（）||
				pblEvent.event.isDefaultPrevented（））{
				return deferred.promise（）;
			}

			if（settings.showLoadMsg）{
				this._showLoading（settings.loadMsgDelay）;
			}

			//将基准重置为默认文档库。
			//只有在不预取的情况下才会重置
			if（settings.prefetch === undefined）{
				this._getBase（）复位（）;
			}

			if（！（$ .mobile.allowCrossDomainPages ||
				$ .mobile.path.isSameDomain（$。mobile.path.documentUrl，absUrl）））{
				deferred.reject（absUrl，settings）;
				return deferred.promise（）;
			}

			//加载新的内容。
			$就（{
				url：fileUrl，
				键入：settings.type，
				data：settings.data，
				contentType：settings.contentType，
				dataType：“html”，
				success：this._loadSuccess（absUrl，triggerData，settings，deferred），
				错误：this._loadError（absUrl，triggerData，settings，deferred）
			}）;

			return deferred.promise（）;
		}，

		_loadError：function（absUrl，triggerData，settings，deferred）{
			return $ .proxy（function（xhr，textStatus，errorThrown）{
				//将基准返回到当前路径
				this._getBase（）。set（$ .mobile.path.get（））;

				//向我们的triggerData添加错误信息。
				triggerData.xhr = xhr;
				triggerData.textStatus = textStatus;
				triggerData.errorThrown = errorThrown;

				//让听众知道页面加载失败。
				var plfEvent = this._triggerWithDeprecated（“loadfailed”，triggerData）;

				//如果默认行为被阻止，请停在这里！
				//注意它是监听器/处理程序的责任
				//称为preventDefault（），解析/拒绝
				// delayData中的延迟对象。
				if（plfEvent.deprecatedEvent.isDefaultPrevented（）||
					plfEvent.event.isDefaultPrevented（））{
					返回;
				}

				//删除加载消息。
				if（settings.showLoadMsg）{
					this._showError（）;
				}

				deferred.reject（absUrl，settings）;
			}， 这个）;
		}，

		_getTransitionHandler：function（transition）{
			transition = $ .mobile._maybeDegradeTransition（transition）;

			//找到指定转换的转换处理程序。如果有
			//在我们的transitionHandlers字典中不是一个，使用默认的。
			//立即调用处理程序启动转换。
			return $ .mobile.transitionHandlers [transition] || $ .mobile.defaultTransitionHandler;
		}，

		// TODO转入过渡处理程序？
		_triggerCssTransitionEvents：function（to，from，prefix）{
			var samePage = false;

			prefix = prefix || “”;

			// TODO决定事件是否事实上应该在容器上触发
			if（from）{

				//检查这是否是相同的页面转换，并告诉页面中的处理程序
				if（to [0] === from [0]）{
					samePage = true;
				}

				//在显示/隐藏事件之前触发
				// TODO不赞成nextPage赞成下一个
				this._triggerWithDeprecated（prefix +“hide”，{

					//在1.4中弃用，在1.5中删除
					下一页：
					到页面：到，
					上一页：
					samePage：samePage
				}，from）;
			}

			// TODO不赞成上一页的赞成
			this._triggerWithDeprecated（prefix +“show”，{
				prevPage：来自|| $（“”），
				到页面：到
			}， 至 ）;
		}，

		//在脚本中定义了一些修改后，TODO就会私有
		_cssTransition：function（to，from，options）{
			var transition = options.transition，
				reverse = options.reverse，
				deferred = options.deferred，
				TransitionHandler，
				诺言;

			this._triggerCssTransitionEvents（to，from，“before”）;

			// TODO把这个绑定到事件*外面的小部件
			this._hideLoading（）;

			TransitionHandler = this._getTransitionHandler（transition）;

			promise =（new TransitionHandler（transition，reverse，to，from））.transition（）;

			promise.done（$ .proxy（function（）{
				this._triggerCssTransitionEvents（to，from）;
			}， 这个 ））;

			// TODO临时住宿参数延期
			promise.done（function（）{
				deferred.resolve.apply（deferred，arguments）;
			}）;
		}，

		_releaseTransitionLock：function（）{
			//释放转换锁，所以导航是免费的
			isPageTransitioning = false;
			if（pageTransitionQueue.length> 0）{
				$ .mobile.changePage.apply（null，pageTransitionQueue.pop（））;
			}
		}，

		_removeActiveLinkClass：function（force）{
			//清除活动按钮状态
			$ .mobile.removeActiveLinkClass（force）;
		}，

		_loadUrl：function（to，triggerData，settings）{
			//将原始目标保存为dataUrl值
			//简化例如，删除ui状态和删除查询参数
			//从哈希这是为了让用户想要使用查询
			// params可以在页面的事件绑定中访问它们
			//生命周期见问题＃5085
			settings.target = to;
			settings.deferred = $ .Deferred（）;

			this.load（to，settings）;

			settings.deferred.done（$。proxy（function（url，options，content）{
				isPageTransitioning = false;

				//存储原始的绝对URL，以便可以提供它
				//到随后的changePage调用的triggerData中的事件
				options.absUrl = triggerData.absUrl;

				this.transition（content，triggerData，options）;
			}， 这个））;

			settings.deferred.fail（$。proxy（function（/ * url，options * /）{
				this._removeActiveLinkClass（true）;
				this._releaseTransitionLock（）;
				this._triggerWithDeprecated（“changefailed”，triggerData）;
			}， 这个））;
		}，

		_triggerPageBeforeChange：function（to，triggerData，settings）{
			var returnEvents;

			triggerData.prevPage = this.activePage;
			$ .extend（triggerData，{
				到页面：到，
				选项：设置
			}）;

			//注意：将原始目标保留为dataUrl值
			//简化，例如，删除ui状态，并从中删除查询参数
			//这个哈希是这样的，所以想要使用查询参数的用户有
			//在页面生命周期的事件绑定中访问它们
			//见问题＃5085
			if（$ .type（to）===“string”）{
				//如果toPage是一个字符串简单的转换它
				triggerData.absUrl = $ .mobile.path.makeUrlAbsolute（to，this._findBaseWithDefault（））;
			} else {
				//如果toPage是一个jQuery对象，抓住绝对URL存储
				//在其存在的loadPage回调中
				triggerData.absUrl = settings.absUrl;
			}

			//让听众知道我们即将更改当前页面。
			returnEvents = this._triggerWithDeprecated（“beforechange”，triggerData）;

			//如果默认行为被阻止，请停在这里！
			if（returnEvents.event.isDefaultPrevented（）||
				returnEvents.deprecatedEvent.isDefaultPrevented（））{
				返回假
			}

			返回真
		}，

		change：function（to，options）{
			//如果我们处于转换期间，请对当前请求进行排队。
			//一旦完成了当前的转换，我们将调用changePage（）
			//来服务请求。
			if（isPageTransitioning）{
				pageTransitionQueue.unshift（arguments）;
				返回;
			}

			var settings = $ .extend（{}，$ .mobile.changePage.defaults，options），
				triggerData = {};

			//确保我们有一个fromPage。
			settings.fromPage = settings.fromPage || this.activePage;

			//如果页面beforechange默认是防止早期返回
			if（！this._triggerPageBeforeChange（to，triggerData，settings））{
				返回;
			}

			//我们允许“pagebeforechange”观察者修改to in
			//触发数据允许重定向。确保我们是
			// 更新。我们还需要重新评估是否是字符串，
			//因为一个对象也可以被一个字符串替换
			to = triggerData.toPage;

			//如果调用者向我们传递了一个url，请调用loadPage（）
			//确保它被加载到DOM中。我们会听
			//返回的承诺对象，所以我们知道什么时候
			//它是加载完成的，如果发生错误的话。
			if（$ .type（to）===“string”）{
				//设置isPageTransitioning标志以防止任何请求
				//在加载页面时输入此方法
				//或转换
				isPageTransitioning = true;

				this._loadUrl（to，triggerData，settings）;
			} else {
				this.transition（to，triggerData，settings）;
			}
		}，

		transition：function（toPage，triggerData，settings）{
			var fromPage，url，pageUrl，fileUrl，
				active，activeIsInitialPage，
				historyDir，pageTitle，isDialog，
				已经在这里，newPageTitle，
				params，cssTransitionDeferred，
				beforeTransition;

			//如果我们处于转换期间，请对当前请求进行排队。
			//一旦完成了当前的转换，我们将调用changePage（）
			//来服务请求。
			if（isPageTransitioning）{
				//确保只将队列和设置值作为参数
				//使用调用更改方法
				pageTransitionQueue.unshift（[toPage，settings]）;
				返回;
			}

			// DEPRECATED  - 这个电话只有，有利于转换前
			//如果页面beforechange默认是防止早期返回
			if（！this._triggerPageBeforeChange（toPage，triggerData，settings））{
				返回;
			}

			triggerData.prevPage = settings.fromPage;
			//如果（内容|页面）beforetransition default被阻止返回提前
			//注意，我们必须检查已弃用的和新的事件
			beforeTransition = this._triggerWithDeprecated（“beforetransition”，triggerData）;
			if（beforeTransition.deprecatedEvent.isDefaultPrevented（）||
				beforeTransition.event.isDefaultPrevented（））{
				返回;
			}

			//设置isPageTransitioning标志以防止任何请求
			//在加载页面时输入此方法
			//或转换
			isPageTransitioning = true;

			//如果我们要去应用程序的第一页，我们需要做
			//将settings.dataUrl设置为应用程序文档url。这允许
			//我们避免生成带有id哈希的文档url，在这种情况下
			//文档的第一页具有指定的id属性。
			if（toPage [0] === $ .mobile.firstPage [0] &&！settings.dataUrl）{
				settings.dataUrl = $ .mobile.path.documentUrl.hrefNoHash;
			}

			//调用者向我们传递了一个真正的页面DOM元素。更新我们的
			//内部状态，然后触发到页面的转换。
			fromPage = settings.fromPage;
			url =（settings.dataUrl && $ .mobile.path.convertUrlToDataUrl（settings.dataUrl））||
				toPage.jqmData（“url”）;

			// pageUrl var通常与url相同，除非url被遮蔽
			//作为对话框的URL。pageUrl始终包含文件路径
			pageUrl = url;
			fileUrl = $ .mobile.path.getFilePath（url）;
			active = $ .mobile.navigate.history.getActive（）;
			activeIsInitialPage = $ .mobile.navigate.history.activeIndex === 0;
			historyDir = 0;
			pageTitle = document.title;
			isDialog =（settings.role ===“对话框”||
				toPage.jqmData（“role”）===“对话框”）&&
				toPage.jqmData（“dialog”）！== true;

			//默认情况下，我们在fromPage和toPage中阻止changePage请求
			//是相同的元素，但是生成内容的人
			//手动/动态地重新使用页面，希望能够转换到
			//同一页 为了允许这一点，他们将需要更改默认值
			//将allowSamePageTransition的值设置为true，* OR *，将其作为
			//选项当他们手动调用changePage（）。应该指出的是
			//我们的默认转换动画假定formPage和toPage
			//是不同的元素，因此它们可能会出现意外。这取决于
			//打开allowSamePageTransitiona选项的开发人员
			//关闭转换动画，或者确保适当的
			//使用动画转换。
			if（fromPage && fromPage [0] === toPage [0] &&
				！settings.allowSamePageTransition）{

				isPageTransitioning = false;
				this._triggerWithDeprecated（“transition”，triggerData）;
				this._triggerWithDeprecated（“change”，triggerData）;

				//即使没有页面更改完成，我们也应该保留
				// urlHistory与哈希更改同步
				if（settings.fromHashChange）{
					$ .mobile.navigate.history.direct（{url：url}）;
				}

				返回;
			}

			//我们需要确保我们给出的页面已经被增强了。
			toPage.page（{role：settings.role}）;

			//如果changePage请求是从hashChange事件发送的，请检查
			//查看页面是否已经在urlHistory堆栈内。如果是这样，我们会的
			//假设用户点击前进/后退按钮，并尝试匹配
			//相应地进行转换
			if（settings.fromHashChange）{
				historyDir = settings.direction ===“back”？-1：1;
			}

			//杀死键盘
			// XXX_jblas：我们需要停止抓取整个文档以消除焦点。
			//相反，我们应该使用delegate（）跟踪焦点
			//处理程序，所以我们已经有了这个元素
			//点。
			//将它放在try / catch块中，因为IE9抛出“未指定错误”if
			//当我们在一个IFrame中时，document.activeElement是未定义的。
			尝试{
				if（document.activeElement &&
					document.activeElement.nodeName.toLowerCase（）！==“body”）{

					$（document.activeElement）.blur（）;
				} else {
					$（“input：focus，textarea：focus，select：focus”）.blur（）;
				}
			} catch（e）{}

			//记录我们是否处于历史上一个对话过程中的一个地方 - 
			//如果是这样，不要添加新的历史记录条目，也不要更改哈希
			alreadyThere = false;

			//如果我们将页面显示为对话框，我们不需要该网址
			//用于在哈希中使用的对话框内容。相反，我们想要
			//将dialogHashKey附加到当前页面的url。
			if（isDialog && active）{
				//在初始页面上加载active.url是未定义的，在这种情况下
				//应该是一个空字符串。将未定义的 - >空字符串移回
				//进入urlHistory.addNew似乎没有明确的定义更好
				//表示url状态

				//如果我们在历史上曾经属于对话的地方，重用
				//这个状态没有添加到urlHistory并且没有修改
				//哈希。但是，如果此时已经显示了一个对话框
				//我们要显示另一个对话框，然后我们必须添加另一个哈希
				//和历史条目在顶部，以便人们可以导航回
				//原始对话框
				if（active.url &&
					active.url.indexOf（$ .mobile.dialogHashKey）> -1 &&
					this.activePage &&
					！this.activePage.hasClass（“ui-dialog”）&&
					$ .mobile.navigate.history.activeIndex> 0）{

					settings.changeHash = false;
					alreadyThere = true;
				}

				//通常，我们打开一个对话框哈希键，但如果这是位置
				//一个陈旧的对话框，我们重复使用条目中的URL
				url =（active.url ||“”）;

				//占用绝对网址，而不是相对网址用作哈希
				if（！alreadyThere && url.indexOf（“＃”）> -1）{
					url + = $ .mobile.dialogHashKey;
				} else {
					url + =“＃”+ $ .mobile.dialogHashKey;
				}
			}

			//如果没有找到标题元素，也尝试页面div数据attr
			//如果这是一个深层链接或重新加载（活动===未定义），那么只是
			//使用pageTitle
			newPageTitle =（！active）？pageTitle：toPage.jqmData（“title”）||
				toPage.children（“：jqmData（role ='header'）”）.find（“.ui-title”）.text（）;
			if（!! newPageTitle && pageTitle === document.title）{
				pageTitle = newPageTitle;
			}
			if（！toPage.jqmData（“title”））{
				toPage.jqmData（“title”，pageTitle）;
			}

			//确保我们有一个定义的转换。
			settings.transition = settings.transition ||
				（（historyDir &&！activeIsInitialPage）？active.transition：undefined）||
				（isDialog？$ .mobile.defaultDialogTransition：$ .mobile.defaultPageTransition）;

			//将页面添加到历史堆栈，如果它不是返回或转发
			if（！historyDir && alreadyThere）{
				$ .mobile.navigate.history.getActive（）。pageUrl = pageUrl;
			}

			//设置位置哈希。
			if（url &&！settings.fromHashChange）{

				//在这里重新构建哈希，因为我们早点松开它
				// TODO保留最初传入的路径
				if（！$。mobile.path.isPath（url）&& url.indexOf（“＃”）<0）{
					url =“＃”+ url;
				}

				// TODO这里的属性名称只是愚蠢的
				params = {
					转换：settings.transition，
					标题：pageTitle，
					pageUrl：pageUrl，
					角色：settings.role
				};

				if（settings.changeHash！== false && $ .mobile.hashListeningEnabled）{
					$ .mobile.navigate（this.window [0] .encodeURI（url），params，true）;
				} else if（toPage [0]！== $ .mobile.firstPage [0]）{
					$ .mobile.navigate.history.add（url，params）;
				}
			}

			//设置页面标题
			document.title = pageTitle;

			//将“toPage”设置为在1.4中删除的activePage已被弃用
			$ .mobile.activePage = toPage;

			//处理activePage的新方式
			this.activePage = toPage;

			//如果我们在U​​RL历史记录中导航，请相应地设置相反。
			settings.reverse = settings.reverse || historyDir <0;

			cssTransitionDeferred = $ .Deferred（）;

			this._cssTransition（toPage，fromPage，{
				转换：settings.transition，
				反向：settings.reverse，
				deferred：cssTransitionDeferred
			}）;

			cssTransitionDeferred.done（$。proxy（function（name，reverse，$ to，$ from，alreadyFocused）{
				$ .mobile.removeActiveLinkClass（）;

				//如果有一个duplicateCachedPage，请将其从DOM中删除，因为它已被隐藏
				if（settings.duplicateCachedPage）{
					settings.duplicateCachedPage.remove（）;
				}

				//尽管可见性：隐藏地址问题＃2965
				// https://github.com/jquery/jquery-mobile/issues/2965
				if（！alreadyFocused）{
					$ .mobile.focusPage（toPage）;
				}

				this._releaseTransitionLock（）;
				this._triggerWithDeprecated（“transition”，triggerData）;
				this._triggerWithDeprecated（“change”，triggerData）;
			}， 这个））;
		}，

		//确定当前的基本URL
		_findBaseWithDefault：function（）{
			var nearestBase =（this.activePage &&
			$ .mobile.getClosestBaseUrl（this.activePage））;
		return nearestBase || $ .mobile.path.documentBase.hrefNoHash;
		}
	}）;

	//在触发mobileinit之后，应该绑定以下处理程序
	//以下延迟在init文件中解析
	$ .mobile.navreadyDeferred = $ .Deferred（）;

	//这些变量使所有页面容器都使用相同的队列，并且一次只能导航一个
	// queue to hold simultanious page transitions
	var pageTransitionQueue = []，

		//表示页面是否处于转换过程中
		isPageTransitioning = false;

}）（jQuery）;

（function（$，undefined）{

		//在domready上解决
	var domreadyDeferred = $ .Deferred（），

		//在window.load（）上解析并清空
		loadDeferred = $ .Deferred（），

		//函数解析上述延迟
		pageIsFullyLoaded = function（）{

			//解析并取消延迟
			loadDeferred.resolve（）;
			loadDeferred = null;
		}，

		documentUrl = $ .mobile.path.documentUrl，

		//用于跟踪最后一个vclicked元素，以确保其值被添加以形成数据
		$ lastVClicked = null;

	/ *事件绑定 -  hashchange，提交并单击* /
	function findClosestLink（ele）{
		而（ele）{
			//查找nodeName为“a”的最近的元素。
			//请注意，我们正在检查我们是否有一个有效的nodeName
			//尝试访问它之前。这是因为
			//我们调用的节点可能来自内部
			//一个嵌入的SVG文档，其中有一些符号实例元素
			//没有在其上定义nodeName，或者字符串是类型
			// SVGAnimatedString。
			if（（typeof ele.nodeName ===“string”）&& ele.nodeName.toLowerCase（）===“a”）{
				打破;
			}
			ele = ele.parentNode;
		}
		返回ele
	}

	$ .mobile.loadPage = function（url，opts）{
		var容器

		opts = opts || {};
		container =（opts.pageContainer || $ .mobile.pageContainer）;

		//创建将被提供给loadPage调用者的延迟
		//并通过内容小部件的加载方法进行解析
		opts.deferred = $ .Deferred（）;

		//最好允许未初始化的opts.pageContainer异常
		//小部件，所以我们知道如果我们需要强制init这里给用户
		container.pagecontainer（“load”，url，opts）;

		//提供延期
		return opts.deferred.promise（）;
	};

	//定义vars进行内部使用

	/ *内部效用函数* /

	//注意问题＃4950 Android phonegap没有正确导航
	//完成全页刷新时。看来hashchange
	//和replacestate历史变更工作正常，但我们需要支持
	//这两种形式的历史遍历在我们使用向后历史的代码中
	//运动
	$ .mobile.back = function（）{
		var nav = window.navigator;

		//如果设置为开，导航器对象为
		//可用使用电话沟通导航功能
		if（this.phonegapNavigationEnabled &&
			导航&&
			nav.app &&
			nav.app.backHistory）{
			nav.app.backHistory（）;
		} else {
			$ .mobile.pageContainer.pagecontainer（“back”）;
		}
	};

	//直接关注页面标题，否则第一个可聚焦元素
	$ .mobile.focusPage = function（page）{
		var autofocus = page.find（“[autofocus]”），
			pageTitle = page.find（“.ui-title：eq（0）”）;

		if（autofocus.length）{
			autofocus.focus（）;
			返回;
		}

		if（pageTitle.length）{
			pageTitle.focus（）;
		} else {
			page.focus（）;
		}
	};

	//没有实现过渡退化
	$ .mobile._maybeDegradeTransition = $ .mobile._maybeDegradeTransition || 功能（转换）{
		回归过渡;
	};

	//暴露的$ .mobile方法

	$ .mobile.changePage = function（to，options）{
		$ .mobile.pageContainer.pagecontainer（“change”，to，options）;
	};

	$ .mobile.changePage.defaults = {
		过渡：未定义，
		反向：假，
		changeHash：true，
		fromHashChange：false，
		角色：undefined，//默认情况下，我们依赖于@ data-role属性定义的角色。
		duplicateCachedPage：未定义，
		pageContainer：undefined，
		showLoadMsg：true，//加载消息默认显示页面在更改页面期间被抓取
		dataUrl：undefined，
		fromPage：未定义，
		allowSamePageTransition：false
	};

	$ .mobile._registerInternalEvents = function（）{
		var getAjaxFormData = function（$ form，calculateOnly）{
			var url，ret = true，formData，vclickedName，method;
			if（！$。mobile.ajaxEnabled ||
					//测试表单本身是ajax false
					$ form.is（“：jqmData（ajax ='false'）”）||
					//测试$ .mobile.ignoreContentEnabled设置为
					//表单或其父母之一是ajax = false
					！$ form.jqmHijackable（）。length ||
					$ form.attr（“target”））{
				返回假
			}

			url =（$ lastVClicked && $ lastVClicked.attr（“formaction”））||
				$ form.attr（“action”）;
			method =（$ form.attr（“method”）||“get”）.toLowerCase（）;

			//如果没有指定任何操作，则浏览器默认使用
			//包含表单的文档的URL。由于我们动态
			//从外部文件拉入页面，表单应该提交
			//到包含该页面的源文档的URL
			// 表格。
			if（！url）{
				//获取包含表单的页面的@ data-url。
				url = $ .mobile.getClosestBaseUrl（$ form）;

				//注意：如果方法是“get”，我们需要删除查询字符串
				//因为它将被新的表单数据替换。请参阅问题＃5710。
				if（method ===“get”）{
					url = $ .mobile.path.parseUrl（url）.hrefNoSearch;
				}

				if（url === $ .mobile.path.documentBase.hrefNoHash）{
					//我们回来的网址与文档基础相匹配，
					//这意味着页面必须是内部/嵌入页面，
					//所以默认使用实际的文档url作为浏览器
					// 将。
					url = documentUrl.hrefNoSearch;
				}
			}

			url = $ .mobile.path.makeUrlAbsolute（url，$ .mobile.getClosestBaseUrl（$ form））;

			if（（$ .mobile.path.isExternal（url）&&！$。mobile.path.isPermittedCrossDomainRequest（documentUrl，url）））{
				返回假
			}

			if（！calculateOnly）{
				formData = $ form.serializeArray（）;

				if（$ lastVClicked && $ lastVClicked [0] .form === $ form [0]）{
					vclickedName = $ lastVClicked.attr（“name”）;
					if（vclickedName）{
						//确保表单中包含最后点击的元素
						$ .each（formData，function（key，value）{
							if（value.name === vclickedName）{
								//取消设置vclickedName  - 我们已经在序列化数据中找到它
								vclickedName =“”;
								返回假
							}
						}）;
						if（vclickedName）{
							formData.push（{name：vclickedName，value：$ lastVClicked.attr（“value”）}）;
						}
					}
				}

				ret = {
					url：url，
					选项：{
						类型：方法，
						data：$ .param（formData），
						transition：$ form.jqmData（“transition”），
						reverse：$ form.jqmData（“direction”）===“reverse”，
						reloadPage：true
					}
				};
			}

			退回
		};

		//绑定到表单提交事件，使用Ajax处理
		$ .mobile.document.delegate（“form”，“submit”，function（event）{
			var formData;

			if（！event.isDefaultPrevented（））{
				formData = getAjaxFormData（$（this））;
				if（formData）{
					$ .mobile.changePage（formData.url，formData.options）;
					event.preventDefault（）;
				}
			}
		}）;

		//在vclick中添加活动状态
		$ .mobile.document.bind（“vclick”，function（event）{
			var $ btn，btnEls，target = event.target，needClosest = false;
			//如果这不是左键，我们不在乎。重要的是要注意
			//当虚拟事件生成时，它将创建哪个attr
			if（event.which> 1 ||！$。mobile.linkBindingEnabled）{
				返回;
			}

			//记录该元素被点击，以防我们需要它正确
			//在上面的“提交”处理器中提交表单
			$ lastVClicked = $（target）;

			//尝试找到要应用活动类的目标元素
			if（$ .data（target，“mobile-button”））{
				//如果表单不会通过AJAX提交，请不要​​添加活动类
				if（！getAjaxFormData（$（target）.closest（“form”），true））{
					返回;
				}
				//我们将应用活动状态到这个按钮小部件 - 父级
				//点击的输入将具有关联的数据
				if（target.parentNode）{
					target = target.parentNode;
				}
			} else {
				target = findClosestLink（target）;
				if（！（target && $ .mobile.path.parseUrl（target.getAttribute（“href”）||“＃”）.hash！==“＃”））{
					返回;
				}

				// TODO教$ .mobile.hijackable对原始dom元素进行操作
				//可以避免链接包装
				if（！$（target）.jqmHijackable（）。length）{
					返回;
				}
			}

			//避免使用.buttonMarkup（）中的数据集来调用.closest
			//列出项目中所有元素的父项中都有按钮数据
			if（!!〜target.className.indexOf（“ui-link-inherit”））{
				if（target.parentNode）{
					btnEls = $ .data（target.parentNode，“buttonElements”）;
				}
			//否则，查找目标本身的数据
			} else {
				btnEls = $ .data（target，“buttonElements”）;
			}
			//如果找到，请抓住按钮的外部元素
			if（btnEls）{
				target = btnEls.outer;
			} else {
				needClosest = true;
			}

			$ btn = $（target）;
			//如果外部元素未被我们的启发式查找，请使用.closest（）
			if（needClosest）{
				$ btn = $ btn.closest（“.ui-btn”）;
			}

			if（$ btn.length> 0 &&
				！（$ btn.hasClass（“ui-state-disabled”||

					// DEPRECATED as as 1.4.0  -  remove after 1.4.0 release
					//此后应该仅存在ui-state-disabled
					$ btn.hasClass（“ui-disabled”））））{
				$ .mobile.removeActiveLinkClass（true）;
				$ .mobile.activeClickedLink = $ btn;
				$ .mobile.activeClickedLink.addClass（$ .mobile.activeBtnClass）;
			}
		}）;

		//单击路由 - 相应地直接指向HTTP或Ajax
		$ .mobile.document.bind（“click”，function（event）{
			if（！$。mobile.linkBindingEnabled || event.isDefaultPrevented（））{
				返回;
			}

			var link = findClosestLink（event.target），
				$ link = $（link），

				//删除活动链接类如果外部（如果你不回来就不会）
				httpCleanup = function（）{
					window.setTimeout（function（）{$ .mobile.removeActiveLinkClass（true）;}，200）;
				}，
				baseUrl，href，
				useDefaultUrlHandling，isExternal，
				过渡，逆转，角色;

			//如果点击一个按钮，请清理vclick上面添加的活动类
			if（$ .mobile.activeClickedLink &&
				$ .mobile.activeClickedLink [0] === event.target.parentNode）{
				httpCleanup（）;
			}

			//如果没有与点击相关的链接，或者不是左侧的链接
			//点击我们要忽略的点击
			// TODO教$ .mobile.hijackable来操作原始dom元素，以便链接包装
			//可以避免
			if（！link || event.which> 1 ||！$ link.jqmHijackable（）。length）{
				返回;
			}

			//如果有一个data-rel = back attr，请回到历史记录
			if（$ link.is（“：jqmData（rel ='back'）”））{
				$ .mobile.back（）;
				返回假
			}

			baseUrl = $ .mobile.getClosestBaseUrl（$ link）;

			// get href，如果定义，否则默认为空哈希
			href = $ .mobile.path.makeUrlAbsolute（$ link.attr（“href”）||“＃”，baseUrl）;

			//如果ajax被禁用，提前退出
			if（！$。mobile.ajaxEnabled &&！$。mobile.path.isEmbeddedPage（href））{
				httpCleanup（）;
				//使用默认点击处理
				返回;
			}

			// XXX_jblas：理想的链接到应用页面应该被指定为
			//具有哈希值的应用程序文档的URL
			//站点相对路径或页面的id。但有些
			//动态生成嵌套的子页面的内部代码
			//列出并选择对话框，只需在链接中写一个哈希
			// 创建。这意味着实际的URL路径是基于什么
			//基本标签的当前值是在此代码的时候
			// 叫做。
			if（href.search（“＃”）！== -1 &&
				！（$ .mobile.path.isExternal（href）&& $ .mobile.path.isAbsoluteUrl（href）））{

				href = href.replace（/ [^＃] *＃/，“”）;
				if（！href）{
					//链接是一个空的哈希意味着纯粹的
					//为了交互，所以我们忽略它。
					event.preventDefault（）;
					返回;
				} else if（$ .mobile.path.isPath（href））{
					//我们有apath，所以使它成为我们要加载的href。
					href = $ .mobile.path.makeUrlAbsolute（href，baseUrl）;
				} else {
					//我们有一个简单的id，所以使用documentUrl作为它的基础。
					href = $ .mobile.path.makeUrlAbsolute（“＃”+ href，documentUrl.hrefNoHash）;
				}
			}

			//我们应该处理这个链接，还是让浏览器处理？
			useDefaultUrlHandling = $ link.is（“[rel ='external']”）|| $ link.is（“：jqmData（ajax ='false'）”）|| $ link.is（“[target]”）;

			//某些嵌入式浏览器，如Phone Gap中的Web视图，允许跨域XHR
			//请求，如果执行请求的文档是通过file：//协议加载的。
			//这通常是允许应用程序“回家”并获取应用程序的具体内容
			//数据。我们通常让浏览器处理外部/跨域网址，但如果
			// allowCrossDomainPages选项是true，我们将允许跨域http / https
			//请求通过我们的页面加载逻辑。

			//检查协议或rel，而不是嵌入页面
			//来自isExternal的TODO逻辑重叠，rel = external check应该是
			//进入更全面的isExternalLink
			isExternal = useDefaultUrlHandling || （$ .mobile.path.isExternal（href）&&！$。mobile.path.isPermittedCrossDomainRequest（documentUrl，href））;

			if（isExternal）{
				httpCleanup（）;
				//使用默认点击处理
				返回;
			}

			//使用ajax
			transition = $ link.jqmData（“transition”）;
			reverse = $ link.jqmData（“direction”）===“reverse”||
						//弃用 - 删除1.0
						$ link.jqmData（“back”）;

			//这可能需要更具体，因为我们使用data-rel更多
			role = $ link.attr（“data-”+ $ .mobile.ns +“rel”）|| 不确定的;

			$ .mobile.changePage（href，{transition：transition，reverse：reverse，role：role，link：$ link}）;
			event.preventDefault（）;
		}）;

		//遇到具有数据预取功能的锚点时，预取页面
		$ .mobile.document.delegate（“.ui-page”，“pageshow.prefetch”，function（）{
			var urls = [];
			$（this）.find（“a：jqmData（prefetch）”）.each（function（）{
				var $ link = $（this），
					url = $ link.attr（“href”）;

				if（url && $ .inArray（url，urls）=== -1）{
					urls.push（url）;

					$ .mobile.loadPage（url，{role：$ link.attr（“data-”+ $ .mobile.ns +“rel”），prefetch：true}）;
				}
			}）;
		}）;

		// TODO确保内容小部件中的导航绑定发生在正确的时间
		$ .mobile.pageContainer.pagecontainer（）;

		//设置页面最小高度是设备特定的
		$ .mobile.document.bind（“pageshow”，function（）{

			//我们需要等待window.load来确保样式已经被渲染，
			//否则外部工具栏的高度会有错误的值
			if（loadDeferred）{
				loadDeferred.done（$ .mobile.resetActivePageHeight）;
			} else {
				$ .mobile.resetActivePageHeight（）;
			}
		}）;
		$ .mobile.window.bind（“throttledresize”，$ .mobile.resetActivePageHeight）;

	}; // navreadyDeferred done回调

	$（function（）{domreadyDeferred.resolve（）;}）;

	//记录加载事件已经触发的可能性
	if（document.readyState ===“complete”）{
		pageIsFullyLoaded（）;
	} else {
		$ .mobile.window.load（pageIsFullyLoaded）;
	}

	$ .when（domreadyDeferred，$ .mobile.navreadyDeferred）.done（function（）{$ .mobile._registerInternalEvents（）;}）;
}）（jQuery）;


（function（$，window，undefined）{

	// TODO删除对$ .mobile和属性的直接引用，我们应该
	//赞成使用参数注入构造函数
	$ .mobile.Transition = function（）{
		this.init.apply（this，arguments）;
	};

	$ .extend（$。mobile.Transition.prototype，{
		toPreClass：“ui-page-pre-in”，

		init：function（name，reverse，$ to，$ from）{
			$ .extend（this，{
				名称：名称，
				反向：反向，
				$ to：$ to，
				$ from：$ from，
				deferred：new $ .Deferred（）
			}）;
		}，

		cleanFrom：function（）{
			这从$
				.removeClass（$ .mobile.activePageClass +“out in reverse”+ this.name）
				.height（“”）;
		}，

		//由子对象原型覆盖的注释，noop'd这里作为默认值
		beforeDoneIn：function（）{}，
		beforeDoneOut：function（）{}，
		beforeStartOut：function（）{}，

		doneIn：function（）{
			this.beforeDoneIn（）;

			this。$ to.removeClass（“out in reverse”+ this.name）.height（“”）;

			this.toggleViewportClass（）;

			//在某些浏览器（iOS5）中，3D转换阻止在转换期间滚动到所需位置的功能
			//这确保了我们在事实之后跳到那个地方，如果我们不在那里。
			if（$ .mobile.window.scrollTop（）！== this.toScroll）{
				this.scrollPage（）;
			}
			if（！this.sequential）{
				这个$ to.addClass（$ .mobile.activePageClass）;
			}
			this.deferred.resolve（this.name，this.reverse，this。$ to，this。$ from，true）;
		}，

		doneOut：function（screenHeight，reverseClass，none，preventFocus）{
			this.beforeDoneOut（）;
			this.startIn（screenHeight，reverseClass，none，preventFocus）;
		}，

		hideIn：function（callback）{
			//防止在手机容器中闪烁：请参阅＃4024关于iOS的注释
			这个。$ to.css（“z-index”，-10）;
			callback.call（this）;
			这个$ to.css（“z-index”，“”）;
		}，

		scrollPage：function（）{
			//通过使用scrollTo而不是silentScroll，我们可以保持更好的顺序
			//只是为了防止，禁用scrollstart听如silentScroll会
			$ .event.special.scrollstart.enabled = false;
			//如果我们隐藏URL栏或页面以前滚动滚动隐藏或返回到位置
			if（$ .mobile.hideUrlBar || this.toScroll！== $ .mobile.defaultHomeScroll）{
				window.scrollTo（0，this.toScroll）;
			}

			// reenable scrollstart listen like silentScroll will
			setTimeout（function（）{
				$ .event.special.scrollstart.enabled = true;
			}，150）;
		}，

		startIn：function（screenHeight，reverseClass，none，preventFocus）{
			this.hideIn（function（）{
				这个$ to.addClass（$ .mobile.activePageClass + this.toPreClass）;

				//将焦点发送到页面，现在显示：block
				if（！preventFocus）{
					$ .mobile.focusPage（this。$ to）;
				}

				//设置为页面高度
				这个。$ to.height（screenHeight + this.toScroll）;

                if（！none）{
                    this.scrollPage（）;
                }
			}）;

			这一点。$至
				.removeClass（this.toPreClass）
				.addClass（this.name +“in”+ reverseClass）;

			if（！none）{
				这个$ to.animationComplete（$ .proxy（function（）{
					this.doneIn（）;
				}， 这个 ））;
			} else {
				this.doneIn（）;
			}

		}，

		startOut：function（screenHeight，reverseClass，none）{
			this.beforeStartOut（screenHeight，reverseClass，none）;

			//设置页面的高度并开始转换
			//注意：设置显式高度有助于消除转换中的平铺
			这从$
				.height（screenHeight + $ .mobile.window.scrollTop（））
				.addClass（this.name +“out”+ reverseClass）;
		}，

		toggleViewportClass：function（）{
			$ .mobile.pageContainer.toggleClass（“ui-mobile-viewport-transitioning viewport-”+ this.name）;
		}，

		transition：function（）{
			//注意许多这些可以在构造函数中计算/记录，这是我的
			//尽可能晚地约束他们的意见有价值
			//更好的转换与更少的错误。也就是说，不能保证
			//对象将被创建，转换将在之后立即运行
			//今天是 所以我们等到转换被调用来收集以下内容
			无无，
				reverseClass = this.reverse？“反向”：“”，
				screenHeight = $ .mobile.getScreenHeight（），
				maxTransitionOverride = $ .mobile.maxTransitionWidth！== false &&
					$ .mobile.window.width（）> $ .mobile.maxTransitionWidth;

			this.toScroll = $ .mobile.navigate.history.getActive（）。lastScroll || $ .mobile.defaultHomeScroll;

			none =！$。support.cssTransitions || ！$。support.cssAnimations ||
				maxTransitionOverride || ！this.name || this.name ===“none”||
				Math.max（$ .mobile.window.scrollTop（），this.toScroll）>
					$ .mobile.getMaxScrollForTransition（）;

			this.toggleViewportClass（）;

			if（this。$ from &&！none）{
				this.startOut（screenHeight，reverseClass，none）;
			} else {
				this.doneOut（screenHeight，reverseClass，none，true）;
			}

			return this.deferred.promise（）;
		}
	}）;
}）（jQuery，this）;


（function（$）{

	$ .mobile.SerialTransition = function（）{
		this.init.apply（this，arguments）;
	};

	$ .extend（$。mobile.SerialTransition.prototype，$ .mobile.Transition.prototype，{
		顺序：真，

		beforeDoneOut：function（）{
			if（this。$ from）{
				this.cleanFrom（）;
			}
		}，

		beforeStartOut：function（screenHeight，reverseClass，none）{
			这个$ from.animationComplete（$。proxy（function（）{
				this.doneOut（screenHeight，reverseClass，none）;
			}， 这个 ））;
		}
	}）;

}）（jQuery）;


（function（$）{

	$ .mobile.ConcurrentTransition = function（）{
		this.init.apply（this，arguments）;
	};

	$ .extend（$。mobile.ConcurrentTransition.prototype，$ .mobile.Transition.prototype，{
		顺序：假，

		beforeDoneIn：function（）{
			if（this。$ from）{
				this.cleanFrom（）;
			}
		}，

		beforeStartOut：function（screenHeight，reverseClass，none）{
			this.doneOut（screenHeight，reverseClass，none）;
		}
	}）;

}）（jQuery）;


（function（$）{

	//从上面生成处理程序
	var defaultGetMaxScrollForTransition = function（）{
		return $ .mobile.getScreenHeight（）* 3;
	};

	//第三方转换的转换处理程序字典
	$ .mobile.transitionHandlers = {
		“顺序”：$ .mobile.SerialTransition，
		“simultaneous”：$ .mobile.ConcurrentTransition
	};

	//使我们的转换处理程序成为公共默认。
	$ .mobile.defaultTransitionHandler = $ .mobile.transitionHandlers.sequential;

	$ .mobile.transitionFallbacks = {};

	//如果定义了转换，则检查是否支持css 3D转换，如果不支持，则指定回退
	$ .mobile._maybeDegradeTransition = function（transition）{
		if（transition &&！$。support.cssTransform3d && $ .mobile.transitionFallbacks [transition]）{
			transition = $ .mobile.transitionFallbacks [transition];
		}

		回归过渡;
	};

	//如果用户没有设置实现，则将getMaxScrollForTransition设置为默认值
	$ .mobile.getMaxScrollForTransition = $ .mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;

}）（jQuery）;

/ *
*在非3D支持浏览器中翻转的后退转换（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

$ .mobile.transitionFallbacks.flip =“fade”;

}）（jQuery，this）;

/ *
*在非3D支持浏览器中流动的后退转换（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

$ .mobile.transitionFallbacks.flow =“fade”;

}）（jQuery，this）;

/ *
*非3D支持浏览器中的弹出式回退转换（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

$ .mobile.transitionFallbacks.pop =“fade”;

}）（jQuery，this）;

/ *
*在非3D支持浏览器中滑动的回退过渡（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

//使用同时转换处理程序进行幻灯片切换
$ .mobile.transitionHandlers.slide = $ .mobile.transitionHandlers.simultaneous;

//将幻灯片切换的回退设置为“淡出”
$ .mobile.transitionFallbacks.slide =“fade”;

}）（jQuery，this）;

/ *
*在非3D支持浏览器中滑倒的回退过渡（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

$ .mobile.transitionFallbacks.slidedown =“fade”;

}）（jQuery，this）;

/ *
*非3D支持浏览器中的幻灯片幻灯片的后退转换（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

//将幻灯片切换的回退设置为“淡出”
$ .mobile.transitionFallbacks.slidefade =“fade”;

}）（jQuery，this）;

/ *
*非3D支持浏览器中的滑动的后退转换（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

$ .mobile.transitionFallbacks.slideup =“fade”;

}）（jQuery，this）;

/ *
*在非3D支持浏览器中转向的回退过渡（通常会很难处理复杂的转换）
* /

（function（$，window，undefined）{

$ .mobile.transitionFallbacks.turn =“fade”;

}）（jQuery，this）;


（function（$，undefined）{

$ .mobile.degradeInputs = {
	颜色：假，
	日期：假，
	datetime：false，
	“datetime-local”：false，
	电子邮件：false，
	月：假，
	数字：假，
	范围：“数字”，
	搜索：“文字”，
	电话：假，
	时间：假，
	url：false，
	周：假
};
// Backcompat删除1.5
$ .mobile.page.prototype.options.degradeInputs = $ .mobile.degradeInputs;

//自动自我初始化小部件
$ .mobile.degradeInputsWithin = function（target）{

	target = $（target）;

	//降级输入以避免执行不良的本机功能
	target.find（“input”）.not（$ .mobile.page.prototype.keepNativeSelector（））.each（function（）{
		var element = $（this），
			type = this.getAttribute（“type”），
			optType = $ .mobile.degradeInputs [type] || “文本”，
			html，hasType，findstr，repstr;

		if（$ .mobile.degradeInputs [type]）{
			html = $（“<div>”）.html（element.clone（））.html（）;
			//在IE浏览器中，该类型有时不存在于克隆的标记中，因此我们将替换为结束标记
			hasType = html.indexOf（“type =”）> -1;
			findstr = hasType？/ \ s + type = [“']？\ w + ['”]？/：/ \ /？> /;
			repstr =“type = \”“+ optType +”\“data-”+ $ .mobile.ns +“type = \”“+ type +”\“”+（hasType？“”

			element.replaceWith（html.replace（findstr，repstr））;
		}
	}）;

};

}）（jQuery）;

（function（$，window，undefined）{

$ .widget（“mobile.page”，$ .mobile.page，{
	选项：{

		//接受左，右，无
		closeBtn：“left”，
		closeBTnText：“关闭”，
		overlayTheme：“a”，
		角落：真的，
		对话框：false
	}，

	_create：function（）{
		this._super（）;
		if（this.options.dialog）{

			$ .extend（this，{
				_inner：this.element.children（），
				_headerCloseButton：null
			}）;

			if（！this.options.enhanced）{
				this._setCloseBtn（this.options.closeBtn）;
			}
		}
	}，

	_enhance：function（）{
		this._super（）;

		//为对话样式和包装内部分类标记
		if（this.options.dialog）{
			this.element.addClass（“ui-dialog”）
				.wrapInner（$（“<div />”，{

					// ARIA角色
					“角色”：“对话”，
					“class”：“ui-dialog-containing ui-overlay-shadow”+
						（this.options.corners？“ui-corner-all”：“”）
				}））;
		}
	}，

	_setOptions：function（options）{
		var closeButtonLocation，closeButtonText，
			currentOpts = this.options;

		if（options.corners！== undefined）{
			this._inner.toggleClass（“ui-corner-all”，!! options.corners）;
		}

		if（options.overlayTheme！== undefined）{
			if（$ .mobile.activePage [0] === this.element [0]）{
				currentOpts.overlayTheme = options.overlayTheme;
				this._handlePageBeforeShow（）;
			}
		}

		if（options.closeBtnText！== undefined）{
			closeButtonLocation = currentOpts.closeBtn;
			closeButtonText = options.closeBtnText;
		}

		if（options.closeBtn！== undefined）{
			closeButtonLocation = options.closeBtn;
		}

		if（closeButtonLocation）{
			this._setCloseBtn（closeButtonLocation，closeButtonText）;
		}

		this._super（options）;
	}，

	_handlePageBeforeShow：function（）{
		if（this.options.overlayTheme && this.options.dialog）{
			this.removeContainerBackground（）;
			this.setContainerBackground（this.options.overlayTheme）;
		} else {
			this._super（）;
		}
	}，

	_setCloseBtn：function（location，text）{
		var dst，
			btn = this._headerCloseButton;

		//消除价值
		location =“left”===位置？“左”：“右”===位置？“对”：“无”

		if（“none”=== location）{
			if（btn）{
				btn.remove（）;
				btn = null;
			}
		} else if（btn）{
			btn.removeClass（“ui-btn-left ui-btn-right”）.addClass（“ui-btn-”+ location）;
			if（text）{
				btn.text（text）;
			}
		} else {
			dst = this._inner.find（“：jqmData（role ='header'）”）.first（）;
			btn = $（“<a> </a>”，{
					“href”：“＃”
					“class”：“ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-”+ location
				}）
				.attr（“data-”+ $ .mobile.ns +“rel”，“back”）
				.text（text || this.options.closeBtnText ||“”）
				.prependTo（dst）;
		}

		this._headerCloseButton = btn;
	}
}）;

}）（jQuery，this）;

（function（$，window，undefined）{

$ .widget（“mobile.dialog”，{
	选项：{

		//接受左，右，无
		closeBtn：“left”，
		closeBTnText：“关闭”，
		overlayTheme：“a”，
		角落：真的
	}，

	//覆盖页面显示页面插件设置的主题
	_handlePageBeforeShow：function（）{
		this._isCloseable = true;
		if（this.options.overlayTheme）{
			this.element
				.page（“removeContainerBackground”）
				.page（“setContainerBackground”，this.options.overlayTheme）;
		}
	}，

	_handlePageBeforeHide：function（）{
		this._isCloseable = false;
	}，

	//点击并提交事件：
	//  - 点击和提交应该使用对话框的关闭转换
	//打开，除非在链接/表单上指定了数据转换
	//  - 如果点击位于关闭按钮上，或者链接具有data-rel =“back”
	//它会自然而然地回到历史中
	_handleVClickSubmit：function（event）{
		var attrs，
			$ target = $（event.target）.closest（event.type ===“vclick”？“a”：“form”）;

		if（$ target.length &&！$ target.jqmData（“transition”））{
			attrs = {};
			attrs [“data-”+ $ .mobile.ns +“transition”] =
				（$ .mobile.navigate.history.getActive（）|| {}）[“transition”] ||
				$ .mobile.defaultDialogTransition;
			attrs [“data-”+ $ .mobile.ns +“direction”] =“reverse”;
			$ target.attr（attrs）;
		}
	}，

	_create：function（）{
		var elem = this.element，
			opts = this.options;

		//为对话样式和包装内部分类标记
		elem.addClass（“ui-dialog”）
			.wrapInner（$（“<div />”，{

				// ARIA角色
				“角色”：“对话”，
				“class”：“ui-dialog-containing ui-overlay-shadow”+
					（!! opts.corners？“ui-corner-all”：“”）
			}））;

		$ .extend（this，{
			_isCloseable：false，
			_inner：elem.children（），
			_headerCloseButton：null
		}）;

		this._on（elem，{
			vclick：“_handleVClickSubmit”，
			提交：“_handleVClickSubmit”，
			pagebeforeshow：“_handlePageBeforeShow”，
			pagebeforehide：“_handlePageBeforeHide”
		}）;

		this._setCloseBtn（opts.closeBtn）;
	}，

	_setOptions：function（options）{
		var closeButtonLocation，closeButtonText，
			currentOpts = this.options;

		if（options.corners！== undefined）{
			this._inner.toggleClass（“ui-corner-all”，!! options.corners）;
		}

		if（options.overlayTheme！== undefined）{
			if（$ .mobile.activePage [0] === this.element [0]）{
				currentOpts.overlayTheme = options.overlayTheme;
				this._handlePageBeforeShow（）;
			}
		}

		if（options.closeBtnText！== undefined）{
			closeButtonLocation = currentOpts.closeBtn;
			closeButtonText = options.closeBtnText;
		}

		if（options.closeBtn！== undefined）{
			closeButtonLocation = options.closeBtn;
		}

		if（closeButtonLocation）{
			this._setCloseBtn（closeButtonLocation，closeButtonText）;
		}

		this._super（options）;
	}，

	_setCloseBtn：function（location，text）{
		var dst，
			btn = this._headerCloseButton;

		//消除价值
		location =“left”===位置？“左”：“右”===位置？“对”：“无”

		if（“none”=== location）{
			if（btn）{
				btn.remove（）;
				btn = null;
			}
		} else if（btn）{
			btn.removeClass（“ui-btn-left ui-btn-right”）.addClass（“ui-btn-”+ location）;
			if（text）{
				btn.text（text）;
			}
		} else {
			dst = this._inner.find（“：jqmData（role ='header'）”）.first（）;
			btn = $（“<a> </a>”，{
					“角色”：“按钮”，
					“href”：“＃”
					“class”：“ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-”+ location
				}）
				.text（text || this.options.closeBtnText ||“”）
				.prependTo（dst）;
			this._on（btn，{click：“close”}）;
		}

		this._headerCloseButton = btn;
	}，

	//关闭方法返回历史
	close：function（）{
		var hist = $ .mobile.navigate.history;

		if（this._isCloseable）{
			this._isCloseable = false;
			//如果哈希侦听已启用，并且至少有一个以前的历史记录
			//条目可以返回。具有对话框哈希状态的初始页面是一个示例
			//需要堆栈检查
			if（$ .mobile.hashListeningEnabled && hist.activeIndex> 0）{
				$ .mobile.back（）;
			} else {
				$ .mobile.pageContainer.pagecontainer（“back”）;
			}
		}
	}
}）;

}）（jQuery，this）;

（function（$，undefined）{

var rInitialLetter = /（[AZ]）/ g，

	//从iconpos值构造iconpos类
	iconposClass = function（iconpos）{
		return（“ui-btn-icon-”+（iconpos === null？“left”：iconpos））;
	};

$ .widget（“mobile.collapsible”，{
	选项：{
		增强：假，
		expandCueText：null，
		collapseCueText：null，
		倒塌：真的，
		标题：“h1，h2，h3，h4，h5，h6，legend”，
		collapsedIcon：null，
		expandedIcon：null，
		iconpos：null，
		主题：null，
		contentTheme：null，
		插图：null，
		corner：null，
		迷你：null
	}，

	_create：function（）{
		var elem = this.element，
			ui = {
				手风琴：elem
					.closest（“：jqmData（role ='collapsible-set'）”，“+”
						“：jqmData（role ='collapsibleset'）”+
						（$ .mobile.collapsibleset？“，：mobile-collapsibleset”：
							“”））
					.addClass（“ui-collapsible-set”）
			};

		this._ui = ui
		this._renderedOptions = this._getOptions（this.options）;

		if（this.options.enhanced）{
			ui.heading = this.element.children（“.ui-collapsible-heading”）;
			ui.content = ui.heading.next（）;
			ui.anchor = ui.heading.children（）;
			ui.status = ui.anchor.children（“.ui-collapsible-heading-status”）;
		} else {
			this._enhance（elem，ui）;
		}

		this._on（ui.heading，{
			“tap”：function（）{
				ui.heading.find（“a”）.first（）。addClass（$ .mobile.activeBtnClass）;
			}，

			“click”：function（event）{
				this._handleExpandCollapse（！ui.heading.hasClass（“ui-collapsible-heading-collapse”））;
				event.preventDefault（）;
				event.stopPropagation（）;
			}
		}）;
	}，

	//调整继承值的选项内的键
	_getOptions：function（options）{
		var键，
			手风琴= this._ui.cordcord
			accordionWidget = this._ui.accordionWidget;

		//复制选项
		options = $ .extend（{}，options）;

		if（accordion.length &&！accordionWidget）{
			this._ui.accordionWidget =
			accordionWidget = accordion.data（“mobile-collapsibleset”）;
		}

		for（键入选项）{

			//首先从传递的选项对象中检索选项值，如果
			// null，从父手风琴，或者如果这也是null，或者如果没有
			//父母手风琴，然后从默认值。
			options [key] =
				（options [key]！= null）？选项[key]：
				（手风琴小工具）？accordionWidget.options [key]：
				手风琴长度？$ .mobile.getAttribute（accordion [0]，
					key.replace（rInitialLetter，“ -  $ 1”）.toLowerCase（））：
				空值;

			if（null == options [key]）{
				options [key] = $ .mobile.collapsible.defaults [key];
			}
		}

		退货选择;
	}，

	_themeClassFromOption：function（prefix，value）{
		return（value？（value ===“none”？“”：prefix + value）：“”）;
	}，

	_enhance：function（elem，ui）{
		var iconclass，
			opts = this._renderedOptions，
			contentThemeClass = this._themeClassFromOption（“ui-body-”，opts.contentTheme）;

		elem.addClass（“ui-collapsible”+
			（opts.inset？“ui-collapsible-inset”：“”）+
			（opts.inset && opts.corners？“ui-corner-all”：“”）+
			（contentThemeClass？“ui-collapsible-theme-content”：“”））;
		ui.originalHeading = elem.children（this.options.heading）.first（），
		ui.content = elem
			.wrapInner（“<div”+
				“class ='ui-collapsible-content”+
				contentThemeClass +“'> </ div>”）
			.children（“.ui-collapsible-content”），
		ui.heading = ui.originalHeading

		//如果它是一个图例，替换collapsibleHeading
		if（ui.heading.is（“legend”））{
			ui.heading = $（“<div role ='heading'>”+ ui.heading.html（）+“</ div>”）;
			ui.placeholder = $（“<div> <！ -  legend的占位符 - > </ div>”）.insertBefore（ui.originalHeading）;
			ui.originalHeading.remove（）;
		}

		iconclass =（opts.collapsed？（opts.collapsedIcon？“ui-icon-”+ opts.collapsedIcon：“”）：
			（opts.expandedIcon？“ui-icon-”+ opts.expandedIcon：“”））;

		ui.status = $（“<span class ='ui-collapsible-heading-status'> </ span>”）;
		ui.anchor = ui.heading
			。分离（）
			//修改标记和属性
			.addClass（“ui-collapsible-heading”）
			.append（ui.status）
			.wrapInner（“<a href='#' class='ui-collapsible-heading-toggle'> </a>”）
			。发现” ）
				。第一（）
				.addClass（“ui-btn”+
					（iconclass？iconclass +“”：“”）+
					（iconclass？iconposClass（opts.iconpos）+
						“”：“”）+
					this._themeClassFromOption（“ui-btn-”，opts.theme）+“”+
					（opts.mini？“ui-mini”：“”））;

		//放入前面的内容
		ui.heading.insertBefore（ui.content）;

		this._handleExpandCollapse（this.options.collapsed）;

		返回ui
	}，

	refresh：function（）{
		this._applyOptions（this.options）;
		this._renderedOptions = this._getOptions（this.options）;
	}，

	_applyOptions：function（options）{
		var isCollapsed，newTheme，oldTheme，hasCorners，hasIcon，
			elem = this.element，
			currentOpts = this._renderedOptions，
			ui = this._ui，
			anchor = ui.anchor，
			status = ui.status，
			opts = this._getOptions（options）;

		//首先，我们需要确保可折叠的是正确的
		//状态，以防万一有人决定更改折叠选项
		//与另一个选项相同
		if（options.collapsed！== undefined）{
			this._handleExpandCollapse（options.collapsed）;
		}

		isCollapsed = elem.hasClass（“ui-collapsible-collapse”）;

		//我们只需要立即应用当前状态的提示文本。
		//替代状态的提示文本将存储在选项中
		//并在下一次应用可折叠状态的切换时
		if（isCollapsed）{
			if（opts.expandCueText！== undefined）{
				status.text（opts.expandCueText）;
			}
		} else {
			if（opts.collapseCueText！== undefined）{
				status.text（opts.collapseCueText）;
			}
		}

		//更新图标

		//它应该有一个图标吗？
		hasIcon =

			//如果设置了collapsedIcon，请咨询
			（opts.collapsedIcon！== undefined？opts.collapsedIcon！== false：

				//否则请咨询现有的选项值
				currentOpts.collapsedIcon！== false）;


		//如果任何与图标有关的选项已更改，请确保新图标
		首先删除所有与图标相关的类，反映状态
		//反映当前状态，然后添加所有图标相关
		//新的状态类
		if（！（opts.iconpos === undefined &&
			opts.collapsedIcon === undefined &&
			opts.expandedIcon === undefined））{

			//删除所有当前图标相关的类
			anchor.removeClass（[iconposClass（currentOpts.iconpos）]
				.concat（（currentOpts.expandedIcon？
					[“ui-icon-”+ currentOpts.expandedIcon]：[]））
				.concat（（currentOpts.collapsedIcon？
					[“ui-icon-”+ currentOpts.collapsedIcon]：[]））
				.join（“”））;

			//如果图标应该存在，则添加新类
			if（hasIcon）{
				anchor.addClass（
					[iconposClass（opts.iconpos！== undefined？
						opts.iconpos：currentOpts.iconpos）]
						.concat（isCollapsed？
							[“ui-icon-”+（opts.collapsedIcon！== undefined？
								opts.collapsedIcon：
								currentOpts.collapsedIcon）]：
							[“ui-icon-”+（opts.expandedIcon！== undefined？
								opts.expandedIcon：
								currentOpts.expandedIcon）]）
						.join（“”））;
			}
		}

		if（opts.theme！== undefined）{
			oldTheme = this._themeClassFromOption（“ui-btn-”，currentOpts.theme）;
			newTheme = this._themeClassFromOption（“ui-btn-”，opts.theme）;
			anchor.removeClass（oldTheme）.addClass（newTheme）;
		}

		if（opts.contentTheme！== undefined）{
			oldTheme = this._themeClassFromOption（“ui-body-”，
				currentOpts.contentTheme）;
			newTheme = this._themeClassFromOption（“ui-body-”，
				opts.contentTheme）;
			ui.content.removeClass（oldTheme）.addClass（newTheme）;
		}

		if（opts.inset！== undefined）{
			elem.toggleClass（“ui-collapsible-inset”，opts.inset）;
			hasCorners = !!（opts.inset &&（opts.corners || currentOpts.corners））;
		}

		if（opts.corners！== undefined）{
			hasCorners = !!（opts.corners &&（opts.inset || currentOpts.inset））;
		}

		if（hasCorners！== undefined）{
			elem.toggleClass（“ui-corner-all”，hasCorners）;
		}

		if（opts.mini！== undefined）{
			anchor.toggleClass（“ui-mini”，opts.mini）;
		}
	}，

	_setOptions：function（options）{
		this._applyOptions（options）;
		this._super（options）;
		this._renderedOptions = this._getOptions（this.options）;
	}，

	_handleExpandCollapse：function（isCollapse）{
		var opts = this._renderedOptions，
			ui = this._ui;

		ui.status.text（isCollapse？opt​​s.expandCu eText：opts.collapseCueText）;
		ui.heading
			.toggleClass（“ui-collapsible-heading-collapse”，isCollapse）
			.find（“a”）.first（）
			.toggleClass（“ui-icon-”+ opts.expandedIcon，！isCollapse）

			//逻辑或导致扩展/折叠状态的相同图标将删除ui-icon类
			.toggleClass（“ui-icon-”+ opts.collapsedIcon，（isCollapse || opts.expandedIcon === opts.collapsedIcon））
			.removeClass（$ .mobile.activeBtnClass）;

		this.element.toggleClass（“ui-collapsible-collapse”，isCollapse）;
		ui.content
			.toggleClass（“ui-collapsible-content-collapse”，isCollapse）
			.attr（“aria-hidden”，isCollapse）
			.trigger（“updatelayout”）;
		this.options.collapsed = isCollapse;
		this._trigger（isCollapse？“collapse”：“expand”）;
	}，

	展开：function（）{
		this._handleExpandCollapse（false）;
	}，

	collapse：function（）{
		this._handleExpandCollapse（true）;
	}，

	_destroy：function（）{
		var ui = this._ui，
			opts = this.options;

		if（opts.enhanced）{
			返回;
		}

		if（ui.placeholder）{
			ui.originalHeading.insertBefore（ui.placeholder）;
			ui.placeholder.remove（）;
			ui.heading.remove（）;
		} else {
			ui.status.remove（）;
			ui.heading
				.removeClass（“ui-collapsible-heading ui-collapsible-heading-collapse”）
				。儿童（）
					。内容（）
						.unwrap（）;
		}

		。ui.anchor.contents（）解开（）;
		。ui.content.contents（）解开（）;
		this.element
			.removeClass（“ui-collapsible ui-collapsible-collapse”+
				“ui-collapsible-theme-content ui-collapsible-inset ui-corner-all”）;
	}
}）;

//如果每个实例值，默认值被所有可折叠实例使用
//未设置，或者如果没有通过手风琴的继承来指定。
//请注意，此散列不包含“折叠”或“标题”选项，
//因为那些不可继承。
$ .mobile.collapsible.defaults = {
	expandCueText：“点击展开内容”，
	collapseCueText：“点击折叠内容”，
	collapsedIcon：“plus”，
	contentTheme：“inherit”，
	expandedIcon：“minus”，
	iconpos：“左”，
	插图：真，
	角落：真的，
	主题：“继承”，
	迷你：假
};

}）（jQuery）;

（function（$，undefined）{

var uiScreenHiddenRegex = / \ bui-screen-hidden \ b /;
function noHiddenClass（elements）{
	var指数，
		length = elements.length，
		result = [];

	for（index = 0; index <length; index ++）{
		if（！elements [index] .className.match（uiScreenHiddenRegex））{
			result.push（elements [index]）;
		}
	}

	return $（result）;
}

$ .mobile.behaviors.addFirstLastClasses = {
	_getVisibles：function（$ els，create）{
		var可见

		if（create）{
			visibles = noHiddenClass（$ els）;
		} else {
			visibles = $ els.filter（“：visible”）;
			if（visibles.length === 0）{
				visibles = noHiddenClass（$ els）;
			}
		}

		返回可见;
	}，

	_addFirstLastClasses：function（$ els，$ visibles，create）{
		$ els.removeClass（“ui-first-child ui-last-child”）;
		$ visibles.eq（0）.addClass（“ui-first-child”）.end（）。last（）。addClass（“ui-last-child”）;
		if（！create）{
			this.element.trigger（“updatelayout”）;
		}
	}，

	_removeFirstLastClasses：function（$ els）{
		$ els.removeClass（“ui-first-child ui-last-child”）;
	}
};

}）（jQuery）;

（function（$，undefined）{

var childCollapsiblesSelector =“：mobile-collapsible”，+ $ .mobile.collapsible.initSelector;

$ .widget（“mobile.collapsibleset”，$ .extend（{

	//从1.4.0开始，initSelector已被弃用。在1.5.0中我们将使用
	//：jqmData（role ='collapsibleset'），这将允许我们摆脱这一行
	总之，因为autoinit会生成这样一个initSelector
	initSelector：“：jqmData（role ='collapsible-set'），：jqmData（role ='collapsibleset'）”，

	选项：$ .extend（{
		增强：假
	}，$ .mobile.collapsible.defaults），

	_handleCollapsibleExpand：function（event）{
		var nearestCollapsible = $（event.target）.closest（“.ui-collapsible”）;

		if（nearestCollapsible.parent（）。（“：mobile-collapsibleset，：jqmData（role ='collapsible-set'）”））{
			closestCollapsible
				.siblings（“.ui-collapsible：not（.ui-collapsible-collapse）”）
				可折叠（“崩溃”）;
		}
	}，

	_create：function（）{
		var elem = this.element，
			opts = this.options;

		$ .extend（this，{
			_classes：“”
		}）;

		if（！opts.enhanced）{
			elem.addClass（“ui-collapsible-set”+
				this._themeClassFromOption（“ui-group-theme-”，opts.theme）+“”+
				（opts.corners && opts.inset？“ui-corner-all”：“”））;
			this.element.find（$ .mobile.collapsible.initSelector）.collapsible（）;
		}

		this._on（elem，{collapsibleexpand：“_handleCollapsibleExpand”}）;
	}，

	_themeClassFromOption：function（prefix，value）{
		return（value？（value ===“none”？“”：prefix + value）：“”）;
	}，

	_init：function（）{
		this._refresh（true）;

		//因为这些角是由可折叠本身处理的，默认的状态被折叠
		//这是导致https://github.com/jquery/jquery-mobile/issues/4116
		this.element
			.children（childCollapsiblesSelector）
			.filter（“：jqmData（collapsed ='false'）”）
			可扩展（“扩展”）;
	}，

	_setOptions：function（options）{
		var ret，haveCorners，
			elem = this.element，
			themeClass = this._themeClassFromOption（“ui-group-theme-”，options.theme）;

		if（themeClass）{
			ELEM
				.removeClass（this._themeClassFromOption（“ui-group-theme-”，this.options.theme））
				.addClass（themeClass）;
		}

		if（options.inset！== undefined）{
			hasCorners = !!（options.inset &&（options.corners || this.options.corners））;
		}

		if（options.corners！== undefined）{
			hasCorners = !!（options.corners &&（options.inset || this.options.inset））;
		}

		if（hasCorners！== undefined）{
			elem.toggleClass（“ui-corner-all”，hasCorners）;
		}

		ret = this._super（options）;
		this.element.children（“：mobile-collapseaps”）.collapsible（“refresh”）;
		退回
	}，

	_destroy：function（）{
		var el = this.element;

		this._removeFirstLastClasses（el.children（childCollapsiblesSelector））;
		埃尔
			.removeClass（“ui-collapsible-set ui-corner-all”+
				this._themeClassFromOption（“ui-group-theme-”，this.options.theme））
			.children（“：mobile-collapsible”）
			可拆卸（“毁灭”）;
	}，

	_refresh：function（create）{
		var collapsiblesInSet = this.element.children（childCollapsiblesSelector）;

		this.element.find（$ .mobile.collapsible.initSelector）.not（“.ui-collapseaps”）.collapsible（）;

		this._addFirstLastClasses（collapsiblesInSet，this._getVisibles（collapsiblesInSet，create），create）;
	}，

	refresh：function（）{
		this._refresh（false）;
	}
}，$ .mobile.behaviors.addFirstLastClasses））;

}）（jQuery）;

（function（$，undefined）{

//在1.4中弃用
$ .fn.fieldcontain = function（/ * options * /）{
	return this.addClass（“ui-field-contains”）;
};

}）（jQuery）;

（function（$，undefined）{

$ .fn.grid = function（options）{
	return this.each（function（）{

		var $ this = $（this），
			o = $ .extend（{
				grid：null
			}，选项），
			$ kids = $ this.children（），
			gridCols = {solo：1，a：2，b：3，c：4，d：5}，
			grid = o.grid，
			迭代器，
			信;

			if（！grid）{
				if（$ kids.length <= 5）{
					for（在gridCols中的字母）{
						if（gridCols [letter] === $ kids.length）{
							grid = letter;
						}
					}
				} else {
					grid =“a”;
					$ this.addClass（“ui-grid-duo”）;
				}
			}
			iterator = gridCols [grid];

		$ this.addClass（“ui-grid-”+ grid）;

		$ kids.filter（“：nth-​​child（”+ iterator +“n + 1）”）.addClass（“ui-block-a”）;

		if（iterator> 1）{
			$ kids.filter（“：nth-​​child（”+ iterator +“n + 2）”）.addClass（“ui-block-b”）;
		}
		if（iterator> 2）{
			$ kids.filter（“：nth-​​child（”+ iterator +“n + 3）”）.addClass（“ui-block-c”）;
		}
		if（iterator> 3）{
			$ kids.filter（“：nth-​​child（”+ iterator +“n + 4）”）.addClass（“ui-block-d”）;
		}
		if（iterator> 4）{
			$ kids.filter（“：nth-​​child（”+ iterator +“n + 5）”）.addClass（“ui-block-e”）;
		}
	}）;
};
}）（jQuery）;

（function（$，undefined）{

$ .widget（“mobile.navbar”，{
	选项：{
		iconpos：“顶”，
		grid：null
	}，

	_create：function（）{

		var $ navbar = this.element，
			$ navbtns = $ navbar.find（“a，button”），
			iconpos = $ navbtns.filter（“：jqmData（icon）”）.length？this.options.iconpos：undefined;

		$ navbar.addClass（“ui-navbar”）
			.attr（“角色”，“导航”）
			.find（“ul”）
			.jqmEnhanceable（）
			.grid（{grid：this.options.grid}）;

		$ navbtns
			.each（function（）{
				var icon = $ .mobile.getAttribute（this，“icon”），
					theme = $ .mobile.getAttribute（这是“主题”），
					classes =“ui-btn”;

				if（theme）{
					班+ =“ui-btn-”+主题;
				}
				if（icon）{
					class + =“ui-icon-”+ icon +“ui-btn-icon-”+ iconpos;
				}
				$（this）.addClass（classes）;
			}）;

		$ navbar.delegate（“a”，“vclick”，function（/ * event * /）{
			var activeBtn = $（this）;

			if（！（activeBtn.hasClass（“ui-state-disabled”）||

				// DEPRECATED as as 1.4.0  -  remove after 1.4.0 release
				//此后应该仅存在ui-state-disabled
				activeBtn.hasClass（“ui-disabled”）||
				activeBtn.hasClass（$ .mobile.activeBtnClass）））{

				$ navbtns.removeClass（$ .mobile.activeBtnClass）;
				activeBtn.addClass（$ .mobile.activeBtnClass）;

				//以下代码是解决＃1181的解决方法
				$（document）.one（“pagehide”，function（）{
					activeBtn.removeClass（$ .mobile.activeBtnClass）;
				}）;
			}
		}）;

		//使用ui-state-persist类的navbar中的按钮应在页面显示之前重新获得活动状态
		$ navbar.closest（“.ui-page”）.bind（“pagebeforeshow”，function（）{
			$ navbtns.filter（“.ui-state-persist”）.addClass（$ .mobile.activeBtnClass）;
		}）;
	}
}）;

}）（jQuery）;

（function（$，undefined）{

var getAttr = $ .mobile.getAttribute;

$ .widget（“mobile.listview”，$ .extend（{

	选项：{
		主题：null，
		countTheme：null，/ *弃用于1.4 * /
		dividerTheme：null，
		图标：“carat-r”，
		splitIcon：“carat-r”，
		splitTheme：null，
		角落：真的，
		阴影：真，
		插图：虚假
	}，

	_create：function（）{
		var t = this，
			listviewClasses =“”;

		listviewClasses + = t.options.inset？“ui-listview-inset”：“”;

		if（!! t.options.inset）{
			listviewClasses + = t.options.corners？“ui-corner-all”：“”;
			listviewClasses + = t.options.shadow？“ui-shadow”：“”;
		}

		//创建listview标记
		t.element.addClass（“ui-listview”+ listviewClasses）;

		t.refresh（true）;
	}，

	// TODO：删除1.5
	_findFirstElementByTagName：function（ele，nextProp，lcName，ucName）{
		var dict = {};
		dict [lcName] = dict [ucName] = true;
		而（ele）{
			if（dict [ele.nodeName]）{
				返回ele
			}
			ele = ele [nextProp];
		}
		返回null;
	}，
	// TODO：删除1.5
	_addThumbClasses：function（containers）{
		var i，img，len = containers.length;
		for（i = 0; i <len; i ++）{
			img = $（this._findFirstElementByTagName（containers [i] .firstChild，“nextSibling”，“img”，“I​​MG”））;
			if（img.length）{
				$（this._findFirstElementByTagName（img [0] .parentNode，“parentNode”，“li”，“LI”））.addClass（img.hasClass（“ui-li-icon”）？“ui-li-has-icon “：”ui-li-has-thumb“）;
			}
		}
	}，

	_getChildrenByTagName：function（ele，lcName，ucName）{
		var results = []，
			dict = {};
		dict [lcName] = dict [ucName] = true;
		ele = ele.firstChild;
		而（ele）{
			if（dict [ele.nodeName]）{
				结果（ele）;
			}
			ele = ele.nextSibling;
		}
		返回$（结果）;
	}，

	_beforeListviewRefresh：$ .noop，
	_afterListviewRefresh：$ .noop，

	refresh：function（create）{
		var buttonClass，pos，numli，item，itemClass，itemTheme，itemIcon，icon，a，
			isDivider，startCount，newStartCount，value，last，splittheme，splitThemeClass，spliticon，
			altButtonClass，dividerTheme，li，
			o = this.options，
			$ list = this.element，
			ol = !! $。nodeName（$ list [0]，“ol”），
			start = $ list.attr（“start”），
			itemClassDict = {}，
			countBubbles = $ list.find（“.ui-li-count”），
			countTheme = getAttr（$ list [0]，“counttheme”）|| this.options.countTheme，
			countThemeClass = countTheme？“ui-body-”+ countTheme：“ui-body-inherit”;

		if（o.theme）{
			$ list.addClass（“ui-group-theme-”+ o.theme）;
		}

		//检查是否已经设置了一个起始属性，同时考虑到值为0
		if（ol &&（start || start === 0））{
			startCount = parseInt（start，10） -  1;
			$ list.css（“counter-reset”，“listnumbering”+ startCount）;
		}

		this._beforeListviewRefresh（）;

		li = this._getChildrenByTagName（$ list [0]，“li”，“li”）;

		for（pos = 0，numli = li.length; pos <numli; pos ++）{
			item = li.eq（pos）;
			itemClass =“”;

			if（create || item [0] .className.search（/ \ bui-li-static \ b | \ bui-li-divider \ b /）<0）{
				a = this._getChildrenByTagName（item [0]，“a”，“A”）;
				isDivider =（getAttr（item [0]，“role”）===“list-divider”）;
				value = item.attr（“value”）;
				itemTheme = getAttr（item [0]，“theme”）;

				if（a.length && a [0] .className.search（/ \ bui-btn \ b /）<0 &&！isDivider）{
					itemIcon = getAttr（item [0]，“icon”）;
					icon =（itemIcon === false）？false：（itemIcon || o.icon）;

					// TODO：删除1.5与links.js（links.js / .ui-link不推荐使用1.4）
					a.removeClass（“ui-link”）;

					buttonClass =“ui-btn”;

					if（itemTheme）{
						buttonClass + =“ui-btn-”+ itemTheme;
					}

					if（a.length> 1）{
						itemClass =“ui-li-has-alt”;

						last = a.last（）;
						splittheme = getAttr（last [0]，“theme”）|| o.splitTheme || getAttr（item [0]，“theme”，true）;
						splitThemeClass = splittheme？“ui-btn-”+ splittheme：“”;
						spliticon = getAttr（last [0]，“icon”）|| getAttr（item [0]，“icon”）|| o.splitIcon;
						altButtonClass =“ui-btn ui-btn-icon-notext ui-icon-”+ spliticon + splitThemeClass;

						持续
							.attr（“title”，$ .trim（last.getEncodedText（）））
							.addClass（altButtonClass）
							.empty（）;

						//减少到第一个锚点，因为只有第一个获取buttonClass
						a = a.first（）;
					} else if（icon）{
						buttonClass + =“ui-btn-icon-right ui-icon-”+图标;
					}

					//将buttonClass应用于（第一个）锚点
					a.addClass（buttonClass）;
				} else if（isDivider）{
					dividerTheme =（getAttr（item [0]，“theme”）|| o.dividerTheme || o.theme）;

					itemClass =“ui-li-divider ui-bar-”+（dividerTheme？dividerTheme：“inherit”）;

					item.attr（“role”，“heading”）;
				} else if（a.length <= 0）{
					itemClass =“ui-li-static ui-body-”+（itemTheme？itemTheme：“inherit”）;
				}
				if（ol && value）{
					newStartCount = parseInt（value，10） -  1;

					item.css（“counter-reset”，“listnumbering”+ newStartCount）;
				}
			}

			//而不是直接在列表项上设置项目类
			//在这个时间点，将项目推入字典
			//告诉我们要设置什么类，所以我们可以这样做
			//处理循环完成。

			if（！itemClassDict [itemClass]）{
				itemClassDict [itemClass] = [];
			}

			itemClassDict [itemClass] .push（item [0]）;
		}

		//在每个列表项上设置适当的listview项目类。
		//我们没有这样做的主要原因
		//在上面的for-loop中是因为我们可以消除每个项目的功能开销
		//通过调用addClass（）和children（）一次或两次。这个
		//可以让我们在像WP7.5这样的平台上得到显着的提升。

		for（itemClass在itemClassDict中）{
			$（itemClassDict [itemClass]）.addClass（itemClass）;
		}

		countBubbles.each（function（）{
			$（this）.closest（“li”）.addClass（“ui-li-has-count”）;
		}）;
		if（countThemeClass）{
			countBubbles.not（“[class * ='ui-body-']”）.addClass（countThemeClass）;
		}

		//在1.4中弃用 从1.5开始，您必须向LI添加类ui-li-has-thumb或ui-li-has-icon。
		this._addThumbClasses（li）;
		this._addThumbClasses（li.find（“.ui-btn”））;

		this._afterListviewRefresh（）;

		this._addFirstLastClasses（li，this._getVisibles（li，create），create）;
	}
}，$ .mobile.behaviors.addFirstLastClasses））;

}）（jQuery）;

（function（$，undefined）{

函数defaultAutodividersSelector（elt）{
	//寻找给定元素中的文本
	var text = $ .trim（elt.text（））|| 空值;

	if（！text）{
		返回null;
	}

	//创建分隔符的文本（第一个上面的字母）
	text = text.slice（0，1）.toUpperCase（）;

	返回文字;
}

$ .widget（“mobile.listview”，$ .mobile.listview，{
	选项：{
		自动分隔线：假，
		autodividers选择器：defaultAutodividersSelector
	}，

	_beforeListviewRefresh：function（）{
		if（this.options.autodividers）{
			this._replaceDividers（）;
			this._superApply（arguments）;
		}
	}，

	_replaceDividers：function（）{
		var i，lis，li，dividerText，
			lastDividerText = null，
			list = this.element，
			除法器;

		list.children（“li：jqmData（role ='list-divider'）”）.remove（）;

		lis = list.children（“li”）;

		for（i = 0; i <lis.length; i ++）{
			li = lis [i];
			dividerText = this.options.autodividersSelector（$（li））;

			if（dividerText && lastDividerText！== dividerText）{
				divider = document.createElement（“li”）;
				divider.appendChild（document.createTextNode（dividerText））;
				divider.setAttribute（“data-”+ $ .mobile.ns +“role”，“list-divider”）;
				li.parentNode.insertBefore（divider，li）;
			}

			lastDividerText = dividerText;
		}
	}
}）;

}）（jQuery）;

（function（$，undefined）{

var rdivider = /（^ | \ s）ui-li-divider（$ | \ s）/，
	rhidden = /（^ | \ s）ui-screen-hidden（$ | \ s）/;

$ .widget（“mobile.listview”，$ .mobile.listview，{
	选项：{
		hideDividers：false
	}，

	_afterListviewRefresh：function（）{
		var items，idx，item，hideDivider = true;

		this._superApply（arguments）;

		if（this.options.hideDividers）{
			items = this._getChildrenByTagName（this.element [0]，“li”，“LI”）;
			for（idx = items.length  -  1; idx> -1; idx--）{
				item = items [idx];
				if（item.className.match（rdivider））{
					if（hideDivider）{
						item.className = item.className +“ui-screen-hidden”;
					}
					hideDivider = true;
				} else {
					if（！item.className.match（rhidden））{
						hideDivider = false;
					}
				}
			}
		}
	}
}）;

}）（jQuery）;

（function（$，undefined）{

$ .mobile.nojs = function（target）{
	$（“：jqmData（role ='nojs'）”，target）.addClass（“ui-nojs”）;
};

}）（jQuery）;

（function（$，undefined）{

$ .mobile.behaviors.formReset = {
	_handleFormReset：function（）{
		this._on（this.element.closest（“form”），{
			reset：function（）{
				this._delay（“_reset”）;
			}
		}）;
	}
};

}）（jQuery）;

/ *
*“checkboxradio”插件
* /

（function（$，undefined）{

var escapeId = $ .mobile.path.hashToSelector;

$ .widget（“mobile.checkboxradio”，$ .extend（{

	initSelector：“input：not（：jqmData（role ='flipswitch'））[type ='checkbox']，输入[type ='radio']：not（：jqmData（role ='flipswitch'））

	选项：{
		主题：“继承”，
		迷你：假，
		wrapperClass：null，
		增强：假，
		图标：“左”

	}，
	_create：function（）{
		var input = this.element，
			o = this.options，
			inheritAttr = function（input，dataAttr）{
				return input.jqmData（dataAttr）||
					input.closest（“form，fieldset”）.jqmData（dataAttr）;
			}，
			label = this.options.enhanced？
				{
					element：this.element.siblings（“label”），
					isParent：false
				}：
				this._findLabel（）
			inputtype = input [0] .type，
			checkedClass =“ui-”+ inputtype +“-on”，
			uncheckedClass =“ui-”+ inputtype +“-off”;

		if（inputtype！==“checkbox”&& inputtype！==“radio”）{
			返回;
		}

		if（this.element [0] .disabled）{
			this.options.disabled = true;
		}

		o.iconpos = inheritAttr（input，“iconpos”）||
			label.element.attr（“data-”+ $ .mobile.ns +“iconpos”）|| o.iconpos，

		//建立选项
		o.mini = inheritAttr（input，“mini”）|| o.mini;

		//显示其他方法
		$ .extend（this，{
			输入：输入，
			label：label.element，
			labelIsParent：label.isParent，
			inputtype：inputtype，
			checkedClass：checkedClass，
			uncheckedClass：uncheckedClass
		}）;

		if（！this.options.enhanced）{
			this._enhance（）;
		}

		this._on（label.element，{
			vmouseover：“_handleLabelVMouseOver”，
			vclick：“_handleLabelVClick”
		}）;

		this._on（input，{
			vmousedown：“_cacheVals”，
			vclick：“_handleInputVClick”，
			焦点：“_handleInputFocus”，
			模糊：“_handleInputBlur”
		}）;

		this._handleFormReset（）;
		this.refresh（）;
	}，

	_findLabel：function（）{
		var parentLabel，label，isParent，
			input = this.element，
			labelsList = input [0] .labels;

		if（labelsList && labelsList.length> 0）{
			label = $（labelsList [0]）;
			isParent = $ .contains（label [0]，input [0]）;
		} else {
			parentLabel = input.closest（“label”）;
			isParent =（parentLabel.length> 0）;

			//注意：Windows Phone无法通过选择器找到标签
			//过滤器工作。
			label = isParent？parentLabel：
				$（this.document [0] .getElementsByTagName（“label”））
					.filter（“[for ='”+ escapeId（input [0] .id）+“']”）
					。第一（）;
		}

		返回{
			元素：标签，
			isParent：isParent
		};
	}，

	_enhance：function（）{
		this.label.addClass（“ui-btn ui-corner-all”）;

		if（this.labelIsParent）{
			this.input.add（this.label）.wrapAll（this._wrapper（））;
		} else {
			//this.element.replaceWith（this.input.add（this.label）.wrapAll（this._wrapper（）））;
			this.element.wrap（this._wrapper（））;
			this.element.parent（）。prepend（this.label）;
		}

		//将输入+标签包装在div中

		this._setOptions（{
			“主题”：this.options.theme，
			“iconpos”：this.options.iconpos，
			“迷你”：this.options.mini
		}）;

	}，

	_wrapper：function（）{
		return $（“<div class ='”+
			（this.options.wrapperClass？this.options.wrapperClass：“”）+
			“ui-”+ this.inputtype +
			（this.options.disabled？“ui-state-disabled”：“”）+“'> </ div>”）;
	}，

	_handleInputFocus：function（）{
		this.label.addClass（$ .mobile.focusClass）;
	}，

	_handleInputBlur：function（）{
		this.label.removeClass（$ .mobile.focusClass）;
	}，

	_handleInputVClick：function（）{
		//使用键盘时将检查属性添加到检查输入
		this.element.prop（“checked”，this.element.is（“：checked”））;
		this._getInputSet（）。not（this.element）.prop（“checked”，false）;
		this._updateAll（true）;
	}，

	_handleLabelVMouseOver：function（event）{
		if（this.label.parent（）。hasClass（“ui-state-disabled”））{
			event.stopPropagation（）;
		}
	}，

	_handleLabelVClick：function（event）{
		var input = this.element;

		if（input.is（“：disabled”））{
			event.preventDefault（）;
			返回;
		}

		this._cacheVals（）;

		input.prop（“checked”，this.inputtype ===“radio”&& true ||！input.prop（“checked”））;

		//触发点击处理程序的绑定直接作为替代的输入
		//标签点击在浏览器中的行为正常
		// TODO：让浏览器处理点击并传递它们是很好的
		//通过关联输入。我们可以在父母身上点击
		//包装元素级别
		input.triggerHandler（“click”）;

		//普通单选按钮的输入设置将包含所有收音机
		//按钮，但不会为复选框。清除已检查的状态
		//其他收音机确保正确应用活动按钮状态
		this._getInputSet（）。not（input）.prop（“checked”，false）;

		this._updateAll（）;
		返回假
	}，

	_cacheVals：function（）{
		this._getInputSet（）。each（function（）{
			$（this）.attr（“data-”+ $ .mobile.ns +“cacheVal”，this.checked）;
		}）;
	}，

	//返回应该在同一组中的单选按钮
	//这个单选按钮。在复选框或广播缺少名称的情况下
	//属性，它返回this.element。
	_getInputSet：function（）{
		var selector，formId，
			radio = this.element [0]
			name = radio.name，
			form = radio.form，
			doc = this.element.parents（）。last（）。get（0），

			//收音机始终是其自己的组的成员
			radioos = this.element;

		//只有启动运行选择器，如果这是带有名称的附件单选按钮
		if（name && this.inputtype ===“radio”&& doc）{
			selector =“input [type ='radio'] [name ='”+ escapeId（name）+“']”;

			//如果我们在一个表单内
			if（form）{
				formId = form.getAttribute（“id”）;

				//如果表单有ID，收集无线电通过文件分散
				//仍然是表单属性的值的一部分
				if（formId）{
					radioos = $（selector +“[form ='”+ escapeId（formId）+“']”，doc）;
				}

				//还要添加到表单本身的收音机
				radioos = $（form）.find（selector）.filter（function（）{

					//表单内的一些无线电台可能属于某种其他形式
					//在其上定义一个form属性，所以我们必须在这里过滤它们
					return（this.form === form）;
				}）。add（radioos）;

			//如果我们在一个表单之外
			} else {

				//收集所有那些也在表格外面的收音机，并且匹配我们的名字
				radios = $（selector，doc）.filter（function（）{
					返回！this.form;
				}）;
			}
		}
		返回无线电;
	}，

	_updateAll：function（changeTriggered）{
		var self = this;

		this._getInputSet（）。each（function（）{
			var $ this = $（this）;

			if（（this.checked || self.inputtype ===“checkbox”）&&！changeTriggered）{
				$ this.trigger（“change”）;
			}
		}）
		.checkboxradio（“刷新”）;
	}，

	_reset：function（）{
		this.refresh（）;
	}，

	//小部件是否应显示图标？
	_hasIcon：function（）{
		var controlgroup，controlgroupWidget，
			controlgroupConstructor = $ .mobile.controlgroup;

		//如果控件组小部件被定义...
		if（controlgroupConstructor）{
			controlgroup = this.element.closest（
				“：mobile-controlgroup”，+
				controlgroupConstructor.prototype.initSelector）;

			// ...并且该复选框位于控制组中...
			if（controlgroup.length> 0）{

				// ...寻找一个控件组窗口小部件实例，...
				controlgroupWidget = $ .data（controlgroup [0]，“mobile-controlgroup”）;

				// ...如果找到，根据选项值决定...
				return（（controlgroupWidget？controlgroupWidget.options.type：

					// ...否则根据“类型”数据属性决定。
					controlgroup.attr（“data-”+ $ .mobile.ns +“type”））！==“horizo​​ntal”）;
			}
		}

		//通常，窗口小部件显示一个图标。
		返回真
	}，

	refresh：function（）{
		var isChecked = this.element [0] .checked，
			active = $ .mobile.activeBtnClass，
			iconposClass =“ui-btn-icon-”+ this.options.iconpos，
			addClasses = []，
			removeClasses = [];

		if（this._hasIcon（））{
			removeClasses.push（active）;
			addClasses.push（iconposClass）;
		} else {
			removeClasses.push（iconposClass）;
			（isChecked？addClasses：removeClasses）.push（active）;
		}

		if（isChecked）{
			addClasses.push（this.checkedClass）;
			removeClass.push（this.uncheckedClass）;
		} else {
			addClasses.push（this.uncheckedClass）;
			removeClasses.push（this.checkedClass）;
		}

		this.widget（）。toggleClass（“ui-state-disabled”，this.element.prop（“disabled”））;

		this.label
			.addClass（addClasses.join（“”））
			.removeClass（removeClasses.join（“”））;
	}，

	widget：function（）{
		return this.label.parent（）;
	}，

	_setOptions：function（options）{
		var label = this.label，
			currentOptions = this.options，
			outer = this.widget（），
			hasIcon = this._hasIcon（）;

		if（options.disabled！== undefined）{
			this.input.prop（“disabled”，!! options.disabled）;
			outer.toggleClass（“ui-state-disabled”，!! options.disabled）;
		}
		if（options.mini！== undefined）{
			outside.toggleClass（“ui-mini”，!! options.mini）;
		}
		if（options.theme！== undefined）{
			标签
				.removeClass（“ui-btn-”+ currentOptions.theme）
				.addClass（“ui-btn-”+ options.theme）;
		}
		if（options.wrapperClass！== undefined）{
			外
				.removeClass（currentOptions.wrapperClass）
				.addClass（options.wrapperClass）;
		}
		if（options.iconpos！== undefined && hasIcon）{
			label.removeClass（“ui-btn-icon-”+ currentOptions.iconpos）.addClass（“ui-btn-icon-”+ options.iconpos）;
		} else if（！hasIcon）{
			label.removeClass（“ui-btn-icon-”+ currentOptions.iconpos）;
		}
		this._super（options）;
	}

}，$ .mobile.behaviors.formReset））;

}）（jQuery）;

（function（$，undefined）{

$ .widget（“mobile.button”，{

	initSelector：“input [type ='button']，输入[type ='submit']，输入[type ='reset']”

	选项：{
		主题：null，
		图标：null，
		iconpos：“左”，
		iconshadow：false，/ * TODO：在1.4中弃用，在1.5中删除。* /
		角落：真的，
		阴影：真，
		inline：null，
		迷你：null，
		wrapperClass：null，
		增强：假
	}，

	_create：function（）{

		if（this.element.is（“：disabled”））{
			this.options.disabled = true;
		}

		if（！this.options.enhanced）{
			this._enhance（）;
		}

		$ .extend（this，{
			wrapper：this.element.parent（）
		}）;

		this._on（{
			focus：function（）{
				this.widget（）。addClass（$ .mobile.focusClass）;
			}，

			blur：function（）{
				this.widget（）。removeClass（$ .mobile.focusClass）;
			}
		}）;

		this.refresh（true）;
	}，

	_enhance：function（）{
		this.element.wrap（this._button（））;
	}，

	_button：function（）{
		var options = this.options，
			iconClasses = this._getIconClasses（this.options）;

		return $（“<div class ='ui-btn ui-input-btn”+
			（options.wrapperClass？“”+ options.wrapperClass：“”）+
			（options.theme？“ui-btn-”+ options.theme：“”）+
			（options.corners？“ui-corner-all”：“”）+
			（options.shadow？“ui-shadow”：“”）+
			（options.inline？“ui-btn-inline”：“”）+
			（options.mini？“ui-mini”：“”）+
			（options.disabled？“ui-state-disabled”：“”）+
			（iconClasses？（“”+ iconClasses）：“”）+
			“'>”+ this.element.val（）+“</ div>”）;
	}，

	widget：function（）{
		return this.wrapper;
	}，

	_destroy：function（）{
			this.element.insertBefore（this.wrapper）;
			this.wrapper.remove（）;
	}，

	_getIconClasses：function（options）{
		return（options.icon？（“ui-icon-”+ options.icon +
			（options.iconshadow？“ui-shadow-icon”：“”）+ / * TODO：在1.4中弃用，在1.5中删除。* /
			“ui-btn-icon-”+ options.iconpos）：“”）;
	}，

	_setOptions：function（options）{
		var outer = this.widget（）;

		if（options.theme！== undefined）{
			外
				.removeClass（this.options.theme）
				.addClass（“ui-btn-”+ options.theme）;
		}
		if（options.corners！== undefined）{
			outer.toggleClass（“ui-corner-all”，options.corners）;
		}
		if（options.shadow！== undefined）{
			outer.toggleClass（“ui-shadow”，options.shadow）;
		}
		if（options.inline！== undefined）{
			outer.toggleClass（“ui-btn-inline”，options.inline）;
		}
		if（options.mini！== undefined）{
			outer.toggleClass（“ui-mini”，options.mini）;
		}
		if（options.disabled！== undefined）{
			this.element.prop（“disabled”，options.disabled）;
			outer.toggleClass（“ui-state-disabled”，options.disabled）;
		}

		if（options.icon！== undefined ||
				options.iconshadow！== undefined || / * TODO：在1.4中弃用，删除1.5。* /
				options.iconpos！== undefined）{
			外
				.removeClass（this._getIconClasses（this.options））
				.addClass（this._getIconClasses（
					$ .extend（{}，this.options，options）））;
		}

		this._super（options）;
	}，

	refresh：function（create）{
		var originalElement，
			isDisabled = this.element.prop（“disabled”）;

		if（this.options.icon && this.options.iconpos ===“notext”&& this.element.attr（“title”））{
			this.element.attr（“title”，this.element.val（））;
		}
		if（！create）{
			originalElement = this.element.detach（）;
			$（this.wrapper）.text（this.element.val（））.append（originalElement）;
		}
		if（this.options.disabled！== isDisabled）{
			this._setOptions（{disabled：isDisabled}）;
		}
	}
}）;

}）（jQuery）;

（function（$）{
	var meta = $（“meta [name = viewport]”），
		initialContent = meta.attr（“content”），
		disabledZoom = initialContent +“，maximum-scale = 1，user-scalable = no”，
		enabledZoom = initialContent +“，maximum-scale = 10，user-scalable = yes”，
		disabledInitially = /（user-scalable [\ s] * = [\ s] * no）|（maximum-scale [\ s] * = [\ s] * 1）[$，\ s] ;

	$ .mobile.zoom = $ .extend（{}，{
		启用：！disabledInitially，
		锁定：假，
		disable：function（lock）{
			if（！disabledInitially &&！$。mobile.zoom.locked）{
				meta.attr（“content”，disabledZoom）;
				$ .mobile.zoom.enabled = false;
				$ .mobile.zoom.locked = lock || 假;
			}
		}，
		启用：function（unlock）{
			if（！disabledInitially &&（！$。mobile.zoom.locked || unlock === true））{
				meta.attr（“content”，enabledZoom）;
				$ .mobile.zoom.enabled = true;
				$ .mobile.zoom.locked = false;
			}
		}，
		restore：function（）{
			如果（！disabledInitially）{
				meta.attr（“content”，initialContent）;
				$ .mobile.zoom.enabled = true;
			}
		}
	}）;

}（jQuery））;

（function（$，undefined）{

$ .widget（“mobile.textinput”，{
	initSelector：“input [type ='text']，”+
		“input [type ='search']，”+
		“：jqmData（type ='search'），”+
		“input [type ='number']，”+
		“：jqmData（type ='number'），”+
		“input [type ='password']，”+
		“输入[type ='email']，”+
		“input [type ='url]]，”+
		“input [type ='tel']，”+
		“textarea”，+
		“input [type ='time']，”+
		“input [type ='date']，”+
		“input [type ='month']，”+
		“input [type ='week']，”+
		“input [type ='datetime']，”+
		“input [type ='datetime-local']，”+
		“input [type ='color']，”+
		“input：not（[type]），”+
		“输入[类型= '文件']”，

	选项：{
		主题：null，
		角落：真的，
		迷你：假，
		//此选项在iOS设备上默认为true。
		preventFocusZoom：/iPhone|iPad|iPod/.test（navigator.platform）&& navigator.userAgent.indexOf（“AppleWebKit”）> -1，
		wrapperClass：“”，
		增强：假
	}，

	_create：function（）{

		var options = this.options，
			isSearch = this.element.is（“[type ='search']，：jqmData（type ='search'）”），
			isTextarea = this.element [0] .tagName ===“TEXTAREA”，
			isRange = this.element.is（“[data-”+（$ .mobile.ns ||“”+“type ='range']”），
			inputNeedsWrap =（（this.element.is（“input”）||
				this.element.is（“[data-”+（$ .mobile.ns ||“）+”type ='search']“））&&
					！isRange）;

		if（this.element.prop（“disabled”））{
			options.disabled = true;
		}

		$ .extend（this，{
			类：this._classesFromOptions（），
			isSearch：isSearch，
			isTextarea：isTextarea，
			isRange：isRange，
			inputNeedsWrap：inputNeedsWrap
		}）;

		this._autoCorrect（）;

		if（！options.enhanced）{
			this._enhance（）;
		}

		this._on（{
			“焦点”：“_handleFocus”，
			“模糊”：“_handleBlur”
		}）;

	}，

	refresh：function（）{
		this.setOptions（{
			“disabled”：this.element.is（“：disabled”）
		}）;
	}，

	_enhance：function（）{
		var elementClasses = [];

		if（this.isTextarea）{
			elementClasses.push（“ui-input-text”）;
		}

		if（this.isTextarea || this.isRange）{
			elementClasses.push（“ui-shadow-inset”）;
		}

		//“搜索”和“文本”输入小部件
		if（this.inputNeedsWrap）{
			this.element.wrap（this._wrap（））;
		} else {
			elementClasses = elementClasses.concat（this.classes）;
		}

		this.element.addClass（elementClasses.join（“”））;
	}，

	widget：function（）{
		return（this.inputNeedsWrap）？this.element.parent（）：this.element;
	}，

	_classesFromOptions：function（）{
		var options = this.options，
			classes = [];

		classes.push（“ui-body-”+（（options.theme === null）？“inherit”：options.theme））;
		if（options.corners）{
			classes.push（“ui-corner-all”）;
		}
		if（options.mini）{
			classes.push（“ui-mini”）;
		}
		if（options.disabled）{
			classes.push（“ui-state-disabled”）;
		}
		if（options.wrapperClass）{
			classes.push（options.wrapperClass）;
		}

		退课;
	}，

	_wrap：function（）{
		return $（“<div class ='”+
			（this.isSearch？“ui-input-search”：“ui-input-text”）+
			this.classes.join（“”）+“”+
			“ui-shadow-inset”> </ div>“）;
	}，

	_autoCorrect：function（）{
		// XXX：问题785的临时解决方法（Apple bug 8910589）。
		//关闭非iOS 5设备上的自动更正和自动完成功能
		//因为他们使用的弹出窗口不能被用户关闭。注意
		//我们通过查找来测试功能的存在
		//输入元素上的自动更正属性。我们目前
		//没有iOS 5或更新的测试，所以我们暂时使用
		// jQuery 1.0的touchOverflow支持标志。是的，我觉得很脏
		//  -  jblas
		if（typeof this.element [0] .autocorrect！==“undefined”&&
			！$。support.touchOverflow）{

			//设置属性而不是属性，以防万一
			//是试图通过HTML修改的代码。
			this.element [0] .setAttribute（“autocorrect”，“off”）;
			this.element [0] .setAttribute（“autocomplete”，“off”）;
		}
	}，

	_handleBlur：function（）{
		this.widget（）。removeClass（$ .mobile.focusClass）;
		if（this.options.preventFocusZoom）{
			$ .mobile.zoom.enable（true）;
		}
	}，

	_handleFocus：function（）{
		//在很多情况下，iOS会点按这里就可以放大输入
		//防止发生这种情况
		if（this.options.preventFocusZoom）{
			$ .mobile.zoom.disable（true）;
		}
		this.widget（）。addClass（$ .mobile.focusClass）;
	}，

	_setOptions：function（options）{
		var outer = this.widget（）;

		this._super（options）;

		if（！（options.disabled === undefined &&
			options.mini === undefined &&
			options.corners === undefined &&
			options.theme === undefined &&
			options.wrapperClass === undefined））{

			outer.removeClass（this.classes.join（“”））;
			this.classes = this._classesFromOptions（）;
			outer.addClass（this.classes.join（“”））;
		}

		if（options.disabled！== undefined）{
			this.element.prop（“disabled”，!! options.disabled）;
		}
	}，

	_destroy：function（）{
		if（this.options.enhanced）{
			返回;
		}
		if（this.inputNeedsWrap）{
			this.element.unwrap（）;
		}
		this.element.removeClass（“ui-input-text”+ this.classes.join（“”））;
	}
}）;

}）（jQuery）;

（function（$，undefined）{

$ .widget（“mobile.slider”，$ .extend（{
	initSelector：“input [type ='range']，：jqmData（type ='range'），：jqmData（role ='slider'）”

	widgetEventPrefix：“slide”，

	选项：{
		主题：null，
		trackTheme：null，
		角落：真的，
		迷你：假，
		亮点：假
	}，

	_create：function（）{

		// TODO：这些都应该有评论解释它们是什么
		var self = this，
			control = this.element，
			trackTheme = this.options.trackTheme || $ .mobile.getAttribute（control [0]，“theme”），
			trackThemeClass = trackTheme？“ui-bar-”+ trackTheme：“ui-bar-inherit”，
			cornerClass =（this.options.corners || control.jqmData（“angles”））？“ui-corner-all”：“”，
			miniClass =（this.options.mini || control.jqmData（“mini”））？“ui-mini”：“”，
			cType = control [0] .nodeName.toLowerCase（），
			isToggleSwitch =（cType ===“select”），
			isRangeslider = control.parent（）。is（“：jqmData（role ='rangeslider'）”），
			selectClass =（isToggleSwitch）？“ui-slider-switch”：“”
			controlID = control.attr（“id”），
			$ label = $（“[for ='”+ controlID +“']”），
			labelID = $ label.attr（“id”）|| controlID +“-label”，
			min =！isToggleSwitch？parseFloat（control.attr（“min”））：0，
			max =！isToggleSwitch？parseFloat（control.attr（“max”））：control.find（“option”）.length-1，
			step = window.parseFloat（control.attr（“step”）|| 1），
			domHandle = document.createElement（“a”），
			handle = $（domHandle），
			domSlider = document.createElement（“div”），
			slider = $（domSlider），
			valuebg = this.options.highlight &&！isToggleSwitch？（function（）{
				var bg = document.createElement（“div”）;
				bg.className =“ui-slider-bg”+ $ .mobile.activeBtnClass;
				return $（bg）.prependTo（slider）;
			}）（）：false，
			选项，
			包装，
			j，长度，
			我，optionsCount，origTabIndex，
			侧面，activeClass，sliderImg;

		$ label.attr（“id”，labelID）;
		this.isToggleSwitch = isToggleSwitch;

		domHandle.setAttribute( "href", "#" );
		domSlider.setAttribute( "role", "application" );
		domSlider.className = [ this.isToggleSwitch ? "ui-slider ui-slider-track ui-shadow-inset " : "ui-slider-track ui-shadow-inset ", selectClass, trackThemeClass, cornerClass, miniClass ].join( "" );
		domHandle.className = "ui-slider-handle";
		domSlider.appendChild( domHandle );

		handle.attr({
			"role": "slider",
			"aria-valuemin": min,
			"aria-valuemax": max,
			"aria-valuenow": this._value(),
			"aria-valuetext": this._value(),
			"title": this._value(),
			"aria-labelledby": labelID
		});

		$.extend( this, {
			slider: slider,
			handle: handle,
			control: control,
			type: cType,
			step: step,
			max: max,
			min: min,
			valuebg: valuebg,
			isRangeslider: isRangeslider,
			dragging: false,
			beforeStart: null,
			userModified: false,
			mouseMoved: false
		});

		if ( isToggleSwitch ) {
			// TODO: restore original tabindex (if any) in a destroy method
			origTabIndex = control.attr( "tabindex" );
			if ( origTabIndex ) {
				handle.attr( "tabindex", origTabIndex );
			}
			control.attr( "tabindex", "-1" ).focus(function() {
				$( this ).blur();
				handle.focus();
			});

			wrapper = document.createElement( "div" );
			wrapper.className = "ui-slider-inneroffset";

			for ( j = 0, length = domSlider.childNodes.length; j < length; j++ ) {
				wrapper.appendChild( domSlider.childNodes[j] );
			}

			domSlider.appendChild( wrapper );

			// slider.wrapInner( "<div class='ui-slider-inneroffset'></div>" );

			// make the handle move with a smooth transition
			handle.addClass( "ui-slider-handle-snapping" );

			options = control.find( "option" );

			for ( i = 0, optionsCount = options.length; i < optionsCount; i++ ) {
				side = !i ? "b" : "a";
				activeClass = !i ? "" : " " + $.mobile.activeBtnClass;
				sliderImg = document.createElement( "span" );

				sliderImg.className = [ "ui-slider-label ui-slider-label-", side, activeClass ].join( "" );
				sliderImg.setAttribute( "role", "img" );
				sliderImg.appendChild( document.createTextNode( options[i].innerHTML ) );
				$( sliderImg ).prependTo( slider );
			}

			self._labels = $( ".ui-slider-label", slider );

		}

		// monitor the input for updated values
		control.addClass( isToggleSwitch ? "ui-slider-switch" : "ui-slider-input" );

		this._on( control, {
			"change": "_controlChange",
			"keyup": "_controlKeyup",
			"blur": "_controlBlur",
			"vmouseup": "_controlVMouseUp"
		});

		slider.bind( "vmousedown", $.proxy( this._sliderVMouseDown, this ) )
			.bind( "vclick", false );

		// We have to instantiate a new function object for the unbind to work properly
		// since the method itself is defined in the prototype (causing it to unbind everything)
		this._on( document, { "vmousemove": "_preventDocumentDrag" });
		this._on( slider.add( document ), { "vmouseup": "_sliderVMouseUp" });

		slider.insertAfter( control );

		// wrap in a div for styling purposes
		if ( !isToggleSwitch && !isRangeslider ) {
			wrapper = this.options.mini ? "<div class='ui-slider ui-mini'>" : "<div class='ui-slider'>";

			control.add( slider ).wrapAll( wrapper );
		}

		// bind the handle event callbacks and set the context to the widget instance
		this._on( this.handle, {
			"vmousedown": "_handleVMouseDown",
			"keydown": "_handleKeydown",
			"keyup": "_handleKeyup"
		});

		this.handle.bind( "vclick", false );

		this._handleFormReset();

		this.refresh( undefined, undefined, true );
	},

	_setOptions: function( options ) {
		if ( options.theme !== undefined ) {
			this._setTheme( options.theme );
		}

		if ( options.trackTheme !== undefined ) {
			this._setTrackTheme（options.trackTheme）;
		}

		if（options.corners！== undefined）{
			this._setCorners（options.corners）;
		}

		if（options.mini！== undefined）{
			this._setMini（options.mini）;
		}

		if（options.highlight！== undefined）{
			this._setHighlight（options.highlight）;
		}

		if（options.disabled！== undefined）{
			this._setDisabled（options.disabled）;
		}
		this._super（options）;
	}，

	_controlChange：function（event）{
		//如果用户拖动句柄，则“change”事件从refresh（）内部触发; 不要再次调用refresh（）
		if（this._trigger（“controlchange”，event）=== false）{
			返回假
		}
		if（！this.mouseMoved）{
			this.refresh（this._value（），true）;
		}
	}，

	_controlKeyup：function（/ * event * /）{//必要？
		this.refresh（this._value（），true，true）;
	}，

	_controlBlur：function（/ * event * /）{
		this.refresh（this._value（），true）;
	}，

	//出现在chrome上点击上下按钮
	// range/number inputs doesn't trigger a change until the field is
	// blurred. Here we check thif the value has changed and refresh
	_controlVMouseUp: function(/* event */) {
		this._checkedRefresh();
	},

	// NOTE force focus on handle
	_handleVMouseDown: function(/* event */) {
		this.handle.focus();
	},

	_handleKeydown: function( event ) {
		var index = this._value();
		if ( this.options.disabled ) {
			return;
		}

		// In all cases prevent the default and mark the handle as active
		switch ( event.keyCode ) {
			case $.mobile.keyCode.HOME:
			case $.mobile.keyCode.END:
			case $.mobile.keyCode.PAGE_UP:
			case $.mobile.keyCode.PAGE_DOWN:
			case $.mobile.keyCode.UP:
			case $.mobile.keyCode.RIGHT:
			case $.mobile.keyCode.DOWN:
			case $.mobile.keyCode.LEFT:
				event.preventDefault();

				if ( !this._keySliding ) {
					this._keySliding = true;
					this.handle.addClass( "ui-state-active" ); /* TODO: We don't use this class for styling. Do we need to add it? */
				}

				break;
		}

		// move the slider according to the keypress
		switch ( event.keyCode ) {
			case $.mobile.keyCode.HOME:
				this.refresh( this.min );
				break;
			case $.mobile.keyCode.END:
				this.refresh( this.max );
				break;
			case $.mobile.keyCode.PAGE_UP:
			case $.mobile.keyCode.UP:
			case $.mobile.keyCode.RIGHT:
				this.refresh( index + this.step );
				break;
			case $.mobile.keyCode.PAGE_DOWN:
			case $.mobile.keyCode.DOWN:
			case $.mobile.keyCode.LEFT:
				this.refresh( index - this.step );
				break;
		}
	}, // remove active mark

	_handleKeyup: function(/* event */) {
		if ( this._keySliding ) {
			this._keySliding = false;
			this.handle.removeClass( "ui-state-active" ); /* See comment above. */
		}
	},

	_sliderVMouseDown: function( event ) {
		// NOTE: we don't do this in refresh because we still want to
		//       support programmatic alteration of disabled inputs
		if ( this.options.disabled || !( event.which === 1 || event.which === 0 || event.which === undefined ) ) {
			return false;
		}
		if ( this._trigger( "beforestart", event ) === false ) {
			return false;
		}
		this.dragging = true;
		this.userModified = false;
		this.mouseMoved = false;

		if ( this.isToggleSwitch ) {
			this.beforeStart = this.element[0].selectedIndex;
		}

		this.refresh( event );
		this._trigger( "start" );
		return false;
	},

	_sliderVMouseUp: function() {
		if ( this.dragging ) {
			this.dragging = false;

			if ( this.isToggleSwitch ) {
				// make the handle move with a smooth transition
				this.handle.addClass( "ui-slider-handle-snapping" );

				if ( this.mouseMoved ) {
					// this is a drag, change the value only if user dragged enough
					if ( this.userModified ) {
						this.refresh( this.beforeStart === 0 ? 1 : 0 );
					} else {
						this.refresh( this.beforeStart );
					}
				} else {
					// this is just a click, change the value
					this.refresh( this.beforeStart === 0 ? 1 : 0 );
				}
			}

			this.mouseMoved = false;
			this._trigger( "stop" );
			return false;
		}
	},

	_preventDocumentDrag: function( event ) {
			// NOTE: we don't do this in refresh because we still want to
			//       support programmatic alteration of disabled inputs
			if ( this._trigger( "drag", event ) === false) {
				return false;
			}
			if ( this.dragging && !this.options.disabled ) {

				// this.mouseMoved must be updated before refresh() because it will be used in the control "change" event
				this.mouseMoved = true;

				if ( this.isToggleSwitch ) {
					// make the handle move in sync with the mouse
					this.handle.removeClass( "ui-slider-handle-snapping" );
				}

				this.refresh( event );

				// only after refresh() you can calculate this.userModified
				this.userModified = this.beforeStart !== this.element[0].selectedIndex;
				return false;
			}
		},

	_checkedRefresh: function() {
		if ( this.value !== this._value() ) {
			this.refresh( this._value() );
		}
	},

	_value: function() {
		return  this.isToggleSwitch ? this.element[0].selectedIndex : parseFloat( this.element.val() ) ;
	},

	_reset: function() {
		this.refresh( undefined, false, true );
	},

	refresh: function( val, isfromControl, preventInputUpdate ) {
		// NOTE: we don't return here because we want to support programmatic
		//       alteration of the input value, which should still update the slider

		var self = this,
			parentTheme = $.mobile.getAttribute( this.element[ 0 ], "theme" ),
			theme = this.options.theme || parentTheme,
			themeClass =  theme ? " ui-btn-" + theme : "",
			trackTheme = this.options.trackTheme || parentTheme,
			trackThemeClass = trackTheme ? " ui-bar-" + trackTheme : " ui-bar-inherit",
			cornerClass = this.options.corners ? " ui-corner-all" : "",
			miniClass = this.options.mini ? " ui-mini" : "",
			left, width, data, tol,
			pxStep, percent,
			control, isInput, optionElements, min, max, step,
			newval, valModStep, alignValue, percentPerStep,
			handlePercent, aPercent, bPercent,
			valueChanged;

		self.slider[0].className = [ this.isToggleSwitch ? "ui-slider ui-slider-switch ui-slider-track ui-shadow-inset" : "ui-slider-track ui-shadow-inset", trackThemeClass, cornerClass, miniClass ].join( "" );
		if ( this.options.disabled || this.element.prop( "disabled" ) ) {
			this.disable();
		}

		// set the stored value for comparison later
		this.value = this._value();
		if ( this.options.highlight && !this.isToggleSwitch && this.slider.find( ".ui-slider-bg" ).length === 0 ) {
			this.valuebg = (function() {
				var bg = document.createElement( "div" );
				bg.className = "ui-slider-bg " + $.mobile.activeBtnClass;
				return $( bg ).prependTo( self.slider );
			})();
		}
		this.handle.addClass( "ui-btn" + themeClass + " ui-shadow" );

		control = this.element;
		isInput = !this.isToggleSwitch;
		optionElements = isInput ? [] : control.find( "option" );
		min =  isInput ? parseFloat( control.attr( "min" ) ) : 0;
		max = isInput ? parseFloat( control.attr( "max" ) ) : optionElements.length - 1;
		step = ( isInput && parseFloat( control.attr( "step" ) ) > 0 ) ? parseFloat( control.attr( "step" ) ) : 1;

		if ( typeof val === "object" ) {
			data = val;
			// a slight tolerance helped get to the ends of the slider
			tol = 8;

			left = this.slider.offset().left;
			width = this.slider.width();
			pxStep = width/((max-min)/step);
			if ( !this.dragging ||
					data.pageX < left - tol ||
					data.pageX > left + width + tol ) {
				return;
			}
			if ( pxStep > 1 ) {
				percent = ( ( data.pageX - left ) / width ) * 100;
			} else {
				percent = Math.round( ( ( data.pageX - left ) / width ) * 100 );
			}
		} else {
			if ( val == null ) {
				val = isInput ? parseFloat( control.val() || 0 ) : control[0].selectedIndex;
			}
			percent = ( parseFloat( val ) - min ) / ( max - min ) * 100;
		}

		if ( isNaN( percent ) ) {
			return;
		}

		newval = ( percent / 100 ) * ( max - min ) + min;

		//from jQuery UI slider, the following source will round to the nearest step
		valModStep = ( newval - min ) % step;
		alignValue = newval - valModStep;

		if ( Math.abs( valModStep ) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		percentPerStep = 100/((max-min)/step);
		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see jQueryUI: #4124)
		newval = parseFloat( alignValue.toFixed(5) );

		if ( typeof pxStep === "undefined" ) {
			pxStep = width / ( (max-min) / step );
		}
		if ( pxStep > 1 && isInput ) {
			percent = ( newval - min ) * percentPerStep * ( 1 / step );
		}
		if ( percent < 0 ) {
			percent = 0;
		}

		if ( percent > 100 ) {
			percent = 100;
		}

		if ( newval < min ) {
			newval = min;
		}

		if ( newval > max ) {
			newval = max;
		}

		this.handle.css( "left", percent + "%" );

		this.handle[0].setAttribute( "aria-valuenow", isInput ? newval : optionElements.eq( newval ).attr( "value" ) );

		this.handle[0].setAttribute( "aria-valuetext", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		this.handle[0].setAttribute( "title", isInput ? newval : optionElements.eq( newval ).getEncodedText() );

		if ( this.valuebg ) {
			this.valuebg.css( "width", percent + "%" );
		}

		// drag the label widths
		if ( this._labels ) {
			handlePercent = this.handle.width() / this.slider.width() * 100;
			aPercent = percent && handlePercent + ( 100 - handlePercent ) * percent / 100;
			bPercent = percent === 100 ? 0 : Math.min( handlePercent + 100 - aPercent, 100 );

			this._labels.each(function() {
				var ab = $( this ).hasClass( "ui-slider-label-a" );
				$( this ).width( ( ab ? aPercent : bPercent  ) + "%" );
			});
		}

		if ( !preventInputUpdate ) {
			valueChanged = false;

			// update control"s value
			if ( isInput ) {
				valueChanged = parseFloat( control.val() ) !== newval;
				control.val( newval );
			} else {
				valueChanged = control[ 0 ].selectedIndex !== newval;
				control[ 0 ].selectedIndex = newval;
			}
			if ( this._trigger( "beforechange", val ) === false) {
					return false;
			}
			if ( !isfromControl && valueChanged ) {
				control.trigger( "change" );
			}
		}
	},

	_setHighlight: function( value ) {
		value = !!value;
		if ( value ) {
			this.options.highlight = !!value;
			this.refresh();
		} else if ( this.valuebg ) {
			this.valuebg.remove();
			this.valuebg = false;
		}
	},

	_setTheme: function( value ) {
		this.handle
			.removeClass( "ui-btn-" + this.options.theme )
			.addClass( "ui-btn-" + value );

		var currentTheme = this.options.theme ? this.options.theme : "inherit",
			newTheme = value ? value : "inherit";

		this.control
			.removeClass( "ui-body-" + currentTheme )
			.addClass( "ui-body-" + newTheme );
	},

	_setTrackTheme: function( value ) {
		var currentTrackTheme = this.options.trackTheme ? this.options.trackTheme : "inherit",
			newTrackTheme = value ? value : "inherit";

		this.slider
			.removeClass( "ui-body-" + currentTrackTheme )
			.addClass( "ui-body-" + newTrackTheme );
	},

	_setMini: function( value ) {
		value = !!value;
		if ( !this.isToggleSwitch && !this.isRangeslider ) {
			this.slider.parent().toggleClass( "ui-mini", value );
			this.element.toggleClass( "ui-mini", value );
		}
		this.slider.toggleClass( "ui-mini", value );
	},

	_setCorners: function( value ) {
		this.slider.toggleClass( "ui-corner-all", value );

		if ( !this.isToggleSwitch ) {
			this.control.toggleClass( "ui-corner-all", value );
		}
	},

	_setDisabled: function( value ) {
		value = !!value;
		this.element.prop( "disabled", value );
		this.slider
			.toggleClass( "ui-state-disabled", value )
			.attr( "aria-disabled", value );

		this.element.toggleClass( "ui-state-disabled", value );
	}

}, $.mobile.behaviors.formReset ) );

})( jQuery );

(function( $, undefined ) {

var popup;

function getPopup() {
	if ( !popup ) {
		popup = $( "<div></div>", {
			"class": "ui-slider-popup ui-shadow ui-corner-all"
		});
	}
	return popup.clone();
}

$.widget( "mobile.slider", $.mobile.slider, {
	options: {
		popupEnabled: false,
		showValue: false
	},

	_create: function() {
		this._super();

		$.extend( this, {
			_currentValue: null,
			_popup: null,
			_popupVisible: false
		});

		this._setOption( "popupEnabled", this.options.popupEnabled );

		this._on( this.handle, { "vmousedown" : "_showPopup" } );
		this._on( this.slider.add( this.document ), { "vmouseup" : "_hidePopup" } );
		this._refresh();
	},

	// position the popup centered 5px above the handle
	_positionPopup: function() {
		var dstOffset = this.handle.offset();

		this._popup.offset( {
			left: dstOffset.left + ( this.handle.width() - this._popup.width() ) / 2,
			top: dstOffset.top - this._popup.outerHeight() - 5
		});
	},

	_setOption: function( key, value ) {
		this._super( key, value );

		if ( key === "showValue" ) {
			this.handle.html( value && !this.options.mini ? this._value() : "" );
		} else if ( key === "popupEnabled" ) {
			if ( value && !this._popup ) {
				this._popup = getPopup()
					.addClass( "ui-body-" + ( this.options.theme || "a" ) )
					.hide()
					.insertBefore( this.element );
			}
		}
	},

	// show value on the handle and in popup
	refresh: function() {
		this._super.apply( this, arguments );
		this._refresh();
	},

	_refresh: function() {
		var o = this.options, newValue;

		if ( o.popupEnabled ) {
			// remove the title attribute from the handle (which is
			// responsible for the annoying tooltip); NB we have
			// to do it here as the jqm slider sets it every time
			// the slider's value changes :(
			this.handle.removeAttr( "title" );
		}

		newValue = this._value();
		if ( newValue === this._currentValue ) {
			return;
		}
		this._currentValue = newValue;

		if ( o.popupEnabled && this._popup ) {
			this._positionPopup();
			this._popup.html( newValue );
		}

		if ( o.showValue && !this.options.mini ) {
			this.handle.html( newValue );
		}
	},

	_showPopup: function() {
		if ( this.options.popupEnabled && !this._popupVisible ) {
			this.handle.html( "" );
			this._popup.show();
			this._positionPopup();
			this._popupVisible = true;
		}
	},

	_hidePopup: function() {
		var o = this.options;

		if ( o.popupEnabled && this._popupVisible ) {
			if ( o.showValue && !o.mini ) {
				this.handle.html( this._value() );
			}
			this._popup.hide();
			this._popupVisible = false;
		}
	}
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.flipswitch", $.extend({

	options: {
		onText: "On",
		offText: "Off",
		theme: null,
		enhanced: false,
		wrapperClass: null,
		corners: true,
		mini: false
	},

	_create: function() {
			if ( !this.options.enhanced ) {
				this._enhance();
			} else {
				$.extend( this, {
					flipswitch: this.element.parent(),
					on: this.element.find( ".ui-flipswitch-on" ).eq( 0 ),
					off: this.element.find( ".ui-flipswitch-off" ).eq(0),
					type: this.element.get( 0 ).tagName
				});
			}

			this._handleFormReset();

			// Transfer tabindex to "on" element and make input unfocusable
			this._originalTabIndex = this.element.attr( "tabindex" );
			if ( this._originalTabIndex != null ) {
				this.on.attr( "tabindex", this._originalTabIndex );
			}
			this.element.attr( "tabindex", "-1" );
			this._on({
				"focus" : "_handleInputFocus"
			});

			if ( this.element.is( ":disabled" ) ) {
				this._setOptions({
					"disabled": true
				});
			}

			this._on( this.flipswitch, {
				"click": "_toggle",
				"swipeleft": "_left",
				"swiperight": "_right"
			});

			this._on( this.on, {
				"keydown": "_keydown"
			});

			this._on( {
				"change": "refresh"
			});
	},

	_handleInputFocus: function() {
		this.on.focus();
	},

	widget: function() {
		return this.flipswitch;
	},

	_left: function() {
		this.flipswitch.removeClass( "ui-flipswitch-active" );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 0;
		} else {
			this.element.prop( "checked", false );
		}
		this.element.trigger( "change" );
	},

	_right: function() {
		this.flipswitch.addClass( "ui-flipswitch-active" );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 1;
		} else {
			this.element.prop( "checked", true );
		}
		this.element.trigger( "change" );
	},

	_enhance: function() {
		var flipswitch = $( "<div>" ),
			options = this.options,
			element = this.element,
			theme = options.theme ? options.theme : "inherit",

			// The "on" button is an anchor so it's focusable
			on = $( "<a></a>", {
				"href": "#"
			}),
			off = $( "<span></span>" ),
			type = element.get( 0 ).tagName,
			onText = ( type === "INPUT" ) ?
				options.onText : element.find( "option" ).eq( 1 ).text(),
			offText = ( type === "INPUT" ) ?
				options.offText : element.find( "option" ).eq( 0 ).text();

			on
				.addClass( "ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit" )
				.text( onText );
			off
				.addClass( "ui-flipswitch-off" )
				.text( offText );

			flipswitch
				.addClass( "ui-flipswitch ui-shadow-inset " +
					"ui-bar-" + theme + " " +
					( options.wrapperClass ? options.wrapperClass : "" ) + " " +
					( ( element.is( ":checked" ) ||
						element
							.find( "option" )
							.eq( 1 )
							.is( ":selected" ) ) ? "ui-flipswitch-active" : "" ) +
					( element.is(":disabled") ? " ui-state-disabled": "") +
					( options.corners ? " ui-corner-all": "" ) +
					( options.mini ? " ui-mini": "" ) )
				.append( on, off );

			element
				.addClass( "ui-flipswitch-input" )
				.after( flipswitch )
				.appendTo( flipswitch );

		$.extend( this, {
			flipswitch: flipswitch,
			on: on,
			off: off,
			type: type
		});
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		var direction,
			existingDirection = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_right" : "_left";

		if ( this.type === "SELECT" ) {
			direction = ( this.element.get( 0 ).selectedIndex > 0 ) ? "_right": "_left";
		} else {
			direction = this.element.prop( "checked" ) ? "_right": "_left";
		}

		if ( direction !== existingDirection ) {
			this[ direction ]();
		}
	},

	_toggle: function() {
		var direction = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_left" : "_right";

		this[ direction ]();
	},

	_keydown: function( e ) {
		if ( e.which === $.mobile.keyCode.LEFT ) {
			this._left();
		} else if ( e.which === $.mobile.keyCode.RIGHT ) {
			this._right();
		} else if ( e.which === $.mobile.keyCode.SPACE ) {
			this._toggle();
			e.preventDefault();
		}
	},

	_setOptions: function( options ) {
		if ( options.theme !== undefined ) {
			var currentTheme = options.theme ? options.theme : "inherit",
				newTheme = options.theme ? options.theme : "inherit";

			this.widget()
				.removeClass( "ui-bar-" + currentTheme )
				.addClass( "ui-bar-" + newTheme );
		}
		if ( options.onText !== undefined ) {
			this.on.text( options.onText );
		}
		if ( options.offText !== undefined ) {
			this.off.text( options.offText );
		}
		if ( options.disabled !== undefined ) {
			this.widget().toggleClass( "ui-state-disabled", options.disabled );
		}
		if ( options.mini !== undefined ) {
			this.widget().toggleClass( "ui-mini", options.mini );
		}
		if ( options.corners !== undefined ) {
			this.widget().toggleClass( "ui-corner-all", options.corners );
		}

		this._super( options );
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			return;
		}
		if ( this._originalTabIndex != null ) {
			this.element.attr( "tabindex", this._originalTabIndex );
		} else {
			this.element.removeAttr( "tabindex" );
		}
		this.on.remove();
		this.off.remove();
		this.element.unwrap();
		this.flipswitch.remove();
		this.removeClass( "ui-flipswitch-input" );
	}

}, $.mobile.behaviors.formReset ) );

})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.rangeslider", $.extend( {

		options: {
			theme: null,
			trackTheme: null,
			corners: true,
			mini: false,
			highlight: true
		},

		_create: function() {
			var $el = this.element,
			elClass = this.options.mini ? "ui-rangeslider ui-mini" : "ui-rangeslider",
			_inputFirst = $el.find( "input" ).first(),
			_inputLast = $el.find( "input" ).last(),
			_label = $el.find( "label" ).first(),
			_sliderWidgetFirst = $.data( _inputFirst.get( 0 ), "mobile-slider" ) ||
				$.data( _inputFirst.slider().get( 0 ), "mobile-slider" ),
			_sliderWidgetLast = $.data( _inputLast.get(0), "mobile-slider" ) ||
				$.data( _inputLast.slider().get( 0 ), "mobile-slider" ),
			_sliderFirst = _sliderWidgetFirst.slider,
			_sliderLast = _sliderWidgetLast.slider,
			firstHandle = _sliderWidgetFirst.handle,
			_sliders = $( "<div class='ui-rangeslider-sliders' />" ).appendTo( $el );

			_inputFirst.addClass( "ui-rangeslider-first" );
			_inputLast.addClass( "ui-rangeslider-last" );
			$el.addClass( elClass );

			_sliderFirst.appendTo( _sliders );
			_sliderLast.appendTo( _sliders );
			_label.insertBefore( $el );
			firstHandle.prependTo( _sliderLast );

			$.extend( this, {
				_inputFirst: _inputFirst,
				_inputLast: _inputLast,
				_sliderFirst: _sliderFirst,
				_sliderLast: _sliderLast,
				_label: _label,
				_targetVal: null,
				_sliderTarget: false,
				_sliders: _sliders,
				_proxy: false
			});

			this.refresh();
			this._on( this.element.find( "input.ui-slider-input" ), {
				"slidebeforestart": "_slidebeforestart",
				"slidestop": "_slidestop",
				"slidedrag": "_slidedrag",
				"slidebeforechange": "_change",
				"blur": "_change",
				"keyup": "_change"
			});
			this._on({
				"mousedown":"_change"
			});
			this._on( this.element.closest( "form" ), {
				"reset":"_handleReset"
			});
			this._on( firstHandle, {
				"vmousedown": "_dragFirstHandle"
			});
		},
		_handleReset: function() {
			var self = this;
			//we must wait for the stack to unwind before updateing other wise sliders will not have updated yet
			setTimeout( function() {
				self._updateHighlight();
			},0);
		},

		_dragFirstHandle: function( event ) {
			//if the first handle is dragged send the event to the first slider
			$.data( this._inputFirst.get(0), "mobile-slider" ).dragging = true;
			$.data( this._inputFirst.get(0), "mobile-slider" ).refresh( event );
			$.data( this._inputFirst.get(0), "mobile-slider" )._trigger( "start" );
			return false;
		},

		_slidedrag: function( event ) {
			var first = $( event.target ).is( this._inputFirst ),
				otherSlider = ( first ) ? this._inputLast : this._inputFirst;

			this._sliderTarget = false;
			//if the drag was initiated on an extreme and the other handle is focused send the events to
			//the closest handle
			if ( ( this._proxy === "first" && first ) || ( this._proxy === "last" && !first ) ) {
				$.data( otherSlider.get(0), "mobile-slider" ).dragging = true;
				$.data( otherSlider.get(0), "mobile-slider" ).refresh( event );
				return false;
			}
		},

		_slidestop: function( event ) {
			var first = $( event.target ).is( this._inputFirst );

			this._proxy = false;
			//this stops dragging of the handle and brings the active track to the front
			//this makes clicks on the track go the the last handle used
			this.element.find( "input" ).trigger( "vmouseup" );
			this._sliderFirst.css( "z-index", first ? 1 : "" );
		},

		_slidebeforestart: function( event ) {
			this._sliderTarget = false;
			//if the track is the target remember this and the original value
			if ( $( event.originalEvent.target ).hasClass( "ui-slider-track" ) ) {
				this._sliderTarget = true;
				this._targetVal = $( event.target ).val();
			}
		},

		_setOptions: function( options ) {
			if ( options.theme !== undefined ) {
				this._setTheme( options.theme );
			}

			if ( options.trackTheme !== undefined ) {
				this._setTrackTheme( options.trackTheme );
			}

			if ( options.mini !== undefined ) {
				this._setMini( options.mini );
			}

			if ( options.highlight !== undefined ) {
				this._setHighlight( options.highlight );
			}

			if ( options.disabled !== undefined ) {
				this._setDisabled( options.disabled );
			}

			this._super( options );
			this.refresh();
		},

		refresh: function() {
			var $el = this.element,
				o = this.options;

			if ( this._inputFirst.is( ":disabled" ) || this._inputLast.is( ":disabled" ) ) {
				this.options.disabled = true;
			}

			$el.find( "input" ).slider({
				theme: o.theme,
				trackTheme: o.trackTheme,
				disabled: o.disabled,
				corners: o.corners,
				mini: o.mini,
				highlight: o.highlight
			}).slider( "refresh" );
			this._updateHighlight();
		},

		_change: function( event ) {
			if ( event.type === "keyup" ) {
				this._updateHighlight();
				return false;
			}

			var self = this,
				min = parseFloat( this._inputFirst.val(), 10 ),
				max = parseFloat( this._inputLast.val(), 10 ),
				first = $( event.target ).hasClass( "ui-rangeslider-first" ),
				thisSlider = first ? this._inputFirst : this._inputLast,
				otherSlider = first ? this._inputLast : this._inputFirst;

			if ( ( this._inputFirst.val() > this._inputLast.val() && event.type === "mousedown" && !$(event.target).hasClass("ui-slider-handle")) ) {
				thisSlider.blur();
			} else if ( event.type === "mousedown" ) {
				return;
			}
			if ( min > max && !this._sliderTarget ) {
				//this prevents min from being greater then max
				thisSlider.val( first ? max: min ).slider( "refresh" );
				this._trigger( "normalize" );
			} else if ( min > max ) {
				//this makes it so clicks on the target on either extreme go to the closest handle
				thisSlider.val( this._targetVal ).slider( "refresh" );

				//You must wait for the stack to unwind so first slider is updated before updating second
				setTimeout( function() {
					otherSlider.val( first ? min: max ).slider( "refresh" );
					$.data( otherSlider.get(0), "mobile-slider" ).handle.focus();
					self._sliderFirst.css( "z-index", first ? "" : 1 );
					self._trigger( "normalize" );
				}, 0 );
				this._proxy = ( first ) ? "first" : "last";
			}
			//fixes issue where when both _sliders are at min they cannot be adjusted
			if ( min === max ) {
				$.data( thisSlider.get(0), "mobile-slider" ).handle.css( "z-index", 1 );
				$.data( otherSlider.get(0), "mobile-slider" ).handle.css( "z-index", 0 );
			} else {
				$.data( otherSlider.get(0), "mobile-slider" ).handle.css( "z-index", "" );
				$.data( thisSlider.get(0), "mobile-slider" ).handle.css( "z-index", "" );
			}

			this._updateHighlight();

			if ( min >= max ) {
				return false;
			}
		},

		_updateHighlight: function() {
			var min = parseInt( $.data( this._inputFirst.get(0), "mobile-slider" ).handle.get(0).style.left, 10 ),
				max = parseInt( $.data( this._inputLast.get(0), "mobile-slider" ).handle.get(0).style.left, 10 ),
				width = (max - min);

			this.element.find( ".ui-slider-bg" ).css({
				"margin-left": min + "%",
				"width": width + "%"
			});
		},

		_setTheme: function( value ) {
			this._inputFirst.slider( "option", "theme", value );
			this._inputLast.slider( "option", "theme", value );
		},

		_setTrackTheme: function( value ) {
			this._inputFirst.slider( "option", "trackTheme", value );
			this._inputLast.slider( "option", "trackTheme", value );
		},

		_setMini: function( value ) {
			this._inputFirst.slider( "option", "mini", value );
			this._inputLast.slider( "option", "mini", value );
			this.element.toggleClass( "ui-mini", !!value );
		},

		_setHighlight: function( value ) {
			this._inputFirst.slider( "option", "highlight", value );
			this._inputLast.slider( "option", "highlight", value );
		},

		_setDisabled: function( value ) {
			this._inputFirst.prop( "disabled", value );
			this._inputLast.prop( "disabled", value );
		},

		_destroy: function() {
			this._label.prependTo( this.element );
			this.element.removeClass( "ui-rangeslider ui-mini" );
			this._inputFirst.after( this._sliderFirst );
			this._inputLast.after( this._sliderLast );
			this._sliders.remove();
			this.element.find( "input" ).removeClass( "ui-rangeslider-first ui-rangeslider-last" ).slider( "destroy" );
		}

	}, $.mobile.behaviors.formReset ) );

})( jQuery );

(function( $, undefined ) {

	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			clearBtn: false,
			clearBtnText: "Clear text"
		},

		_create: function() {
			this._super();

			if ( this.isSearch ) {
				this.options.clearBtn = true;
			}

			if ( !!this.options.clearBtn && this.inputNeedsWrap ) {
				this._addClearBtn();
			}
		},

		clearButton: function() {
			return $( "<a href='#' tabindex='-1' aria-hidden='true' " +
				"class='ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all'>" +
				"</a>" )
					.attr( "title", this.options.clearBtnText )
					.text( this.options.clearBtnText );
		},

		_clearBtnClick: function( event ) {
			this.element.val( "" )
					.focus()
					.trigger( "change" );

			this._clearBtn.addClass( "ui-input-clear-hidden" );
			event.preventDefault();
		},

		_addClearBtn: function() {

			if ( !this.options.enhanced ) {
				this._enhanceClear();
			}

			$.extend( this, {
				_clearBtn: this.widget().find("a.ui-input-clear")
			});

			this._bindClearEvents();

			this._toggleClear();

		},

		_enhanceClear: function() {

			this.clearButton().appendTo( this.widget() );
			this.widget().addClass( "ui-input-has-clear" );

		},

		_bindClearEvents: function() {

			this._on( this._clearBtn, {
				"click": "_clearBtnClick"
			});

			this._on({
				"keyup": "_toggleClear",
				"change": "_toggleClear",
				"input": "_toggleClear",
				"focus": "_toggleClear",
				"blur": "_toggleClear",
				"cut": "_toggleClear",
				"paste": "_toggleClear"

			});

		},

		_unbindClear: function() {
			this._off( this._clearBtn, "click");
			this._off( this.element, "keyup change input focus blur cut paste" );
		},

		_setOptions: function( options ) {
			this._super( options );

			if ( options.clearBtn !== undefined &&
				!this.element.is( "textarea, :jqmData(type='range')" ) ) {
				if ( options.clearBtn ) {
					this._addClearBtn();
				} else {
					this._destroyClear();
				}
			}

			if ( options.clearBtnText !== undefined && this._clearBtn !== undefined ) {
				this._clearBtn.text( options.clearBtnText )
					.attr("title", options.clearBtnText);
			}
		},

		_toggleClear: function() {
			this._delay( "_toggleClearClass", 0 );
		},

		_toggleClearClass: function() {
			this._clearBtn.toggleClass( "ui-input-clear-hidden", !this.element.val() );
		},

		_destroyClear: function() {
			this.widget().removeClass( "ui-input-has-clear" );
			this._unbindClear();
			this._clearBtn.remove();
		},

		_destroy: function() {
			this._super();
			if ( this.options.clearBtn ) {
				this._destroyClear();
			}
		}

	});

})( jQuery );

(function( $, undefined ) {

	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			autogrow:true,
			keyupTimeoutBuffer: 100
		},

		_create: function() {
			this._super();

			if ( this.options.autogrow && this.isTextarea ) {
				this._autogrow();
			}
		},

		_autogrow: function() {
			this.element.addClass( "ui-textinput-autogrow" );

			this._on({
				"keyup": "_timeout",
				"change": "_timeout",
				"input": "_timeout",
				"paste": "_timeout"
			});

			// Attach to the various you-have-become-visible notifications that the
			// various framework elements emit.
			// TODO: Remove all but the updatelayout handler once #6426 is fixed.
			this._on( true, this.document, {

				// TODO: Move to non-deprecated event
				"pageshow": "_handleShow",
				"popupbeforeposition": "_handleShow",
				"updatelayout": "_handleShow",
				"panelopen": "_handleShow"
			});
		},

		// Synchronously fix the widget height if this widget's parents are such
		// that they show/hide content at runtime. We still need to check whether
		// the widget is actually visible in case it is contained inside multiple
		// such containers. For example: panel contains collapsible contains
		// autogrow textinput. The panel may emit "panelopen" indicating that its
		// content has become visible, but the collapsible is still collapsed, so
		// the autogrow textarea is still not visible.
		_handleShow: function( event ) {
			if ( $.contains( event.target, this.element[ 0 ] ) &&
				this.element.is( ":visible" ) ) {

				if ( event.type !== "popupbeforeposition" ) {
					this.element
						.addClass( "ui-textinput-autogrow-resize" )
						.animationComplete(
							$.proxy( function() {
								this.element.removeClass( "ui-textinput-autogrow-resize" );
							}, this ),
						"transition" );
				}
				this._prepareHeightUpdate();
			}
		},

		_unbindAutogrow: function() {
			this.element.removeClass( "ui-textinput-autogrow" );
			this._off( this.element, "keyup change input paste" );
			this._off( this.document,
				"pageshow popupbeforeposition updatelayout panelopen" );
		},

		keyupTimeout: null,

		_prepareHeightUpdate: function( delay ) {
			if ( this.keyupTimeout ) {
				clearTimeout( this.keyupTimeout );
			}
			if ( delay === undefined ) {
				this._updateHeight();
			} else {
				this.keyupTimeout = this._delay( "_updateHeight", delay );
			}
		},

		_timeout: function() {
			this._prepareHeightUpdate( this.options.keyupTimeoutBuffer );
		},

		_updateHeight: function() {
			var paddingTop, paddingBottom, paddingHeight, scrollHeight, clientHeight,
				borderTop, borderBottom, borderHeight, height,
				scrollTop = this.window.scrollTop();
			this.keyupTimeout = 0;

			// IE8 textareas have the onpage property - others do not
			if ( !( "onpage" in this.element[ 0 ] ) ) {
				this.element.css({
					"height": 0,
					"min-height": 0,
					"max-height": 0
				});
			}

			scrollHeight = this.element[ 0 ].scrollHeight;
			clientHeight = this.element[ 0 ].clientHeight;
			borderTop = parseFloat( this.element.css( "border-top-width" ) );
			borderBottom = parseFloat( this.element.css( "border-bottom-width" ) );
			borderHeight = borderTop + borderBottom;
			height = scrollHeight + borderHeight + 15;

			// Issue 6179: Padding is not included in scrollHeight and
			// clientHeight by Firefox if no scrollbar is visible. Because
			// textareas use the border-box box-sizing model, padding should be
			// included in the new (assigned) height. Because the height is set
			// to 0, clientHeight == 0 in Firefox. Therefore, we can use this to
			// check if padding must be added.
			if ( clientHeight === 0 ) {
				paddingTop = parseFloat( this.element.css( "padding-top" ) );
				paddingBottom = parseFloat( this.element.css( "padding-bottom" ) );
				paddingHeight = paddingTop + paddingBottom;

				height += paddingHeight;
			}

			this.element.css({
				"height": height,
				"min-height": "",
				"max-height": ""
			});

			this.window.scrollTop( scrollTop );
		},

		refresh: function() {
			if ( this.options.autogrow && this.isTextarea ) {
				this._updateHeight();
			}
		},

		_setOptions: function( options ) {

			this._super( options );

			if ( options.autogrow !== undefined && this.isTextarea ) {
				if ( options.autogrow ) {
					this._autogrow();
				} else {
					this._unbindAutogrow();
				}
			}
		}

	});
})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.selectmenu", $.extend( {
	initSelector: "select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",

	options: {
		theme: null,
		icon: "carat-d",
		iconpos: "right",
		inline: false,
		corners: true,
		shadow: true,
		iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
		overlayTheme: null,
		dividerTheme: null,
		hidePlaceholderMenuItems: true,
		closeText: "Close",
		nativeMenu: true,
		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
		mini: false
	},

	_button: function() {
		return $( "<div/>" );
	},

	_setDisabled: function( value ) {
		this.element.attr( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton : function() {
		var self = this;

		setTimeout( function() {
			self.button.focus();
		}, 40);
	},

	_selectOptions: function() {
		return this.select.find( "option" );
	},

	// setup items that are generally necessary for select menu extension
	_preExtension: function() {
		var inline = this.options.inline || this.element.jqmData( "inline" ),
			mini = this.options.mini || this.element.jqmData( "mini" ),
			classes = "";
		// TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
		/* if ( $el[0].className.length ) {
			classes = $el[0].className;
		} */
		if ( !!~this.element[0].className.indexOf( "ui-btn-left" ) ) {
			classes = " ui-btn-left";
		}

		if (  !!~this.element[0].className.indexOf( "ui-btn-right" ) ) {
			classes = " ui-btn-right";
		}

		if ( inline ) {
			classes += " ui-btn-inline";
		}
		if ( mini ) {
			classes += " ui-mini";
		}

		this.select = this.element.removeClass( "ui-btn-left ui-btn-right" ).wrap( "<div class='ui-select" + classes + "'>" );
		this.selectId  = this.select.attr( "id" ) || ( "select-" + this.uuid );
		this.buttonId = this.selectId + "-button";
		this.label = $( "label[for='"+ this.selectId +"']" );
		this.isMultiple = this.select[ 0 ].multiple;
	},

	_destroy: function() {
		var wrapper = this.element.parents( ".ui-select" );
		if ( wrapper.length > 0 ) {
			if ( wrapper.is( ".ui-btn-left, .ui-btn-right" ) ) {
				this.element.addClass( wrapper.hasClass( "ui-btn-left" ) ? "ui-btn-left" : "ui-btn-right" );
			}
			this.element.insertAfter( wrapper );
			wrapper.remove();
		}
	},

	_create: function() {
		this._preExtension();

		this.button = this._button();

		var self = this,

			options = this.options,

			iconpos = options.icon ? ( options.iconpos || this.select.jqmData( "iconpos" ) ) : false,

			button = this.button
				.insertBefore( this.select )
				.attr( "id", this.buttonId )
				.addClass( "ui-btn" +
					( options.icon ? ( " ui-icon-" + options.icon + " ui-btn-icon-" + iconpos +
					( options.iconshadow ? " ui-shadow-icon" : "" ) ) :	"" ) + /* TODO: Remove in 1.5. */
					( options.theme ? " ui-btn-" + options.theme : "" ) +
					( options.corners ? " ui-corner-all" : "" ) +
					( options.shadow ? " ui-shadow" : "" ) );

		this.setButtonText();

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( options.nativeMenu && window.opera && window.opera.version ) {
			button.addClass( "ui-select-nativeonly" );
		}

		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" )
				.addClass( "ui-li-count ui-body-inherit" )
				.hide()
				.appendTo( button.addClass( "ui-li-has-count" ) );
		}

		// Disable if specified
		if ( options.disabled || this.element.attr( "disabled" )) {
			this.disable();
		}

		// Events on native select
		this.select.change(function() {
			self.refresh();

			if ( !!options.nativeMenu ) {
				self._delay( function() {
					self.select.blur();
				});
			}
		});

		this._handleFormReset();

		this._on( this.button, {
			keydown: "_handleKeydown"
		});

		this.build();
	},

	build: function() {
		var self = this;

		this.select
			.appendTo( self.button )
			.bind( "vmousedown", function() {
				// Add active class to button
				self.button.addClass( $.mobile.activeBtnClass );
			})
			.bind( "focus", function() {
				self.button.addClass( $.mobile.focusClass );
			})
			.bind( "blur", function() {
				self.button.removeClass( $.mobile.focusClass );
			})
			.bind( "focus vmouseover", function() {
				self.button.trigger( "vmouseover" );
			})
			.bind( "vmousemove", function() {
				// Remove active class on scroll/touchmove
				self.button.removeClass( $.mobile.activeBtnClass );
			})
			.bind( "change blur vmouseout", function() {
				self.button.trigger( "vmouseout" )
					.removeClass( $.mobile.activeBtnClass );
			});

		// In many situations, iOS will zoom into the select upon tap, this prevents that from happening
		self.button.bind( "vmousedown", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.label.bind( "click focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.select.bind( "focus", function() {
			if ( self.options.preventFocusZoom ) {
					$.mobile.zoom.disable( true );
			}
		});
		self.button.bind( "mouseup", function() {
			if ( self.options.preventFocusZoom ) {
				setTimeout(function() {
					$.mobile.zoom.enable( true );
				}, 0 );
			}
		});
		self.select.bind( "blur", function() {
			if ( self.options.preventFocusZoom ) {
				$.mobile.zoom.enable( true );
			}
		});

	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var self = this;

		return this.selected().map(function() {
			return self._selectOptions().index( this );
		}).get();
	},

	setButtonText: function() {
		var self = this,
			selected = this.selected(),
			text = this.placeholder,
			span = $( document.createElement( "span" ) );

		this.button.children( "span" ).not( ".ui-li-count" ).remove().end().end().prepend( (function() {
			if ( selected.length ) {
				text = selected.map(function() {
					return $( this ).text();
				}).get().join( ", " );
			} else {
				text = self.placeholder;
			}

			if ( text ) {
				span.text( text );
			} else {

				// Set the contents to &nbsp; which we write as &#160; to be XHTML compliant - see gh-6699
				span.html( "&#160;" );
			}

			// TODO possibly aggregate multiple select option classes
			return span
				.addClass( self.select.attr( "class" ) )
				.addClass( selected.attr( "class" ) )
				.removeClass( "ui-screen-hidden" );
		})());
	},

	setButtonCount: function() {
		var selected = this.selected();

		// multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_handleKeydown: function( /* event */ ) {
		this._delay( "_refreshButton" );
	},

	_reset: function() {
		this.refresh();
	},

	_refreshButton: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	refresh: function() {
		this._refreshButton();
	},

	// open and close preserved in native selects
	// to simplify users code when looping over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-state-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-state-disabled" );
	}
}, $.mobile.behaviors.formReset ) );

})( jQuery );

(function( $, undefined ) {

$.mobile.links = function( target ) {

	//links within content areas, tests included with page
	$( target )
		.find( "a" )
		.jqmEnhanceable()
		.filter( ":jqmData(rel='popup')[href][href!='']" )
		.each( function() {
			// Accessibility info for popups
			var element = this,
				idref = element.getAttribute( "href" ).substring( 1 );

			if ( idref ) {
				element.setAttribute( "aria-haspopup", true );
				element.setAttribute( "aria-owns", idref );
				element.setAttribute( "aria-expanded", false );
			}
		})
		.end()
		.not( ".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

};

})( jQuery );


(function( $, undefined ) {

function fitSegmentInsideSegment( windowSize, segmentSize, offset, desired ) {
	var returnValue = desired;

	if ( windowSize < segmentSize ) {
		// Center segment if it's bigger than the window
		returnValue = offset + ( windowSize - segmentSize ) / 2;
	} else {
		// Otherwise center it at the desired coordinate while keeping it completely inside the window
		returnValue = Math.min( Math.max( offset, desired - segmentSize / 2 ), offset + windowSize - segmentSize );
	}

	return returnValue;
}

function getWindowCoordinates( theWindow ) {
	return {
		x: theWindow.scrollLeft(),
		y: theWindow.scrollTop(),
		cx: ( theWindow[ 0 ].innerWidth || theWindow.width() ),
		cy: ( theWindow[ 0 ].innerHeight || theWindow.height() )
	};
}

$.widget( "mobile.popup", {
	options: {
		wrapperClass: null,
		theme: null,
		overlayTheme: null,
		shadow: true,
		corners: true,
		transition: "none",
		positionTo: "origin",
		tolerance: null,
		closeLinkSelector: "a:jqmData(rel='back')",
		closeLinkEvents: "click.popup",
		navigateEvents: "navigate.popup",
		closeEvents: "navigate.popup pagebeforechange.popup",
		dismissible: true,
		enhanced: false,

		// NOTE Windows Phone 7 has a scroll position caching issue that
		//      requires us to disable popup history management by default
		//      https://github.com/jquery/jquery-mobile/issues/4784
		//
		// NOTE this option is modified in _create!
		history: !$.mobile.browser.oldIE
	},

	// When the user depresses the mouse/finger on an element inside the popup while the popup is
	// open, we ignore resize events for a short while. This prevents #6961.
	_handleDocumentVmousedown: function( theEvent ) {
		if ( this._isOpen && $.contains( this._ui.container[ 0 ], theEvent.target ) ) {
			this._ignoreResizeEvents();
		}
	},

	_create: function() {
		var theElement = this.element,
			myId = theElement.attr( "id" ),
			currentOptions = this.options;

		// We need to adjust the history option to be false if there's no AJAX nav.
		// We can't do it in the option declarations because those are run before
		// it is determined whether there shall be AJAX nav.
		currentOptions.history = currentOptions.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;

		this._on( this.document, {
			"vmousedown": "_handleDocumentVmousedown"
		});

		// Define instance variables
		$.extend( this, {
			_scrollTop: 0,
			_page: theElement.closest( ".ui-page" ),
			_ui: null,
			_fallbackTransition: "",
			_currentTransition: false,
			_prerequisites: null,
			_isOpen: false,
			_tolerance: null,
			_resizeData: null,
			_ignoreResizeTo: 0,
			_orientationchangeInProgress: false
		});

		if ( this._page.length === 0 ) {
			this._page = $( "body" );
		}

		if ( currentOptions.enhanced ) {
			this._ui = {
				container: theElement.parent(),
				screen: theElement.parent().prev(),
				placeholder: $( this.document[ 0 ].getElementById( myId + "-placeholder" ) )
			};
		} else {
			this._ui = this._enhance( theElement, myId );
			this._applyTransition( currentOptions.transition );
		}
		this
			._setTolerance( currentOptions.tolerance )
			._ui.focusElement = this._ui.container;

		// Event handlers
		this._on( this._ui.screen, { "vclick": "_eatEventAndClose" } );
		this._on( this.window, {
			orientationchange: $.proxy( this, "_handleWindowOrientationchange" ),
			resize: $.proxy( this, "_handleWindowResize" ),
			keyup: $.proxy( this, "_handleWindowKeyUp" )
		});
		this._on( this.document, { "focusin": "_handleDocumentFocusIn" } );
	},

	_enhance: function( theElement, myId ) {
		var currentOptions = this.options,
			wrapperClass = currentOptions.wrapperClass,
			ui = {
				screen: $( "<div class='ui-screen-hidden ui-popup-screen " +
				this._themeClassFromOption( "ui-overlay-", currentOptions.overlayTheme ) + "'></div>" ),
				placeholder: $( "<div style='display: none;'><!-- placeholder --></div>" ),
				container: $( "<div class='ui-popup-container ui-popup-hidden ui-popup-truncate" +
					( wrapperClass ? ( " " + wrapperClass ) : "" ) + "'></div>" )
			},
			fragment = this.document[ 0 ].createDocumentFragment();

		fragment.appendChild( ui.screen[ 0 ] );
		fragment.appendChild( ui.container[ 0 ] );

		if ( myId ) {
			ui.screen.attr( "id", myId + "-screen" );
			ui.container.attr( "id", myId + "-popup" );
			ui.placeholder
				.attr( "id", myId + "-placeholder" )
				.html( "<!-- placeholder for " + myId + " -->" );
		}

		// Apply the proto
		this._page[ 0 ].appendChild( fragment );
		// Leave a placeholder where the element used to be
		ui.placeholder.insertAfter( theElement );
		theElement
			.detach()
			.addClass( "ui-popup " +
				this._themeClassFromOption( "ui-body-", currentOptions.theme ) + " " +
				( currentOptions.shadow ? "ui-overlay-shadow " : "" ) +
				( currentOptions.corners ? "ui-corner-all " : "" ) )
			.appendTo( ui.container );

		return ui;
	},

	_eatEventAndClose: function( theEvent ) {
		theEvent.preventDefault();
		theEvent.stopImmediatePropagation();
		if ( this.options.dismissible ) {
			this.close();
		}
		return false;
	},

	// Make sure the screen covers the entire document - CSS is sometimes not
	// enough to accomplish this.
	_resizeScreen: function() {
		var screen = this._ui.screen,
			popupHeight = this._ui.container.outerHeight( true ),
			screenHeight = screen.removeAttr( "style" ).height(),

			// Subtracting 1 here is necessary for an obscure Andrdoid 4.0 bug where
			// the browser hangs if the screen covers the entire document :/
			documentHeight = this.document.height() - 1;

		if ( screenHeight < documentHeight ) {
			screen.height( documentHeight );
		} else if ( popupHeight > screenHeight ) {
			screen.height( popupHeight );
		}
	},

	_handleWindowKeyUp: function( theEvent ) {
		if ( this._isOpen && theEvent.keyCode === $.mobile.keyCode.ESCAPE ) {
			return this._eatEventAndClose( theEvent );
		}
	},

	_expectResizeEvent: function() {
		var windowCoordinates = getWindowCoordinates( this.window );

		if ( this._resizeData ) {
			if ( windowCoordinates.x === this._resizeData.windowCoordinates.x &&
				windowCoordinates.y === this._resizeData.windowCoordinates.y &&
				windowCoordinates.cx === this._resizeData.windowCoordinates.cx &&
				windowCoordinates.cy === this._resizeData.windowCoordinates.cy ) {
				// timeout not refreshed
				return false;
			} else {
				// clear existing timeout - it will be refreshed below
				clearTimeout( this._resizeData.timeoutId );
			}
		}

		this._resizeData = {
			timeoutId: this._delay( "_resizeTimeout", 200 ),
			windowCoordinates: windowCoordinates
		};

		return true;
	},

	_resizeTimeout: function() {
		if ( this._isOpen ) {
			if ( !this._expectResizeEvent() ) {
				if ( this._ui.container.hasClass( "ui-popup-hidden" ) ) {
					// effectively rapid-open the popup while leaving the screen intact
					this._ui.container.removeClass( "ui-popup-hidden ui-popup-truncate" );
					this.reposition( { positionTo: "window" } );
					this._ignoreResizeEvents();
				}

				this._resizeScreen();
				this._resizeData = null;
				this._orientationchangeInProgress = false;
			}
		} else {
			this._resizeData = null;
			this._orientationchangeInProgress = false;
		}
	},

	_stopIgnoringResizeEvents: function() {
		this._ignoreResizeTo = 0;
	},

	_ignoreResizeEvents: function() {
		if ( this._ignoreResizeTo ) {
			clearTimeout( this._ignoreResizeTo );
		}
		this._ignoreResizeTo = this._delay( "_stopIgnoringResizeEvents", 1000 );
	},

	_handleWindowResize: function(/* theEvent */) {
		if ( this._isOpen && this._ignoreResizeTo === 0 ) {
			if ( ( this._expectResizeEvent() || this._orientationchangeInProgress ) &&
				!this._ui.container.hasClass( "ui-popup-hidden" ) ) {
				// effectively rapid-close the popup while leaving the screen intact
				this._ui.container
					.addClass( "ui-popup-hidden ui-popup-truncate" )
					.removeAttr( "style" );
			}
		}
	},

	_handleWindowOrientationchange: function(/* theEvent */) {
		if ( !this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0 ) {
			this._expectResizeEvent();
			this._orientationchangeInProgress = true;
		}
	},

	// When the popup is open, attempting to focus on an element that is not a
	// child of the popup will redirect focus to the popup
	_handleDocumentFocusIn: function( theEvent ) {
		var target,
			targetElement = theEvent.target,
			ui = this._ui;

		if ( !this._isOpen ) {
			return;
		}

		if ( targetElement !== ui.container[ 0 ] ) {
			target = $( targetElement );
			if ( !$.contains( ui.container[ 0 ], targetElement ) ) {
				$( this.document[ 0 ].activeElement ).one( "focus", $.proxy( function() {
					this._safelyBlur( targetElement );
				}, this ) );
				ui.focusElement.focus();
				theEvent.preventDefault();
				theEvent.stopImmediatePropagation();
				return false;
			} else if ( ui.focusElement[ 0 ] === ui.container[ 0 ] ) {
				ui.focusElement = target;
			}
		}

		this._ignoreResizeEvents();
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : ( prefix + value ) ) : ( prefix + "inherit" ) );
	},

	_applyTransition: function( value ) {
		if ( value ) {
			this._ui.container.removeClass( this._fallbackTransition );
			if ( value !== "none" ) {
				this._fallbackTransition = $.mobile._maybeDegradeTransition( value );
				if ( this._fallbackTransition === "none" ) {
					this._fallbackTransition = "";
				}
				this._ui.container.addClass( this._fallbackTransition );
			}
		}

		return this;
	},

	_setOptions: function( newOptions ) {
		var currentOptions = this.options,
			theElement = this.element,
			screen = this._ui.screen;

		if ( newOptions.wrapperClass !== undefined ) {
			this._ui.container
				.removeClass( currentOptions.wrapperClass )
				.addClass( newOptions.wrapperClass );
		}

		if ( newOptions.theme !== undefined ) {
			theElement
				.removeClass( this._themeClassFromOption( "ui-body-", currentOptions.theme ) )
				.addClass( this._themeClassFromOption( "ui-body-", newOptions.theme ) );
		}

		if ( newOptions.overlayTheme !== undefined ) {
			screen
				.removeClass( this._themeClassFromOption( "ui-overlay-", currentOptions.overlayTheme ) )
				.addClass( this._themeClassFromOption( "ui-overlay-", newOptions.overlayTheme ) );

			if ( this._isOpen ) {
				screen.addClass( "in" );
			}
		}

		if ( newOptions.shadow !== undefined ) {
			theElement.toggleClass( "ui-overlay-shadow", newOptions.shadow );
		}

		if ( newOptions.corners !== undefined ) {
			theElement.toggleClass( "ui-corner-all", newOptions.corners );
		}

		if ( newOptions.transition !== undefined ) {
			if ( !this._currentTransition ) {
				this._applyTransition( newOptions.transition );
			}
		}

		if ( newOptions.tolerance !== undefined ) {
			this._setTolerance( newOptions.tolerance );
		}

		if ( newOptions.disabled !== undefined ) {
			if ( newOptions.disabled ) {
				this.close();
			}
		}

		return this._super( newOptions );
	},

	_setTolerance: function( value ) {
		var tol = { t: 30, r: 15, b: 30, l: 15 },
			ar;

		if ( value !== undefined ) {
			ar = String( value ).split( "," );

			$.each( ar, function( idx, val ) { ar[ idx ] = parseInt( val, 10 ); } );

			switch( ar.length ) {
				// All values are to be the same
				case 1:
					if ( !isNaN( ar[ 0 ] ) ) {
						tol.t = tol.r = tol.b = tol.l = ar[ 0 ];
					}
					break;

				// The first value denotes top/bottom tolerance, and the second value denotes left/right tolerance
				case 2:
					if ( !isNaN( ar[ 0 ] ) ) {
						tol.t = tol.b = ar[ 0 ];
					}
					if ( !isNaN( ar[ 1 ] ) ) {
						tol.l = tol.r = ar[ 1 ];
					}
					break;

				// The array contains values in the order top, right, bottom, left
				case 4:
					if ( !isNaN( ar[ 0 ] ) ) {
						tol.t = ar[ 0 ];
					}
					if ( !isNaN( ar[ 1 ] ) ) {
						tol.r = ar[ 1 ];
					}
					if ( !isNaN( ar[ 2 ] ) ) {
						tol.b = ar[ 2 ];
					}
					if ( !isNaN( ar[ 3 ] ) ) {
						tol.l = ar[ 3 ];
					}
					break;

				default:
					break;
			}
		}

		this._tolerance = tol;
		return this;
	},

	_clampPopupWidth: function( infoOnly ) {
		var menuSize,
			windowCoordinates = getWindowCoordinates( this.window ),
			// rectangle within which the popup must fit
			rectangle = {
				x: this._tolerance.l,
				y: windowCoordinates.y + this._tolerance.t,
				cx: windowCoordinates.cx - this._tolerance.l - this._tolerance.r,
				cy: windowCoordinates.cy - this._tolerance.t - this._tolerance.b
			};

		if ( !infoOnly ) {
			// Clamp the width of the menu before grabbing its size
			this._ui.container.css( "max-width", rectangle.cx );
		}

		menuSize = {
			cx: this._ui.container.outerWidth( true ),
			cy: this._ui.container.outerHeight( true )
		};

		return { rc: rectangle, menuSize: menuSize };
	},

	_calculateFinalLocation: function( desired, clampInfo ) {
		var returnValue,
			rectangle = clampInfo.rc,
			menuSize = clampInfo.menuSize;

		// Center the menu over the desired coordinates, while not going outside
		// the window tolerances. This will center wrt. the window if the popup is
		// too large.
		returnValue = {
			left: fitSegmentInsideSegment( rectangle.cx, menuSize.cx, rectangle.x, desired.x ),
			top: fitSegmentInsideSegment( rectangle.cy, menuSize.cy, rectangle.y, desired.y )
		};

		// Make sure the top of the menu is visible
		returnValue.top = Math.max( 0, returnValue.top );

		// If the height of the menu is smaller than the height of the document
		// align the bottom with the bottom of the document

		returnValue.top -= Math.min( returnValue.top,
			Math.max( 0, returnValue.top + menuSize.cy - this.document.height() ) );

		return returnValue;
	},

	// Try and center the overlay over the given coordinates
	_placementCoords: function( desired ) {
		return this._calculateFinalLocation( desired, this._clampPopupWidth() );
	},

	_createPrerequisites: function( screenPrerequisite, containerPrerequisite, whenDone ) {
		var prerequisites,
			self = this;

		// It is important to maintain both the local variable prerequisites and
		// self._prerequisites. The local variable remains in the closure of the
		// functions which call the callbacks passed in. The comparison between the
		// local variable and self._prerequisites is necessary, because once a
		// function has been passed to .animationComplete() it will be called next
		// time an animation completes, even if that's not the animation whose end
		// the function was supposed to catch (for example, if an abort happens
		// during the opening animation, the .animationComplete handler is not
		// called for that animation anymore, but the handler remains attached, so
		// it is called the next time the popup is opened - making it stale.
		// Comparing the local variable prerequisites to the widget-level variable
		// self._prerequisites ensures that callbacks triggered by a stale
		// .animationComplete will be ignored.

		prerequisites = {
			screen: $.Deferred(),
			container: $.Deferred()
		};

		prerequisites.screen.then( function() {
			if ( prerequisites === self._prerequisites ) {
				screenPrerequisite();
			}
		});

		prerequisites.container.then( function() {
			if ( prerequisites === self._prerequisites ) {
				containerPrerequisite();
			}
		});

		$.when( prerequisites.screen, prerequisites.container ).done( function() {
			if ( prerequisites === self._prerequisites ) {
				self._prerequisites = null;
				whenDone();
			}
		});

		self._prerequisites = prerequisites;
	},

	_animate: function( args ) {
		// NOTE before removing the default animation of the screen
		//      this had an animate callback that would resolve the deferred
		//      now the deferred is resolved immediately
		// TODO remove the dependency on the screen deferred
		this._ui.screen
			.removeClass( args.classToRemove )
			.addClass( args.screenClassToAdd );

		args.prerequisites.screen.resolve();

		if ( args.transition && args.transition !== "none" ) {
			if ( args.applyTransition ) {
				this._applyTransition( args.transition );
			}
			if ( this._fallbackTransition ) {
				this._ui.container
					.addClass( args.containerClassToAdd )
					.removeClass( args.classToRemove )
					.animationComplete( $.proxy( args.prerequisites.container, "resolve" ) );
				return;
			}
		}
		this._ui.container.removeClass( args.classToRemove );
		args.prerequisites.container.resolve();
	},

	// The desired coordinates passed in will be returned untouched if no reference element can be identified via
	// desiredPosition.positionTo. Nevertheless, this function ensures that its return value always contains valid
	// x and y coordinates by specifying the center middle of the window if the coordinates are absent.
	// options: { x: coordinate, y: coordinate, positionTo: string: "origin", "window", or jQuery selector
	_desiredCoords: function( openOptions ) {
		var offset,
			dst = null,
			windowCoordinates = getWindowCoordinates( this.window ),
			x = openOptions.x,
			y = openOptions.y,
			pTo = openOptions.positionTo;

		// Establish which element will serve as the reference
		if ( pTo && pTo !== "origin" ) {
			if ( pTo === "window" ) {
				x = windowCoordinates.cx / 2 + windowCoordinates.x;
				y = windowCoordinates.cy / 2 + windowCoordinates.y;
			} else {
				try {
					dst = $( pTo );
				} catch( err ) {
					dst = null;
				}
				if ( dst ) {
					dst.filter( ":visible" );
					if ( dst.length === 0 ) {
						dst = null;
					}
				}
			}
		}

		// If an element was found, center over it
		if ( dst ) {
			offset = dst.offset();
			x = offset.left + dst.outerWidth() / 2;
			y = offset.top + dst.outerHeight() / 2;
		}

		// Make sure x and y are valid numbers - center over the window
		if ( $.type( x ) !== "number" || isNaN( x ) ) {
			x = windowCoordinates.cx / 2 + windowCoordinates.x;
		}
		if ( $.type( y ) !== "number" || isNaN( y ) ) {
			y = windowCoordinates.cy / 2 + windowCoordinates.y;
		}

		return { x: x, y: y };
	},

	_reposition: function( openOptions ) {
		// We only care about position-related parameters for repositioning
		openOptions = {
			x: openOptions.x,
			y: openOptions.y,
			positionTo: openOptions.positionTo
		};
		this._trigger( "beforeposition", undefined, openOptions );
		this._ui.container.offset( this._placementCoords( this._desiredCoords( openOptions ) ) );
	},

	reposition: function( openOptions ) {
		if ( this._isOpen ) {
			this._reposition( openOptions );
		}
	},

	_safelyBlur: function( currentElement ){
		if ( currentElement !== this.window[ 0 ] &&
			currentElement.nodeName.toLowerCase() !== "body" ) {
				$( currentElement ).blur();
		}
	},

	_openPrerequisitesComplete: function() {
		var id = this.element.attr( "id" ),
			firstFocus = this._ui.container.find( ":focusable" ).first();

		this._ui.container.addClass( "ui-popup-active" );
		this._isOpen = true;
		this._resizeScreen();

		// Check to see if currElement is not a child of the container.  If it's not, blur
		if ( !$.contains( this._ui.container[ 0 ], this.document[ 0 ].activeElement ) ) {
			this._safelyBlur( this.document[ 0 ].activeElement );
		}
		if ( firstFocus.length > 0 ) {
			this._ui.focusElement = firstFocus;
		}
		this._ignoreResizeEvents();
		if ( id ) {
			this.document.find( "[aria-haspopup='true'][aria-owns='" +  id + "']" ).attr( "aria-expanded", true );
		}
		this._trigger( "afteropen" );
	},

	_open: function( options ) {
		var openOptions = $.extend( {}, this.options, options ),
			// TODO move blacklist to private method
			androidBlacklist = ( function() {
				var ua = navigator.userAgent,
					// Rendering engine is Webkit, and capture major version
					wkmatch = ua.match( /AppleWebKit\/([0-9\.]+)/ ),
					wkversion = !!wkmatch && wkmatch[ 1 ],
					androidmatch = ua.match( /Android (\d+(?:\.\d+))/ ),
					andversion = !!androidmatch && androidmatch[ 1 ],
					chromematch = ua.indexOf( "Chrome" ) > -1;

				// Platform is Android, WebKit version is greater than 534.13 ( Android 3.2.1 ) and not Chrome.
				if ( androidmatch !== null && andversion === "4.0" && wkversion && wkversion > 534.13 && !chromematch ) {
					return true;
				}
				return false;
			}());

		// Count down to triggering "popupafteropen" - we have two prerequisites:
		// 1. The popup window animation completes (container())
		// 2. The screen opacity animation completes (screen())
		this._createPrerequisites(
			$.noop,
			$.noop,
			$.proxy( this, "_openPrerequisitesComplete" ) );

		this._currentTransition = openOptions.transition;
		this._applyTransition( openOptions.transition );

		this._ui.screen.removeClass( "ui-screen-hidden" );
		this._ui.container.removeClass( "ui-popup-truncate" );

		// Give applications a chance to modify the contents of the container before it appears
		this._reposition( openOptions );

		this._ui.container.removeClass( "ui-popup-hidden" );

		if ( this.options.overlayTheme && androidBlacklist ) {
			/* TODO: The native browser on Android 4.0.X ("Ice Cream Sandwich") suffers from an issue where the popup overlay appears to be z-indexed above the popup itself when certain other styles exist on the same page -- namely, any element set to `position: fixed` and certain types of input. These issues are reminiscent of previously uncovered bugs in older versions of Android's native browser: https://github.com/scottjehl/Device-Bugs/issues/3
			This fix closes the following bugs ( I use "closes" with reluctance, and stress that this issue should be revisited as soon as possible ):
			https://github.com/jquery/jquery-mobile/issues/4816
			https://github.com/jquery/jquery-mobile/issues/4844
			https://github.com/jquery/jquery-mobile/issues/4874
			*/

			// TODO sort out why this._page isn't working
			this.element.closest( ".ui-page" ).addClass( "ui-popup-open" );
		}
		this._animate({
			additionalCondition: true,
			transition: openOptions.transition,
			classToRemove: "",
			screenClassToAdd: "in",
			containerClassToAdd: "in",
			applyTransition: false,
			prerequisites: this._prerequisites
		});
	},

	_closePrerequisiteScreen: function() {
		this._ui.screen
			.removeClass( "out" )
			.addClass( "ui-screen-hidden" );
	},

	_closePrerequisiteContainer: function() {
		this._ui.container
			.removeClass( "reverse out" )
			.addClass( "ui-popup-hidden ui-popup-truncate" )
			.removeAttr( "style" );
	},

	_closePrerequisitesDone: function() {
		var container = this._ui.container,
			id = this.element.attr( "id" );

		// remove the global mutex for popups
		$.mobile.popup.active = undefined;

		// Blur elements inside the container, including the container
		$( ":focus", container[ 0 ] ).add( container[ 0 ] ).blur();

		if ( id ) {
			this.document.find( "[aria-haspopup='true'][aria-owns='" +  id + "']" ).attr( "aria-expanded", false );
		}

		// alert users that the popup is closed
		this._trigger( "afterclose" );
	},

	_close: function( immediate ) {
		this._ui.container.removeClass( "ui-popup-active" );
		this._page.removeClass( "ui-popup-open" );

		this._isOpen = false;

		// Count down to triggering "popupafterclose" - we have two prerequisites:
		// 1. The popup window reverse animation completes (container())
		// 2. The screen opacity animation completes (screen())
		this._createPrerequisites(
			$.proxy( this, "_closePrerequisiteScreen" ),
			$.proxy( this, "_closePrerequisiteContainer" ),
			$.proxy( this, "_closePrerequisitesDone" ) );

		this._animate( {
			additionalCondition: this._ui.screen.hasClass( "in" ),
			transition: ( immediate ? "none" : ( this._currentTransition ) ),
			classToRemove: "in",
			screenClassToAdd: "out",
			containerClassToAdd: "reverse out",
			applyTransition: true,
			prerequisites: this._prerequisites
		});
	},

	_unenhance: function() {
		if ( this.options.enhanced ) {
			return;
		}

		// Put the element back to where the placeholder was and remove the "ui-popup" class
		this._setOptions( { theme: $.mobile.popup.prototype.options.theme } );
		this.element
			// Cannot directly insertAfter() - we need to detach() first, because
			// insertAfter() will do nothing if the payload div was not attached
			// to the DOM at the time the widget was created, and so the payload
			// will remain inside the container even after we call insertAfter().
			// If that happens and we remove the container a few lines below, we
			// will cause an infinite recursion - #5244
			.detach()
			.insertAfter( this._ui.placeholder )
			.removeClass( "ui-popup ui-overlay-shadow ui-corner-all ui-body-inherit" );
		this._ui.screen.remove();
		this._ui.container.remove();
		this._ui.placeholder.remove();
	},

	_destroy: function() {
		if ( $.mobile.popup.active === this ) {
			this.element.one( "popupafterclose", $.proxy( this, "_unenhance" ) );
			this.close();
		} else {
			this._unenhance();
		}

		return this;
	},

	_closePopup: function( theEvent, data ) {
		var parsedDst, toUrl,
			currentOptions = this.options,
			immediate = false;

		if ( ( theEvent && theEvent.isDefaultPrevented() ) || $.mobile.popup.active !== this ) {
			return;
		}

		// restore location on screen
		window.scrollTo( 0, this._scrollTop );

		if ( theEvent && theEvent.type === "pagebeforechange" && data ) {
			// Determine whether we need to rapid-close the popup, or whether we can
			// take the time to run the closing transition
			if ( typeof data.toPage === "string" ) {
				parsedDst = data.toPage;
			} else {
				parsedDst = data.toPage.jqmData( "url" );
			}
			parsedDst = $.mobile.path.parseUrl( parsedDst );
			toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;

			if ( this._myUrl !== $.mobile.path.makeUrlAbsolute( toUrl ) ) {
				// Going to a different page - close immediately
				immediate = true;
			} else {
				theEvent.preventDefault();
			}
		}

		// remove nav bindings
		this.window.off( currentOptions.closeEvents );
		// unbind click handlers added when history is disabled
		this.element.undelegate( currentOptions.closeLinkSelector, currentOptions.closeLinkEvents );

		this._close( immediate );
	},

	// any navigation event after a popup is opened should close the popup
	// NOTE the pagebeforechange is bound to catch navigation events that don't
	//      alter the url (eg, dialogs from popups)
	_bindContainerClose: function() {
		this.window
			.on( this.options.closeEvents, $.proxy( this, "_closePopup" ) );
	},

	widget: function() {
		return this._ui.container;
	},

	// TODO no clear deliniation of what should be here and
	// what should be in _open. Seems to be "visual" vs "history" for now
	open: function( options ) {
		var url, hashkey, activePage, currentIsDialog, hasHash, urlHistory,
			self = this,
			currentOptions = this.options;

		// make sure open is idempotent
		if ( $.mobile.popup.active || currentOptions.disabled ) {
			return this;
		}

		// set the global popup mutex
		$.mobile.popup.active = this;
		this._scrollTop = this.window.scrollTop();

		// if history alteration is disabled close on navigate events
		// and leave the url as is
		if ( !( currentOptions.history ) ) {
			self._open( options );
			self._bindContainerClose();

			// When histoy is disabled we have to grab the data-rel
			// back link clicks so we can close the popup instead of
			// relying on history to do it for us
			self.element
				.delegate( currentOptions.closeLinkSelector, currentOptions.closeLinkEvents, function( theEvent ) {
					self.close();
					theEvent.preventDefault();
				});

			return this;
		}

		// cache some values for min/readability
		urlHistory = $.mobile.navigate.history;
		hashkey = $.mobile.dialogHashKey;
		activePage = $.mobile.activePage;
		currentIsDialog = ( activePage ? activePage.hasClass( "ui-dialog" ) : false );
		this._myUrl = url = urlHistory.getActive().url;
		hasHash = ( url.indexOf( hashkey ) > -1 ) && !currentIsDialog && ( urlHistory.activeIndex > 0 );

		if ( hasHash ) {
			self._open( options );
			self._bindContainerClose();
			return this;
		}

		// if the current url has no dialog hash key proceed as normal
		// otherwise, if the page is a dialog simply tack on the hash key
		if ( url.indexOf( hashkey ) === -1 && !currentIsDialog ) {
			url = url + (url.indexOf( "#" ) > -1 ? hashkey : "#" + hashkey);
		} else {
			url = $.mobile.path.parseLocation().hash + hashkey;
		}

		// swallow the the initial navigation event, and bind for the next
		this.window.one( "beforenavigate", function( theEvent ) {
			theEvent.preventDefault();
			self._open( options );
			self._bindContainerClose();
		});

		this.urlAltered = true;
		$.mobile.navigate( url, { role: "dialog" } );

		return this;
	},

	close: function() {
		// make sure close is idempotent
		if ( $.mobile.popup.active !== this ) {
			return this;
		}

		this._scrollTop = this.window.scrollTop();

		if ( this.options.history && this.urlAltered ) {
			$.mobile.back();
			this.urlAltered = false;
		} else {
			// simulate the nav bindings having fired
			this._closePopup();
		}

		return this;
	}
});

// TODO this can be moved inside the widget
$.mobile.popup.handleLink = function( $link ) {
	var offset,
		path = $.mobile.path,

		// NOTE make sure to get only the hash from the href because ie7 (wp7)
		//      returns the absolute href in this case ruining the element selection
		popup = $( path.hashToSelector( path.parseUrl( $link.attr( "href" ) ).hash ) ).first();

	if ( popup.length > 0 && popup.data( "mobile-popup" ) ) {
		offset = $link.offset();
		popup.popup( "open", {
			x: offset.left + $link.outerWidth() / 2,
			y: offset.top + $link.outerHeight() / 2,
			transition: $link.jqmData( "transition" ),
			positionTo: $link.jqmData( "position-to" )
		});
	}

	//remove after delay
	setTimeout( function() {
		$link.removeClass( $.mobile.activeBtnClass );
	}, 300 );
};

// TODO move inside _create
$.mobile.document.on( "pagebeforechange", function( theEvent, data ) {
	if ( data.options.role === "popup" ) {
		$.mobile.popup.handleLink( data.options.link );
		theEvent.preventDefault();
	}
});

})( jQuery );

/*
* custom "selectmenu" plugin
*/

(function( $, undefined ) {

var unfocusableItemSelector = ".ui-disabled,.ui-state-disabled,.ui-li-divider,.ui-screen-hidden,:jqmData(role='placeholder')",
	goToAdjacentItem = function( item, target, direction ) {
		var adjacent = item[ direction + "All" ]()
			.not( unfocusableItemSelector )
			.first();

		// if there's a previous option, focus it
		if ( adjacent.length ) {
			target
				.blur()
				.attr( "tabindex", "-1" );

			adjacent.find( "a" ).first().focus();
		}
	};

$.widget( "mobile.selectmenu", $.mobile.selectmenu, {
	_create: function() {
		var o = this.options;

		// Custom selects cannot exist inside popups, so revert the "nativeMenu"
		// option to true if a parent is a popup
		o.nativeMenu = o.nativeMenu || ( this.element.parents( ":jqmData(role='popup'),:mobile-popup" ).length > 0 );

		return this._super();
	},

	_handleSelectFocus: function() {
		this.element.blur();
		this.button.focus();
	},

	_handleKeydown: function( event ) {
		this._super( event );
		this._handleButtonVclickKeydown( event );
	},

	_handleButtonVclickKeydown: function( event ) {
		if ( this.options.disabled || this.isOpen || this.options.nativeMenu ) {
			return;
		}

		if (event.type === "vclick" ||
				event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE)) {

			this._decideFormat();
			if ( this.menuType === "overlay" ) {
				this.button.attr( "href", "#" + this.popupId ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "popup" );
			} else {
				this.button.attr( "href", "#" + this.dialogId ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "dialog" );
			}
			this.isOpen = true;
			// Do not prevent default, so the navigation may have a chance to actually open the chosen format
		}
	},

	_handleListFocus: function( e ) {
		var params = ( e.type === "focusin" ) ?
			{ tabindex: "0", event: "vmouseover" }:
			{ tabindex: "-1", event: "vmouseout" };

		$( e.target )
			.attr( "tabindex", params.tabindex )
			.trigger( params.event );
	},

	_handleListKeydown: function( event ) {
		var target = $( event.target ),
			li = target.closest( "li" );

		// switch logic based on which key was pressed
		switch ( event.keyCode ) {
			// up or left arrow keys
		case 38:
			goToAdjacentItem( li, target, "prev" );
			return false;
			// down or right arrow keys
		case 40:
			goToAdjacentItem( li, target, "next" );
			return false;
			// If enter or space is pressed, trigger click
		case 13:
		case 32:
			target.trigger( "click" );
			return false;
		}
	},

	_handleMenuPageHide: function() {

		// After the dialog's done, we may want to trigger change if the value has actually changed
		this._delayedTrigger();

		// TODO centralize page removal binding / handling in the page plugin.
		// Suggestion from @jblas to do refcounting
		//
		// TODO extremely confusing dependency on the open method where the pagehide.remove
		// bindings are stripped to prevent the parent page from disappearing. The way
		// we're keeping pages in the DOM right now sucks
		//
		// rebind the page remove that was unbound in the open function
		// to allow for the parent page removal from actions other than the use
		// of a dialog sized custom select
		//
		// doing this here provides for the back button on the custom select dialog
		this.thisPage.page( "bindRemove" );
	},

	_handleHeaderCloseClick: function() {
		if ( this.menuType === "overlay" ) {
			this.close();
			return false;
		}
	},

	_handleListItemClick: function( event ) {
		var listItem = $( event.target ).closest( "li" ),

			// Index of option tag to be selected
			oldIndex = this.select[ 0 ].selectedIndex,
			newIndex = $.mobile.getAttribute( listItem, "option-index" ),
			option = this._selectOptions().eq( newIndex )[ 0 ];

		// Toggle selected status on the tag for multi selects
		option.selected = this.isMultiple ? !option.selected : true;

		// Toggle checkbox class for multiple selects
		if ( this.isMultiple ) {
			listItem.find( "a" )
				.toggleClass( "ui-checkbox-on", option.selected )
				.toggleClass( "ui-checkbox-off", !option.selected );
		}

		// If it's not a multiple select, trigger change after it has finished closing
		if ( !this.isMultiple && oldIndex !== newIndex ) {
			this._triggerChange = true;
		}

		// Trigger change if it's a multiple select
		// Hide custom select for single selects only - otherwise focus clicked item
		// We need to grab the clicked item the hard way, because the list may have been rebuilt
		if ( this.isMultiple ) {
			this.select.trigger( "change" );
			this.list.find( "li:not(.ui-li-divider)" ).eq( newIndex )
				.find( "a" ).first().focus();
		}
		else {
			this.close();
		}

		event.preventDefault();
	},

	build: function() {
		var selectId, popupId, dialogId, label, thisPage, isMultiple, menuId,
			themeAttr, overlayTheme, overlayThemeAttr, dividerThemeAttr,
			menuPage, listbox, list, header, headerTitle, menuPageContent,
			menuPageClose, headerClose,
			o = this.options;

		if ( o.nativeMenu ) {
			return this._super();
		}

		selectId = this.selectId;
		popupId = selectId + "-listbox";
		dialogId = selectId + "-dialog";
		label = this.label;
		thisPage = this.element.closest( ".ui-page" );
		isMultiple = this.element[ 0 ].multiple;
		menuId = selectId + "-menu";
		themeAttr = o.theme ? ( " data-" + $.mobile.ns + "theme='" + o.theme + "'" ) : "";
		overlayTheme = o.overlayTheme || o.theme || null;
		overlayThemeAttr = overlayTheme ? ( " data-" + $.mobile.ns +
			"overlay-theme='" + overlayTheme + "'" ) : "";
		dividerThemeAttr = ( o.dividerTheme && isMultiple ) ? ( " data-" + $.mobile.ns + "divider-theme='" + o.dividerTheme + "'" ) : "";
		menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' class='ui-selectmenu' id='" + dialogId + "'" + themeAttr + overlayThemeAttr + ">" +
			"<div data-" + $.mobile.ns + "role='header'>" +
			"<div class='ui-title'></div>"+
			"</div>"+
			"<div data-" + $.mobile.ns + "role='content'></div>"+
			"</div>" );
		listbox = $( "<div" + themeAttr + overlayThemeAttr + " id='" + popupId +
				"' class='ui-selectmenu'></div>" )
			.insertAfter( this.select )
			.popup();
		list = $( "<ul class='ui-selectmenu-list' id='" + menuId + "' role='listbox' aria-labelledby='" + this.buttonId + "'" + themeAttr + dividerThemeAttr + "></ul>" ).appendTo( listbox );
		header = $( "<div class='ui-header ui-bar-" + ( o.theme ? o.theme : "inherit" ) + "'></div>" ).prependTo( listbox );
		headerTitle = $( "<h1 class='ui-title'></h1>" ).appendTo( header );

		if ( this.isMultiple ) {
			headerClose = $( "<a>", {
				"role": "button",
				"text": o.closeText,
				"href": "#",
				"class": "ui-btn ui-corner-all ui-btn-left ui-btn-icon-notext ui-icon-delete"
			}).appendTo( header );
		}

		$.extend( this, {
			selectId: selectId,
			menuId: menuId,
			popupId: popupId,
			dialogId: dialogId,
			thisPage: thisPage,
			menuPage: menuPage,
			label: label,
			isMultiple: isMultiple,
			theme: o.theme,
			listbox: listbox,
			list: list,
			header: header,
			headerTitle: headerTitle,
			headerClose: headerClose,
			menuPageContent: menuPageContent,
			menuPageClose: menuPageClose,
			placeholder: ""
		});

		// Create list from select, update state
		this.refresh();

		if ( this._origTabIndex === undefined ) {
			// Map undefined to false, because this._origTabIndex === undefined
			// indicates that we have not yet checked whether the select has
			// originally had a tabindex attribute, whereas false indicates that
			// we have checked the select for such an attribute, and have found
			// none present.
			this._origTabIndex = ( this.select[ 0 ].getAttribute( "tabindex" ) === null ) ? false : this.select.attr( "tabindex" );
		}
		this.select.attr( "tabindex", "-1" );
		this._on( this.select, { focus : "_handleSelectFocus" } );

		// Button events
		this._on( this.button, {
			vclick: "_handleButtonVclickKeydown"
		});

		// Events for list items
		this.list.attr( "role", "listbox" );
		this._on( this.list, {
			"focusin": "_handleListFocus",
			"focusout": "_handleListFocus",
			"keydown": "_handleListKeydown",
			"click li:not(.ui-disabled,.ui-state-disabled,.ui-li-divider)": "_handleListItemClick"
		});

		// button refocus ensures proper height calculation
		// by removing the inline style and ensuring page inclusion
		this._on( this.menuPage, { pagehide: "_handleMenuPageHide" } );

		// Events on the popup
		this._on( this.listbox, { popupafterclose: "_popupClosed" } );

		// Close button on small overlays
		if ( this.isMultiple ) {
			this._on( this.headerClose, { click: "_handleHeaderCloseClick" } );
		}

		return this;
	},

	_popupClosed: function() {
		this.close();
		this._delayedTrigger();
	},

	_delayedTrigger: function() {
		if ( this._triggerChange ) {
			this.element.trigger( "change" );
		}
		this._triggerChange = false;
	},

	_isRebuildRequired: function() {
		var list = this.list.find( "li" ),
			options = this._selectOptions().not( ".ui-screen-hidden" );

		// TODO exceedingly naive method to determine difference
		// ignores value changes etc in favor of a forcedRebuild
		// from the user in the refresh method
		return options.text() !== list.text();
	},

	selected: function() {
		return this._selectOptions().filter( ":selected:not( :jqmData(placeholder='true') )" );
	},

	refresh: function( force ) {
		var self, indices;

		if ( this.options.nativeMenu ) {
			return this._super( force );
		}

		self = this;
		if ( force || this._isRebuildRequired() ) {
			self._buildList();
		}

		indices = this.selectedIndices();

		self.setButtonText();
		self.setButtonCount();

		self.list.find( "li:not(.ui-li-divider)" )
			.find( "a" ).removeClass( $.mobile.activeBtnClass ).end()
			.attr( "aria-selected", false )
			.each(function( i ) {
				var item = $( this );
				if ( $.inArray( i, indices ) > -1 ) {

					// Aria selected attr
					item.attr( "aria-selected", true );

					// Multiple selects: add the "on" checkbox state to the icon
					if ( self.isMultiple ) {
						item.find( "a" ).removeClass( "ui-checkbox-off" ).addClass( "ui-checkbox-on" );
					} else {
						if ( item.hasClass( "ui-screen-hidden" ) ) {
							item.next().find( "a" ).addClass( $.mobile.activeBtnClass );
						} else {
							item.find( "a" ).addClass( $.mobile.activeBtnClass );
						}
					}
				} else if ( self.isMultiple ) {
					item.find( "a" ).removeClass( "ui-checkbox-on" ).addClass( "ui-checkbox-off" );
				}
			});
	},

	close: function() {
		if ( this.options.disabled || !this.isOpen ) {
			return;
		}

		var self = this;

		if ( self.menuType === "page" ) {
			self.menuPage.dialog( "close" );
			self.list.appendTo( self.listbox );
		} else {
			self.listbox.popup( "close" );
		}

		self._focusButton();
		// allow the dialog to be closed again
		self.isOpen = false;
	},

	open: function() {
		this.button.click();
	},

	_focusMenuItem: function() {
		var selector = this.list.find( "a." + $.mobile.activeBtnClass );
		if ( selector.length === 0 ) {
			selector = this.list.find( "li:not(" + unfocusableItemSelector + ") a.ui-btn" );
		}
		selector.first().focus();
	},

	_decideFormat: function() {
		var self = this,
			$window = this.window,
			selfListParent = self.list.parent(),
			menuHeight = selfListParent.outerHeight(),
			scrollTop = $window.scrollTop(),
			btnOffset = self.button.offset().top,
			screenHeight = $window.height();

		if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {

			self.menuPage.appendTo( $.mobile.pageContainer ).page();
			self.menuPageContent = self.menuPage.find( ".ui-content" );
			self.menuPageClose = self.menuPage.find( ".ui-header a" );

			// prevent the parent page from being removed from the DOM,
			// otherwise the results of selecting a list item in the dialog
			// fall into a black hole
			self.thisPage.unbind( "pagehide.remove" );

			//for WebOS/Opera Mini (set lastscroll using button offset)
			if ( scrollTop === 0 && btnOffset > screenHeight ) {
				self.thisPage.one( "pagehide", function() {
					$( this ).jqmData( "lastScroll", btnOffset );
				});
			}

			self.menuPage.one( {
				pageshow: $.proxy( this, "_focusMenuItem" ),
				pagehide: $.proxy( this, "close" )
			});

			self.menuType = "page";
			self.menuPageContent.append( self.list );
			self.menuPage
				.find( "div .ui-title" )
					.text( self.label.getEncodedText() || self.placeholder );
		} else {
			self.menuType = "overlay";

			self.listbox.one( { popupafteropen: $.proxy( this, "_focusMenuItem" ) } );
		}
	},

	_buildList: function() {
		var self = this,
			o = this.options,
			placeholder = this.placeholder,
			needPlaceholder = true,
			dataIcon = "false",
			$options, numOptions, select,
			dataPrefix = "data-" + $.mobile.ns,
			dataIndexAttr = dataPrefix + "option-index",
			dataIconAttr = dataPrefix + "icon",
			dataRoleAttr = dataPrefix + "role",
			dataPlaceholderAttr = dataPrefix + "placeholder",
			fragment = document.createDocumentFragment(),
			isPlaceholderItem = false,
			optGroup,
			i,
			option, $option, parent, text, anchor, classes,
			optLabel, divider, item;

		self.list.empty().filter( ".ui-listview" ).listview( "destroy" );
		$options = this._selectOptions();
		numOptions = $options.length;
		select = this.select[ 0 ];

		for ( i = 0; i < numOptions;i++, isPlaceholderItem = false) {
			option = $options[i];
			$option = $( option );

			// Do not create options based on ui-screen-hidden select options
			if ( $option.hasClass( "ui-screen-hidden" ) ) {
				continue;
			}

			parent = option.parentNode;
			classes = [];

			// Although using .text() here raises the risk that, when we later paste this into the
			// list item we end up pasting possibly malicious things like <script> tags, that risk
			// only arises if we do something like $( "<li><a href='#'>" + text + "</a></li>" ). We
			// don't do that. We do document.createTextNode( text ) instead, which guarantees that
			// whatever we paste in will end up as text, with characters like <, > and & escaped.
			text = $option.text();
			anchor = document.createElement( "a" );
			anchor.setAttribute( "href", "#" );
			anchor.appendChild( document.createTextNode( text ) );

			// Are we inside an optgroup?
			if ( parent !== select && parent.nodeName.toLowerCase() === "optgroup" ) {
				optLabel = parent.getAttribute( "label" );
				if ( optLabel !== optGroup ) {
					divider = document.createElement( "li" );
					divider.setAttribute( dataRoleAttr, "list-divider" );
					divider.setAttribute( "role", "option" );
					divider.setAttribute( "tabindex", "-1" );
					divider.appendChild( document.createTextNode( optLabel ) );
					fragment.appendChild( divider );
					optGroup = optLabel;
				}
			}

			if ( needPlaceholder && ( !option.getAttribute( "value" ) || text.length === 0 || $option.jqmData( "placeholder" ) ) ) {
				needPlaceholder = false;
				isPlaceholderItem = true;

				// If we have identified a placeholder, record the fact that it was
				// us who have added the placeholder to the option and mark it
				// retroactively in the select as well
				if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
					this._removePlaceholderAttr = true;
				}
				option.setAttribute( dataPlaceholderAttr, true );
				if ( o.hidePlaceholderMenuItems ) {
					classes.push( "ui-screen-hidden" );
				}
				if ( placeholder !== text ) {
					placeholder = self.placeholder = text;
				}
			}

			item = document.createElement( "li" );
			if ( option.disabled ) {
				classes.push( "ui-state-disabled" );
				item.setAttribute( "aria-disabled", true );
			}
			item.setAttribute( dataIndexAttr, i );
			item.setAttribute( dataIconAttr, dataIcon );
			if ( isPlaceholderItem ) {
				item.setAttribute( dataPlaceholderAttr, true );
			}
			item.className = classes.join( " " );
			item.setAttribute( "role", "option" );
			anchor.setAttribute( "tabindex", "-1" );
			if ( this.isMultiple ) {
				$( anchor ).addClass( "ui-btn ui-checkbox-off ui-btn-icon-right" );
			}

			item.appendChild( anchor );
			fragment.appendChild( item );
		}

		self.list[0].appendChild( fragment );

		// Hide header if it's not a multiselect and there's no placeholder
		if ( !this.isMultiple && !placeholder.length ) {
			this.header.addClass( "ui-screen-hidden" );
		} else {
			this.headerTitle.text( this.placeholder );
		}

		// Now populated, create listview
		self.list.listview();
	},

	_button: function() {
		return this.options.nativeMenu ?
			this._super() :
			$( "<a>", {
				"href": "#",
				"role": "button",
				// TODO value is undefined at creation
				"id": this.buttonId,
				"aria-haspopup": "true",

				// TODO value is undefined at creation
				"aria-owns": this.menuId
			});
	},

	_destroy: function() {

		if ( !this.options.nativeMenu ) {
			this.close();

			// Restore the tabindex attribute to its original value
			if ( this._origTabIndex !== undefined ) {
				if ( this._origTabIndex !== false ) {
					this.select.attr( "tabindex", this._origTabIndex );
				} else {
					this.select.removeAttr( "tabindex" );
				}
			}

			// Remove the placeholder attribute if we were the ones to add it
			if ( this._removePlaceholderAttr ) {
				this._selectOptions().removeAttr( "data-" + $.mobile.ns + "placeholder" );
			}

			// Remove the popup
			this.listbox.remove();

			// Remove the dialog
			this.menuPage.remove();
		}

		// Chain up
		this._super();
	}
});

})( jQuery );


// buttonMarkup is deprecated as of 1.4.0 and will be removed in 1.5.0.

(function( $, undefined ) {

// General policy: Do not access data-* attributes except during enhancement.
// In all other cases we determine the state of the button exclusively from its
// className. That's why optionsToClasses expects a full complement of options,
// and the jQuery plugin completes the set of options from the default values.

// Map classes to buttonMarkup boolean options - used in classNameToOptions()
var reverseBoolOptionMap = {
		"ui-shadow" : "shadow",
		"ui-corner-all" : "corners",
		"ui-btn-inline" : "inline",
		"ui-shadow-icon" : "iconshadow", /* TODO: Remove in 1.5 */
		"ui-mini" : "mini"
	},
	getAttrFixed = function() {
		var ret = $.mobile.getAttribute.apply( this, arguments );

		return ( ret == null ? undefined : ret );
	},
	capitalLettersRE = /[A-Z]/g;

// optionsToClasses:
// @options: A complete set of options to convert to class names.
// @existingClasses: extra classes to add to the result
//
// Converts @options to buttonMarkup classes and returns the result as an array
// that can be converted to an element's className with .join( " " ). All
// possible options must be set inside @options. Use $.fn.buttonMarkup.defaults
// to get a complete set and use $.extend to override your choice of options
// from that set.
function optionsToClasses( options, existingClasses ) {
	var classes = existingClasses ? existingClasses : [];

	// Add classes to the array - first ui-btn
	classes.push( "ui-btn" );

	// If there is a theme
	if ( options.theme ) {
		classes.push( "ui-btn-" + options.theme );
	}

	// If there's an icon, add the icon-related classes
	if ( options.icon ) {
		classes = classes.concat([
			"ui-icon-" + options.icon,
			"ui-btn-icon-" + options.iconpos
		]);
		if ( options.iconshadow ) {
			classes.push( "ui-shadow-icon" ); /* TODO: Remove in 1.5 */
		}
	}

	// Add the appropriate class for each boolean option
	if ( options.inline ) {
		classes.push( "ui-btn-inline" );
	}
	if ( options.shadow ) {
		classes.push( "ui-shadow" );
	}
	if ( options.corners ) {
		classes.push( "ui-corner-all" );
	}
	if ( options.mini ) {
		classes.push( "ui-mini" );
	}

	// Create a string from the array and return it
	return classes;
}

// classNameToOptions:
// @classes: A string containing a .className-style space-separated class list
//
// Loops over @classes and calculates an options object based on the
// buttonMarkup-related classes it finds. It records unrecognized classes in an
// array.
//
// Returns: An object containing the following items:
//
// "options": buttonMarkup options found to be present because of the
// presence/absence of corresponding classes
//
// "unknownClasses": a string containing all the non-buttonMarkup-related
// classes found in @classes
//
// "alreadyEnhanced": A boolean indicating whether the ui-btn class was among
// those found to be present
function classNameToOptions( classes ) {
	var idx, map, unknownClass,
		alreadyEnhanced = false,
		noIcon = true,
		o = {
			icon: "",
			inline: false,
			shadow: false,
			corners: false,
			iconshadow: false,
			mini: false
		},
		unknownClasses = [];

	classes = classes.split( " " );

	// Loop over the classes
	for ( idx = 0 ; idx < classes.length ; idx++ ) {

		// Assume it's an unrecognized class
		unknownClass = true;

		// Recognize boolean options from the presence of classes
		map = reverseBoolOptionMap[ classes[ idx ] ];
		if ( map !== undefined ) {
			unknownClass = false;
			o[ map ] = true;

		// Recognize the presence of an icon and establish the icon position
		} else if ( classes[ idx ].indexOf( "ui-btn-icon-" ) === 0 ) {
			unknownClass = false;
			noIcon = false;
			o.iconpos = classes[ idx ].substring( 12 );

		// Establish which icon is present
		} else if ( classes[ idx ].indexOf( "ui-icon-" ) === 0 ) {
			unknownClass = false;
			o.icon = classes[ idx ].substring( 8 );

		// Establish the theme - this recognizes one-letter theme swatch names
		} else if ( classes[ idx ].indexOf( "ui-btn-" ) === 0 && classes[ idx ].length === 8 ) {
			unknownClass = false;
			o.theme = classes[ idx ].substring( 7 );

		// Recognize that this element has already been buttonMarkup-enhanced
		} else if ( classes[ idx ] === "ui-btn" ) {
			unknownClass = false;
			alreadyEnhanced = true;
		}

		// If this class has not been recognized, add it to the list
		if ( unknownClass ) {
			unknownClasses.push( classes[ idx ] );
		}
	}

	// If a "ui-btn-icon-*" icon position class is absent there cannot be an icon
	if ( noIcon ) {
		o.icon = "";
	}

	return {
		options: o,
		unknownClasses: unknownClasses,
		alreadyEnhanced: alreadyEnhanced
	};
}

function camelCase2Hyphenated( c ) {
	return "-" + c.toLowerCase();
}

// $.fn.buttonMarkup:
// DOM: gets/sets .className
//
// @options: options to apply to the elements in the jQuery object
// @overwriteClasses: boolean indicating whether to honour existing classes
//
// Calculates the classes to apply to the elements in the jQuery object based on
// the options passed in. If @overwriteClasses is true, it sets the className
// property of each element in the jQuery object to the buttonMarkup classes
// it calculates based on the options passed in.
//
// If you wish to preserve any classes that are already present on the elements
// inside the jQuery object, including buttonMarkup-related classes that were
// added by a previous call to $.fn.buttonMarkup() or during page enhancement
// then you should omit @overwriteClasses or set it to false.
$.fn.buttonMarkup = function( options, overwriteClasses ) {
	var idx, data, el, retrievedOptions, optionKey,
		defaults = $.fn.buttonMarkup.defaults;

	for ( idx = 0 ; idx < this.length ; idx++ ) {
		el = this[ idx ];
		data = overwriteClasses ?

			// Assume this element is not enhanced and ignore its classes
			{ alreadyEnhanced: false, unknownClasses: [] } :

			// Otherwise analyze existing classes to establish existing options and
			// classes
			classNameToOptions( el.className );

		retrievedOptions = $.extend( {},

			// If the element already has the class ui-btn, then we assume that
			// it has passed through buttonMarkup before - otherwise, the options
			// returned by classNameToOptions do not correctly reflect the state of
			// the element
			( data.alreadyEnhanced ? data.options : {} ),

			// Finally, apply the options passed in
			options );

		// If this is the first call on this element, retrieve remaining options
		// from the data-attributes
		if ( !data.alreadyEnhanced ) {
			for ( optionKey in defaults ) {
				if ( retrievedOptions[ optionKey ] === undefined ) {
					retrievedOptions[ optionKey ] = getAttrFixed( el,
						optionKey.replace( capitalLettersRE, camelCase2Hyphenated )
					);
				}
			}
		}

		el.className = optionsToClasses(

			// Merge all the options and apply them as classes
			$.extend( {},

				// The defaults form the basis
				defaults,

				// Add the computed options
				retrievedOptions
			),

			// ... and re-apply any unrecognized classes that were found
			data.unknownClasses ).join( " " );
		if ( el.tagName.toLowerCase() !== "button" ) {
			el.setAttribute( "role", "button" );
		}
	}

	return this;
};

// buttonMarkup defaults. This must be a complete set, i.e., a value must be
// given here for all recognized options
$.fn.buttonMarkup.defaults = {
	icon: "",
	iconpos: "left",
	theme: null,
	inline: false,
	shadow: true,
	corners: true,
	iconshadow: false, /* TODO: Remove in 1.5. Option deprecated in 1.4. */
	mini: false
};

$.extend( $.fn.buttonMarkup, {
	initSelector: "a:jqmData(role='button'), .ui-bar > a, .ui-bar > :jqmData(role='controlgroup') > a, button:not(:jqmData(role='navbar') button)"
});

})( jQuery );


(function( $, undefined ) {

$.widget( "mobile.controlgroup", $.extend( {
	options: {
		enhanced: false,
		theme: null,
		shadow: false,
		corners: true,
		excludeInvisible: true,
		type: "vertical",
		mini: false
	},

	_create: function() {
		var elem = this.element,
			opts = this.options,
			keepNative = $.mobile.page.prototype.keepNativeSelector();

		// Run buttonmarkup
		if ( $.fn.buttonMarkup ) {
			this.element
				.find( $.fn.buttonMarkup.initSelector )
				.not( keepNative )
				.buttonMarkup();
		}
		// Enhance child widgets
		$.each( this._childWidgets, $.proxy( function( number, widgetName ) {
			if ( $.mobile[ widgetName ] ) {
				this.element
					.find( $.mobile[ widgetName ].initSelector )
					.not( keepNative )[ widgetName ]();
			}
		}, this ));

		$.extend( this, {
			_ui: null,
			_initialRefresh: true
		});

		if ( opts.enhanced ) {
			this._ui = {
				groupLegend: elem.children( ".ui-controlgroup-label" ).children(),
				childWrapper: elem.children( ".ui-controlgroup-controls" )
			};
		} else {
			this._ui = this._enhance();
		}

	},

	_childWidgets: [ "checkboxradio", "selectmenu", "button" ],

	_themeClassFromOption: function( value ) {
		return ( value ? ( value === "none" ? "" : "ui-group-theme-" + value ) : "" );
	},

	_enhance: function() {
		var elem = this.element,
			opts = this.options,
			ui = {
				groupLegend: elem.children( "legend" ),
				childWrapper: elem
					.addClass( "ui-controlgroup " +
						"ui-controlgroup-" +
							( opts.type === "horizontal" ? "horizontal" : "vertical" ) + " " +
						this._themeClassFromOption( opts.theme ) + " " +
						( opts.corners ? "ui-corner-all " : "" ) +
						( opts.mini ? "ui-mini " : "" ) )
					.wrapInner( "<div " +
						"class='ui-controlgroup-controls " +
							( opts.shadow === true ? "ui-shadow" : "" ) + "'></div>" )
					.children()
			};

		if ( ui.groupLegend.length > 0 ) {
			$( "<div role='heading' class='ui-controlgroup-label'></div>" )
				.append( ui.groupLegend )
				.prependTo( elem );
		}

		return ui;
	},

	_init: function() {
		this.refresh();
	},

	_setOptions: function( options ) {
		var callRefresh, returnValue,
			elem = this.element;

		// Must have one of horizontal or vertical
		if ( options.type !== undefined ) {
			elem
				.removeClass( "ui-controlgroup-horizontal ui-controlgroup-vertical" )
				.addClass( "ui-controlgroup-" + ( options.type === "horizontal" ? "horizontal" : "vertical" ) );
			callRefresh = true;
		}

		if ( options.theme !== undefined ) {
			elem
				.removeClass( this._themeClassFromOption( this.options.theme ) )
				.addClass( this._themeClassFromOption( options.theme ) );
		}

		if ( options.corners !== undefined ) {
			elem.toggleClass( "ui-corner-all", options.corners );
		}

		if ( options.mini !== undefined ) {
			elem.toggleClass( "ui-mini", options.mini );
		}

		if ( options.shadow !== undefined ) {
			this._ui.childWrapper.toggleClass( "ui-shadow", options.shadow );
		}

		if ( options.excludeInvisible !== undefined ) {
			this.options.excludeInvisible = options.excludeInvisible;
			callRefresh = true;
		}

		returnValue = this._super( options );

		if ( callRefresh ) {
			this.refresh();
		}

		return returnValue;
	},

	container: function() {
		return this._ui.childWrapper;
	},

	refresh: function() {
		var $el = this.container(),
			els = $el.find( ".ui-btn" ).not( ".ui-slider-handle" ),
			create = this._initialRefresh;
		if ( $.mobile.checkboxradio ) {
			$el.find( ":mobile-checkboxradio" ).checkboxradio( "refresh" );
		}
		this._addFirstLastClasses( els,
			this.options.excludeInvisible ? this._getVisibles( els, create ) : els,
			create );
		this._initialRefresh = false;
	},

	// Caveat: If the legend is not the first child of the controlgroup at enhance
	// time, it will be after _destroy().
	_destroy: function() {
		var ui, buttons,
			opts = this.options;

		if ( opts.enhanced ) {
			return this;
		}

		ui = this._ui;
		buttons = this.element
			.removeClass( "ui-controlgroup " +
				"ui-controlgroup-horizontal ui-controlgroup-vertical ui-corner-all ui-mini " +
				this._themeClassFromOption( opts.theme ) )
			.find( ".ui-btn" )
			.not( ".ui-slider-handle" );

		this._removeFirstLastClasses( buttons );

		ui.groupLegend.unwrap();
		ui.childWrapper.children().unwrap();
	}
}, $.mobile.behaviors.addFirstLastClasses ) );

})(jQuery);

(function( $, undefined ) {

	$.widget( "mobile.toolbar", {
		initSelector: ":jqmData(role='footer'), :jqmData(role='header')",

		options: {
			theme: null,
			addBackBtn: false,
			backBtnTheme: null,
			backBtnText: "Back"
		},

		_create: function() {
			var leftbtn, rightbtn,
				role =  this.element.is( ":jqmData(role='header')" ) ? "header" : "footer",
				page = this.element.closest( ".ui-page" );
			if ( page.length === 0 ) {
				page = false;
				this._on( this.document, {
					"pageshow": "refresh"
				});
			}
			$.extend( this, {
				role: role,
				page: page,
				leftbtn: leftbtn,
				rightbtn: rightbtn
			});
			this.element.attr( "role", role === "header" ? "banner" : "contentinfo" ).addClass( "ui-" + role );
			this.refresh();
			this._setOptions( this.options );
		},
		_setOptions: function( o ) {
			if ( o.addBackBtn !== undefined ) {
				this._updateBackButton();
			}
			if ( o.backBtnTheme != null ) {
				this.element
					.find( ".ui-toolbar-back-btn" )
					.addClass( "ui-btn ui-btn-" + o.backBtnTheme );
			}
			if ( o.backBtnText !== undefined ) {
				this.element.find( ".ui-toolbar-back-btn .ui-btn-text" ).text( o.backBtnText );
			}
			if ( o.theme !== undefined ) {
				var currentTheme = this.options.theme ? this.options.theme : "inherit",
					newTheme = o.theme ? o.theme : "inherit";

				this.element.removeClass( "ui-bar-" + currentTheme ).addClass( "ui-bar-" + newTheme );
			}

			this._super( o );
		},
		refresh: function() {
			if ( this.role === "header" ) {
				this._addHeaderButtonClasses();
			}
			if ( !this.page ) {
				this._setRelative();
				if ( this.role === "footer" ) {
					this.element.appendTo( "body" );
				} else if ( this.role === "header" ) {
					this._updateBackButton();
				}
			}
			this._addHeadingClasses();
			this._btnMarkup();
		},

		//we only want this to run on non fixed toolbars so make it easy to override
		_setRelative: function() {
			$( "[data-"+ $.mobile.ns + "role='page']" ).css({ "position": "relative" });
		},

		// Deprecated in 1.4. As from 1.5 button classes have to be present in the markup.
		_btnMarkup: function() {
			this.element
				.children( "a" )
				.filter( ":not([data-" + $.mobile.ns + "role='none'])" )
				.attr( "data-" + $.mobile.ns + "role", "button" );
			this.element.trigger( "create" );
		},
		// Deprecated in 1.4. As from 1.5 ui-btn-left/right classes have to be present in the markup.
		_addHeaderButtonClasses: function() {
			var headerAnchors = this.element.children( "a, button" );

			// Do not mistake a back button for a left toolbar button
			this.leftbtn = headerAnchors.hasClass( "ui-btn-left" ) &&
				!headerAnchors.hasClass( "ui-toolbar-back-btn" );

			this.rightbtn = headerAnchors.hasClass( "ui-btn-right" );

			// Filter out right buttons and back buttons
			this.leftbtn = this.leftbtn ||
				headerAnchors.eq( 0 )
					.not( ".ui-btn-right,.ui-toolbar-back-btn" )
					.addClass( "ui-btn-left" )
					.length;

			this.rightbtn = this.rightbtn || headerAnchors.eq( 1 ).addClass( "ui-btn-right" ).length;
		},
		_updateBackButton: function() {
			var backButton,
				options = this.options,
				theme = options.backBtnTheme || options.theme;

			// Retrieve the back button or create a new, empty one
			backButton = this._backButton = ( this._backButton || {} );

			// We add a back button only if the option to do so is on
			if ( this.options.addBackBtn &&

					// This must also be a header toolbar
					this.role === "header" &&

					// There must be multiple pages in the DOM
					$( ".ui-page" ).length > 1 &&
					( this.page ?

						// If the toolbar is internal the page's URL must differ from the hash
						( this.page[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) !==
							$.mobile.path.stripHash( location.hash ) ) :

						// Otherwise, if the toolbar is external there must be at least one
						// history item to which one can go back
						( $.mobile.navigate && $.mobile.navigate.history &&
							$.mobile.navigate.history.activeIndex > 0 ) ) &&

					// The toolbar does not have a left button
					!this.leftbtn ) {

				// Skip back button creation if one is already present
				if ( !backButton.attached ) {
					this.backButton = backButton.element = ( backButton.element ||
						$( "<a role='button' href='javascript:void(0);' " +
							"class='ui-btn ui-corner-all ui-shadow ui-btn-left " +
								( theme ? "ui-btn-" + theme + " " : "" ) +
								"ui-toolbar-back-btn ui-icon-carat-l ui-btn-icon-left' " +
							"data-" + $.mobile.ns + "rel='back'>" + options.backBtnText +
							"</a>" ) )
							.prependTo( this.element );
					backButton.attached = true;
				}

			// If we are not adding a back button, then remove the one present, if any
			} else if ( backButton.element ) {
				backButton.element.detach();
				backButton.attached = false;
			}
		},
		_addHeadingClasses: function() {
			this.element.children( "h1, h2, h3, h4, h5, h6" )
				.addClass( "ui-title" )
				// Regardless of h element number in src, it becomes h1 for the enhanced page
				.attr({
					"role": "heading",
					"aria-level": "1"
				});
		},
		_destroy: function() {
			var currentTheme;

			this.element.children( "h1, h2, h3, h4, h5, h6" )
				.removeClass( "ui-title" )
				.removeAttr( "role" )
				.removeAttr( "aria-level" );

			if ( this.role === "header" ) {
				this.element.children( "a, button" )
					.removeClass( "ui-btn-left ui-btn-right ui-btn ui-shadow ui-corner-all" );
				if ( this.backButton) {
					this.backButton.remove();
				}
			}

			currentTheme = this.options.theme ? this.options.theme : "inherit";
			this.element.removeClass( "ui-bar-" + currentTheme );

			this.element.removeClass( "ui-" + this.role ).removeAttr( "role" );
		}
	});

})( jQuery );

(function( $, undefined ) {

	$.widget( "mobile.toolbar", $.mobile.toolbar, {
		options: {
			position:null,
			visibleOnPageShow: true,
			disablePageZoom: true,
			transition: "slide", //can be none, fade, slide (slide maps to slideup or slidedown)
			fullscreen: false,
			tapToggle: true,
			tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
			hideDuringFocus: "input, textarea, select",
			updatePagePadding: true,
			trackPersistentToolbars: true,

			// Browser detection! Weeee, here we go...
			// Unfortunately, position:fixed is costly, not to mention probably impossible, to feature-detect accurately.
			// Some tests exist, but they currently return false results in critical devices and browsers, which could lead to a broken experience.
			// Testing fixed positioning is also pretty obtrusive to page load, requiring injected elements and scrolling the window
			// The following function serves to rule out some popular browsers with known fixed-positioning issues
			// This is a plugin option like any other, so feel free to improve or overwrite it
			supportBlacklist: function() {
				return !$.support.fixedPosition;
			}
		},

		_create: function() {
			this._super();
			this.pagecontainer = $( ":mobile-pagecontainer" );
			if ( this.options.position === "fixed" && !this.options.supportBlacklist() ) {
				this._makeFixed();
			}
		},

		_makeFixed: function() {
			this.element.addClass( "ui-"+ this.role +"-fixed" );
			this.updatePagePadding();
			this._addTransitionClass();
			this._bindPageEvents();
			this._bindToggleHandlers();
		},

		_setOptions: function( o ) {
			if ( o.position === "fixed" && this.options.position !== "fixed" ) {
				this._makeFixed();
			}
			if ( this.options.position === "fixed" && !this.options.supportBlacklist() ) {
				var $page = ( !!this.page )? this.page: ( $(".ui-page-active").length > 0 )? $(".ui-page-active"): $(".ui-page").eq(0);

				if ( o.fullscreen !== undefined) {
					if ( o.fullscreen ) {
						this.element.addClass( "ui-"+ this.role +"-fullscreen" );
						$page.addClass( "ui-page-" + this.role + "-fullscreen" );
					}
					// If not fullscreen, add class to page to set top or bottom padding
					else {
						this.element.removeClass( "ui-"+ this.role +"-fullscreen" );
						$page.removeClass( "ui-page-" + this.role + "-fullscreen" ).addClass( "ui-page-" + this.role+ "-fixed" );
					}
				}
			}
			this._super(o);
		},

		_addTransitionClass: function() {
			var tclass = this.options.transition;

			if ( tclass && tclass !== "none" ) {
				// use appropriate slide for header or footer
				if ( tclass === "slide" ) {
					tclass = this.element.hasClass( "ui-header" ) ? "slidedown" : "slideup";
				}

				this.element.addClass( tclass );
			}
		},

		_bindPageEvents: function() {
			var page = ( !!this.page )? this.element.closest( ".ui-page" ): this.document;
			//page event bindings
			// Fixed toolbars require page zoom to be disabled, otherwise usability issues crop up
			// This method is meant to disable zoom while a fixed-positioned toolbar page is visible
			this._on( page , {
				"pagebeforeshow": "_handlePageBeforeShow",
				"webkitAnimationStart":"_handleAnimationStart",
				"animationstart":"_handleAnimationStart",
				"updatelayout": "_handleAnimationStart",
				"pageshow": "_handlePageShow",
				"pagebeforehide": "_handlePageBeforeHide"
			});
		},

		_handlePageBeforeShow: function( ) {
			var o = this.options;
			if ( o.disablePageZoom ) {
				$.mobile.zoom.disable( true );
			}
			if ( !o.visibleOnPageShow ) {
				this.hide( true );
			}
		},

		_handleAnimationStart: function() {
			if ( this.options.updatePagePadding ) {
				this.updatePagePadding( ( !!this.page )? this.page: ".ui-page-active" );
			}
		},

		_handlePageShow: function() {
			this.updatePagePadding( ( !!this.page )? this.page: ".ui-page-active" );
			if ( this.options.updatePagePadding ) {
				this._on( this.window, { "throttledresize": "updatePagePadding" } );
			}
		},

		_handlePageBeforeHide: function( e, ui ) {
			var o = this.options,
				thisFooter, thisHeader, nextFooter, nextHeader;

			if ( o.disablePageZoom ) {
				$.mobile.zoom.enable( true );
			}
			if ( o.updatePagePadding ) {
				this._off( this.window, "throttledresize" );
			}

			if ( o.trackPersistentToolbars ) {
				thisFooter = $( ".ui-footer-fixed:jqmData(id)", this.page );
				thisHeader = $( ".ui-header-fixed:jqmData(id)", this.page );
				nextFooter = thisFooter.length && ui.nextPage && $( ".ui-footer-fixed:jqmData(id='" + thisFooter.jqmData( "id" ) + "')", ui.nextPage ) || $();
				nextHeader = thisHeader.length && ui.nextPage && $( ".ui-header-fixed:jqmData(id='" + thisHeader.jqmData( "id" ) + "')", ui.nextPage ) || $();

				if ( nextFooter.length || nextHeader.length ) {

					nextFooter.add( nextHeader ).appendTo( $.mobile.pageContainer );

					ui.nextPage.one( "pageshow", function() {
						nextHeader.prependTo( this );
						nextFooter.appendTo( this );
					});
				}
			}
		},

		_visible: true,

		// This will set the content element's top or bottom padding equal to the toolbar's height
		updatePagePadding: function( tbPage ) {
			var $el = this.element,
				header = ( this.role ==="header" ),
				pos = parseFloat( $el.css( header ? "top" : "bottom" ) );

			// This behavior only applies to "fixed", not "fullscreen"
			if ( this.options.fullscreen ) { return; }
			// tbPage argument can be a Page object or an event, if coming from throttled resize.
			tbPage = ( tbPage && tbPage.type === undefined && tbPage ) || this.page || $el.closest( ".ui-page" );
			tbPage = ( !!this.page )? this.page: ".ui-page-active";
			$( tbPage ).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() + pos );
		},

		_useTransition: function( notransition ) {
			var $win = this.window,
				$el = this.element,
				scroll = $win.scrollTop(),
				elHeight = $el.height(),
				pHeight = ( !!this.page )? $el.closest( ".ui-page" ).height():$(".ui-page-active").height(),
				viewportHeight = $.mobile.getScreenHeight();

			return !notransition &&
				( this.options.transition && this.options.transition !== "none" &&
				(
					( this.role === "header" && !this.options.fullscreen && scroll > elHeight ) ||
					( this.role === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
				) || this.options.fullscreen
				);
		},

		show: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element;

			if ( this._useTransition( notransition ) ) {
				$el
					.removeClass( "out " + hideClass )
					.addClass( "in" )
					.animationComplete(function () {
						$el.removeClass( "in" );
					});
			}
			else {
				$el.removeClass( hideClass );
			}
			this._visible = true;
		},

		hide: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element,
				// if it's a slide transition, our new transitions need the reverse class as well to slide outward
				outclass = "out" + ( this.options.transition === "slide" ? " reverse" : "" );

			if ( this._useTransition( notransition ) ) {
				$el
					.addClass( outclass )
					.removeClass( "in" )
					.animationComplete(function() {
						$el.addClass( hideClass ).removeClass( outclass );
					});
			}
			else {
				$el.addClass( hideClass ).removeClass( outclass );
			}
			this._visible = false;
		},

		toggle: function() {
			this[ this._visible ? "hide" : "show" ]();
		},

		_bindToggleHandlers: function() {
			var self = this,
				o = self.options,
				delayShow, delayHide,
				isVisible = true,
				page = ( !!this.page )? this.page: $(".ui-page");

			// tap toggle
			page
				.bind( "vclick", function( e ) {
					if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
						self.toggle();
					}
				})
				.bind( "focusin focusout", function( e ) {
					//this hides the toolbars on a keyboard pop to give more screen room and prevent ios bug which
					//positions fixed toolbars in the middle of the screen on pop if the input is near the top or
					//bottom of the screen addresses issues #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					//and issue #4113 Header and footer change their position after keyboard popup - iOS
					//and issue #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					if ( screen.width < 1025 && $( e.target ).is( o.hideDuringFocus ) && !$( e.target ).closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {
						//Fix for issue #4724 Moving through form in Mobile Safari with "Next" and "Previous" system
						//controls causes fixed position, tap-toggle false Header to reveal itself
						// isVisible instead of self._visible because the focusin and focusout events fire twice at the same time
						// Also use a delay for hiding the toolbars because on Android native browser focusin is direclty followed
						// by a focusout when a native selects opens and the other way around when it closes.
						if ( e.type === "focusout" && !isVisible ) {
							isVisible = true;
							//wait for the stack to unwind and see if we have jumped to another input
							clearTimeout( delayHide );
							delayShow = setTimeout( function() {
								self.show();
							}, 0 );
						} else if ( e.type === "focusin" && !!isVisible ) {
							//if we have jumped to another input clear the time out to cancel the show.
							clearTimeout( delayShow );
							isVisible = false;
							delayHide = setTimeout( function() {
								self.hide();
							}, 0 );
						}
					}
				});
		},

		_setRelative: function() {
			if( this.options.position !== "fixed" ){
				$( "[data-"+ $.mobile.ns + "role='page']" ).css({ "position": "relative" });
			}
		},

		_destroy: function() {
			var pageClasses, toolbarClasses, hasFixed, header, hasFullscreen,
				page = this.pagecontainer.pagecontainer( "getActivePage" );

			this._super();
			if ( this.options.position === "fixed" ) {
				hasFixed = $(  "body>.ui-" + this.role + "-fixed" )
							.add( page.find( ".ui-" + this.options.role + "-fixed" ) )
							.not( this.element ).length > 0;
				hasFullscreen = $(  "body>.ui-" + this.role + "-fixed" )
							.add( page.find( ".ui-" + this.options.role + "-fullscreen" ) )
							.not( this.element ).length > 0;
				toolbarClasses =  "ui-header-fixed ui-footer-fixed ui-header-fullscreen in out" +
					" ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden";
				this.element.removeClass( toolbarClasses );
				if ( !hasFullscreen ) {
					pageClasses = "ui-page-" + this.role + "-fullscreen";
				}
				if ( !hasFixed ) {
					header = this.role === "header";
					pageClasses += " ui-page-" + this.role + "-fixed";
					page.css( "padding-" + ( header ? "top" : "bottom" ), "" );
				}
				page.removeClass( pageClasses );
			}
		}

	});
})( jQuery );

(function( $, undefined ) {
	$.widget( "mobile.toolbar", $.mobile.toolbar, {

		_makeFixed: function() {
			this._super();
			this._workarounds();
		},

		//check the browser and version and run needed workarounds
		_workarounds: function() {
			var ua = navigator.userAgent,
			platform = navigator.platform,
			// Rendering engine is Webkit, and capture major version
			wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
			wkversion = !!wkmatch && wkmatch[ 1 ],
			os = null,
			self = this;
			//set the os we are working in if it dosent match one with workarounds return
			if ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) {
				os = "ios";
			} else if ( ua.indexOf( "Android" ) > -1 ) {
				os = "android";
			} else {
				return;
			}
			//check os version if it dosent match one with workarounds return
			if ( os === "ios" ) {
				//iOS  workarounds
				self._bindScrollWorkaround();
			} else if ( os === "android" && wkversion && wkversion < 534 ) {
				//Android 2.3 run all Android 2.3 workaround
				self._bindScrollWorkaround();
				self._bindListThumbWorkaround();
			} else {
				return;
			}
		},

		//Utility class for checking header and footer positions relative to viewport
		_viewportOffset: function() {
			var $el = this.element,
				header = $el.hasClass( "ui-header" ),
				offset = Math.abs( $el.offset().top - this.window.scrollTop() );
			if ( !header ) {
				offset = Math.round( offset - this.window.height() + $el.outerHeight() ) - 60;
			}
			return offset;
		},

		//bind events for _triggerRedraw() function
		_bindScrollWorkaround: function() {
			var self = this;
			//bind to scrollstop and check if the toolbars are correctly positioned
			this._on( this.window, { scrollstop: function() {
				var viewportOffset = self._viewportOffset();
				//check if the header is visible and if its in the right place
				if ( viewportOffset > 2 && self._visible ) {
					self._triggerRedraw();
				}
			}});
		},

		//this addresses issue #4250 Persistent footer instability in v1.1 with long select lists in Android 2.3.3
		//and issue #3748 Android 2.x: Page transitions broken when fixed toolbars used
		//the absolutely positioned thumbnail in a list view causes problems with fixed position buttons above in a nav bar
		//setting the li's to -webkit-transform:translate3d(0,0,0); solves this problem to avoide potential issues in other
		//platforms we scope this with the class ui-android-2x-fix
		_bindListThumbWorkaround: function() {
			this.element.closest( ".ui-page" ).addClass( "ui-android-2x-fixed" );
		},
		//this addresses issues #4337 Fixed header problem after scrolling content on iOS and Android
		//and device bugs project issue #1 Form elements can lose click hit area in position: fixed containers.
		//this also addresses not on fixed toolbars page in docs
		//adding 1px of padding to the bottom then removing it causes a "redraw"
		//which positions the toolbars correctly (they will always be visually correct)
		_triggerRedraw: function() {
			var paddingBottom = parseFloat( $( ".ui-page-active" ).css( "padding-bottom" ) );
			//trigger page redraw to fix incorrectly positioned fixed elements
			$( ".ui-page-active" ).css( "padding-bottom", ( paddingBottom + 1 ) + "px" );
			//if the padding is reset with out a timeout the reposition will not occure.
			//this is independant of JQM the browser seems to need the time to react.
			setTimeout( function() {
				$( ".ui-page-active" ).css( "padding-bottom", paddingBottom + "px" );
			}, 0 );
		},

		destroy: function() {
			this._super();
			//Remove the class we added to the page previously in android 2.x
			this.element.closest( ".ui-page-active" ).removeClass( "ui-android-2x-fix" );
		}
	});

})( jQuery );


( function( $, undefined ) {

var ieHack = ( $.mobile.browser.oldIE && $.mobile.browser.oldIE <= 8 ),
	uiTemplate = $(
		"<div class='ui-popup-arrow-guide'></div>" +
		"<div class='ui-popup-arrow-container" + ( ieHack ? " ie" : "" ) + "'>" +
			"<div class='ui-popup-arrow'></div>" +
		"</div>"
	);

function getArrow() {
	var clone = uiTemplate.clone(),
		gd = clone.eq( 0 ),
		ct = clone.eq( 1 ),
		ar = ct.children();

	return { arEls: ct.add( gd ), gd: gd, ct: ct, ar: ar };
}

$.widget( "mobile.popup", $.mobile.popup, {
	options: {

		arrow: ""
	},

	_create: function() {
		var ar,
			ret = this._super();

		if ( this.options.arrow ) {
			this._ui.arrow = ar = this._addArrow();
		}

		return ret;
	},

	_addArrow: function() {
		var theme,
			opts = this.options,
			ar = getArrow();

		theme = this._themeClassFromOption( "ui-body-", opts.theme );
		ar.ar.addClass( theme + ( opts.shadow ? " ui-overlay-shadow" : "" ) );
		ar.arEls.hide().appendTo( this.element );

		return ar;
	},

	_unenhance: function() {
		var ar = this._ui.arrow;

		if ( ar ) {
			ar.arEls.remove();
		}

		return this._super();
	},

	// Pretend to show an arrow described by @p and @dir and calculate the
	// distance from the desired point. If a best-distance is passed in, return
	// the minimum of the one passed in and the one calculated.
	_tryAnArrow: function( p, dir, desired, s, best ) {
		var result, r, diff, desiredForArrow = {}, tip = {};

		// If the arrow has no wiggle room along the edge of the popup, it cannot
		// be displayed along the requested edge without it sticking out.
		if ( s.arFull[ p.dimKey ] > s.guideDims[ p.dimKey ] ) {
			return best;
		}

		desiredForArrow[ p.fst ] = desired[ p.fst ] +
			( s.arHalf[ p.oDimKey ] + s.menuHalf[ p.oDimKey ] ) * p.offsetFactor -
			s.contentBox[ p.fst ] + ( s.clampInfo.menuSize[ p.oDimKey ] - s.contentBox[ p.oDimKey ] ) * p.arrowOffsetFactor;
		desiredForArrow[ p.snd ] = desired[ p.snd ];

		result = s.result || this._calculateFinalLocation( desiredForArrow, s.clampInfo );
		r = { x: result.left, y: result.top };

		tip[ p.fst ] = r[ p.fst ] + s.contentBox[ p.fst ] + p.tipOffset;
		tip[ p.snd ] = Math.max( result[ p.prop ] + s.guideOffset[ p.prop ] + s.arHalf[ p.dimKey ],
			Math.min( result[ p.prop ] + s.guideOffset[ p.prop ] + s.guideDims[ p.dimKey ] - s.arHalf[ p.dimKey ],
				desired[ p.snd ] ) );

		diff = Math.abs( desired.x - tip.x ) + Math.abs( desired.y - tip.y );
		if ( !best || diff < best.diff ) {
			// Convert tip offset to coordinates inside the popup
			tip[ p.snd ] -= s.arHalf[ p.dimKey ] + result[ p.prop ] + s.contentBox[ p.snd ];
			best = { dir: dir, diff: diff, result: result, posProp: p.prop, posVal: tip[ p.snd ] };
		}

		return best;
	},

	_getPlacementState: function( clamp ) {
		var offset, gdOffset,
			ar = this._ui.arrow,
			state = {
				clampInfo: this._clampPopupWidth( !clamp ),
				arFull: { cx: ar.ct.width(), cy: ar.ct.height() },
				guideDims: { cx: ar.gd.width(), cy: ar.gd.height() },
				guideOffset: ar.gd.offset()
			};

		offset = this.element.offset();

		ar.gd.css( { left: 0, top: 0, right: 0, bottom: 0 } );
		gdOffset = ar.gd.offset();
		state.contentBox = {
			x: gdOffset.left - offset.left,
			y: gdOffset.top - offset.top,
			cx: ar.gd.width(),
			cy: ar.gd.height()
		};
		ar.gd.removeAttr( "style" );

		// The arrow box moves between guideOffset and guideOffset + guideDims - arFull
		state.guideOffset = { left: state.guideOffset.left - offset.left, top: state.guideOffset.top - offset.top };
		state.arHalf = { cx: state.arFull.cx / 2, cy: state.arFull.cy / 2 };
		state.menuHalf = { cx: state.clampInfo.menuSize.cx / 2, cy: state.clampInfo.menuSize.cy / 2 };

		return state;
	},

	_placementCoords: function( desired ) {
		var state, best, params, elOffset, bgRef,
			optionValue = this.options.arrow,
			ar = this._ui.arrow;

		if ( !ar ) {
			return this._super( desired );
		}

		ar.arEls.show();

		bgRef = {};
		state = this._getPlacementState( true );
		params = {
			"l": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: 1, tipOffset:  -state.arHalf.cx, arrowOffsetFactor: 0 },
			"r": { fst: "x", snd: "y", prop: "top", dimKey: "cy", oDimKey: "cx", offsetFactor: -1, tipOffset: state.arHalf.cx + state.contentBox.cx, arrowOffsetFactor: 1 },
			"b": { fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: -1, tipOffset: state.arHalf.cy + state.contentBox.cy, arrowOffsetFactor: 1 },
			"t": { fst: "y", snd: "x", prop: "left", dimKey: "cx", oDimKey: "cy", offsetFactor: 1, tipOffset: -state.arHalf.cy, arrowOffsetFactor: 0 }
		};

		// Try each side specified in the options to see on which one the arrow
		// should be placed such that the distance between the tip of the arrow and
		// the desired coordinates is the shortest.
		$.each( ( optionValue === true ? "l,t,r,b" : optionValue ).split( "," ),
			$.proxy( function( key, value ) {
				best = this._tryAnArrow( params[ value ], value, desired, state, best );
			}, this ) );

		// Could not place the arrow along any of the edges - behave as if showing
		// the arrow was turned off.
		if ( !best ) {
			ar.arEls.hide();
			return this._super( desired );
		}

		// Move the arrow into place
		ar.ct
			.removeClass( "ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b" )
			.addClass( "ui-popup-arrow-" + best.dir )
			.removeAttr( "style" ).css( best.posProp, best.posVal )
			.show();

		// Do not move/size the background div on IE, because we use the arrow div for background as well.
		if ( !ieHack ) {
			elOffset = this.element.offset();
			bgRef[ params[ best.dir ].fst ] = ar.ct.offset();
			bgRef[ params[ best.dir ].snd ] = {
				left: elOffset.left + state.contentBox.x,
				top: elOffset.top + state.contentBox.y
			};
		}

		return best.result;
	},

	_setOptions: function( opts ) {
		var newTheme,
			oldTheme = this.options.theme,
			ar = this._ui.arrow,
			ret = this._super( opts );

		if ( opts.arrow !== undefined ) {
			if ( !ar && opts.arrow ) {
				this._ui.arrow = this._addArrow();

				// Important to return here so we don't set the same options all over
				// again below.
				return;
			} else if ( ar && !opts.arrow ) {
				ar.arEls.remove();
				this._ui.arrow = null;
			}
		}

		// Reassign with potentially new arrow
		ar = this._ui.arrow;

		if ( ar ) {
			if ( opts.theme !== undefined ) {
				oldTheme = this._themeClassFromOption( "ui-body-", oldTheme );
				newTheme = this._themeClassFromOption( "ui-body-", opts.theme );
				ar.ar.removeClass( oldTheme ).addClass( newTheme );
			}

			if ( opts.shadow !== undefined ) {
				ar.ar.toggleClass( "ui-overlay-shadow", opts.shadow );
			}
		}

		return ret;
	},

	_destroy: function() {
		var ar = this._ui.arrow;

		if ( ar ) {
			ar.arEls.remove();
		}

		return this._super();
	}
});

})( jQuery );


(function( $, undefined ) {

$.widget( "mobile.panel", {
	options: {
		classes: {
			panel: "ui-panel",
			panelOpen: "ui-panel-open",
			panelClosed: "ui-panel-closed",
			panelFixed: "ui-panel-fixed",
			panelInner: "ui-panel-inner",
			modal: "ui-panel-dismiss",
			modalOpen: "ui-panel-dismiss-open",
			pageContainer: "ui-panel-page-container",
			pageWrapper: "ui-panel-wrapper",
			pageFixedToolbar: "ui-panel-fixed-toolbar",
			pageContentPrefix: "ui-panel-page-content", /* Used for wrapper and fixed toolbars position, display and open classes. */
			animate: "ui-panel-animate"
		},
		animate: true,
		theme: null,
		position: "left",
		dismissible: true,
		display: "reveal", //accepts reveal, push, overlay
		swipeClose: true,
		positionFixed: false
	},

	_closeLink: null,
	_parentPage: null,
	_page: null,
	_modal: null,
	_panelInner: null,
	_wrapper: null,
	_fixedToolbars: null,

	_create: function() {
		var el = this.element,
			parentPage = el.closest( ".ui-page, :jqmData(role='page')" );

		// expose some private props to other methods
		$.extend( this, {
			_closeLink: el.find( ":jqmData(rel='close')" ),
			_parentPage: ( parentPage.length > 0 ) ? parentPage : false,
			_openedPage: null,
			_page: this._getPage,
			_panelInner: this._getPanelInner(),
			_fixedToolbars: this._getFixedToolbars
		});
		if ( this.options.display !== "overlay" ){
			this._getWrapper();
		}
		this._addPanelClasses();

		// if animating, add the class to do so
		if ( $.support.cssTransform3d && !!this.options.animate ) {
			this.element.addClass( this.options.classes.animate );
		}

		this._bindUpdateLayout();
		this._bindCloseEvents();
		this._bindLinkListeners();
		this._bindPageEvents();

		if ( !!this.options.dismissible ) {
			this._createModal();
		}

		this._bindSwipeEvents();
	},

	_getPanelInner: function() {
		var panelInner = this.element.find( "." + this.options.classes.panelInner );

		if ( panelInner.length === 0 ) {
			panelInner = this.element.children().wrapAll( "<div class='" + this.options.classes.panelInner + "' />" ).parent();
		}

		return panelInner;
	},

	_createModal: function() {
		var self = this,
			target = self._parentPage ? self._parentPage.parent() : self.element.parent();

		self._modal = $( "<div class='" + self.options.classes.modal + "'></div>" )
			.on( "mousedown", function() {
				self.close();
			})
			.appendTo( target );
	},

	_getPage: function() {
		var page = this._openedPage || this._parentPage || $( "." + $.mobile.activePageClass );

		return page;
	},

	_getWrapper: function() {
		var wrapper = this._page().find( "." + this.options.classes.pageWrapper );
		if ( wrapper.length === 0 ) {
			wrapper = this._page().children( ".ui-header:not(.ui-header-fixed), .ui-content:not(.ui-popup), .ui-footer:not(.ui-footer-fixed)" )
				.wrapAll( "<div class='" + this.options.classes.pageWrapper + "'></div>" )
				.parent();
		}

		this._wrapper = wrapper;
	},

	_getFixedToolbars: function() {
		var extFixedToolbars = $( "body" ).children( ".ui-header-fixed, .ui-footer-fixed" ),
			intFixedToolbars = this._page().find( ".ui-header-fixed, .ui-footer-fixed" ),
			fixedToolbars = extFixedToolbars.add( intFixedToolbars ).addClass( this.options.classes.pageFixedToolbar );

		return fixedToolbars;
	},

	_getPosDisplayClasses: function( prefix ) {
		return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
	},

	_getPanelClasses: function() {
		var panelClasses = this.options.classes.panel +
			" " + this._getPosDisplayClasses( this.options.classes.panel ) +
			" " + this.options.classes.panelClosed +
			" " + "ui-body-" + ( this.options.theme ? this.options.theme : "inherit" );

		if ( !!this.options.positionFixed ) {
			panelClasses += " " + this.options.classes.panelFixed;
		}

		return panelClasses;
	},

	_addPanelClasses: function() {
		this.element.addClass( this._getPanelClasses() );
	},

	_handleCloseClick: function( event ) {
		if ( !event.isDefaultPrevented() ) {
			this.close();
		}
	},

	_bindCloseEvents: function() {
		this._on( this._closeLink, {
			"click": "_handleCloseClick"
		});

		this._on({
			"click a:jqmData(ajax='false')": "_handleCloseClick"
		});
	},

	_positionPanel: function( scrollToTop ) {
		var self = this,
			panelInnerHeight = self._panelInner.outerHeight(),
			expand = panelInnerHeight > $.mobile.getScreenHeight();

		if ( expand || !self.options.positionFixed ) {
			if ( expand ) {
				self._unfixPanel();
				$.mobile.resetActivePageHeight( panelInnerHeight );
			}
			if ( scrollToTop ) {
				this.window[ 0 ].scrollTo( 0, $.mobile.defaultHomeScroll );
			}
		} else {
			self._fixPanel();
		}
	},

	_bindFixListener: function() {
		this._on( $( window ), { "throttledresize": "_positionPanel" });
	},

	_unbindFixListener: function() {
		this._off( $( window ), "throttledresize" );
	},

	_unfixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.removeClass( this.options.classes.panelFixed );
		}
	},

	_fixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.addClass( this.options.classes.panelFixed );
		}
	},

	_bindUpdateLayout: function() {
		var self = this;

		self.element.on( "updatelayout", function(/* e */) {
			if ( self._open ) {
				self._positionPanel();
			}
		});
	},

	_bindLinkListeners: function() {
		this._on( "body", {
			"click a": "_handleClick"
		});

	},

	_handleClick: function( e ) {
		var link,
			panelId = this.element.attr( "id" );

		if ( e.currentTarget.href.split( "#" )[ 1 ] === panelId && panelId !== undefined ) {

			e.preventDefault();
			link = $( e.target );
			if ( link.hasClass( "ui-btn" ) ) {
				link.addClass( $.mobile.activeBtnClass );
				this.element.one( "panelopen panelclose", function() {
					link.removeClass( $.mobile.activeBtnClass );
				});
			}
			this.toggle();
		}
	},

	_bindSwipeEvents: function() {
		var self = this,
			area = self._modal ? self.element.add( self._modal ) : self.element;

		// on swipe, close the panel
		if ( !!self.options.swipeClose ) {
			if ( self.options.position === "left" ) {
				area.on( "swipeleft.panel", function(/* e */) {
					self.close();
				});
			} else {
				area.on( "swiperight.panel", function(/* e */) {
					self.close();
				});
			}
		}
	},

	_bindPageEvents: function() {
		var self = this;

		this.document
			// Close the panel if another panel on the page opens
			.on( "panelbeforeopen", function( e ) {
				if ( self._open && e.target !== self.element[ 0 ] ) {
					self.close();
				}
			})
			// On escape, close? might need to have a target check too...
			.on( "keyup.panel", function( e ) {
				if ( e.keyCode === 27 && self._open ) {
					self.close();
				}
			});
		if ( !this._parentPage && this.options.display !== "overlay" ) {
			this._on( this.document, {
				"pageshow": function() {
					this._openedPage = null;
					this._getWrapper();
				}
			});
		}
		// Clean up open panels after page hide
		if ( self._parentPage ) {
			this.document.on( "pagehide", ":jqmData(role='page')", function() {
				if ( self._open ) {
					self.close( true );
				}
			});
		} else {
			this.document.on( "pagebeforehide", function() {
				if ( self._open ) {
					self.close( true );
				}
			});
		}
	},

	// state storage of open or closed
	_open: false,
	_pageContentOpenClasses: null,
	_modalOpenClasses: null,

	open: function( immediate ) {
		if ( !this._open ) {
			var self = this,
				o = self.options,

				_openPanel = function() {
					self._off( self.document , "panelclose" );
					self._page().jqmData( "panel", "open" );

					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						self._wrapper.addClass( o.classes.animate );
						self._fixedToolbars().addClass( o.classes.animate );
					}

					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						( self._wrapper || self.element )
							.animationComplete( complete, "transition" );
					} else {
						setTimeout( complete, 0 );
					}

					if ( o.theme && o.display !== "overlay" ) {
						self._page().parent()
							.addClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
					}

					self.element
						.removeClass( o.classes.panelClosed )
						.addClass( o.classes.panelOpen );

					self._positionPanel( true );

					self._pageContentOpenClasses = self._getPosDisplayClasses( o.classes.pageContentPrefix );

					if ( o.display !== "overlay" ) {
						self._page().parent().addClass( o.classes.pageContainer );
						self._wrapper.addClass( self._pageContentOpenClasses );
						self._fixedToolbars().addClass( self._pageContentOpenClasses );
					}

					self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
					if ( self._modal ) {
						self._modal
							.addClass( self._modalOpenClasses )
							.height( Math.max( self._modal.height(), self.document.height() ) );
					}
				},
				complete = function() {

					// Bail if the panel was closed before the opening animation has completed
					if ( !self._open ) {
						return;
					}

					if ( o.display !== "overlay" ) {
						self._wrapper.addClass( o.classes.pageContentPrefix + "-open" );
						self._fixedToolbars().addClass( o.classes.pageContentPrefix + "-open" );
					}

					self._bindFixListener();

					self._trigger( "open" );

					self._openedPage = self._page();
				};

			self._trigger( "beforeopen" );

			if ( self._page().jqmData( "panel" ) === "open" ) {
				self._on( self.document, {
					"panelclose": _openPanel
				});
			} else {
				_openPanel();
			}

			self._open = true;
		}
	},

	close: function( immediate ) {
		if ( this._open ) {
			var self = this,
				o = this.options,

				_closePanel = function() {

					self.element.removeClass( o.classes.panelOpen );

					if ( o.display !== "overlay" ) {
						self._wrapper.removeClass( self._pageContentOpenClasses );
						self._fixedToolbars().removeClass( self._pageContentOpenClasses );
					}

					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						( self._wrapper || self.element )
							.animationComplete( complete, "transition" );
					} else {
						setTimeout( complete, 0 );
					}

					if ( self._modal ) {
						self._modal
							.removeClass( self._modalOpenClasses )
							.height( "" );
					}
				},
				complete = function() {
					if ( o.theme && o.display !== "overlay" ) {
						self._page().parent().removeClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
					}

					self.element.addClass( o.classes.panelClosed );

					if ( o.display !== "overlay" ) {
						self._page().parent().removeClass( o.classes.pageContainer );
						self._wrapper.removeClass( o.classes.pageContentPrefix + "-open" );
						self._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );
					}

					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						self._wrapper.removeClass( o.classes.animate );
						self._fixedToolbars().removeClass( o.classes.animate );
					}

					self._fixPanel();
					self._unbindFixListener();
					$.mobile.resetActivePageHeight();

					self._page().jqmRemoveData( "panel" );

					self._trigger( "close" );

					self._openedPage = null;
				};

			self._trigger( "beforeclose" );

			_closePanel();

			self._open = false;
		}
	},

	toggle: function() {
		this[ this._open ? "close" : "open" ]();
	},

	_destroy: function() {
		var otherPanels,
		o = this.options,
		multiplePanels = ( $( "body > :mobile-panel" ).length + $.mobile.activePage.find( ":mobile-panel" ).length ) > 1;

		if ( o.display !== "overlay" ) {

			//  remove the wrapper if not in use by another panel
			otherPanels = $( "body > :mobile-panel" ).add( $.mobile.activePage.find( ":mobile-panel" ) );
			if ( otherPanels.not( ".ui-panel-display-overlay" ).not( this.element ).length === 0 ) {
				this._wrapper.children().unwrap();
			}

			if ( this._open ) {

				this._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );

				if ( $.support.cssTransform3d && !!o.animate ) {
					this._fixedToolbars().removeClass( o.classes.animate );
				}

				this._page().parent().removeClass( o.classes.pageContainer );

				if ( o.theme ) {
					this._page().parent().removeClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
				}
			}
		}

		if ( !multiplePanels ) {

			this.document.off( "panelopen panelclose" );

		}

		if ( this._open ) {
			this._page().jqmRemoveData( "panel" );
		}

		this._panelInner.children().unwrap();

		this.element
			.removeClass( [ this._getPanelClasses(), o.classes.panelOpen, o.classes.animate ].join( " " ) )
			.off( "swipeleft.panel swiperight.panel" )
			.off( "panelbeforeopen" )
			.off( "panelhide" )
			.off( "keyup.panel" )
			.off( "updatelayout" );

		if ( this._modal ) {
			this._modal.remove();
		}
	}
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.table", {
	options: {
		classes: {
			table: "ui-table"
		},
		enhanced: false
	},

	_create: function() {
		if ( !this.options.enhanced ) {
			this.element.addClass( this.options.classes.table );
		}

		// extend here, assign on refresh > _setHeaders
		$.extend( this, {

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			headers: undefined,

			// allHeaders references headers, plus all THs in the thead, which may
			// include several rows, or not
			allHeaders: undefined
		});

		this._refresh( true );
	},

	_setHeaders: function() {
		var trs = this.element.find( "thead tr" );

		this.headers = this.element.find( "tr:eq(0)" ).children();
		this.allHeaders = this.headers.add( trs.children() );
	},

	refresh: function() {
		this._refresh();
	},

	rebuild: $.noop,

	_refresh: function( /* create */ ) {
		var table = this.element,
			trs = table.find( "thead tr" );

		// updating headers on refresh (fixes #5880)
		this._setHeaders();

		// Iterate over the trs
		trs.each( function() {
			var columnCount = 0;

			// Iterate over the children of the tr
			$( this ).children().each( function() {
				var span = parseInt( this.getAttribute( "colspan" ), 10 ),
					selector = ":nth-child(" + ( columnCount + 1 ) + ")",
					j;

				this.setAttribute( "data-" + $.mobile.ns + "colstart", columnCount + 1 );

				if ( span ) {
					for( j = 0; j < span - 1; j++ ) {
						columnCount++;
						selector += ", :nth-child(" + ( columnCount + 1 ) + ")";
					}
				}

				// Store "cells" data on header as a reference to all cells in the
				// same column as this TH
				$( this ).jqmData( "cells", table.find( "tr" ).not( trs.eq( 0 ) ).not( this ).children( selector ) );

				columnCount++;
			});
		});
	}
});

})( jQuery );


(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "columntoggle",
		columnBtnTheme: null,
		columnPopupTheme: null,
		columnBtnText: "Columns...",
		classes: $.extend( $.mobile.table.prototype.options.classes, {
			popup: "ui-table-columntoggle-popup",
			columnBtn: "ui-table-columntoggle-btn",
			priorityPrefix: "ui-table-priority-",
			columnToggleTable: "ui-table-columntoggle"
		})
	},

	_create: function() {
		this._super();

		if ( this.options.mode !== "columntoggle" ) {
			return;
		}

		$.extend( this, {
			_menu: null
		});

		if ( this.options.enhanced ) {
			this._menu = $( this.document[ 0 ].getElementById( this._id() + "-popup" ) ).children().first();
			this._addToggles( this._menu, true );
		} else {
			this._menu = this._enhanceColToggle();
			this.element.addClass( this.options.classes.columnToggleTable );
		}

		this._setupEvents();

		this._setToggleState();
	},

	_id: function() {
		return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
	},

	_setupEvents: function() {
		//NOTE: inputs are bound in bindToggles,
		// so it can be called on refresh, too

		// update column toggles on resize
		this._on( this.window, {
			throttledresize: "_setToggleState"
		});
		this._on( this._menu, {
			"change input": "_menuInputChange"
		});
	},

	_addToggles: function( menu, keep ) {
		var inputs,
			checkboxIndex = 0,
			opts = this.options,
			container = menu.controlgroup( "container" );

		// allow update of menu on refresh (fixes #5880)
		if ( keep ) {
			inputs = menu.find( "input" );
		} else {
			container.empty();
		}

		// create the hide/show toggles
		this.headers.not( "td" ).each( function() {
			var input, cells,
				header = $( this ),
				priority = $.mobile.getAttribute( this, "priority" );

			if ( priority ) {
				cells = header.add( header.jqmData( "cells" ) );
				cells.addClass( opts.classes.priorityPrefix + priority );

				// Make sure the (new?) checkbox is associated with its header via .jqmData() and
				// that, vice versa, the header is also associated with the checkbox
				input = ( keep ? inputs.eq( checkboxIndex++ ) :
					$("<label><input type='checkbox' checked />" +
						( header.children( "abbr" ).first().attr( "title" ) ||
							header.text() ) +
						"</label>" )
						.appendTo( container )
						.children( 0 )
						.checkboxradio( {
							theme: opts.columnPopupTheme
						}) )

						// Associate the header with the checkbox
						.jqmData( "header", header )
						.jqmData( "cells", cells );

				// Associate the checkbox with the header
				header.jqmData( "input", input );
			}
		});

		// set bindings here
		if ( !keep ) {
			menu.controlgroup( "refresh" );
		}
	},

	_menuInputChange: function( evt ) {
		var input = $( evt.target ),
			checked = input[ 0 ].checked;

		input.jqmData( "cells" )
			.toggleClass( "ui-table-cell-hidden", !checked )
			.toggleClass( "ui-table-cell-visible", checked );
	},

	_unlockCells: function( cells ) {
		// allow hide/show via CSS only = remove all toggle-locks
		cells.removeClass( "ui-table-cell-hidden ui-table-cell-visible");
	},

	_enhanceColToggle: function() {
		var id , menuButton, popup, menu,
			table = this.element,
			opts = this.options,
			ns = $.mobile.ns,
			fragment = this.document[ 0 ].createDocumentFragment();

		id = this._id() + "-popup";
		menuButton = $( "<a href='#" + id + "' " +
			"class='" + opts.classes.columnBtn + " ui-btn " +
			"ui-btn-" + ( opts.columnBtnTheme || "a" ) +
			" ui-corner-all ui-shadow ui-mini' " +
			"data-" + ns + "rel='popup'>" + opts.columnBtnText + "</a>" );
		popup = $( "<div class='" + opts.classes.popup + "' id='" + id + "'></div>" );
		menu = $( "<fieldset></fieldset>" ).controlgroup();

		// set extension here, send "false" to trigger build/rebuild
		this._addToggles( menu, false );

		menu.appendTo( popup );

		fragment.appendChild( popup[ 0 ] );
		fragment.appendChild( menuButton[ 0 ] );
		table.before( fragment );

		popup.popup();

		return menu;
	},

	rebuild: function() {
		this._super();

		if ( this.options.mode === "columntoggle" ) {
			// NOTE: rebuild passes "false", while refresh passes "undefined"
			// both refresh the table, but inside addToggles, !false will be true,
			// so a rebuild call can be indentified
			this._refresh( false );
		}
	},

	_refresh: function( create ) {
		var headers, hiddenColumns, index;

		// Calling _super() here updates this.headers
		this._super( create );

		if ( !create && this.options.mode === "columntoggle" ) {
			headers = this.headers;
			hiddenColumns = [];

			// Find the index of the column header associated with each old checkbox among the
			// post-refresh headers and, if the header is still there, make sure the corresponding
			// column will be hidden if the pre-refresh checkbox indicates that the column is
			// hidden by recording its index in the array of hidden columns.
			this._menu.find( "input" ).each( function() {
				var input = $( this ),
					header = input.jqmData( "header" ),
					index = headers.index( header[ 0 ] );

				if ( index > -1 && !input.prop( "checked" ) ) {

					// The column header associated with /this/ checkbox is still present in the
					// post-refresh table and the checkbox is not checked, so the column associated
					// with this column header is currently hidden. Let's record that.
					hiddenColumns.push( index );
				}
			});

			// columns not being replaced must be cleared from input toggle-locks
			this._unlockCells( this.element.find( ".ui-table-cell-hidden, " +
				".ui-table-cell-visible" ) );

			// update columntoggles and cells
			this._addToggles( this._menu, create );

			// At this point all columns are visible, so uncheck the checkboxes that correspond to
			// those columns we've found to be hidden
			for ( index = hiddenColumns.length - 1 ; index > -1 ; index-- ) {
				headers.eq( hiddenColumns[ index ] ).jqmData( "input" )
					.prop( "checked", false )
					.checkboxradio( "refresh" )
					.trigger( "change" );
			}
		}
	},

	_setToggleState: function() {
		this._menu.find( "input" ).each( function() {
			var checkbox = $( this );

			this.checked = checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			checkbox.checkboxradio( "refresh" );
		});
	},

	_destroy: function() {
		this._super();
	}
});

})( jQuery );

(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "reflow",
		classes: $.extend( $.mobile.table.prototype.options.classes, {
			reflowTable: "ui-table-reflow",
			cellLabels: "ui-table-cell-label"
		})
	},

	_create: function() {
		this._super();

		// If it's not reflow mode, return here.
		if ( this.options.mode !== "reflow" ) {
			return;
		}

		if ( !this.options.enhanced ) {
			this.element.addClass( this.options.classes.reflowTable );

			this._updateReflow();
		}
	},

	rebuild: function() {
		this._super();

		if ( this.options.mode === "reflow" ) {
			this._refresh( false );
		}
	},

	_refresh: function( create ) {
		this._super( create );
		if ( !create && this.options.mode === "reflow" ) {
			this._updateReflow( );
		}
	},

	_updateReflow: function() {
		var table = this,
			opts = this.options;

		// get headers in reverse order so that top-level headers are appended last
		$( table.allHeaders.get().reverse() ).each( function() {
			var cells = $( this ).jqmData( "cells" ),
				colstart = $.mobile.getAttribute( this, "colstart" ),
				hierarchyClass = cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
				contents = $( this ).clone().contents(),
				iteration, filter;

				if ( contents.length > 0  ) {

					if ( hierarchyClass ) {
						iteration = parseInt( this.getAttribute( "colspan" ), 10 );
						filter = "";

						if ( iteration ) {
							filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
						}

						table._addLabels( cells.filter( filter ),
							opts.classes.cellLabels + hierarchyClass, contents );
					} else {
						table._addLabels( cells, opts.classes.cellLabels, contents );
					}

				}
		});
	},

	_addLabels: function( cells, label, contents ) {
		if ( contents.length === 1 && contents[ 0 ].nodeName.toLowerCase() === "abbr" ) {
			contents = contents.eq( 0 ).attr( "title" );
		}
		// .not fixes #6006
		cells
			.not( ":has(b." + label + ")" )
				.prepend( $( "<b class='" + label + "'></b>" ).append( contents ) );
	}
});

})( jQuery );

(function( $, undefined ) {

// TODO rename filterCallback/deprecate and default to the item itself as the first argument
var defaultFilterCallback = function( index, searchValue ) {
	return ( ( "" + ( $.mobile.getAttribute( this, "filtertext" ) || $( this ).text() ) )
		.toLowerCase().indexOf( searchValue ) === -1 );
};

$.widget( "mobile.filterable", {

	initSelector: ":jqmData(filter='true')",

	options: {
		filterReveal: false,
		filterCallback: defaultFilterCallback,
		enhanced: false,
		input: null,
		children: "> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup-controls > .ui-btn, > .ui-controlgroup-controls > .ui-checkbox, > .ui-controlgroup-controls > .ui-radio"
	},

	_create: function() {
		var opts = this.options;

		$.extend( this, {
			_search: null,
			_timer: 0
		});

		this._setInput( opts.input );
		if ( !opts.enhanced ) {
			this._filterItems( ( ( this._search && this._search.val() ) || "" ).toLowerCase() );
		}
	},

	_onKeyUp: function() {
		var val, lastval,
			search = this._search;

		if ( search ) {
			val = search.val().toLowerCase(),
			lastval = $.mobile.getAttribute( search[ 0 ], "lastval" ) + "";

			if ( lastval && lastval === val ) {
				// Execute the handler only once per value change
				return;
			}

			if ( this._timer ) {
				window.clearTimeout( this._timer );
				this._timer = 0;
			}

			this._timer = this._delay( function() {
				if ( this._trigger( "beforefilter", null, { input: search } ) === false ) {
					return false;
				}

				// Change val as lastval for next execution
				search[ 0 ].setAttribute( "data-" + $.mobile.ns + "lastval", val );

				this._filterItems( val );
				this._timer = 0;
			}, 250 );
		}
	},

	_getFilterableItems: function() {
		var elem = this.element,
			children = this.options.children,
			items = !children ? { length: 0 }:
				$.isFunction( children ) ? children():
				children.nodeName ? $( children ):
				children.jquery ? children:
				this.element.find( children );

		if ( items.length === 0 ) {
			items = elem.children();
		}

		return items;
	},

	_filterItems: function( val ) {
		var idx, callback, length, dst,
			show = [],
			hide = [],
			opts = this.options,
			filterItems = this._getFilterableItems();

		if ( val != null ) {
			callback = opts.filterCallback || defaultFilterCallback;
			length = filterItems.length;

			// Partition the items into those to be hidden and those to be shown
			for ( idx = 0 ; idx < length ; idx++ ) {
				dst = ( callback.call( filterItems[ idx ], idx, val ) ) ? hide : show;
				dst.push( filterItems[ idx ] );
			}
		}

		// If nothing is hidden, then the decision whether to hide or show the items
		// is based on the "filterReveal" option.
		if ( hide.length === 0 ) {
			filterItems[ ( opts.filterReveal && val.length === 0 ) ?
				"addClass" : "removeClass" ]( "ui-screen-hidden" );
		} else {
			$( hide ).addClass( "ui-screen-hidden" );
			$( show ).removeClass( "ui-screen-hidden" );
		}

		this._refreshChildWidget();

		this._trigger( "filter", null, {
			items: filterItems
		});
	},

	// The Default implementation of _refreshChildWidget attempts to call
	// refresh on collapsibleset, controlgroup, selectmenu, or listview
	_refreshChildWidget: function() {
		var widget, idx,
			recognizedWidgets = [ "collapsibleset", "selectmenu", "controlgroup", "listview" ];

		for ( idx = recognizedWidgets.length - 1 ; idx > -1 ; idx-- ) {
			widget = recognizedWidgets[ idx ];
			if ( $.mobile[ widget ] ) {
				widget = this.element.data( "mobile-" + widget );
				if ( widget && $.isFunction( widget.refresh ) ) {
					widget.refresh();
				}
			}
		}
	},

	// TODO: When the input is not internal, do not even store it in this._search
	_setInput: function ( selector ) {
		var search = this._search;

		// Stop a pending filter operation
		if ( this._timer ) {
			window.clearTimeout( this._timer );
			this._timer = 0;
		}

		if ( search ) {
			this._off( search, "keyup change input" );
			search = null;
		}

		if ( selector ) {
			search = selector.jquery ? selector:
				selector.nodeName ? $( selector ):
				this.document.find( selector );

			this._on( search, {
				keydown: "_onKeyDown",
				keypress: "_onKeyPress",
				keyup: "_onKeyUp",
				change: "_onKeyUp",
				input: "_onKeyUp"
			});
		}

		this._search = search;
	},

	// Prevent form submission
	_onKeyDown: function( event ) {
		if ( event.keyCode === $.ui.keyCode.ENTER ) {
			event.preventDefault();
			this._preventKeyPress = true;
		}
	},

	_onKeyPress: function( event ) {
		if ( this._preventKeyPress ) {
			event.preventDefault();
			this._preventKeyPress = false;
		}
	},

	_setOptions: function( options ) {
		var refilter = !( ( options.filterReveal === undefined ) &&
				( options.filterCallback === undefined ) &&
				( options.children === undefined ) );

		this._super( options );

		if ( options.input !== undefined ) {
			this._setInput( options.input );
			refilter = true;
		}

		if ( refilter ) {
			this.refresh();
		}
	},

	_destroy: function() {
		var opts = this.options,
			items = this._getFilterableItems();

		if ( opts.enhanced ) {
			items.toggleClass( "ui-screen-hidden", opts.filterReveal );
		} else {
			items.removeClass( "ui-screen-hidden" );
		}
	},

	refresh: function() {
		if ( this._timer ) {
			window.clearTimeout( this._timer );
			this._timer = 0;
		}
		this._filterItems( ( ( this._search && this._search.val() ) || "" ).toLowerCase() );
	}
});

})( jQuery );

(function( $, undefined ) {

// Create a function that will replace the _setOptions function of a widget,
// and will pass the options on to the input of the filterable.
var replaceSetOptions = function( self, orig ) {
		return function( options ) {
			orig.call( this, options );
			self._syncTextInputOptions( options );
		};
	},
	rDividerListItem = /(^|\s)ui-li-divider(\s|$)/,
	origDefaultFilterCallback = $.mobile.filterable.prototype.options.filterCallback;

// Override the default filter callback with one that does not hide list dividers
$.mobile.filterable.prototype.options.filterCallback = function( index, searchValue ) {
	return !this.className.match( rDividerListItem ) &&
		origDefaultFilterCallback.call( this, index, searchValue );
};

$.widget( "mobile.filterable", $.mobile.filterable, {
	options: {
		filterPlaceholder: "Filter items...",
		filterTheme: null
	},

	_create: function() {
		var idx, widgetName,
			elem = this.element,
			recognizedWidgets = [ "collapsibleset", "selectmenu", "controlgroup", "listview" ],
			createHandlers = {};

		this._super();

		$.extend( this, {
			_widget: null
		});

		for ( idx = recognizedWidgets.length - 1 ; idx > -1 ; idx-- ) {
			widgetName = recognizedWidgets[ idx ];
			if ( $.mobile[ widgetName ] ) {
				if ( this._setWidget( elem.data( "mobile-" + widgetName ) ) ) {
					break;
				} else {
					createHandlers[ widgetName + "create" ] = "_handleCreate";
				}
			}
		}

		if ( !this._widget ) {
			this._on( elem, createHandlers );
		}
	},

	_handleCreate: function( evt ) {
		this._setWidget( this.element.data( "mobile-" + evt.type.substring( 0, evt.type.length - 6 ) ) );
	},

	_trigger: function( type, event, data ) {
		if ( this._widget && this._widget.widgetFullName === "mobile-listview" &&
			type === "beforefilter" ) {

			// Also trigger listviewbeforefilter if this widget is also a listview
			this._widget._trigger( "beforefilter", event, data );
		}

		// Passing back the response enables calling preventDefault()
		return this._super( type, event, data );
	},

	_setWidget: function( widget ) {
		if ( !this._widget && widget ) {
			this._widget = widget;
			this._widget._setOptions = replaceSetOptions( this, this._widget._setOptions );
		}

		if ( !!this._widget ) {
			this._syncTextInputOptions( this._widget.options );
			if ( this._widget.widgetName === "listview" ) {
				this._widget.options.hideDividers = true;
				this._widget.element.listview( "refresh" );
			}
		}

		return !!this._widget;
	},

	_isSearchInternal: function() {
		return ( this._search && this._search.jqmData( "ui-filterable-" + this.uuid + "-internal" ) );
	},

	_setInput: function( selector ) {
		var opts = this.options,
			updatePlaceholder = true,
			textinputOpts = {};

		if ( !selector ) {
			if ( this._isSearchInternal() ) {

				// Ignore the call to set a new input if the selector goes to falsy and
				// the current textinput is already of the internally generated variety.
				return;
			} else {

				// Generating a new textinput widget. No need to set the placeholder
				// further down the function.
				updatePlaceholder = false;
				selector = $( "<input " +
					"data-" + $.mobile.ns + "type='search' " +
					"placeholder='" + opts.filterPlaceholder + "'></input>" )
					.jqmData( "ui-filterable-" + this.uuid + "-internal", true );
				$( "<form class='ui-filterable'></form>" )
					.append( selector )
					.submit( function( evt ) {
						evt.preventDefault();
						selector.blur();
					})
					.insertBefore( this.element );
				if ( $.mobile.textinput ) {
					if ( this.options.filterTheme != null ) {
						textinputOpts[ "theme" ] = opts.filterTheme;
					}

					selector.textinput( textinputOpts );
				}
			}
		}

		this._super( selector );

		if ( this._isSearchInternal() && updatePlaceholder ) {
			this._search.attr( "placeholder", this.options.filterPlaceholder );
		}
	},

	_setOptions: function( options ) {
		var ret = this._super( options );

		// Need to set the filterPlaceholder after having established the search input
		if ( options.filterPlaceholder !== undefined ) {
			if ( this._isSearchInternal() ) {
				this._search.attr( "placeholder", options.filterPlaceholder );
			}
		}

		if ( options.filterTheme !== undefined && this._search && $.mobile.textinput ) {
			this._search.textinput( "option", "theme", options.filterTheme );
		}

		return ret;
	},

	// The listview implementation accompanying this filterable backcompat layer will call
	// filterable.refresh() after it's done refreshing the listview to make sure the filterable
	// filters out any new items added. However, when the listview refresh has been initiated by
	// the filterable itself, then such filtering has already taken place, and calling the
	// filterable's refresh() method will cause an infinite recursion. We stop this by setting a
	// flag that will cause the filterable's refresh() method to short-circuit.
	_refreshChildWidget: function() {
		this._refreshingChildWidget = true;
		this._superApply( arguments );
		this._refreshingChildWidget = false;
	},

	refresh: function() {
		if ( !this._refreshingChildWidget ) {
			this._superApply( arguments );
		}
	},

	_destroy: function() {
		if ( this._isSearchInternal() ) {
			this._search.remove();
		}
		this._super();
	},

	_syncTextInputOptions: function( options ) {
		var idx,
			textinputOptions = {};

		// We only sync options if the filterable's textinput is of the internally
		// generated variety, rather than one specified by the user.
		if ( this._isSearchInternal() && $.mobile.textinput ) {

			// Apply only the options understood by textinput
			for ( idx in $.mobile.textinput.prototype.options ) {
				if ( options[ idx ] !== undefined ) {
					if ( idx === "theme" && this.options.filterTheme != null ) {
						textinputOptions[ idx ] = this.options.filterTheme;
					} else {
						textinputOptions[ idx ] = options[ idx ];
					}
				}
			}
			this._search.textinput( "option", textinputOptions );
		}
	}
});

// Instantiate a filterable on a listview that has the data-filter="true" attribute
// This is not necessary for static content, because the auto-enhance takes care of instantiating
// the filterable upon encountering data-filter="true". However, because of 1.3.x it is expected
// that a listview with data-filter="true" will be filterable even if you just instantiate a
// listview on it. The extension below ensures that this continues to happen in 1.4.x.
$.widget( "mobile.listview", $.mobile.listview, {
	options: {
		filter: false
	},
	_create: function() {
		if ( this.options.filter === true &&
				!this.element.data( "mobile-filterable" ) ) {
			this.element.filterable();
		}
		return this._super();
	},

	refresh: function() {
		var filterable;

		this._superApply( arguments );

		if ( this.options.filter === true ) {
			filterable = this.element.data( "mobile-filterable" );

			if ( filterable ) {
				filterable.refresh();
			}
		}
	}
});

})( jQuery );

/*!
 * jQuery UI Tabs fadf2b312a05040436451c64bbfaf4814bc62c56
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var tabId = 0,
	rhash = /#.*$/;

function getNextTabId() {
	return ++tabId;
}

function isLocal( anchor ) {
	return anchor.hash.length > 1 &&
		decodeURIComponent( anchor.href.replace( rhash, "" ) ) ===
			decodeURIComponent( location.href.replace( rhash, "" ) );
}

$.widget( "ui.tabs", {
	version: "fadf2b312a05040436451c64bbfaf4814bc62c56",
	delay: 300,
	options: {
		active: null,
		collapsible: false,
		event: "click",
		heightStyle: "content",
		hide: null,
		show: null,

		// callbacks
		activate: null,
		beforeActivate: null,
		beforeLoad: null,
		load: null
	},

	_create: function() {
		var that = this,
			options = this.options;

		this.running = false;

		this.element
			.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" )
			.toggleClass( "ui-tabs-collapsible", options.collapsible )
			// Prevent users from focusing disabled tabs via click
			.delegate( ".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function( event ) {
				if ( $( this ).is( ".ui-state-disabled" ) ) {
					event.preventDefault();
				}
			})
			// support: IE <9
			// Preventing the default action in mousedown doesn't prevent IE
			// from focusing the element, so if the anchor gets focused, blur.
			// We don't have to worry about focusing the previously focused
			// element since clicking on a non-focusable element should focus
			// the body anyway.
			.delegate( ".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				if ( $( this ).closest( "li" ).is( ".ui-state-disabled" ) ) {
					this.blur();
				}
			});

		this._processTabs();
		options.active = this._initialActive();

		// Take disabling tabs via class attribute from HTML
		// into account and update option properly.
		if ( $.isArray( options.disabled ) ) {
			options.disabled = $.unique( options.disabled.concat(
				$.map( this.tabs.filter( ".ui-state-disabled" ), function( li ) {
					return that.tabs.index( li );
				})
			) ).sort();
		}

		// check for length avoids error when initializing empty list
		if ( this.options.active !== false && this.anchors.length ) {
			this.active = this._findActive( options.active );
		} else {
			this.active = $();
		}

		this._refresh();

		if ( this.active.length ) {
			this.load( options.active );
		}
	},

	_initialActive: function() {
		var active = this.options.active,
			collapsible = this.options.collapsible,
			locationHash = location.hash.substring( 1 );

		if ( active === null ) {
			// check the fragment identifier in the URL
			if ( locationHash ) {
				this.tabs.each(function( i, tab ) {
					if ( $( tab ).attr( "aria-controls" ) === locationHash ) {
						active = i;
						return false;
					}
				});
			}

			// check for a tab marked active via a class
			if ( active === null ) {
				active = this.tabs.index( this.tabs.filter( ".ui-tabs-active" ) );
			}

			// no active tab, set to false
			if ( active === null || active === -1 ) {
				active = this.tabs.length ? 0 : false;
			}
		}

		// handle numbers: negative, out of range
		if ( active !== false ) {
			active = this.tabs.index( this.tabs.eq( active ) );
			if ( active === -1 ) {
				active = collapsible ? false : 0;
			}
		}

		// don't allow collapsible: false and active: false
		if ( !collapsible && active === false && this.anchors.length ) {
			active = 0;
		}

		return active;
	},

	_getCreateEventData: function() {
		return {
			tab: this.active,
			panel: !this.active.length ? $() : this._getPanelForTab( this.active )
		};
	},

	_tabKeydown: function( event ) {
		var focusedTab = $( this.document[0].activeElement ).closest( "li" ),
			selectedIndex = this.tabs.index( focusedTab ),
			goingForward = true;

		if ( this._handlePageNav( event ) ) {
			return;
		}

		switch ( event.keyCode ) {
			case $.ui.keyCode.RIGHT:
			case $.ui.keyCode.DOWN:
				selectedIndex++;
				break;
			case $.ui.keyCode.UP:
			case $.ui.keyCode.LEFT:
				goingForward = false;
				selectedIndex--;
				break;
			case $.ui.keyCode.END:
				selectedIndex = this.anchors.length - 1;
				break;
			case $.ui.keyCode.HOME:
				selectedIndex = 0;
				break;
			case $.ui.keyCode.SPACE:
				// Activate only, no collapsing
				event.preventDefault();
				clearTimeout( this.activating );
				this._activate( selectedIndex );
				return;
			case $.ui.keyCode.ENTER:
				// Toggle (cancel delayed activation, allow collapsing)
				event.preventDefault();
				clearTimeout( this.activating );
				// Determine if we should collapse or activate
				this._activate( selectedIndex === this.options.active ? false : selectedIndex );
				return;
			default:
				return;
		}

		// Focus the appropriate tab, based on which key was pressed
		event.preventDefault();
		clearTimeout( this.activating );
		selectedIndex = this._focusNextTab( selectedIndex, goingForward );

		// Navigating with control key will prevent automatic activation
		if ( !event.ctrlKey ) {
			// Update aria-selected immediately so that AT think the tab is already selected.
			// Otherwise AT may confuse the user by stating that they need to activate the tab,
			// but the tab will already be activated by the time the announcement finishes.
			focusedTab.attr( "aria-selected", "false" );
			this.tabs.eq( selectedIndex ).attr( "aria-selected", "true" );

			this.activating = this._delay(function() {
				this.option( "active", selectedIndex );
			}, this.delay );
		}
	},

	_panelKeydown: function( event ) {
		if ( this._handlePageNav( event ) ) {
			return;
		}

		// Ctrl+up moves focus to the current tab
		if ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {
			event.preventDefault();
			this.active.focus();
		}
	},

	// Alt+page up/down moves focus to the previous/next tab (and activates)
	_handlePageNav: function( event ) {
		if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {
			this._activate( this._focusNextTab( this.options.active - 1, false ) );
			return true;
		}
		if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {
			this._activate( this._focusNextTab( this.options.active + 1, true ) );
			return true;
		}
	},

	_findNextTab: function( index, goingForward ) {
		var lastTabIndex = this.tabs.length - 1;

		function constrain() {
			if ( index > lastTabIndex ) {
				index = 0;
			}
			if ( index < 0 ) {
				index = lastTabIndex;
			}
			return index;
		}

		while ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {
			index = goingForward ? index + 1 : index - 1;
		}

		return index;
	},

	_focusNextTab: function( index, goingForward ) {
		index = this._findNextTab( index, goingForward );
		this.tabs.eq( index ).focus();
		return index;
	},

	_setOption: function( key, value ) {
		if ( key === "active" ) {
			// _activate() will handle invalid values and update this.options
			this._activate( value );
			return;
		}

		if ( key === "disabled" ) {
			// don't use the widget factory's disabled handling
			this._setupDisabled( value );
			return;
		}

		this._super( key, value);

		if ( key === "collapsible" ) {
			this.element.toggleClass( "ui-tabs-collapsible", value );
			// Setting collapsible: false while collapsed; open first panel
			if ( !value && this.options.active === false ) {
				this._activate( 0 );
			}
		}

		if ( key === "event" ) {
			this._setupEvents( value );
		}

		if ( key === "heightStyle" ) {
			this._setupHeightStyle( value );
		}
	},

	_tabId: function( tab ) {
		return tab.attr( "aria-controls" ) || "ui-tabs-" + getNextTabId();
	},

	_sanitizeSelector: function( hash ) {
		return hash ? hash.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
	},

	refresh: function() {
		var options = this.options,
			lis = this.tablist.children( ":has(a[href])" );

		// get disabled tabs from class attribute from HTML
		// this will get converted to a boolean if needed in _refresh()
		options.disabled = $.map( lis.filter( ".ui-state-disabled" ), function( tab ) {
			return lis.index( tab );
		});

		this._processTabs();

		// was collapsed or no tabs
		if ( options.active === false || !this.anchors.length ) {
			options.active = false;
			this.active = $();
		// was active, but active tab is gone
		} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {
			// all remaining tabs are disabled
			if ( this.tabs.length === options.disabled.length ) {
				options.active = false;
				this.active = $();
			// activate previous tab
			} else {
				this._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );
			}
		// was active, active tab still exists
		} else {
			// make sure active index is correct
			options.active = this.tabs.index( this.active );
		}

		this._refresh();
	},

	_refresh: function() {
		this._setupDisabled( this.options.disabled );
		this._setupEvents( this.options.event );
		this._setupHeightStyle( this.options.heightStyle );

		this.tabs.not( this.active ).attr({
			"aria-selected": "false",
			tabIndex: -1
		});
		this.panels.not( this._getPanelForTab( this.active ) )
			.hide()
			.attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			});

		// Make sure one tab is in the tab order
		if ( !this.active.length ) {
			this.tabs.eq( 0 ).attr( "tabIndex", 0 );
		} else {
			this.active
				.addClass( "ui-tabs-active ui-state-active" )
				.attr({
					"aria-selected": "true",
					tabIndex: 0
				});
			this._getPanelForTab( this.active )
				.show()
				.attr({
					"aria-expanded": "true",
					"aria-hidden": "false"
				});
		}
	},

	_processTabs: function() {
		var that = this;

		this.tablist = this._getList()
			.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
			.attr( "role", "tablist" );

		this.tabs = this.tablist.find( "> li:has(a[href])" )
			.addClass( "ui-state-default ui-corner-top" )
			.attr({
				role: "tab",
				tabIndex: -1
			});

		this.anchors = this.tabs.map(function() {
				return $( "a", this )[ 0 ];
			})
			.addClass( "ui-tabs-anchor" )
			.attr({
				role: "presentation",
				tabIndex: -1
			});

		this.panels = $();

		this.anchors.each(function( i, anchor ) {
			var selector, panel, panelId,
				anchorId = $( anchor ).uniqueId().attr( "id" ),
				tab = $( anchor ).closest( "li" ),
				originalAriaControls = tab.attr( "aria-controls" );

			// inline tab
			if ( isLocal( anchor ) ) {
				selector = anchor.hash;
				panel = that.element.find( that._sanitizeSelector( selector ) );
			// remote tab
			} else {
				panelId = that._tabId( tab );
				selector = "#" + panelId;
				panel = that.element.find( selector );
				if ( !panel.length ) {
					panel = that._createPanel( panelId );
					panel.insertAfter( that.panels[ i - 1 ] || that.tablist );
				}
				panel.attr( "aria-live", "polite" );
			}

			if ( panel.length) {
				that.panels = that.panels.add( panel );
			}
			if ( originalAriaControls ) {
				tab.data( "ui-tabs-aria-controls", originalAriaControls );
			}
			tab.attr({
				"aria-controls": selector.substring( 1 ),
				"aria-labelledby": anchorId
			});
			panel.attr( "aria-labelledby", anchorId );
		});

		this.panels
			.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
			.attr( "role", "tabpanel" );
	},

	// allow overriding how to find the list for rare usage scenarios (#7715)
	_getList: function() {
		return this.element.find( "ol,ul" ).eq( 0 );
	},

	_createPanel: function( id ) {
		return $( "<div>" )
			.attr( "id", id )
			.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )
			.data( "ui-tabs-destroy", true );
	},

	_setupDisabled: function( disabled ) {
		if ( $.isArray( disabled ) ) {
			if ( !disabled.length ) {
				disabled = false;
			} else if ( disabled.length === this.anchors.length ) {
				disabled = true;
			}
		}

		// disable tabs
		for ( var i = 0, li; ( li = this.tabs[ i ] ); i++ ) {
			if ( disabled === true || $.inArray( i, disabled ) !== -1 ) {
				$( li )
					.addClass( "ui-state-disabled" )
					.attr( "aria-disabled", "true" );
			} else {
				$( li )
					.removeClass( "ui-state-disabled" )
					.removeAttr( "aria-disabled" );
			}
		}

		this.options.disabled = disabled;
	},

	_setupEvents: function( event ) {
		var events = {
			click: function( event ) {
				event.preventDefault();
			}
		};
		if ( event ) {
			$.each( event.split(" "), function( index, eventName ) {
				events[ eventName ] = "_eventHandler";
			});
		}

		this._off( this.anchors.add( this.tabs ).add( this.panels ) );
		this._on( this.anchors, events );
		this._on( this.tabs, { keydown: "_tabKeydown" } );
		this._on( this.panels, { keydown: "_panelKeydown" } );

		this._focusable( this.tabs );
		this._hoverable( this.tabs );
	},

	_setupHeightStyle: function( heightStyle ) {
		var maxHeight,
			parent = this.element.parent();

		if ( heightStyle === "fill" ) {
			maxHeight = parent.height();
			maxHeight -= this.element.outerHeight() - this.element.height();

			this.element.siblings( ":visible" ).each(function() {
				var elem = $( this ),
					position = elem.css( "position" );

				if ( position === "absolute" || position === "fixed" ) {
					return;
				}
				maxHeight -= elem.outerHeight( true );
			});

			this.element.children().not( this.panels ).each(function() {
				maxHeight -= $( this ).outerHeight( true );
			});

			this.panels.each(function() {
				$( this ).height( Math.max( 0, maxHeight -
					$( this ).innerHeight() + $( this ).height() ) );
			})
			.css( "overflow", "auto" );
		} else if ( heightStyle === "auto" ) {
			maxHeight = 0;
			this.panels.each(function() {
				maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
			}).height( maxHeight );
		}
	},

	_eventHandler: function( event ) {
		var options = this.options,
			active = this.active,
			anchor = $( event.currentTarget ),
			tab = anchor.closest( "li" ),
			clickedIsActive = tab[ 0 ] === active[ 0 ],
			collapsing = clickedIsActive && options.collapsible,
			toShow = collapsing ? $() : this._getPanelForTab( tab ),
			toHide = !active.length ? $() : this._getPanelForTab( active ),
			eventData = {
				oldTab: active,
				oldPanel: toHide,
				newTab: collapsing ? $() : tab,
				newPanel: toShow
			};

		event.preventDefault();

		if ( tab.hasClass( "ui-state-disabled" ) ||
				// tab is already loading
				tab.hasClass( "ui-tabs-loading" ) ||
				// can't switch durning an animation
				this.running ||
				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||
				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
			return;
		}

		options.active = collapsing ? false : this.tabs.index( tab );

		this.active = clickedIsActive ? $() : tab;
		if ( this.xhr ) {
			this.xhr.abort();
		}

		if ( !toHide.length && !toShow.length ) {
			$.error( "jQuery UI Tabs: Mismatching fragment identifier." );
		}

		if ( toShow.length ) {
			this.load( this.tabs.index( tab ), event );
		}
		this._toggle( event, eventData );
	},

	// handles show/hide for selecting tabs
	_toggle: function( event, eventData ) {
		var that = this,
			toShow = eventData.newPanel,
			toHide = eventData.oldPanel;

		this.running = true;

		function complete() {
			that.running = false;
			that._trigger( "activate", event, eventData );
		}

		function show() {
			eventData.newTab.closest( "li" ).addClass( "ui-tabs-active ui-state-active" );

			if ( toShow.length && that.options.show ) {
				that._show( toShow, that.options.show, complete );
			} else {
				toShow.show();
				complete();
			}
		}

		// start out by hiding, then showing, then completing
		if ( toHide.length && this.options.hide ) {
			this._hide( toHide, this.options.hide, function() {
				eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
				show();
			});
		} else {
			eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );
			toHide.hide();
			show();
		}

		toHide.attr({
			"aria-expanded": "false",
			"aria-hidden": "true"
		});
		eventData.oldTab.attr( "aria-selected", "false" );
		// If we're switching tabs, remove the old tab from the tab order.
		// If we're opening from collapsed state, remove the previous tab from the tab order.
		// If we're collapsing, then keep the collapsing tab in the tab order.
		if ( toShow.length && toHide.length ) {
			eventData.oldTab.attr( "tabIndex", -1 );
		} else if ( toShow.length ) {
			this.tabs.filter(function() {
				return $( this ).attr( "tabIndex" ) === 0;
			})
			.attr( "tabIndex", -1 );
		}

		toShow.attr({
			"aria-expanded": "true",
			"aria-hidden": "false"
		});
		eventData.newTab.attr({
			"aria-selected": "true",
			tabIndex: 0
		});
	},

	_activate: function( index ) {
		var anchor,
			active = this._findActive( index );

		// trying to activate the already active panel
		if ( active[ 0 ] === this.active[ 0 ] ) {
			return;
		}

		// trying to collapse, simulate a click on the current active header
		if ( !active.length ) {
			active = this.active;
		}

		anchor = active.find( ".ui-tabs-anchor" )[ 0 ];
		this._eventHandler({
			target: anchor,
			currentTarget: anchor,
			preventDefault: $.noop
		});
	},

	_findActive: function( index ) {
		return index === false ? $() : this.tabs.eq( index );
	},

	_getIndex: function( index ) {
		// meta-function to give users option to provide a href string instead of a numerical index.
		if ( typeof index === "string" ) {
			index = this.anchors.index( this.anchors.filter( "[href$='" + index + "']" ) );
		}

		return index;
	},

	_destroy: function() {
		if ( this.xhr ) {
			this.xhr.abort();
		}

		this.element.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" );

		this.tablist
			.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )
			.removeAttr( "role" );

		this.anchors
			.removeClass( "ui-tabs-anchor" )
			.removeAttr( "role" )
			.removeAttr( "tabIndex" )
			.removeUniqueId();

		this.tabs.add( this.panels ).each(function() {
			if ( $.data( this, "ui-tabs-destroy" ) ) {
				$( this ).remove();
			} else {
				$( this )
					.removeClass( "ui-state-default ui-state-active ui-state-disabled " +
						"ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel" )
					.removeAttr( "tabIndex" )
					.removeAttr( "aria-live" )
					.removeAttr( "aria-busy" )
					.removeAttr( "aria-selected" )
					.removeAttr( "aria-labelledby" )
					.removeAttr( "aria-hidden" )
					.removeAttr( "aria-expanded" )
					.removeAttr( "role" );
			}
		});

		this.tabs.each(function() {
			var li = $( this ),
				prev = li.data( "ui-tabs-aria-controls" );
			if ( prev ) {
				li
					.attr( "aria-controls", prev )
					.removeData( "ui-tabs-aria-controls" );
			} else {
				li.removeAttr( "aria-controls" );
			}
		});

		this.panels.show();

		if ( this.options.heightStyle !== "content" ) {
			this.panels.css( "height", "" );
		}
	},

	enable: function( index ) {
		var disabled = this.options.disabled;
		if ( disabled === false ) {
			return;
		}

		if ( index === undefined ) {
			disabled = false;
		} else {
			index = this._getIndex( index );
			if ( $.isArray( disabled ) ) {
				disabled = $.map( disabled, function( num ) {
					return num !== index ? num : null;
				});
			} else {
				disabled = $.map( this.tabs, function( li, num ) {
					return num !== index ? num : null;
				});
			}
		}
		this._setupDisabled( disabled );
	},

	disable: function( index ) {
		var disabled = this.options.disabled;
		if ( disabled === true ) {
			return;
		}

		if ( index === undefined ) {
			disabled = true;
		} else {
			index = this._getIndex( index );
			if ( $.inArray( index, disabled ) !== -1 ) {
				return;
			}
			if ( $.isArray( disabled ) ) {
				disabled = $.merge( [ index ], disabled ).sort();
			} else {
				disabled = [ index ];
			}
		}
		this._setupDisabled( disabled );
	},

	load: function( index, event ) {
		index = this._getIndex( index );
		var that = this,
			tab = this.tabs.eq( index ),
			anchor = tab.find( ".ui-tabs-anchor" ),
			panel = this._getPanelForTab( tab ),
			eventData = {
				tab: tab,
				panel: panel
			};

		// not remote
		if ( isLocal( anchor[ 0 ] ) ) {
			return;
		}

		this.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );

		// support: jQuery <1.8
		// jQuery <1.8 returns false if the request is canceled in beforeSend,
		// but as of 1.8, $.ajax() always returns a jqXHR object.
		if ( this.xhr && this.xhr.statusText !== "canceled" ) {
			tab.addClass( "ui-tabs-loading" );
			panel.attr( "aria-busy", "true" );

			this.xhr
				.success(function( response ) {
					// support: jQuery <1.8
					// http://bugs.jquery.com/ticket/11778
					setTimeout(function() {
						panel.html( response );
						that._trigger( "load", event, eventData );
					}, 1 );
				})
				.complete(function( jqXHR, status ) {
					// support: jQuery <1.8
					// http://bugs.jquery.com/ticket/11778
					setTimeout(function() {
						if ( status === "abort" ) {
							that.panels.stop( false, true );
						}

						tab.removeClass( "ui-tabs-loading" );
						panel.removeAttr( "aria-busy" );

						if ( jqXHR === that.xhr ) {
							delete that.xhr;
						}
					}, 1 );
				});
		}
	},

	_ajaxSettings: function( anchor, event, eventData ) {
		var that = this;
		return {
			url: anchor.attr( "href" ),
			beforeSend: function( jqXHR, settings ) {
				return that._trigger( "beforeLoad", event,
					$.extend( { jqXHR : jqXHR, ajaxSettings: settings }, eventData ) );
			}
		};
	},

	_getPanelForTab: function( tab ) {
		var id = $( tab ).attr( "aria-controls" );
		return this.element.find( this._sanitizeSelector( "#" + id ) );
	}
});

})( jQuery );

(function( $, undefined ) {

})( jQuery );

(function( $, window ) {

	$.mobile.iosorientationfixEnabled = true;

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent,
		zoom,
		evt, x, y, z, aig;
	if ( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test( ua ) && ua.indexOf( "AppleWebKit" ) > -1 ) ) {
		$.mobile.iosorientationfixEnabled = false;
		return;
	}

	zoom = $.mobile.zoom;

	function checkTilt( e ) {
		evt = e.originalEvent;
		aig = evt.accelerationIncludingGravity;

		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		// If portrait orientation and in one of the danger zones
		if ( !window.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
				if ( zoom.enabled ) {
					zoom.disable();
				}
		}	else if ( !zoom.enabled ) {
				zoom.enable();
		}
	}

	$.mobile.document.on( "mobileinit", function() {
		if ( $.mobile.iosorientationfixEnabled ) {
			$.mobile.window
				.bind( "orientationchange.iosorientationfix", zoom.enable )
				.bind( "devicemotion.iosorientationfix", checkTilt );
		}
	});

}( jQuery, this ));

(function( $, window, undefined ) {
	var	$html = $( "html" ),
		$window = $.mobile.window;

	//remove initial build class (only present on first pageshow)
	function hideRenderingClass() {
		$html.removeClass( "ui-mobile-rendering" );
	}

	// trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger( "mobileinit" );

	// support conditions
	// if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	// otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}

	// override ajaxEnabled on platforms that have known conflicts with hash history updates
	// or generally work better browsing in regular http for full page refreshes (BB5, Opera Mini)
	if ( $.mobile.ajaxBlacklist ) {
		$.mobile.ajaxEnabled = false;
	}

	// Add mobile, initial load "rendering" classes to docEl
	$html.addClass( "ui-mobile ui-mobile-rendering" );

	// This is a fallback. If anything goes wrong (JS errors, etc), or events don't fire,
	// this ensures the rendering class is removed after 5 seconds, so content is visible and accessible
	setTimeout( hideRenderingClass, 5000 );

	$.extend( $.mobile, {
		// find and enhance the pages in the dom and transition to the first page.
		initializePage: function() {
			// find present pages
			var path = $.mobile.path,
				$pages = $( ":jqmData(role='page'), :jqmData(role='dialog')" ),
				hash = path.stripHash( path.stripQueryParams(path.parseLocation().hash) ),
				theLocation = $.mobile.path.parseLocation(),
				hashPage = hash ? document.getElementById( hash ) : undefined;

			// if no pages are found, create one with body's inner html
			if ( !$pages.length ) {
				$pages = $( "body" ).wrapInner( "<div data-" + $.mobile.ns + "role='page'></div>" ).children( 0 );
			}

			// add dialogs, set data-url attrs
			$pages.each(function() {
				var $this = $( this );

				// unless the data url is already set set it to the pathname
				if ( !$this[ 0 ].getAttribute( "data-" + $.mobile.ns + "url" ) ) {
					$this.attr( "data-" + $.mobile.ns + "url", $this.attr( "id" ) ||
						path.convertUrlToDataUrl( theLocation.pathname + theLocation.search ) );
				}
			});

			// define first page in dom case one backs out to the directory root (not always the first page visited, but defined as fallback)
			$.mobile.firstPage = $pages.first();

			// define page container
			$.mobile.pageContainer = $.mobile.firstPage
				.parent()
				.addClass( "ui-mobile-viewport" )
				.pagecontainer();

			// initialize navigation events now, after mobileinit has occurred and the page container
			// has been created but before the rest of the library is alerted to that fact
			$.mobile.navreadyDeferred.resolve();

			// alert listeners that the pagecontainer has been determined for binding
			// to events triggered on it
			$window.trigger( "pagecontainercreate" );

			// cue page loading message
			$.mobile.loading( "show" );

			//remove initial build class (only present on first pageshow)
			hideRenderingClass();

			// if hashchange listening is disabled, there's no hash deeplink,
			// the hash is not valid (contains more than one # or does not start with #)
			// or there is no page with that hash, change to the first page in the DOM
			// Remember, however, that the hash can also be a path!
			if ( ! ( $.mobile.hashListeningEnabled &&
				$.mobile.path.isHashValid( location.hash ) &&
				( $( hashPage ).is( ":jqmData(role='page')" ) ||
					$.mobile.path.isPath( hash ) ||
					hash === $.mobile.dialogHashKey ) ) ) {

				// make sure to set initial popstate state if it exists
				// so that navigation back to the initial page works properly
				if ( $.event.special.navigate.isPushStateEnabled() ) {
					$.mobile.navigate.navigator.squash( path.parseLocation().href );
				}

				$.mobile.changePage( $.mobile.firstPage, {
					transition: "none",
					reverse: true,
					changeHash: false,
					fromHashChange: true
				});
			} else {
				// trigger hashchange or navigate to squash and record the correct
				// history entry for an initial hash path
				if ( !$.event.special.navigate.isPushStateEnabled() ) {
					$window.trigger( "hashchange", [true] );
				} else {
					// TODO figure out how to simplify this interaction with the initial history entry
					// at the bottom js/navigate/navigate.js
					$.mobile.navigate.history.stack = [];
					$.mobile.navigate( $.mobile.path.isPath( location.hash ) ? location.hash : location.href );
				}
			}
		}
	});

	$(function() {
		//Run inlineSVG support test
		$.support.inlineSVG();

		// check which scrollTop value should be used by scrolling to 1 immediately at domready
		// then check what the scroll top is. Android will report 0... others 1
		// note that this initial scroll won't hide the address bar. It's just for the check.

		// hide iOS browser chrome on load if hideUrlBar is true this is to try and do it as soon as possible
		if ( $.mobile.hideUrlBar ) {
			window.scrollTo( 0, 1 );
		}

		// if defaultHomeScroll hasn't been set yet, see if scrollTop is 1
		// it should be 1 in most browsers, but android treats 1 as 0 (for hiding addr bar)
		// so if it's 1, use 0 from now on
		$.mobile.defaultHomeScroll = ( !$.support.scrollTop || $.mobile.window.scrollTop() === 1 ) ? 0 : 1;

		//dom-ready inits
		if ( $.mobile.autoInitializePage ) {
			$.mobile.initializePage();
		}

		// window load event
		// hide iOS browser chrome on load if hideUrlBar is true this is as fall back incase we were too early before
		if ( $.mobile.hideUrlBar ) {
			$window.load( $.mobile.silentScroll );
		}

		if ( !$.support.cssPointerEvents ) {
			// IE and Opera don't support CSS pointer-events: none that we use to disable link-based buttons
			// by adding the 'ui-disabled' class to them. Using a JavaScript workaround for those browser.
			// https://github.com/jquery/jquery-mobile/issues/3558

			// DEPRECATED as of 1.4.0 - remove ui-disabled after 1.4.0 release
			// only ui-state-disabled should be present thereafter
			$.mobile.document.delegate( ".ui-state-disabled,.ui-disabled", "vclick",
				function( e ) {
					e.preventDefault();
					e.stopImmediatePropagation();
				}
			);
		}
	});
}( jQuery, this ));


}));