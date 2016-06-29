window.InstitutionsView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #newInstBtn": "newInst",
        "click #btnCreateInst": "createInstitution",
        "click #editInstitution": "editInstitution",
        "click #deletebtn": "deleteInstitution",
        "click .deleteInstitution": "confirmDelete",
    },

    //Limpa o formulario
    newInst: function (e) {
        $("#newInstitutionForm")[0].reset();
        $("#base64textarea").val("");
        $("#imagePrev").attr("src", '');
        $("#txtId").val("");
        //Abre o panel
        $("#newInsitutionDiv").removeClass('in')

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

        var institutionDetails = $("#newInstitutionForm").serializeObject();
        var institution = new Institution(institutionDetails);
        if (institutionDetails.id == "") {
            institution.unset('id')
        }
        $('#newInstitutionForm').prepend(loadingSpinner());
        institution.save(null, {
            //Se conseguir
            success: function (inst, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
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

    //ao clicar no botao de edicao, recolhe e coloca os dados do curso nos inputs
    editInstitution: function (e) {
        //Espera que a dd das instituicoes esteja carregada
        var self = this;
        //Abre o panel
        $("#newInsitutionDiv").removeClass('in')

        //Changes new button to edit button
        $("#btnCreateInst").html("Guardar alterações");
        //Gets data
        var inst = self.collection.getByID($(e.currentTarget).attr("value"));
        // Puts course data into inputs
        getDataUri("../images/" + inst.image, function (dataUri) {
            $("#txtId").val(inst.id);
            $("#txtNome").val(inst.name);
            $("#txtAddress").val(inst.address);
            $("#base64textarea").val(dataUri);
            $("#imagePrev").attr("src", "../images/" + inst.image);
        });


    },


    //Solicita confirmação para apagar
    confirmDelete: function (e) {

        var id = $(e.currentTarget).attr("id");
        var title = $(e.currentTarget).attr("name");

        var modal = delModal("Apagar instituição",
            "Tem a certeza que pretende eliminar a instituição <label>" + title + " </label> ?",
            "deletebtn", id);


        $('.form').append(modal);
        $('#modalConfirmDel').modal("show");
    },

    //Remove instituicao
    deleteInstitution: function (e) {
        e.preventDefault();
        $('#modalConfirmDel').modal("hide");
        var id = $(e.currentTarget).attr("value");
        var institution = new Institution({id: id});
        institution.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);

            }, error: function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);

            }
        })
    },

    initialize: function () {
        this.data = this.collection.toJSON();
        console.log(this.data)
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({collection: self.data}));
        return this;
    }
});
