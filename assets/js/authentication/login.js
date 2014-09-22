/**
 * Created by Boo on 16-Sep-14.
 */


var login = {
    login_form:  $('#login-form'),
    login_btn:  $('#login-btn'),
    userid: $('#userid'),
    password: $('#password'),
    init: function() {
        login.login_btn.click(function(e) {
            //e.preventDefault();
            //login.login_click();
        });
        login.login_form.validate({
            rules : {
                userid : {
                    minlength: 6 ,
                    required: true
                },
                password : {
                    minlength: 6 ,
                    required: true
                }
            },
            showErrors: function(errorMap, errorList) {
                $.each(this.successList, function(index, value) {
                    return $(value).popover("hide");
                });
                return $.each(errorList, function(index, value) {
                    var _popover;
                    _popover = $(value.element).popover({
                        trigger: "manual",
                        placement: "right",
                        content: value.message,
                        template: "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>"
                    });
                    // Bootstrap 3.x :
                    _popover.data("bs.popover").options.content = value.message;
                    // Bootstrap 2.x :
                    //_popover.data("popover").options.content = value.message;
                    return $(value.element).popover("show");
                });
            }
        });

    },
    login_click: function() {
        if (login.login_form.valid()) {
            $.ajax({
                url: '/login',
                type: 'post',
                dataType: 'json',
                data: {
                    userid: login.userid.val(),
                    password: login.password.val(),
                    XX: 'xx'
                },
                success: function (data) {
                    alert(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert('error');
                    //alert(xhr.status);
                    //alert(thrownError);
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.error);
                }
            });
        }
    }

};

$(document).ready(function() {
    login.init();
});