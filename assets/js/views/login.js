window.LoginView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #btnLogin": "attemptLogin",
        "click #btnRegist": "regist"
    },

    attemptLogin: function (e) {
        e.preventDefault();

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
        var user = new Student(userDetails);
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