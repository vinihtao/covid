
// Endpoint api 
const getURL = "https://api.covid19api.com/countries"; // All Countries
const getSumary = "https://api.covid19api.com/summary"; // All Data

// Get all data
async function getData(url) {
    const response = await fetch(url);
    return response.json()   
}
// Get all Countries
const getCountries = async () => { 
        const data = await getData(getURL);
        return data;
}

//Get all info today of cases
const getCountriesToday = async () => { 
    const data = await getData(getSumary);
    return data;
}
// List sugest countries on form
const listCountries = () => {
    document.getElementById('paises');
    getCountries().then(function(result) {
        for (const country of result) {
            let pais = country['Country'];
            let node = document.createElement("option");
            var textnode = document.createTextNode(pais);
            node.appendChild(textnode);
            node.setAttribute("value", pais);
            document.getElementById("paises").appendChild(node);

          }
     });
    
} 
// Get result and show on initial page
const getResult = (status) => {
    if(status = 429) {
            // show error info server bad to many request
            document.getElementById("dados").innerHTML = `
                <div class="card col-12 p-0" style="max-height: 350px">
                    <h5 class="card-header">Veja as últimas atualizações sobre o Covid19</h5>
                    <div class="card-body">
                    <p>Não conseguimos carregar os dados a API, muitas requisições na API causam este tipo de instabilidade!</p>
                    <p>Agurade estamos tentando novamente!</p>
                    </div>
                </div>           
            `;
    } else{
        // show info getting data
        document.getElementById("dados").innerHTML = `
            <div class="card col-12 p-0" style="max-height: 350px">
                <h5 class="card-header">Veja as últimas atualizações sobre o Covid19</h5>
                <div class="card-body">
                <p>Carregando informações... aguarde!</p>
                </div>
            </div>           
        `;
    }

    // Get value of input
    let pais = document.getElementById("busca").value;
    
    // Searach brazil with Brasil
    switch (pais) {
        case "Brasil":
            pais = "Brazil";
            break;
        
        default:
            break;
    }

    // Getting info and show on page 
    getCountriesToday().then(function(result) {
        let paises = Array(result['Countries']);
        let dados = document.getElementById("dados");

        let statis = paises[0].find(item => item.Country === pais);

        if(paises) {
            dados.innerHTML = `
            <div class="card col-12 p-0" style="max-height: 350px">
                <h5 class="card-header">Veja as últimas atualizações sobre o Covid19</h5>
                <div class="card-body">
                <h5 class="card-title">${statis.Country} - ${statis.CountryCode}</h5>
                <ul>
                    <li>Novos casos confirmados: ${statis.NewConfirmed}</li>
                    <li>Novas mortes: ${statis.NewDeaths}</li>
                    <li>Novos casos recuperados : ${statis.NewRecovered}</li>
                    <li>Total de casos confirmados: ${statis.TotalConfirmed}</li>
                    <li>Total de mortes: ${statis.TotalDeaths}</li>
                    <li>Total de recuperados: ${statis.TotalRecovered}</li>
                    <li>Dados atualizados em: ${new Date(statis.Date).toLocaleString() }</li>
                </ul>

                <p>
                    Build and using with a free API for data on the Coronavirus - https://covid19api.com/
               </>
                </div>
            </div>           
        `;
        }
        
     }).catch(function(error) {
        // restart search case error 
        setTimeout(function(){ 
            getResult(429);
        }, 2000);
     });

     


} 