/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.DownloadsView = Backbone.View.extend({
    events: {
        "submit": "submit"
    },
    submit: function (e) {
        e.preventDefault();

        console.log("here")

        if ($("#hash").val() && document.getElementById("version").files.length) {
            $.ajax({
                url: '/api/downloads/' + $("#hash").val(),
                type: "POST",
                data: new FormData(document.getElementById("newForm")),
                enctype: 'multipart/form-data',
                processData: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + window.sessionStorage.getItem("keyo"));
                },
                contentType: false
            }).done(function (data) {
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);
            }).fail(function (jqXHR, textStatus) {
                //alert(jqXHR.responseText);
                console.log(jqXHR)
                console.log(jqXHR.responseText)
                console.log(textStatus)
            });
        } else {
            failMsg($("body"), "Todos os campos são obrigatorios");
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