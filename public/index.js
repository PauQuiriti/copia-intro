
// const inputs = document.getElementsByTagName('input')
// const button = document.getElementById('login-button')
// button.addEventListener('click', (e) => {
//     e.preventDefault()
//     sigIn()
// })
let user;
const onLoad = async () => {
  try{
    const response = await axios.get('/api/me')
    user = response.data
    const userString = `${response.data.name} ${response.data.lastName}`
    const {data} = await axios.get(`/api/user/${user.id}`)
    user = data.data
    const userName = document.getElementById('user-name')
    userName.textContent = userString
  }
catch(error){
  window.location.href= './login.html'
}
 }

 onLoad()
const redirect = (id) => { window.location.href = `./album.html?album=${id}`}

const renderAlbums = (album) => {
   const div = document.getElementsByClassName('grid grid-cols-3 gap-4 mt-12 py-30')[0]
   const newDiv = document.createElement('div')
   newDiv.classList.add('mb-20')
   const img = document.createElement('img')
   img.classList.add('rounded','cursor-pointer')
   img.addEventListener("click", () => redirect(album._id))
   img.src= album.img ? album.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuP3gpoGQFRbwZ1mbbDUxyaXV0w1hTXEpILQ&usqp=CAU'
   div.appendChild(newDiv)
   const p = document.createElement('p')
   p.classList.add('text-white','text-center', 'text-xl', 'font-bold', 'pr-5')
   p.textContent = album.yearOfRelease
   const trash = document.createElement('i')
    trash.classList.add('fa-regular','fa-trash-can','cursor-pointer', 'mt-2')
    // trash.style.color = 'orange'
    const star = document.createElement('i')
    star.classList.add('fa-solid','fa-star','cursor-pointer','position-trash')
    star.style.color = 'white'
    const favoriteDiv = document.createElement('div')
    favoriteDiv.classList.add('flex', 'flex-row', 'justify-center')
    favoriteDiv.append(p,trash)
    newDiv.append(star, img, favoriteDiv)
    const trashButtons = document.getElementsByClassName('fa-trash-can')
    for(let i=0 ; i< trashButtons.length ; i++){
      trashButtons[i].addEventListener('click', () => deleteAlbum(album))
    }
    const starButtons = document.getElementsByClassName('fa-star')
    for(let i=0 ; i< starButtons.length ; i++){
      starButtons[i].addEventListener('click', (e) => addToFavorites (e,album))
    }
}
 const addToFavorites = async (e,album) => {
  let favorites= user.favorites
  favorites.push({title: album.title})
  try{
    await axios.put(`/api/user/${user._id}`,{favorites})
    const star = e.target
    star.style.color = 'yellow'
  }
  catch(error){
    swal({
      title: 'Oh No!',
      text: 'Failed to add to favorites',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
 }

const getAlbums =  async () => {
  try{
  const response = await axios.get('/api/band')
  response.data.data.map((album)=> {
    renderAlbums(album)})
  }
  catch(error){
    return []
  }
}
getAlbums()

    
  const deleteAlbum = async (album) => {
    try{
      await axios.delete(`/api/band/${album._id}`)
      swal({
        title: 'Success!',
        text: `You deleted ${album.title}`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      //forzar refresh
      window.location.href = `./index.html`
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

  const logOut = async () => {
   await axios.post('/api/logout')
   window.location.href= './login.html'
  }
  const logOutButton = document.getElementById('logout')
  logOutButton.addEventListener('click',logOut)
