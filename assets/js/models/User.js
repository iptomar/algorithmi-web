var User = Backbone.Model.extend({
    urlRoot: 'user',
    defaults: {
        course: 1
    },
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/me',
            function (json) {
                console.log("My data:")
                console.log(json)
                self.attributes = (json);
                self.attributes.logged = true;
                after_fetch();
            },
            //Precisamos enviar para a Tabela escolas o id do professor.
            function (xhr, ajaxOptions, thrownError) {
                console.log("ups")
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
    },
    login: function () {
        var self = this;
        //Check User Authenticity
        modem('GET', '/api/me',
            //Response Handler
            function (user) {
                console.log(user);
                window.sessionStorage.setItem("username", user.name);
                window.sessionStorage.setItem("image", user.image);
                sucssesMsg($("body"), "Bem-vindo, " + window.sessionStorage.getItem("username"));
                setTimeout(function () {
                    app.navigate('/home', {
                        trigger: true
                    });
                }, "Bem-vindo, " + window.sessionStorage.getItem("username").length);
                $("#txtUser").val(window.sessionStorage.getItem("username"));
            },
            //Error Handling
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                //Remove Session Key if login atempt failed
                window.sessionStorage.removeItem("keyo");
                failMsg($("body"), json.text);
            }
        );
    },
    changeStatus: function () {
        var self = this;
        modem('POST', '/api/userStatus/' + this.id,
            function (response) {
                sucssesMsg($("body"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 2000);
            },
            //Precisamos enviar para a Tabela escolas o id do professor.
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                failMsg($("body"), json.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, json.text.length * 45);
            },
            "true"
        )
        ;
    }
});
