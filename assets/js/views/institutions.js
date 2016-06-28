window.InstitutionsView = Backbone.View.extend({
    events: {
        "click #btnCreateInst": "createInstitution",
        "click #deletebtn": "deleteInstitution",
        "click .deleteInstitution": "confirmDelete",
    },


    createInstitution: function (e) {
        e.preventDefault();

        app.navigate('/institutions/new', {
            trigger: true
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
