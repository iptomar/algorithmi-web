/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.InstitutionsEditView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #btnCrop": "getFoto",
        "submit": "editInstitution"
    },
    //Convert Photo To Base64 String
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper(".form", image, 300, 16 / 9);
        }
        reader.readAsDataURL(file);
    },

    //Recorta a foto
    getFoto: function (e) {
        e.preventDefault();
        var canvas = $("#preview")[0];
        var dataUrl = canvas.toDataURL('image/jpeg');
        $("#base64textarea").val(dataUrl);
        $("#imagePrev").attr('src', dataUrl);
        console.log(dataUrl);
        $(".cropBG").remove();
    },

    editInstitution: function (e) {
        e.preventDefault();
        var id = parseInt($(e.currentTarget).attr("value"));


        var institutionDetails = $('#editInstitution').serializeObject();
        console.log(institutionDetails)
        var institution = new Institution({id: this.data.id});
        institution.save(institutionDetails, {
            success: function (user) {
                $("#newInstitutionModal").modal("hide");
                sucssesMsg($("#someParent"), "Instituição alterada com sucesso!");
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);
            }
        })

    },


    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($("#someParent"));
        }
    },


    initialize: function () {
        this.data = this.model.toJSON();
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({model: self.data}));
        return this;
    }
});
