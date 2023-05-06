let album;
let newSong = {}
const albumId = window.location.search.split('album=')[1]
const getAlbum = async () =>{
  try{
   const {data} = await axios.get(`/api/band/${albumId}`)
   album = data.data;
  }
  catch(error){
  console.log(error)
  }
}
getAlbum()
const redirect = () => { window.location.href = `./album.html?album=${album._id}`}
const addSong = async (e) => {
    e.preventDefault()
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.map((input)=> newSong[input.id]=input.value)
    album.songs.push(newSong)
    try{
     await axios.put(`/api/band/${album._id}`,album)
     swal({
      title: 'Success!',
      text: "You added a song",
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    redirect()
    }
    catch(error){
      swal({
        title: 'Error!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }

}
const goBack = (e)=>{ 
    e.preventDefault()
    redirect()
}
const button = document.getElementsByClassName(' w-1/3 h-10  mt-8 text-center text-sm font-bold text-white bg-indigo-500 ring-orange-800  rounded-md hover:bg-opacity-90 focus:ring-4')[0]
const cancelButton= document.getElementById('cancel')
button.addEventListener('click', (e)=> addSong(e) )
cancelButton.addEventListener('click', (e) => goBack(e))
