const { createApp } = Vue
createApp({
    data() {
        return {
            juegos: [],
            //url:'http://localhost:5000/productos', 
            // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'http://localhost:5000/juegos',   // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            genero: 0,
            anio: "",
            consola: 0,
            imagen: "",
            login:false,
        }
    },
    mounted() {
        if (sessionStorage.login == "true") {
            this.login = true;
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.juegos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
     
    },
    created() {
        this.fetchData(this.url)
    },
}
).mount('#app')

