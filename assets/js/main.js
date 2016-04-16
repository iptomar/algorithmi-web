Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();
    this.undelegateEvents();
};

var Router = Backbone.Router.extend({
    currentView: undefined,
    showView: function (view, elem, sub) {
        elem.show();

        if (sub == false) {
            if (this.currentView)
                this.currentView.close();

            this.currentView = view;
            this.currentView.delegateEvents();
        }
        var rendered = view.render();
        elem.html(rendered.el);
    },
    routes: {
        "teachers": "teachers",
        "teachers/new": "teachersNew",
        "teachers/:id": "teachersInfo",

        "students": "students",
        "students/new": "studentsNew",
        "students/:id": "studentsInfo",

        "schools": "schools",
        "schools/new": "schoolsNew",
        "schools/:id": "schoolsInfo",

        "questions": "questions",
        "questions/new": "questionsNew",
        "questions/:id/edit": "questionsEdit",

        "courses": "courses",
        "courses/new": "coursesNew",
        "courses/:id/edit": "coursesEdit",

        "tests": "tests",
        "tests/new": "testsNew",
        "tests/:id": "testsInfo",

        "submissions": "submissions",
        "submissions/:id": "submissionsInfo",

        "institutions": "institutions",
        "institutions/new": "institutionsNew",
        "institutions/:id/edit": "institutionsEdit",

        "statistics": "statistics",

        "login": "login",
        "": "index"
    },

    index: function () {

        var self = this;

        templateLoader.load(["HomeView"],
            function () {
                var v = new HomeView({});
                self.showView(v, $('#content'));
            }
        );
    },
    login: function () {
        var login = new LoginView();
        $('#header').html("");
        $('#footer').html("");
        $('#content').html(login.render().el);
    },



    statistics: function () {
        var self = this;

        templateLoader.load(["StatisticsView"],
            function () {
                var v = new StatisticsView({});
                self.showView(v, $('#content'));
            }
        );
    },

    students: function () {
        var self = this;

        templateLoader.load(["StudentsView"],
            function () {
                var v = new StudentsView({});
                self.showView(v, $('#content'));
            }
        );
    },
    studentsNew: function () {
        var self = this;

        templateLoader.load(["StudentsNewView"],
            function () {
                var v = new StudentsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },
    studentsInfo: function (id) {
        var self = this;

        templateLoader.load(["StudentsInfoView"],
            function () {

                var v = new StudentsInfoView({});
                self.showView(v, $('#content'));


                var v = new StudentsInfoView({});
                self.showView(v, $('#content'));


            }
        );
    },

    schools: function () {
        var self = this;

        templateLoader.load(["SchoolsView"],
            function () {
                var v = new SchoolsView({});
                self.showView(v, $('#content'));
            }
        );
    },
    schoolsNew: function () {
        var self = this;

        templateLoader.load(["SchoolsNewView"],
            function () {
                var v = new SchoolsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },
    schoolsInfo: function (id) {
        var self = this;

        templateLoader.load(["SchoolsInfoView"],
            function () {
                var v = new SchoolsInfoView({});
                self.showView(v, $('#content'));
            }
        );
    },



    teachers: function () {
        var self = this;

        templateLoader.load(["TeachersView"],
            function () {
                var v = new TeachersView({});
                self.showView(v, $('#content'));
            }
        );
    },
    teachersNew: function () {
        var self = this;

        templateLoader.load(["TeachersNewView"],
            function () {
                var v = new TeachersNewView({});
                self.showView(v, $('#content'));
            }
        );
    },
    teachersInfo: function (id) {
        var self = this;

        templateLoader.load(["TeachersInfoView"],
            function () {
                var v = new TeachersInfoView({});
                self.showView(v, $('#content'));
            }
        );
    },


    questions: function (id) {
        var self = this;
        templateLoader.load(["QuestionsView"],
            function () {
                var v = new QuestionsView({});
                self.showView(v, $('#content'));
            }
        );
    },
    questionsNew: function () {
        var self = this;

        templateLoader.load(["QuestionsNewView"],
            function () {
                var v = new QuestionsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },

    questionsEdit: function (id) {
        var self = this;
        templateLoader.load(["QuestionsEditView"],
            function () {

                var v = new QuestionsEditView({
                    id: id
                });
                self.showView(v, $('#content'));

            }
        );
    },



    courses: function (id) {
        var self = this;
        templateLoader.load(["CoursesView"],
            function () {
                var v = new CoursesView({});
                self.showView(v, $('#content'));
            }
        );
    },
    coursesNew: function () {
        var self = this;

        templateLoader.load(["CoursesNewView"],
            function () {
                var v = new CoursesNewView({});
                self.showView(v, $('#content'));
            }
        );
    },

    coursesEdit: function (id) {
        var self = this;
        templateLoader.load(["CoursesEditView"],
            function () {

                var v = new CoursesEditView({
                    id: id
                });
                self.showView(v, $('#content'));

            }
        );
    },




    institutions: function (id) {
        var self = this;
        templateLoader.load(["InstitutionsView"],
            function () {
                var v = new InstitutionsView({});
                self.showView(v, $('#content'));
            }
        );
    },
    institutionsNew: function () {
        var self = this;

        templateLoader.load(["InstitutionsNewView"],
            function () {
                var v = new InstitutionsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },

    institutionsEdit: function (id) {
        var self = this;
        templateLoader.load(["InstitutionsEditView"],
            function () {

                var v = new InstitutionsEditView({
                    id: id
                });
                self.showView(v, $('#content'));

            }
        );
    },



    tests: function () {
        var self = this;

        templateLoader.load(["TestsView"],
            function () {
                var v = new TestsView({});
                self.showView(v, $('#content'));
            }
        );
    },
    testsNew: function () {
        var self = this;

        templateLoader.load(["TestsNewView"],
            function () {
                var v = new TestsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },
    testsInfo: function (id) {
        var self = this;

        templateLoader.load(["TestsInfoView"],
            function () {
                var v = new TestsInfoView({});
                self.showView(v, $('#content'));
            }
        );
    },

    submissions: function () {
        var self = this;

        templateLoader.load(["SubmissionsView"],
            function () {
                var v = new SubmissionsView({});
                self.showView(v, $('#content'));
            }
        );
    },
    submissionsInfo: function (id) {
        var self = this;

        templateLoader.load(["SubmissionsInfoView"],
            function () {
                var v = new SubmissionsInfoView({});
                self.showView(v, $('#content'));
            }
        );
    },
});


templateLoader.load(["LoginView"],
    function () {
        app = new Router();
        Backbone.history.start();
    }
);
