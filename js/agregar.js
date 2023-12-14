
const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'http://localhost:5000/juegos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            genero: "",
            anio: "",
            consola: "",
            imagen: "",
            consolas: [],
            urlc: 'http://localhost:5000/consolas',
            nombrec: null,
            urlg: 'http://localhost:5000/generos',
            nombreg: null,
            generos: [],
            esconderg: false,
            esconderc: false,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.genero = data.genero;
                    this.anio = data.anio;
                    this.consola = data.consola;
                    this.imagen = data.imagen;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        fetchDatac(urlc) {
            fetch(urlc)
                .then(response => response.json())
                .then(datac => {
                    this.consolas = datac;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        fetchDatag(urlg) {
            fetch(urlg)
                .then(response => response.json())
                .then(datag => {
                    this.generos = datag;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        grabar() {
            let juego = {
                nombre: this.nombre,
                anio: this.anio,
                genero: this.genero,
                consola: this.consola,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(juego),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }


            fetch(this.url, options)
                .then(function () {
                    alert("Juego agregado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Agregar")
                })
        },

        grabarg() {
            let genero = {
                nombreg: this.nombreg,
            }
            var options = {
                body: JSON.stringify(genero),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.urlg, options)
                .then(function () {
                    alert("Genero agregado");
                },
                    this.generos.push({ nombreg: this.nombreg, id: (this.generos.length + 1) })
                )
                .catch(err => {
                    console.error(err);
                    alert("Error al Agregar")
                },
                    this.generos.pop())

        },
        grabarc() {
            let consola = {
                nombrec: this.nombrec,
            }
            var options = {
                body: JSON.stringify(consola),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.urlc, options)
                .then(function () {
                    alert("Consola agregada");
                },
                    this.consolas.push({ nombrec: this.nombrec, id: (this.consolas.length + 1) })
                )
                .catch(err => {
                    console.error(err);
                    alert("Error al agregar consola")
                },
                    this.consolas.pop())

        },
    },
    created() {
        this.fetchData(this.url),
            this.fetchDatac(this.urlc),
            this.fetchDatag(this.urlg)
    },

}).mount('#app')
