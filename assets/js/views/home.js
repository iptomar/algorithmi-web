/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.HomeView = Backbone.View.extend({
    events: {},

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        var usersType = new UserTypes();
        usersType.fetch(
            function () {
                console.log("Users types")
                console.log(usersType.models)
            }
        )

        return this;
    }
});