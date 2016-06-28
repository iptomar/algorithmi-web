/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesView = Backbone.View.extend({

    events: {
        "change #filePicker": "convertPhoto",
        "click #btnCrop": "getFoto",
        "click #btnSubmitCourse": "submitCourse",
        "click #btnCancelSubmit": "cancelSubmit",
        "click #editCourse": "editCourse",
        "click .deleteCourse": "confirmDelete",
        "click #deletebtn": "delete",
        "submit #newPopUpCourse": "newCourse",
    },
    //Exibe o cropper
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper("#content > div", image, 150, 1);
        }
        reader.readAsDataURL(file);
    },

    //submete o formulario de criacao ou de edicao de um curso
    submitCourse: function (e) {
        e.preventDefault();
        // POST ("/api/courses")
        var coursesDetails = $("#courseForm").serializeObject();
        //Remove o id para ser um post
        var courses = new Course(coursesDetails);
        courses.unset('id')
        courses.save(null, {
            success: function (inst, response) {

                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);
            },
            error: function (inst, response) {
                failMsg($(".form"), response.text);
            },
        })
    },

    //ao clicar no botao de edicao, recolhe e coloca os dados do curso nos inputs
    editCourse: function (e) {
        //Espera que a dd das instituicoes esteja carregada
        var self = this;

        console.log($("#ddSchoolsList").length)
        console.log($(e.currentTarget).attr("value"));
        //Changes new button to edit button
        $("#btnSubmitCourse").html("Guardar alterações");
        //Gets data
        var course = self.collection.getByID($(e.currentTarget).attr("value"));
        // Puts course data into inputs
        getDataUri("../images/" + course.image, function (dataUri) {
            $("#txtId").val(course.id);
            $("#txtNome").val(course.name);
            $("#ddInstitutionsList").val(course.institution).change();
            $("#ddSchoolsList").val(course.school);
            $("#base64textarea").val(dataUri);
            $("#imagePrev").attr("src", "../images/" + course.image);
        });


    },

    //esconte o fomulario de insercao/edicao
    cancelSubmit: function () {
        //Limpa todos os inputs
        $(':input', '#courseForm')
            .not(':button, :submit, :reset')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
        //Limpa a imagem
        $("#imagePrev").attr("src", '');
    }
    ,
//Exibe uma caixa de confirmacao de delete
    confirmDelete: function (e) {
        var id = $(e.currentTarget).attr("id");
        var nome = $(e.currentTarget).attr("value");

        var modal = delModal("Apagar curso",
            "Tem a certeza que pretende eliminar p curso <label>" + nome + " </label> ?",
            "deletebtn", id);

        $('#divCourses').append(modal);
        $('#modalConfirmDel').modal("show");
    }
    ,
//apos confirmado, apaga o curso
    delete: function (e) {
        e.preventDefault();
        $('#modalConfirmDel').modal("hide");
        var id = $(e.currentTarget).attr("value");

        var course = new Course({id: id});
        course.destroy({
            success: function (scchool, response) {
                sucssesMsg($("body"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);

            }, error: function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);

            }
        })
    }
    ,

    initialize: function () {
        this.data = this.collection.toJSON();
        populateInstitutionsDD();
    }
    ,

    render: function () {
        var self = this;
        $(this.el).html(this.template({collection: self.data}));
        console.log(self.data)

        return this;
    }
})
;
