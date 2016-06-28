/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.HomeView = Backbone.View.extend({
    events: {
        "submit": "submit"
    },
    submit: function (e) {
        e.preventDefault();

        console.log("here")
        console.log(new FormData(document.getElementById("newForm")))

        $.ajax({
            url: '/upload',
            type: "POST",
            data: new FormData(document.getElementById("newForm")),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false
        }).done(function (data) {
            console.log(data)
        }).fail(function (jqXHR, textStatus) {
            //alert(jqXHR.responseText);
            console.log(jqXHR)
            console.log(jqXHR.responseText)
            console.log(textStatus)
        });
    },
    initialize: function () {
    },

    render: function () {


        $(this.el).html(this.template());
        return this;
    }
});