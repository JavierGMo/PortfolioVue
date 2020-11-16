//Agregar mas texto a la parte sobre mi y agregar mas trabajos
const portfolioApp = new Vue({
    el : '#portafolioMain',
    data : {
        projects : [
            {id : 1, title : 'Portafolio', description : 'Portafolio hecho con Node y Vue.js', img_ref : 'assets/img/por1.png', link_github : 'https://github.com/JavierGMo/PortfolioVue', link_website : 'https://portfoliovjgm.herokuapp.com'},
            {id : 2, title : 'Carrito de compras', description : 'Carrito con Bootstrap y Laravel', img_ref : 'assets/img/car1.png', link_github : 'https://github.com/JavierGMo/Carrito-Laravel', link_website : ''},
            {id : 3, title : 'App del tiempo', description : 'App de tiempo con Vue.js y Node.js', img_ref : 'assets/img/clim1.png', link_github : 'https://github.com/JavierGMo/clima-app-vue', link_website : 'https://weathervuejgm.herokuapp.com'},
        ],
        skills : [
            {id : 1, name : 'HTML5 | CSS3 | Bootsrtap', icon : 'fab fa-html5 html-color', description : 'Desarollo de frontend para websites.', applications : 'FrontEnd', typeS : 'Desarrollo frontend', classCard : 'html-bgcolor-h'},
            {id : 2, name : 'JavaScript (JS)', icon : 'fab fa-js-square js-color', description : 'Desarrollo de frontend y scripts para la escuela', applications : 'FrontEnd', typeS : 'Lenguaje de programacion', classCard : 'js-bgcolor-h'},
            {id : 3, name : 'Vue.js', icon : 'fab fa-vuejs vue-color', description : 'Desarrollo de frontend para websites.', applications : 'FrontEnd', typeS : 'Framework', classCard : 'vue-bgcolor-h'},
            {id : 4, name : 'PHP', icon : 'fab fa-php php-color', description : 'Desarrollo de backend', applications : 'BackEnd', typeS : 'Lenguaje de programacion', classCard : 'php-bgcolor-h'},
            {id : 5, name : 'Laravel', icon : 'fab fa-laravel laravel-color', description : 'Desarrollo de backend', applications : 'BackEnd', typeS : 'Framework', classCard : 'laravel-bgcolor-h'},
            {id : 6, name : 'Node.js', icon : 'fab fa-node node-color', description : 'Desarrollo de backend', applications : 'BackEnd', typeS : 'Framework', classCard : 'node-bgcolor-h'},
            {id : 7, name : 'Java', icon : 'fab fa-java java-color', description : 'Desarrollo de apps sencillas y programas de escritorio', applications : 'Apps·Desktop programs', typeS : 'Lenguaje de programacion', classCard : 'java-bgcolor-h'},
            {id : 8, name : 'Python', icon : 'fab fa-python python-color', description : 'Programas de escritorio y scripts en general', applications : 'Desktop programs', typeS : 'Lenguaje de programacion', classCard : 'python-bgcolor-h'},
            {id : 9, name : 'C', icon : 'fas fa-copyright c-color', description : 'Desarrollo de programas escolares', applications : 'Desktop programs', typeS : 'Lenguaje de programacion', classCard : 'c-bgcolor-h'},
            
        ],
        hamburguerMenu : true,
        windowWidth : window.innerWidth,
        fromMail : '',
        fullName : '',
        subjectMail : '',
        textMail : '',
        hover : false


    },
    created : function(){
        if(this.windowWidth>=650) this.hamburguerMenu = false;
        else this.hamburguerMenu = true;
    },
    mounted : function(){
        window.onresize = () => {
            this.windowWidth = window.innerWidth
        }
    },
    methods : {
        scrollAnchor : function(reference){
            const elem = document.getElementById(reference);
            const top = elem.offsetTop-60;
            window.scrollTo(0, top);
            if(this.windowWidth<650){
                this.hamburguerMenu = true;
            }
            
        },
        sendMail : function(){
            //https://portfoliovjgm.herokuapp.com
            //http://127.0.0.1:8000
            if(this.fromMail && this.subjectMail && this.textMail && this.fullName){
               
                Swal.fire({
                    title: 'Casi listo',
                    text: "Le enviare un correo lo mas rapido posible",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#21bf73',
                    cancelButtonColor: '#fd5e53',
                    confirmButtonText: 'Enviar',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      fetch('https://portfoliovjgm.herokuapp.com/sendmail', {
                          method : 'POST',
                          headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                          },
                          body : JSON.stringify({
                                    to : this.fromMail,
                                    fullName: this.fullName,
                                    subject : this.subjectMail,
                                    text : this.textMail
                          })
                      })
                      .then(function(res){
                          if(res.ok && res.status === 200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Genial',
                                text: 'Me pondre lo mas rapido posible en contacto contigo'
                            });
                          }else if(res.status === 500){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Vaya algo salio mal, podrias probar otro medio',
                            });
                          }
                        })
                      .catch(function(err){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Vaya algo salio mal, podrias probar otro medio',
                            });
                        });
                    }
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oopss...',
                    text: 'Faltan campos por llenar',
                });
            }
        }

    },
    watch : {
        windowWidth : function(newWidth, oldWidth){
            if(this.windowWidth>=650) this.hamburguerMenu = false;
            else this.hamburguerMenu = true;
        }
    },
    components : {
        'card-project' : {
            props : {
                project : Object
            },
            template : `
            <div class="card-project">
                <div class="card-img"><img :src="project.img_ref" alt="Pulpo"></div><!--container img-->
                <div class="title-card"><p class="txt-center">{{ project.title }}</p></div><!--title card-->
                <div class="card-description-project"><p class="txt-truncate">{{ project.description }}</p></div><!--description project-->
                <div class=""><p class="txt-center">Enlaces</p></div><!--title card-->
                <div class="card-links d-fx f-around">
                    <div class="link-card-container"><a class="color-black-light" :href="project.link_github" target="_blank"><i class="fab fa-github"></i></a></div>
                    <div v-if="project.link_website" class="link-card-container"><a class="color-black-light" :href="project.link_website" target="_blank"><i class="fas fa-link"></i></a></div>
                </div><!--visit site or code on github-->
            </div><!--Card project-->
            `
        },
        'skills-cards' : {
            props : {
                skill : Object
            },
            template : `
            <div :class="skill.classCard" class="card-project">
                <div><p class="txt-center icon-skills"><i :class="skill.icon"></i></p></div><!--icon technology-->
                <div class="name-skill"><p class="txt-center">{{skill.name}}</p></div><!--name technology-->
                <div class="description-skill"><p class="txt-center">{{skill.description}}</p></div><!--description technology-->
                <div class="application-skill"><p class="txt-center">Aplicacion: {{skill.applications}}</p></div><!--aplpications technology-->
                <div class="type-skill"><p class="txt-center">Tipo: {{skill.typeS}}</p></div><!--type technology-->
            </div><!--Card skill-->
            `
        },
        'skills-c' : {
            template : `
            <div class="container-about-me m-top-desk">
                <div class="container-txt-title"><p class="txt-center">Skills &#x1f4aa</p></div><!--Title-->
                <div class="container-txt"><p class="txt-center">Algunos de mis skills con los lenguajes y frameworks para mis trabajos.</p></div><!--Description skills-->
            </div><!--about me-->`
        },
        'about-me' : {
            template : `
            <div class="container-about-me m-top-desk">
                <div class="container-txt-title"><p class="txt-center">¿Quien soy? &#x1f9df;</p></div><!--Title-->
                <div class="container-txt"><p class="txt-center">Hola, soy un desarrollador de software autodidacta y estudiante de ingenieria en sistemas computacionales de los ultimos semestres, apasionado por las nuevas tecnologias para poder crear nuevos softwares que ayuden a resolver las necesidades de las personas.</p></div><!--Content about me-->
            </div><!--about me-->
            `
        },
        'works-p' : {
            template : `
            <div id="works m-top-desk">
                <div class="container-txt-title"><p class="txt-center">Trabajos &#x1f4bb;</p></div>
                <div class="container-txt"><p class="txt-center">Algunos de mis trabajos que he realizado los pueden ver a continuacion o pueden ver mis codigos: </p></div>
                <div class="d-fx f-center"><a  class="btn-github" href="https://github.com/JavierGMo" target="_blank"><span class="color-black-light">Mi GitHub <span class="emoji-github">&#x1f47e;</span></span></a></div><!--link github-->
            </div><!--Works-->
            `
        }
    }
});
