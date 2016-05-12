/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.SchoolsView = Backbone.View.extend({

    events: {

        "submit": "beforeSend",
        "click #newSchool": "newSchoolPopup",
        "submit #newPopUpSchool": "newSchool",
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
    
    newSchoolPopup: function (e) {
        e.preventDefault();

        $("#newSchoolModal").modal('show');

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
        return this;
    }
});