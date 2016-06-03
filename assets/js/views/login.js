window.LoginView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #btnLogin": "attemptLogin",
        "blur #txtUsername, #txtEmail": "isUserNameAvailable",
        "click #btnRegist": "regist"
    },
    //checks if email is available
    isUserNameAvailable: function (e) {

        console.log()
        modem('POST', '/isUserValid',
            //Response Handler
            function (valid) {
                if (!valid) {
                    $(e.target).addClass("emptyField");
                } else {
                    $(e.target).removeClass("emptyField");
                }
            },
            //Error Handling
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                failMsg($("body"), json.text);
            },
            e.target.value
        );
    },
    attemptLogin: function (e) {
        e.preventDefault();
        //Create Credentials
        var cre = $('#username').val() + ':' + btoa($("#password").val());   //Credentials = Username:Password
        window.sessionStorage.setItem("keyo", btoa(cre));

        //Attempts login
        var me = new User();
        me.login();
    },
    //Exibe o cropper
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper("#content > div", image, 300, 1);
        }
        reader.readAsDataURL(file);
    },

    //Regista o novo aluno
    regist: function (e) {
        e.preventDefault();
        var userDetails = $("#newUserForm").serializeObject();
        userDetails.password = btoa(userDetails.password);
        var user = new User(userDetails);
        user.save(null, {
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
            },
            error: function (inst, response) {
                $("#newInstitutionModal").modal("hide");
                failMsg($(".form"), response.text);
            },
        })
    },

    initialize: function () {

    },

    render: function () {
        $(this.el).html(this.template());
        populateInstitutionsDD();
        return this;
    }
});