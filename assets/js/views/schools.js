/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.SchoolsView = Backbone.View.extend({

    events: {
        "click #btnCreateSchool": "createSchool",
        "click #newSchool": "getInstitutions",
        "click .deleteSchool": "confirmDelete",
        "submit #newPopUpInstitution": "newInstitution",
    },

    //Preenche a dd das instituicoes
    getInstitutions: function (e) {
        populateInstitutionsDD();
    },

    createSchool: function (e) {
        e.preventDefault();
        // POST ("/api/schools")
        var schoolsDetails = $("#newSchoolForm").serializeObject();
        var schools = new School(schoolsDetails);

        schools.save(null, {
            success: function (inst, response) {

                $("#newSchoolModal").modal("hide");
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);
            },
            error: function (inst, response) {
                $("#newSchoolModal").modal("hide");
                failMsg($(".form"), response.text);
            },
        })
    },

    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var school = new School({id: id});
        school.destroy({
            success: function (scchool, response) {
                sucssesMsg($(".form"), "Escola apagada com sucesso.");
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);

            }, error: function (inst, response) {
                $("#newInstitutionModal").modal("hide");
                failMsg($(".form"), "Não foi possível apagar a escola.");
            }
        })
    },
    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', '/api/school/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpSchool").serializeObject()))
        );

    },


    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($("#someParent"));
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