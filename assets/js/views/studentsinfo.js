window.StudentsInfoView = Backbone.View.extend({
    events: {},
    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        modem('GET', 'user/' + "32",
            //Response Handler
            function (json) {
                console.log(json);
            },
            //Error Handling
            function (xhr, ajaxOptions, thrownError) {
                console.log("ups");
            },
            $("#frmEditDetails").serialize() + "&email=" + encodeURIComponent($("#inputEmail").val())
        );
        return this;
    }
});
