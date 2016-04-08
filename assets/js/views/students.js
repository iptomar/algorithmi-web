window.StudentsView = Backbone.View.extend({
    events: {
        "mouseover .userPreview": "scaleUser",
    },
    initialize: function () {
    },
    scaleUser: function (e) {

        $(".userPreview").css("z-Index", 0);
        $(".userPreview").css("opacity", 0.8);
        $(e.currentTarget).css("z-Index", 100).css("opacity", 1);

    },
    render: function () {
        $(this.el).html(this.template());
        modem('GET', 'students',
            function (studentsData) {

                $.each(studentsData, function (i, student) {

                    var $userDiv = $("<div>", {
                        class: " col-md-4",
                        id: student._id,

                    }).append($("<div>", {
                            class: "userPreview divWidget",
                            id: student._id,
                        }).append($("<div>", {
                            class: " col-md-3",

                        }).append('<img src="' + student.imgB64 + '" alt="' + student.email + '">'))
                        .append('<div class="col-md-9"><lable class="lblName">' + student.name + '</lable></br><lable>' + student.email + '</lable></div>')
                    );

                    $("#studentsList").append($userDiv);
                })

            },
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
        return this;
    }
});
