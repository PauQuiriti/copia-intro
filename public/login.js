
const objectToSend = { email: "", password: ""}

function getInputValues(){
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.map((input)=> objectToSend[input.id]=input.value)
}

const loginUser = async (e) => {
    e.preventDefault()
    getInputValues()
    try{
     const response = await axios.post(`/api/login`,objectToSend)
     localStorage.setItem('token',response.data.id) // aca seteariamos el token si les parece ok
     swal({
      title: 'Success!',
      text: "",
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    window.location.href= "./index.html"
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

const loginButton = document.getElementById('login')
loginButton.addEventListener('click', (e)=> loginUser(e))