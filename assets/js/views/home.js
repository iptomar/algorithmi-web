/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.HomeView = Backbone.View.extend({
    events: {},

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());

        /*  // GET ("/api/students")
         var students = new Students({});
         students.fetch(
         function () {
         $.each(students.models, function (i, k) {
         console.log("Students")
         console.log(k.attributes)
         })
         }
         )
         */
        /*
         // GET ("/api/students/:id")
         var student = new Student({id: 3});
         student.fetch(function () {
         console.log(student.attributes)
         })*/


        /*
         // PUT ("/api/students/:id")
         var studentt = new Student({id: 3});
         student.fetch(function () {
         var sudentDetails = student.attributes;
         sudentDetails.user = "fafa";
         studentt.save(sudentDetails, {
         success: function (user) {
         console.log("Updated")
         }
         })

         });

         */


        // POST ("/api/students")
        var studentNew = new Student({});

        var sudentNewDetails = {
            name: "novo aluno",
            birthDate: "21/05/2016",
            email: "novoAluno@ipt.pt",
            type: 4,
            "image": "",
            password: "1234",
            username: "i'm new",
            properties: ""
        };

        studentNew.save(sudentNewDetails, {
            success: function (user) {
                var students = new Students({});
                students.fetch(
                    function () {
                        $.each(students.models, function (i, k) {
                            console.log("Students")
                            console.log(k.attributes)
                        })
                    }
                )
            }
        })



        return this;
    }
});