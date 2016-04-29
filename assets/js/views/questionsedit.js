window.QuestionsEditView = Backbone.View.extend({
    events: {},
    initialize: function (id) {
        var self = this;
        self.questionID = id;
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template());
        modem('GET', '/api/question/' + this.id,
            function (questionData) {
                console.log(questionData);
                $("#txtTitulo").val(questionData.titulo);
                $("#txtDescricao").val(questionData.descricao);
                $("#imagePrev").attr('src', questionData.imagem);
                //   $('#ddCategoria option:eq(' + questionData.categoria + ')');
                $("#ddCategoria > option").eq(questionData.categoria).attr('selected', 'selected');
                $("#ddDificuldade > option").eq(questionData.dificuldade).attr('selected', 'selected');
            },
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
        return this;
    }
});
