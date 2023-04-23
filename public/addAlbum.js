
const objectToSend = { title: "", description: "", yearOfRelease:"", img: ""}

function getInputValues(){
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.map((input)=> objectToSend[input.id]=input.value)
}

const addAlbum = async (e) => {
    e.preventDefault()
    try{
        getInputValues()
        await axios.post('https://copia-intro.vercel.app/band',objectToSend)
        swal({
            title: 'Success!',
            text: 'Album added to the collection!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }) 
        window.location.href='./index.html'

    }
    catch(error){
        swal({
            title: 'Error!',
            text: `${error.responseJSON.error}`,
            icon: 'error',
            confirmButtonText: 'Cool'
          })   
    }

}

const button = document.getElementsByClassName('w-1/3 h-10  mt-8 mb-8 text-center text-sm font-bold text-white bg-indigo-500 ring-orange-800  rounded-md hover:bg-opacity-90 focus:ring-4')[0]
button.addEventListener('click', (e) => addAlbum(e))