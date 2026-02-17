document.addEventListener('DOMContentLoaded', () => { //Cargar el documento

    const librosForm = document.getElementById('libros-form')

    if(librosForm){
        librosForm.addEventListener('submit', async(e) =>{
            e.preventDefault
            const formData = new formData(librosForm);
            const data = Object.fromEntries(formData.entries());

            try{
                const res = await fetch("http://localhost/3306/libros",{
                    method: 'POST',
                    headers: {'content-type': 'application/json' },
                    body: JSON.stringify(data)
                })

                if(response.ok){
                    alert('libro creado con exito');
                    librosForm.reset();
                }else{
                    const error = await response.json()
                    alert('Error :', error)
                }
            } catch (e) {
                console.error("Error al registrar: ", e)
            }
        })
    }

    const getLibros =  async () =>{
        try {
            const res = await fetch('http://localhost/3306/libros')
            librosContainer.classList.add('libros-card');

            librosContainer.innerHTML = ``

                
            });

        }catch (e) {
            console.error("Error al encontrar los libros: ", e)
        }
    }
});