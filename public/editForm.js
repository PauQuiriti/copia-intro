let album;
let objectToSend = {}
const albumId = window.location.href.split('album=')[1]
const getAlbum = async () =>{
    const {data} = await axios.get(`http://localhost:5000/band/${albumId}`)
    album= data.data
}
getAlbum()
function getInputValues(){
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.map((input)=> objectToSend[input.id]= input.value ? input.value : album[input.id])
}
const changeAlbum = async(e)=>{
    e.preventDefault()
    getInputValues()
    try{
       await axios.put(`http://localhost:5000/band/${album._id}`,objectToSend)
       swal({
        title: 'Album edited!',
        text: 'You modified the album!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 
    window.location.href=`./album.html?album=${album._id}`
    }
    catch(error){
        swal({
            title: 'Error!',
            text: `${error.response.data.error}`,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }
}

const redirect = (e)=>{ 
    e.preventDefault()
     window.location.href=`./album.html?album=${album._id}`}
const editButton= document.getElementById('editButton')
const cancelButton= document.getElementById('cancelButton')
editButton.addEventListener('click', (e) => changeAlbum(e))
cancelButton.addEventListener('click', (e) => redirect(e))
