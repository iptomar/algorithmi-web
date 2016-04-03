/**
 * Created by Cris on 17/03/2016.
 */
//Aperfeiçoamente da funcao ":contains" do JQuery para case insensitive
//(http://stackoverflow.com/questions/187537/is-there-a-case-insensitive-jquery-contains-selector)
$.extend($.expr[':'], {
    'containsi': function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
                .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

//Valida o texto o input de entrada e de saída
//Ex: 3;6;9 OU casa; tres; sim
window.isIOvalide = function () {
    var email = new RegExp('^([a-zA-Z0-9 ]+\;?)+$');
    $("#txtEntrada").parent().parent().find('label').remove();
    if (!email.test($("#txtEntrada").val())) {
        $("#txtEntrada").parent().parent().append('<label>Entrada inválida. Ex: Casa;Rui;Sim</label>');
        return false;
    }
    $("#txtSaida").parent().parent().find('label').remove();
    if (!email.test($("#txtSaida").val())) {
        $("#txtSaida").parent().parent().append('<label>Saída inválida. Ex: 2;5;5</label>');
        return false;
    }
    return true;
};

//Verifica se o elemento passado por parametro está vazio
//Se estiver, apresenta uma mensagem
window.isEmpty = function (elem) {
    $(elem).removeClass("emptyField");
    $(elem).parent().removeClass("emptyField");
    if ($(elem).val() != null && $(elem).val().length != 0) {
        return false;
    } else {
        if ($(elem).prop('type') == "file") {
            $(elem).parent().addClass("emptyField");
        } else {
            $(elem).addClass("emptyField");
        }
        return true;
    }
};
window.convertImage = function (e) {
    var file = e.target.files[0];
    // Load the image
    var reader = new FileReader();
    reader.onload = function (readerEvent) {
        var image = new Image();
        image.onload = function () {
            //Image Resize
            var canvas = document.createElement('canvas');
            var MAX_WIDTH = 450;
            var MAX_HEIGHT = 350;
            var width = image.width;
            var height = image.height;
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            var dataUrl = canvas.toDataURL('image/jpeg');
            $("#base64textarea").val(dataUrl);
            $("#imagePrev").attr('src', dataUrl);

        }
        image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);
};
$(".nav a").on("click", function () {
    $(".nav").find(".active").removeClass("active");
    if (!$(this).parent().hasClass("dropdown")) {
        $(this).parent().addClass("active");
    }
});