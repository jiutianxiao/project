var _click = "tap";
$(document)
    .on("touchstart", function (e) {
        e.preventDefault();
    })
    .on("touchmove", function (e) {
        e.preventDefault();
    })
    .on("touchend", function (e) {
        e.preventDefault();
    });

//预加载
var myScreen = $('.screen');
var _Loading = $('.Loading');
$.loader(_Loading, "_src", null, function () {
    var _box = $(".Loading_Speed").html('0%');
    myScreen.fadeIn(0.6, function () {
        $.loader(myScreen, "_src", function (i, count) {
            _box.html(Math.round(i / count * 100) + "%");
            _Loading.fadeOut(1)
        }, function () {
            $.loader(myScreen, "_src", null, function () {
                setTimeout(function () {
                    $('.page-box').show();
                    page1.addClass('show');
                }, 1000);
            });
        });
    });
});
//音乐
var _music = $(".music").on("tap", function () {
    if (audio != "") {
        if (audio.paused) {
            audio.play();
            _music.removeClass("audio_off").addClass("audio_on");
        }
        else {
            audio.pause();
            _music.removeClass("audio_on").addClass("audio_off");
        }
    }
    else {
        return;
    }
});
var page1 = $('.page1');
page2 = $(".page2"),
    page3 = $(".page3"),
    page4 = $(".page4"),
    page5 = $(".page5"),
    page6 = $(".page6");

page1.on('swipeUp', function () {
    nextpage.call(this, null, function () {
        page2.show()
    })
});
page2.on('swipeUp', function () {
    nextpage.call(this, null, function () {
        page3.show()
    })
}).on("swipeDown", function () {
    prevpage.call(this, null, function () {
        page1.show()
    });
});
page3.on("swipeUp", function () {
    nextpage.call(this, null, function () {
        page4.show()
        $(".page4_Skill").autotype();
    });
}).on("swipeDown", function () {
    prevpage.call(this, null, function () {
        page2.show();
    });
});
page4.on("swipeUp", function () {
    nextpage.call(this, null, function () {
        page5.show();
    });
}).on("swipeDown", function () {
    prevpage.call(this, null, function () {
        page3.show()
    });
});
page5.on("swipeUp", function () {
    nextpage.call(this, null, function () {
        page6.show();
    });
}).on("swipeDown", function () {
    prevpage.call(this, null, function () {
        page4.show()
        //$(".page4_Skill").autotype();
    });
});
page6.on("swipeDown", function () {
    prevpage.call(this, null, function () {
        page5.show();
    });
});

//下一页
var pageMoving = false;
function nextpage(fnEnd, fnStart) {
    if (pageMoving) {
        return;
    }
    ;
    pageMoving = true;
    fnStart && fnStart.call(this);
    $(this).toY("-100%", 0.8, "ease", function () {
        $(this).removeClass('show')
        $(this).next().addClass('show')
        pageMoving = false;
        $.isFunction(fnEnd) && fnEnd.call(this);
    });
};
//上一页
function prevpage(fnEnd, fnStart) {
    var _this = this
    if (pageMoving) {
        return
    }
    ;
    pageMoving = true;
    fnStart && fnStart.call(this);
    $(this).prev().toY("0", 0.8, "ease", function () {
        $(_this).removeClass('show')
        $(_this).prev().addClass('show')
        pageMoving = false;
        $.isFunction(fnEnd) && fnEnd.call(this);
    });
};
//跳转
function jump(next) {
    switch (next) {
        case page1:
            page1.show();
            break;
        case page2:
            page2.show();
            break;
        case page3:
            page3.show();
            break;
        case page4:
            page4.show();
            break;
    }
}
$.fn.autotype = function () {
    clearTimeout(timer);
    timer = null;
    var timer = null;
    var _this = $(this);
    var str = _this.html();
// 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
    str = str.replace(/(\s){2,}/g, "$1");
    var index = 0;
    $(this).html('');
    var printer = function () {
        clearTimeout(timer);
        timer = null;
        var args = arguments;
        var current = str.slice(index, index + 1);
// html标签完整输出,如：<p>
        if (current == '<') {
            index = str.indexOf('>', index) + 1;
        }
        else {
            index++;
        }
        timer = setTimeout(args.callee, 20);
        //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
        if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
            _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
        } else {
            _this.html(str.substring(0, index));
            clearTimeout(timer);
        }
    };
    // 延迟1s开始
    var timer = setTimeout(printer, 1000);
};
var _p = $(".page5_Works").find("p");
/*touchstart:手指触摸屏幕上的时候触发
 touchmove:手指在屏幕上移动的时候触发
 touchend:手指从屏幕上拿起的时候触发
 touchcancel:系统取消touch事件的时候触发
 */
$(_p[0]).on("touchend", function () {
    window.location.href = "https://jiutianxiao.github.io/project/"
})




