window.StudentsView = Backbone.View.extend({
    events: {
        "mouseover .userPreview": "scaleUser",
        "click .deleteStudent": "confirmDelete",
    },

    scaleUser: function (e) {

        $(".userPreview").css("z-Index", 0);
        $(".userPreview").css("opacity", 0.8);
        $(e.currentTarget).css("z-Index", 100).css("opacity", 1);

    },
    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var student = new Student({id: id});
        student.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);

            }, error: function (inst, response) {
                $("#newInstitutionModal").modal("hide");
                failMsg($(".form"), "Não foi possível apagar o aluno.");
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
