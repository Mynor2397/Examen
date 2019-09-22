
var objDepartamentos = [
    { "ID": "1", "NAME": "GUATEMALA" },
    { "ID": "2", "NAME": "SACATEP\u00c9QUEZ" },
    { "ID": "3", "NAME": "CHIMALTENANGO" },
    { "ID": "4", "NAME": "EL PROGRESO" },
    { "ID": "5", "NAME": "ESCUINTLA" },
    { "ID": "6", "NAME": "SANTA ROSA" },
    { "ID": "7", "NAME": "SOLOL\u00c1" },
    { "ID": "8", "NAME": "TOTONICAP\u00c1N" },
    { "ID": "9", "NAME": "QUETZALTENANGO" },
    { "ID": "10", "NAME": "SUCHITEP\u00c9QUEZ" },
    { "ID": "11", "NAME": "RETALHULEU" },
    { "ID": "12", "NAME": "SAN MARCOS" },
    { "ID": "13", "NAME": "HUEHUETENANGO" },
    { "ID": "14", "NAME": "QUICH\u00c9" },
    { "ID": "15", "NAME": "BAJA VERAPAZ" },
    { "ID": "16", "NAME": "ALTA VERAPAZ" },
    { "ID": "17", "NAME": "PET\u00c9N" },
    { "ID": "18", "NAME": "IZABAL" },
    { "ID": "19", "NAME": "ZACAPA" },
    { "ID": "20", "NAME": "CHIQUIMULA" },
    { "ID": "21", "NAME": "JALAPA" },
    { "ID": "22", "NAME": "JUTIAPA" },
];



var _DEP = $("#departamento").val();
var _MUN = $("#municipio").val();
let template;

dept = JSON.stringify(objDepartamentos)
municipios = JSON.parse(dept)

municipios.forEach(dep => {
    _DEP = dep.ID
    template += `<option class="success"value="${dep.ID}">${dep.ID}</option>`
});

$('#departamento').html(template)


function Leer() {

    var eleccion = $('select[id=departamento]').val()
    $.get("https://censopoblacion.gt/indicadores/" + eleccion + "/999",
        function (data, status) {
            let hombre = 0
            let mujer = 0
            var datos = JSON.stringify(data)
            datos = JSON.parse(datos)
            console.log(datos);
            let template;

            datos.forEach(element => {
                console.log(element.id);
                $('#depto_id').html(element.depto_id)
                $('#municipio_id').html(element.municipio_id)
                $('#nombre').html(element.nombre)
                $('#pob_total').html(element.pob_total)
                $('#alfabetismo').html(element.alfabetismo)
                $('#total_hogares').html(element.total_hogares)

                hombre = element.porc_sexo_hombre
                mujer = element.porc_sexo_mujeres

                Grafica(hombre, mujer)
            });
        }
    );

    console.log(hombre, mujer);
    var ph = parseInt(hombre)
    var pm = parseInt(mujer)
    console.log(ph, pm);

    function Grafica(hombre, mujer) {
        //segunda grafica
        var oilCanvas = document.getElementById("oilChart");

        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 18;

        var oilData = {
            labels: [
                "Porcentaje hombres",
                "Porcentaje mujeres"
            ],
            datasets: [
                {
                    data: [hombre, mujer],
                    backgroundColor: [
                        "#63FF84",
                        "#FF6384"
                    ]
                }]
        };

        var pieChart = new Chart(oilCanvas, {
            type: 'pie',
            data: oilData
        });
    }
}


