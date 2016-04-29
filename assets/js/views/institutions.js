/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.InstitutionsView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",
        "click #newInstitution": "newInstitutionPopup",
        "submit #newPopUpInstitution": "newInstitution",
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'institution/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newInstitution").serializeObject()))
        );

    },


    newInstitution: function(){

        modem('POST', 'popupinstitution',
            function (json) {
                $("#newInstitutionModal").modal('hide');
            },
            function (xhr, ajaxOptions, thrownError) {
                //Mandar Uma Mensgame Qualquer
            },
            encodeURI(JSON.stringify($("#newPopUpInstitution").serializeObject()))
        );

    },

    newInstitutionPopup: function(e){
        e.preventDefault();

        $("#newInstitutionModal").modal('show');

    },



    checkAuth: function(){
        if(!sessionStorage.getItem('keyo')){
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
