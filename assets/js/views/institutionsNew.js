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

    //Tenta inserir a instituição
    createInstitution: function (e) {
        e.preventDefault();
        // POST ("/api/students")
        var institutionDetails = $("#newInstitutionForm").serializeObject();
        var institution = new Institution(institutionDetails);
        institution.save(null, {
            //Se conseguir
            success: function (inst, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    app.navigate('/institutions', {
                        trigger: true
                    });
                }, response.text.length * 50);

            },
            //se não conseguir
            error: function (institution, xhr) {
                var json = JSON.parse(xhr.responseText);
                failMsg($("body"), json.text);
                setTimeout(function () {
                    app.navigate('/institutions', {
                        trigger: true
                    });
                }, json.text.length * 45);
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
