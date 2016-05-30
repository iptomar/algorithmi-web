window.InstitutionsNewView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #btnCreateInst": "createInstitution",
    },
    //Exibe o cropper
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper("#content > div", image, 300, 16 / 9);
        }
        reader.readAsDataURL(file);
    },

    createInstitution: function (e) {
        e.preventDefault();
        // POST ("/api/students")
        var institutionDetails = $("#newInstitutionForm").serializeObject();
        var institution = new Institution(institutionDetails);
        institution.save(null, {
            success: function (inst, response) {

                $("#newInstitutionModal").modal("hide");
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    app.navigate('/institutions', {
                        trigger: true
                    });
                }, response.text.length * 50);

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
        var self = this;
        $(this.el).html(this.template());
        return this;
    }
});
