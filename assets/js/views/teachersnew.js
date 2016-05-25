window.TeachersNewView = Backbone.View.extend({
    events: {

        "click #buttonCancelar": "goBack",

        "change #filePicker": "convertPhoto",
        "click #btnCrop": "getFoto",

        "click #addTurma": "addTurma",
        "click .deleteClass ": "rmvTurmas",
    },

    //Volta para a página dos professores
    goBack: function (e) {
        e.preventDefault();
        window.history.back();
    },

    //Exibe o cropper
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper("#newteacherform", image, 300, 1);
        }
        reader.readAsDataURL(file);
    },

    //Recorta a foto
    getFoto: function (e) {
        e.preventDefault();
        var canvas = $("#preview")[0];
        var dataUrl = canvas.toDataURL('image/jpeg');
        $("#base64textarea").val(dataUrl);
        $("#iFoto").attr('src', dataUrl);
        $(".cropBG").remove();
        $(".profile-pic").removeClass("emptyField");
    },

    //Adiciona a escola e a turma ao objecto
    addTurma: function (e) {
        e.preventDefault();
    },

    //Desassocia todas as escolas e respectivas turmas
    rmvTurmas: function (e) {
        e.preventDefault();

    },


    //Verifica se o e-mail ainda não etstá registado
    isEmailAvail: function (ok) {

    },

    //Class Initializer
    initialize: function () {
        populateInstitutionsDD();
        populateSchoolsDD();
    }
    ,
    //Class Renderer
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
})
;
