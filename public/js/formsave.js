HTMLFormElement.prototype.save = function(config){ 

    let form = this;

        form.addEventListener('submit', e =>{

            e.preventDefault();

            let formData = new FormData(form);

            fetch(form.action, {
            method: form.method,
            body: formData
            })
            .then(response => response.json())
            .then(json =>{

                if (json.error){

                    if (typeof config.failure === 'function') config.failure(json.error);
                   
                }else{

                    
                    recarregar();
                   
 
                }

            }).catch(err=>{

                if (typeof config.failure === 'function') config.failure(err);

            });


        });
}


function  recarregar(){

    window.location.reload();


}