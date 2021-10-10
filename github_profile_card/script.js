const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


async function getUser(username){
    try{
        const {data} = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    }catch(err){
        if(err.response.status == 404){
            createErrorCard('No profile with this username!')
        }
    }
    
}

async function getRepos(username){
    try {
        const {data} = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)
    } catch (error) {
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar" >
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li> <strong>${user.followers} followers </strong> </li>
            <li> <strong>${user.following} following </strong> </li>
            <li> <strong>${user.public_repos} repos </strong> </li>
        </ul>
        <div id="repos">
            
        </div>
    </div>
</div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard(msg){
    const cardHTML = `
        <div class="card" >
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    
    const reposEl = document.getElementById('repos');

    repos
    .slice(0, 5)
    .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo') 
        repoEl.href = repo.html_url
        repoEl.target = '_blank';
        repoEl.innerHTML = repo.name;

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const user = search.value 

    if(user) {
        getUser(user)

        search.value = '';
    }
})




//----------------------------------------------------------------
//one way to do it without destructuring below:
// async function getUser(username){
//     const res = await axios(APIURL + username)

//     console.log(res)
// }
//----------------------------------------------------------------
// without async below:
// function getUser(username){
//     axios(APIURL + username)
//         .then(res => console.log(res.data))
//         .catch(error => console.log(error))
// }