window.QuestionsView = Backbone.View.extend({

    events: {

        "submit": "beforeSend",
       
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'question/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newQuestion").serializeObject()))
        );

    },



    adicionarLinguagem: function (){
        var $html = $('<p>ola</p>');
        var str = $html.prop('outerHTML');
        console.log(str);
        $("#language").append($html);

    },





    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});