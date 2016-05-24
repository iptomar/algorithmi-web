window.InstitutionsView = Backbone.View.extend({
    events: {
        "click #btnCreateInst": "createInstitution",
        "click .deleteInstitution": "confirmDelete",
        "submit #newPopUpInstitution": "newInstitution",
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
                    document.location.reload(true);
                }, 1000);
            },
            error: function (inst, response) {
                $("#newInstitutionModal").modal("hide");
                failMsg($(".form"), response.text);
            },
        })
    },

    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var institution = new Institution({id: id});
        institution.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);

            }, error: function (inst, response) {
                $("#newInstitutionModal").modal("hide");
                failMsg($(".form"), "Não foi possível apagar a instituição.");
            }
        })
    },
    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($(".form"));
        }
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
