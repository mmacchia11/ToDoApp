const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#listaTareas');
const input = document.querySelector('input')
const template = document.querySelector('#template');
const fragment = document.createDocumentFragment()

let tareas = {
         1644776478488: {
                id:1644776478488,
                texto:'tarea #1',
                estado: false
        },
        1644776519761: {
                id:1644776519761,
                texto:'tarea #2',
                estado: false
        } 
}

document.addEventListener('DOMContentLoaded',() =>{
        pintarTareas()
})


listaTareas.addEventListener('click',e =>{
        btnAccion(e)
})




formulario.addEventListener('submit', e =>{
        e.preventDefault()

       // console.log(input.value)

        setTarea()
})


const setTarea = e => {
        if(input.value.trim() === ''){
                console.log('esta vacio')
                return
        }

        const tarea = {
        id:Date.now(),
        texto: input.value,
        estado:false
        }

        tareas[tarea.id] = tarea

       // console.log(tareas)

        formulario.reset()
        input.focus()


        pintarTareas()
}




const pintarTareas = () => {

        listaTareas.innerHTML = ''
   
        Object.values(tareas).forEach(tarea => {
                //console.log(tarea.texto)
                const clone = template.content.cloneNode(true)

                clone.querySelector('p').textContent = tarea.texto

                if(tarea.estado){
                        clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
                        clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-rotate-left')
                        clone.querySelector('p').style.textDecoration = 'line-through'
                }

               clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
               clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
                
                fragment.appendChild(clone)

        })


        listaTareas.appendChild(fragment)
}





const btnAccion = e =>{

        if(e.target.classList.contains('fa-check-circle')){
                //console.log(e.target.dataset.id)

                tareas[e.target.dataset.id].estado = true

                pintarTareas()

                console.log(tareas)
        }

        if(e.target.classList.contains('fa-minus-circle')){
               delete  tareas[e.target.dataset.id] 
               pintarTareas()
               console.log(tareas)
        }


        if(e.target.classList.contains('fa-rotate-left')){
                //console.log(e.target.dataset.id)

                tareas[e.target.dataset.id].estado = false

                pintarTareas()

                //console.log(tareas)
        }

       


        e.stopPropagation()


}














