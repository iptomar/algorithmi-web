window.LoginView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #btnLogin": "attemptLogin",
        "click #btnRegist": "regist"
    },

    attemptLogin: function (e) {
        e.preventDefault();
        //Create Credentials
        var cre = $('#username').val() + ':' + btoa($("#password").val());   //Credentials = Username:Password
        window.sessionStorage.setItem("keyo", btoa(cre));

        //Check User Authenticity
        modem('GET', '/api/me',

            //Response Handler
            function (user) {
                console.log(user);
                window.sessionStorage.setItem("username", user.name);
                window.sessionStorage.setItem("image", user.image);
                sucssesMsg($("body"), "Bem-vindo, " + window.sessionStorage.getItem("username"));
                setTimeout(function () {
                    app.navigate('/home', {
                        trigger: true
                    });
                }, "Bem-vindo, " + window.sessionStorage.getItem("username").length);
                $("#txtUser").val(window.sessionStorage.getItem("username"));
            },
            //Error Handling
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                //Remove Session Key if login atempt failed
                window.sessionStorage.removeItem("keyo");
                failMsg($("body"), "Não foi possível efectuar login.");

            }
        );
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