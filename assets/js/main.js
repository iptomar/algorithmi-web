Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();
    this.undelegateEvents();
};

Backbone.ajax = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    args[0].beforeSend = function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic ' + window.sessionStorage.getItem("keyo"));
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
        //--------------------TEACHERS
        "teachers": "teachers",
        "teachers/new": "teachersNew",


        //--------------------STUDENTS
        "students": "students",
        "students/new": "studentsNew",
        "students/:id": "studentsInfo",
        "schools": "schools",


        "questions": "questions",
        "questions/new": "questionsNew",


        "courses": "courses",
        "courses/:id/edit": "coursesEdit",

        "tools": "tools",

        "tests": "tests",
        "home": "home",
        "submissions": "submissions",
        "submissions/:id": "submissionsInfo",


        "institutions": "institutions",
        "institutions/new": "institutionsNew",
        "institutions/:id/edit": "institutionsEdit",

        "statistics": "statistics",

        "login": "login",
        "": "index"
    },

    //Load NavigationBar
    navbar: function () {
        var self = this;

        //Load NavigationBar
        templateLoader.load(["NavigationBarView"],
            function () {
                var ss = new User();
                ss.fetch(function () {
                    var v = new NavigationBarView({
                        model: ss
                    });
                    self.showView(v, $('#header'));
                })
            }
        );
    },

    //Verica se o utilizador esta loggado
    isLogged: function () {
        var self = this;
        $('#content').html(self.loadingSpinner());
        if (!sessionStorage.getItem('keyo')) {
            app.navigate('/home', {
                trigger: true
            });
            return;
        } else {
            self.navbar();
        }
    },


    index: function () {

        var self = this;
        self.isLogged();
        templateLoader.load(["HomeView"],
            function () {
                var v = new HomeView({});
                self.showView(v, $('#content'));
            }
        );
    },


    home: function () {

        var self = this;
        self.isLogged();

        templateLoader.load(["HomeView"],
            function () {
                var v = new HomeView({});
                self.showView(v, $('#content'));
            }
        );
    },

    login: function () {
        var login = new LoginView();
        // $('#header').html("");

        //  $('#footer').html("");
        $('#content').html(login.render().el);
    },


    statistics: function () {
        var self = this;
        self.isLogged();
        templateLoader.load(["StatisticsView"],
            function () {
                var v = new StatisticsView({});
                self.showView(v, $('#content'));
            }
        );
    },


    students: function () {
        var self = this;
        self.isLogged();
        templateLoader.load(["StudentsView"],
            function () {
                var ss = new Students();
                ss.fetch(function () {
                    var v = new StudentsView({
                        collection: ss
                    });
                    self.showView(v, $('#content'));
                })
            }
        );
    },
    studentsNew: function () {
        var self = this;
        self.isLogged();
        templateLoader.load(["StudentsNewView"],
            function () {
                var v = new StudentsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },
    studentsInfo: function (id) {
        var self = this;
        self.isLogged();
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
        self.isLogged();
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

    tools: function () {
        var self = this;
        self.isLogged();
        templateLoader.load(["ToolsView"],
            function () {
                var categories = new Categories();
                var languages = new Languages();
                categories.fetch(function () {
                    languages.fetch(function () {
                        var v = new ToolsView({
                            collection: [categories, languages]
                        });
                        self.showView(v, $('#content'));
                    })
                })
            }
        );
    },


    teachers: function () {
        var self = this;
        self.isLogged();
        templateLoader.load(["TeachersView"],
            function () {
                var ss = new Teachers();
                ss.fetch(function () {
                    var v = new TeachersView({
                        collection: ss
                    });
                    self.showView(v, $('#content'));
                })
            }
        );
    },

    teachersNew: function () {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["TeachersNewView"],
            function () {
                var v = new TeachersNewView({});
                self.showView(v, $('#content'));
            }
        );
    },

    questions: function () {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["QuestionsView"],
            function () {
                var ss = new Questions();
                ss.fetch(function () {
                    var v = new QuestionsView({
                        collection: ss
                    });
                    self.showView(v, $('#content'));
                })
            }
        );
    },
    questionsNew: function () {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["QuestionsNewView"],
            function () {
                var v = new QuestionsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },

    courses: function (id) {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["CoursesView"],
            function () {
                var ss = new Courses();
                ss.fetch(function () {
                    var v = new CoursesView({
                        collection: ss
                    });
                    self.showView(v, $('#content'));
                })
            }
        );
    },
    coursesEdit: function (id) {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["CoursesEditView"],
            function () {
                var ss = new Course({id: id});
                ss.fetch(function () {
                    var v = new CoursesEditView({
                        model: ss
                    });
                    self.showView(v, $('#content'));
                })
            }
        );
    },

    institutions: function () {
        var self = this;
        self.isLogged();
        self.navbar();
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
    institutionsNew: function () {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["InstitutionsNewView"],
            function () {
                var v = new InstitutionsNewView({});
                self.showView(v, $('#content'));
            }
        );
    },
    institutionsEdit: function (id) {
        var self = this;
        self.isLogged();
        self.navbar();
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
        self.isLogged();
        self.navbar();
        templateLoader.load(["TestsView"],
            function () {
                var v = new TestsView({});
                self.showView(v, $('#content'));
            }
        );
    },


    submissions: function () {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["SubmissionsView"],
            function () {
                var v = new SubmissionsView({});
                self.showView(v, $('#content'));
            }
        );
    },

    submissionsInfo: function (id) {
        var self = this;
        self.isLogged();
        self.navbar();
        templateLoader.load(["SubmissionsInfoView"],
            function () {
                var v = new SubmissionsInfoView({});
                self.showView(v, $('#content'));
            }
        );
    },

    //http://cssload.net/en/spinners
    loadingSpinner: function () {
        return $('<div>', {class: "cssload-container"}).append(
            $('<div>', {class: "cssload-whirlpool"}),
            $('<p>', {text: "A carregar..."})
        )
    }

});


templateLoader.load(["LoginView"],
    function () {
        app = new Router();
        Backbone.history.start();
    }
);
