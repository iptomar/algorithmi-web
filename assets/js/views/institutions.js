/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.InstitutionsView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",
        "click #newInstitution": "newInstitutionPopup",
        "click #editInstitution": "editInstitutionPopup",
        "click #deleteInstitution": "deleteInstitutionPopup",
        "submit #newPopUpInstitution": "newInstitution",
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', '/api/institution/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpInstitution").serializeObject()))
        );

    },
    
    newInstitutionPopup: function (e) {
        e.preventDefault();

        $("#newInstitutionModal").modal('show');

    },

    editInstitutionPopup: function (e) {
        e.preventDefault();

        $("#editInstitutionModal").modal('show');

    },

    deleteInstitutionPopup: function (e) {
        e.preventDefault();

        $("#deleteInstitutionModal").modal('show');

    },
    
    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($("#someParent"));
        }
    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());

        showLoginModal($("#someParent"));

        return this;
    },


    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
