/**
 * Created by Fábio Cruz on 13/04/2016.
 */
window.StatisticsView = Backbone.View.extend({
    events: {},
    initialize: function() {
    },

    render: function() {
        $(this.el).html(this.template());
        return this;
    }
});
