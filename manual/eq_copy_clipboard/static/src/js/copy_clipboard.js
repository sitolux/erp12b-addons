odoo.define('eq_copy_clipboard.copy_clipboard', function (require) {
    "use strict";

    var ajax = require('web.ajax');
    var core = require('web.core');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    var _t = core._t;

    var InputField = require("web.basic_fields").InputField;
    var setClipboard = require("eq_copy_clipboard.set_clipboard");
    var field_registry = require('web.field_registry');

    var relational_fields = require('web.relational_fields');
    var FieldMany2One = relational_fields.FieldMany2One;

    var ListRenderer = require('web.ListRenderer');

    ListRenderer.include({
        init: function (parent, state, params) {
            this.sectionFieldName = "is_page";
            this._super.apply(this, arguments);
        },

        _renderBodyCell: function (record, node, index, options){
            var self = this;
            var $cell = this._super.apply(this, arguments);

            console.log($cell.hasClass("o_many2one_cell"));
            if($cell[0].innerText.trim().length > 0)
                if(!$cell.hasClass("o_many2one_cell") && $cell.find('input').length === 0){
                    $cell.append("&nbsp;&nbsp;<a href='#' class='eq_copy_clip_link'><span class='fa fa-clipboard copy_clip'/></a>");
                    $cell.find("a").click(function (event){
                    event.preventDefault();
                    event.stopPropagation();
                    const value = $cell[0].innerText;
                    setClipboard(value);
                    self.do_notify(_t("Copied to clipboard"));
                });
                }

            return $cell;
        },
    });

    FieldMany2One.include({
        init() {
            this._super.apply(this, arguments);
            this.nodeOptions.isCopyable = 'copyable' in this.attrs;
        },
        start() {
            this._super.apply(this, arguments);
        },
        _renderEdit: function () {
            this._super.apply(this, arguments);
            if (this.nodeOptions.isCopyable) {
                this.$el.append('<a class="btn btn-default copy-to-clipboard" href="#"><i class="fa fa-copy"/></a>');
            }
        },
        _render: function (){
            var self = this;
            this._super.apply(this, arguments);
            if($(this.el).prop('nodeName') === 'A' && this.mode==='readonly'){
                var url = $(this.$el[0]);
                $(this.$el[0]).append("&nbsp;&nbsp;<a href='#' class='eq_copy_clip_link'><span class='fa fa-clipboard copy_clip'/> </a>");
                $(this.$el[0]).find("a").click(function (event){
                    event.preventDefault();
                    event.stopPropagation();
                    const value = url[0].innerText;
                    setClipboard(value);
                    self.do_notify(_t("Copied to clipboard"));
                });
            }
        }
    });

    InputField.include({
        init() {
            this._super.apply(this, arguments);
            this.nodeOptions.isCopyable = 'copyable' in this.attrs;
        },
        start() {
            this._super.apply(this, arguments);
            var self = this;

            if(($(this.el).prop('nodeName') !== 'A') && !this.nodeOptions.isPassword && this.mode==='readonly') {   // prevent links and passwords
                $(this.el).click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const value = $(this).text();
                    setClipboard(value);
                    self.do_notify(_t("Copied to clipboard"));
                });
            }

        },
        _renderEdit: function () {
            this._super.apply(this, arguments);
            if (this.nodeOptions.isCopyable) {
                this.$el.append('<a class="btn btn-default copy-to-clipboard" href="#"><i class="fa fa-copy"/></a>');
            }
        },
        _render: function (){
            var self = this;
            this._super.apply(this, arguments);
            if($(this.el).prop('nodeName') === 'A' && this.mode==='readonly'){
                var url = $(this.$el[0]);
                $(this.$el[0]).append("&nbsp;&nbsp;<a href='#' class='eq_copy_clip_link'><span class='fa fa-clipboard copy_clip'/> </a>");
                $(this.$el[0]).find("a").click(function (event){
                event.preventDefault();
                event.stopPropagation();
                const value = url[0].innerText;
                setClipboard(value);
                self.do_notify(_t("Copied to clipboard"));
            });
            }
        }
    });
    const CopyableInput = InputField.extend({
        init() {
            this._super.apply(this, arguments);
            this.nodeOptions.isCopyable = true;
        },
    });
    field_registry.add("copyable", CopyableInput);
    return CopyableInput;
});
