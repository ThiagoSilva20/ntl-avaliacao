//https://css-tricks.com/snippets/jquery/serialize-form-to-json/
$.fn.serializeObject = function () {
    var objeto = {};
    var arrayData = this.serializeArray();
    $.each(arrayData, function () {
        if (objeto[this.name]) {
            if (!objeto[this.name].push) {
                objeto[this.name] = [objeto[this.name]];
            }
            objeto[this.name].push(this.value || '');
        } else {
            objeto[this.name] = this.value || '';
        }
    });
    return objeto;
};

const form = document.getElementById('form');
form.addEventListener("submit", async function (event) {

    event.preventDefault()
    event.stopPropagation()

    if (!form.checkValidity()) {
        form.classList.add('was-validated')
    } else {

        var data = $(this).serializeObject();

        const response = await fetch("/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok)
            alert("Dados salvo com sucesso.")
        else
            alert("Erro ao salvar os dados.")

        form.reset()
    }
});
