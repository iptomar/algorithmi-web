window.QuestionsEditView = Backbone.View.extend({
    events: {
        "click #btnAddCode": "addCode"
    },


    addCode: function (e) {
        e.preventDefault();

        console.log("adding code")


        $.ajax({
            url: '/api/questions/' + this.data.id + '/' + $("#ddLanguagesList").val() + '/code',
            type: "POST",
            data: new FormData(document.getElementById("addCodeForm")),
            enctype: 'multipart/form-data',
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + window.sessionStorage.getItem("keyo"));
            },
            contentType: false
        }).done(function (data) {
            var json = JSON.parse(data);
            sucssesMsg($("form"), json.text);
            setTimeout(function () {
                document.location.reload(true);
            }, json.text.length * 45);
        }).fail(function (xhr, ajaxOptions, thrownError) {

            var json = JSON.parse(xhr.responseText);
            failMsg($("body"), json.text);

        });
    },

    initialize: function () {
        this.data = this.model.toJSON();
        populateCategoriesDD(this.data.category);
        populateLanguagessDD();
        $("#ddLanguagesList option").each(function () {
            console.log($(this))
        });
        $("#ddDificuldade > #" + this.data.difficulty).attr("selected", true)

    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({model: self.data}));
        return this;
    }
});
