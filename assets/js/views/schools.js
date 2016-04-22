/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.SchoolsView = Backbone.View.extend({
  
  events: {

    "submit": "beforeSend",

  },

  beforeSend: function (e) {
    e.preventDefault();

    modem('POST', 'school/new',
        function (json) {
        },
        function (xhr, ajaxOptions, thrownError) {
        },
        encodeURI(JSON.stringify($("#newSchool").serializeObject()))
    );

  },

  initialize: function () {
  },

  render: function () {
    $(this.el).html(this.template());
    return this;
  }
});