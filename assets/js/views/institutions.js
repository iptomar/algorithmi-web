window.InstitutionsView = Backbone.View.extend({
    events: {
        "click #btnCreateInst": "createInstitution",
        "click .deleteInstitution": "confirmDelete",

    },


    createInstitution: function (e) {
        e.preventDefault();

        app.navigate('/institutions/new', {
            trigger: true
        });

    },
    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var institution = new Institution({id: id});
        institution.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);

            }, error: function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);

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
