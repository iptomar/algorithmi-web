window.TeachersView = Backbone.View.extend({
    events: {
        "click .deleteTeacher": "confirmDelete",
    },
    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var teacher = new Teacher({id: id});
        teacher.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);

            }, error: function (inst, response) {

                failMsg($(".form"), "Não foi possível apagar o professor.");
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
