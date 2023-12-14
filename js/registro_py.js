const { createApp } = Vue
createApp({
    data() {
        return {
            usuarios: [],
            // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'http://localhost:5000/usuarios',
            error: false,
            cargando: true,
            nombre: "",
            telefono: "",
            mail: "",
            claver: "",
            mailr: "",
            login: false,
            u: 1,
            clave: ""
        }
    },
    mounted() {
        if (localStorage.login == true) {
            this.login = true;
        }
    },
    methods: {
        validr() {
            mail = this.mailr,
                clave = this.claver;
            telefono = parseInt(this.telefono);
            nombre = this.nombre;
            if (mail == "") {
                document.getElementById("validarmailr").innerHTML = "Debe completar esta sección";
                this.error = true;

            } else { document.getElementById("validarmailr").innerHTML = ""; }
            if (clave.length < 8) {
                document.getElementById("validarclaver").innerHTML = "La contraseña tiene menos que 8 caracteres";
                this.error = true;
            } else if (clave.length < 18) {
                document.getElementById("validarclaver").innerHTML = "La contraseña tiene mas que 18 caracteres";
                this.error = true;
            } else { document.getElementById("validarclaver").innerHTML = ""; }

            if (clave == "") {
                document.getElementById("validarclaver").innerHTML = "Debe completar esta sección";
                this.error = true;
            }

            if (isNaN(parseInt(telefono)) || telefono.length != 8) {
                document.getElementById("validartele").innerHTML = "Entre un número de telefono valido";
                this.error = true;
            }
            else { document.getElementById("validartele").innerHTML = ""; }

            if (telefono == "") {
                document.getElementById("validartele").innerHTML = "Debe completar esta sección";
                this.error = true;
            }

            if (nombre == "") {
                document.getElementById("validarnombre").innerHTML = "Debe completar esta sección";
                this.error = true;
            } else { document.getElementById("validarnombre").innerHTML = ""; }

            if (this.error == false) {
                document.getElementById("validarmailr").innerHTML = "";
                document.getElementById("validarclaver").innerHTML = "";
                document.getElementById("validartele").innerHTML = "";
                document.getElementById("validarnombre").innerHTML = "";
                {
                    usuario = {
                        nombre: nombre,
                        mail: mail,
                        telefono: telefono,
                        clave: this.claver,
                    }
                    var options = {
                        body: JSON.stringify(usuario),
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow'
                    }
                    fetch(this.url, options)
                        .then(function () {
                            alert("Registro exitoso");
                            window.location.href = "./index.html";
                        })
                        .catch(err => {
                            console.error(err);
                            alert("Error al Registrar")
                        })
                }
            }
        },
        validl() {
            mail = this.mail;
            clave = this.clave;
            u = this.u
            usuarios = this.usuarios
            for (u in usuarios) {
                if (clave == usuarios[u].clave && mail == usuarios[u].mail) {
                    sessionStorage.setItem("login", "true")
                    this.error = false
                    alert("Ingreso exitoso");
                } else { this.error = true; }
            }

            if (this.error == true) {
                alert("Error al ingresar")
            }
        },

        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
    },

    created() {
        this.fetchData(this.url)
    },
}
).mount('#app')

