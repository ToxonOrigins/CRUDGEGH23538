const { createApp } = Vue
createApp({
    data() {
        return {
            juegos: [],
            url: 'http://gehg235.pythonanywhere.com/juegos',  
            error: false,
            cargando: true,
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
                .then(res => res.text()) 
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload();
                })
        },
    
    },
    created() {
        this.fetchData(this.url)
    },
}
).mount('#app')

