window.NavigationBarView = Backbone.View.extend({

    events: {
        "click #btnLogout": "logout",
        "click #btnConfirmUser": "confirmUser",
    },
    //Check Auth
    auth: function () {
        if (!window.sessionStorage.getItem("keyo")) {
            return false;
        }
        return true;
    },
    confirmUser: function (e) {
        console.log(e.target.value)
        var user = new User({id: e.target.value});
        user.changeStatus();

    },
    logout: function (e) {
        e.preventDefault();
        console.log("out");
        window.sessionStorage.removeItem("keyo");
        window.sessionStorage.removeItem("image");
        window.sessionStorage.removeItem("username");
        document.location.reload(true);
    },

    //Class Initializer
    initialize: function () {
        this.data = this.model.toJSON();
        console.log(this.data)
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({model: self.data}));
        return this;
    }

});
