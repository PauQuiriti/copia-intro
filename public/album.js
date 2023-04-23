
 let albumToUse;
 function renderAlbum(album){
    const div = document.getElementById("view-album")
    const h1 = document.createElement('h1')
    h1.classList.add('text-white', 'text-5xl', 'mt-20', 'mb-4', 'ml-4','font-bold')
    h1.textContent= album.title
    div.appendChild(h1)
    const p = document.createElement('p')
    p.classList.add('text-white', 'mb-4', 'ml-4', 'w-1/2')
    p.textContent= album.description
    div.appendChild(p)
    const h1Songs = document.createElement('h1')
    h1Songs.textContent= 'Songs'
    h1Songs.classList.add('text-white', 'text-2xl',  'ml-4','font-bold')
    div.appendChild(h1Songs)
    const newDiv = document.createElement('div')
    div.appendChild(newDiv)
    newDiv.id = 'songs-list'
    if(album.songs.length){
        album.songs.map((song, index)=> { 
            renderSong(song, index)})
            const buttonTrash = document.getElementsByClassName('fa-trash')
            for(let i =0 ; i < album.songs.length ; i++){
              buttonTrash[i].addEventListener('click', () => deleteSong(album.songs[i]._id))
        
            }
    }

 }
 const redirect = (url) => { window.location.href = url}
 
 const renderSong = (song, index)=>{
    const wrapperDiv = document.createElement('div')
    wrapperDiv.id= song.title.split(' ').join("")
    wrapperDiv.classList.add('flex', 'flex-row', 'bg-black', 'grid', 'grid-cols-5', 'gap-4', 'ml-6', 'py-3', 'mb-3', 'mt-8', 'w-4/5' ,'rounded-md','justify-items-start')
    const songList = document.getElementById('songs-list')
    songList.appendChild(wrapperDiv)
    const p = document.createElement('p')
    p.textContent = `0${index +1}`
    p.classList.add('text-white', 'ml-4')
    const h5 = document.createElement('h5')
    h5.textContent = song.title
    h5.classList.add('text-white')
    const pDuration = document.createElement('p')
    pDuration.textContent = song.duration
    pDuration.classList.add('text-white')
    const trash = document.createElement('i')
    trash.classList.add('fa-solid','fa-trash','cursor-pointer')
    trash.style.color = 'white'
    const music = document.createElement('i')
    music.classList.add('fa-solid','fa-music','cursor-pointer')
    music.style.color = 'white'
    music.addEventListener('click', () => window.open(song.url,'_blank'))
   wrapperDiv.append(p,h5,pDuration,trash,music)

 }
const buttonAddSong = document.getElementById('addSongs')
const buttonEdit = document.getElementById('editAlbum')
const albumId = window.location.href.split('album=')[1]


const getAlbum = async () =>{
  try{
    const response = await axios.get( `http://localhost:5000/api/band/${albumId}`)
    albumToUse = response.data.data;
    renderAlbum(albumToUse);
    buttonAddSong.addEventListener('click', ()=> redirect(`./addSongs.html?album=${albumId}`))
    buttonEdit.addEventListener('click', ()=> redirect(`./editForm.html?album=${albumId}`))
  }
  catch(error){
    swal({
      title: 'Error!',
      text: `${error.response.data.error}`,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    redirect('./index.html')
  }
}
getAlbum()
 

const deleteSong = async (songId) => {
  const songsToReturn = albumToUse.songs.filter((song)=> song._id !== songId)
  albumToUse.songs = songsToReturn
  try{
   const response = await axios.put(`http://localhost:5000/api/band/${albumId}`, albumToUse)
   swal({
    title: 'Success!',
    text: "You deleted a song",
    icon: 'success',
    confirmButtonText: 'Ok'
  })
  redirect(`./album.html?album=${albumId}`)
  }
catch(error){
  swal({
    title: 'Error!',
    text: 'Failed to delete this song',
    icon: 'error',
    confirmButtonText: 'Cool'
  })

}

}
