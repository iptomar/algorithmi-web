Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();
    this.undelegateEvents();
};

Backbone.ajax = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    args[0].beforeSend = function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa("teste:teste12345"));
    };

    return Backbone.$.ajax.apply(Backbone.$, args);
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
        "students": "students",
        "students/new": "studentsNew",
        "students/:id": "studentsInfo",
        "schools": "schools",
        "questions": "questions",
        "courses": "courses",
        "tests": "tests",
        "home": "home",
        "submissions": "submissions",
        "submissions/:id": "submissionsInfo",


        "institutions": "institutions",

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


    home: function () {

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
                var schools = new Schools();

                schools.fetch(function () {
                    var v = new SchoolsView({
                        collection: schools
                    });
                    self.showView(v, $('#content'));
                })
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


    questions: function () {
        var self = this;
        templateLoader.load(["QuestionsView"],
            function () {
                var v = new QuestionsView({});
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


    institutions: function () {
        var self = this;
        templateLoader.load(["InstitutionsView"],
            function () {
                var ss = new Institutions();
                ss.fetch(function () {
                    var v = new InstitutionsView({
                        collection: ss
                    });
                    self.showView(v, $('#content'));
                })

            }
        );
    },
    institutionsEdit: function (id) {
        var self = this;
        templateLoader.load(["InstitutionsEditView"],
            function () {
                var ss = new Institution({id: id});
                ss.fetch(function () {
                    var v = new InstitutionsEditView({
                        model: ss
                    });
                    self.showView(v, $('#content'));
                })

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
