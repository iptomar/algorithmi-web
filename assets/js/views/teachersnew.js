/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.TeachersNewView = Backbone.View.extend({
    events: {},
    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});