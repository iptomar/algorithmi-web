window.ToolsView = Backbone.View.extend({
    events: {
        "click #btnCreateCateg": "createCategory",
        "click .deleteCategory": "deleteCategory",

        "click #btnCreateLanguage": "createLanguage",
        "click .deleteLanguage": "deleteLanguage",

    },

    createCategory: function (e) {
        e.preventDefault();
        // POST ("/api/categories")
        var categoryDetails = $("#newCategoryForm").serializeObject();
        console.log(categoryDetails)
        var category = new Category(categoryDetails);
        category.save(null, {
            success: function (inst, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, response.text.length * 50);

            },
            error: function (inst, response) {
                failMsg($(".form"), response.text);
            },
        })
    },

    deleteCategory: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var category = new Category({id: id});
        category.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);

            }, error: function (inst, response) {
                failMsg($(".form"), "Não foi possível apagar a categoria.");
            }
        })
    },
    createLanguage: function (e) {
        e.preventDefault();
        // POST ("/api/categories")
        var langDetails = $("#newLanguageForm").serializeObject();
        console.log(langDetails)
        var lang = new Language(langDetails);
        lang.save(null, {
            success: function (inst, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, response.text.length * 50);

            },
            error: function (inst, response) {
                failMsg($(".form"), response.text);
            },
        })
    },
    deleteLanguage: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var language = new Language({id: id});
        language.destroy({
            success: function (user, response) {
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);

            }, error: function (inst, response) {
                failMsg($(".form"), "Não foi possível apagar a linguagem.");
            }
        })
    },

    initialize: function () {
        this.categories = this.collection[0].toJSON();
        this.highlevellangs = this.collection[1].toJSON();

    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({categories: self.categories, highlevellangs: self.highlevellangs}));
        return this;
    }
});

