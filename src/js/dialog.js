/*
 * @description PC端弹窗组件
 * @author ZhangKaiqiang <zhangkaiqiang@58.com>
 * @version 1.0
 * @time 2016-12-10
 * @copyright © 58.com
 */
define([ /*"依赖模块1", "依赖模块2",...*/ ], function( /*var_dep1, var_dep2,...*/ ) {

    var DEFAULTS = {
        title: "提示", //标题
        message: "请输入提示信息！", //提示信息
        btns: [{
            id: "dialog-btn-cancel",
            text: "取消",
            event: function() {}
        }, {
            id: "dialog-btn-confirm",
            text: "确定",
            event: function() {}
        }],
        closeEvent: function() {}
    };
    /**
     * [Dialog 弹窗对象]
     * @param {[type]} options [description]
     */
    var Dialog = function(options) {
        this.options = $.extend({}, DEFAULTS, options);
        this.init();
    };
    /**
     * [prototype description]
     * @type {Object}
     */
    Dialog.prototype = {
        constructor: Dialog,
        /**
         * [init 初始化弹窗]
         * @return {[type]} [description]
         */
        init: function() {
            //生成新的弹窗前移出旧的弹窗
            $(".dialog").remove();
            this.render(this.options);
        },
        /**
         * [render 渲染弹窗]
         * @return {[type]} [description]
         */
        render: function() {
            $("body").append(this.getDom());
            this.addEvents();
        },
        /**
         * [addEvents 事件绑定]
         */
        addEvents: function() {
            var btn = "",
                self = this;
            for (var i = 0, l = this.options.btns.length; i < l; i++) {
                var Btn = this.options.btns[i];
                if (Btn) {
                    //使用闭包保存Btn变量
                    (function(Btn) {
                        $("#" + Btn['id']).bind("click", function() {
                            if ($(this).attr('disabled')) {
                                return;
                            }
                            $(this).addClass('disabled');
                            self.hide();
                            Btn.event.call(this);
                        })
                    })(Btn);
                }
            }
            $("#dialog-close").bind("click", function() {
                self.hide();
                //弹窗关闭后执行注册的关闭回调
                self.options.closeEvent();
            });
        },
        /**
         * [getDom 生成DOM结构]
         * @return {[String]} [html]
         */
        getDom: function() {
            var html = '<div class="dialog">' +
                '<div class="dialog-bg"></div>' +
                '<div class="dialog-content ' + this.options.type + '">' +
                '<div class="dialog-header">' +
                '<span class="dialog-title">' + (this.options.title ? this.options.title : '') + '</span>' +
                '<a href="javascript:;" class="dialog-close" id="dialog-close"></a>' +
                '</div>' +
                '<div class="dialog-main">' + this.options.message + '</div>' +
                '<div class="dialog-footer">' + this.getBtnDom() +
                '</div>' +
                '</div>' +
                '</div>';
            return html;
        },
        /**
         * [getBtnDom description]
         * @return {[type]} [description]
         */
        getBtnDom: function() {
            var btnsHtml = "";
            if (Object.prototype.toString.call(this.options.btns) !== '[object Array]') {
                return;
            }
            for (var i = 0, l = this.options.btns.length; i < l; i++) {
                btnsHtml += '<a href="javascript:void(0);" class="dialog-btn" id="' + this.options.btns[i].id + '">' + this.options.btns[i].text + '</a>';
            }
            return btnsHtml;
        },
        /**
         * [show 显示弹窗]
         * @return {[type]} [description]
         */
        show: function() {
            $(".dialog").show();
        },
        /**
         * [hide 隐藏弹窗]
         * @return {[type]} [description]
         */
        hide: function() {
            $(".dialog").remove();
        }
    };
    /**
     *  对外暴露的弹窗对象
     */
    return {
        /**
         * [alert description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         * Example:
         * alert({
         *        message: "", //提示信息
         *        title: "提示", //可传空
         *        btn:{
         *             id: "dialog-btn-confirm",
         *             text: "确定",
         *             event: function() {
         *                 console.log("确定");
         *             }
         *        },
         *        closeEvent: function() {}
         * })
         */
        alert: function(options) {
            new Dialog({
                title: options.tips,
                message: options.message,
                type: 'dialog-alert',
                btns: [
                    options.btn || {
                        id: "dialog-btn-confirm",
                        text: "确定",
                        event: function() {}
                    }
                ],
                closeEvent: options.closeEvent
            });
        },
        /**
         * [confirm description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         * Example:
         * confirm({
         *        message: "", //提示信息
         *        title: "提示", //可传空
         *        btns: [{
         *             id: "dialog-btn-cancel",
         *             text: "取消",
         *             event: function() {
         *                 console.log("取消");
         *             }
         *        }, {
         *             id: "dialog-btn-confirm",
         *             text: "确定",
         *             event: function() {
         *                 console.log("确定");
         *             }
         *        }],
         *        closeEvent: function() {}
         * })
         */
        confirm: function(options) {
            options.type = 'dialog-confirm';
            new Dialog(options);
        }
    };
});
