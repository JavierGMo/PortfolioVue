
const portfolioApp = new Vue({
    el : '#portafolioMain',
    data : {
        projects : [
            {id : 1, title : 'Portafolio', description : 'Portafolio hecho con Node y Vue.js', img_ref : 'assets/img/car1.png', link_github : 'https://github.com/JavierGMo/PortfolioVue', link_website : 'https://portfoliovjgm.herokuapp.com'},
            {id : 2, title : 'Carrito de compras', description : 'Carrito con Bootstrap y Laravel', img_ref : 'assets/img/por1.png', link_github : 'https://github.com/JavierGMo/Carrito-Laravel', link_website : ''},
            {id : 3, title : 'App del tiempo', description : 'App de tiempo con Vue.js y PHP', img_ref : 'assets/img/clim1.png', link_github : 'https://github.com/JavierGMo/clima-app-vue', link_website : ''},
        ],
        hamburguerMenu : true,
        windowWidth : window.innerWidth,
        fromMail : '',
        fullName : '',
        subjectMail : '',
        textMail : '',
        dataMail : new FormData(), 

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
            // const elem = this.$refs[reference];
            // const top = elem.offsetTop;
            const elem = document.getElementById(reference);
            const top = elem.offsetTop-60;
            window.scrollTo(0, top);
            if(this.windowWidth<650){
                this.hamburguerMenu = true;
            }
            
        },
        sendMail : function(){
            console.log(`from ${this.fromMail} subject ${this.subjectMail} text : ${this.textMail}`);
            if(this.fromMail && this.subjectMail && this.textMail && this.fullName){
                // this.dataMail.append('from', this.fromMail);
                // this.dataMail.append('subject', this.subjectMail);
                // this.dataMail.append('text', this.textMail);
                Swal.fire({
                    title: 'Casi listo',
                    text: "Le enviare un correo lo mas rapido posible",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Enviar',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      fetch('http://127.0.0.1:8000/sendmail', {
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
                              
                          }else if(res.status === 400){

                          }else if(res.status === 500){

                          }
                        })
                      .catch(function(err){
                          
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
                    <div class="link-card-container"><a class="color-black-light" :href="project.link_website" target="_blank"><i class="fas fa-link"></i></a></div>
                </div><!--visit site or code on github-->
            </div><!--Card project-->
            `
        },
        'about-me' : {
            template : `
            <div class="container-about-me m-top-desk">
                <div class="container-txt-title"><p class="txt-center">¿Quien soy? &#x1f9df;</p></div><!--Title-->
                <div class="container-txt"><p>Hola, soy un desarrollador de software autodidacta, apasionado por las nuevas tecnologias para poder crear nuevos softwares que ayuden a resolver las necesidades de las personas.</p></div><!--Content about me-->
            </div><!--about me-->
            `
        },
        'works-p' : {
            template : `
            <div id="works m-top-desk">
                <div class="container-txt-title"><p class="txt-center">Trabajos &#x1f4bb;</p></div>
                <div class="container-txt"><p>Algunos de mis trabajos que he realizado los pueden ver a continuacion o pueden ver mis codigos: </p></div>
                <div class="d-fx f-center"><a  class="btn-github" href="https://github.com/JavierGMo" target="_blank"><span class="color-black-light">Mi GitHub <span class="emoji-github">&#x1f47e;</span></span></a></div><!--link github-->
            </div><!--Works-->
            `
        }
    }
});
